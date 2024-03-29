
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from '@/store';
import {normalizeURL} from '@/units/url';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import {ReqStatus} from '@/units/status';
import {MainLayout} from '@/components/layouts/MainLayout';
import {LoadingBox} from '@/components/common/LoadingBox';
import {MessageBox} from '@/components/common/MessageBox';
import {PageTitle} from '@/components/general/PageTitle';
import {UserRegStatus} from '@/units/user';
import {RegForm} from './RegForm'; 
import _ from 'lodash';
//import css from './RegPage.module.scss';

export function RegPage() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);
  const userRegResult = useAppSelector(state => state.user.userReg.userRegResult);

  const title = strlang('REG_PAGE_TITLE', lang);
  let contentHTML = <></>;

  switch (userRegResult.reqStatus) {
    default: {
      switch (userRegResult.userRegStatus) {
        default: {
          contentHTML = 
            <RegForm />
        } break;
        
        case UserRegStatus.CREATED: {
          contentHTML = 
            <MessageBox 
              type={'INFO'} 
              title={strlang('ACCOUNT_CREATED_TITLE', lang)} 
              text={strlang('ACCOUNT_CREATED_TEXT', lang)}
              redirect={{url: '/user/login', delay: 1000}}
            />
        } break;
      }
    } break;

    case ReqStatus.LOADING: {
      contentHTML = 
        <LoadingBox />
    } break;

    case ReqStatus.ERROR: {
      contentHTML = 
        <MessageBox type={'ERROR'} title={strlang('ERROR', lang)} />
    } break;
  }
  
  const pageEnv = {
    title,
    navStack: [{url: normalizeURL(router.asPath), text: title}],
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <PageTitle title={title} />
      {contentHTML}
    </MainLayout>
  )
}
