
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
import {UserLoginStatus} from '@/units/user';
import {LoginForm} from './LoginForm'; 
import _ from 'lodash';
//import css from './LoginPage.module.scss';

export function LoginPage() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);
  const userLoginResult = useAppSelector(state => state.user.userLogin.userLoginResult);

  const title = strlang('LOGIN_PAGE_TITLE', lang);
  let contentHTML = <></>;

  switch (userLoginResult.reqStatus) {
    default: {
      switch (userLoginResult.userLoginStatus) {
        default: {
          contentHTML = 
            <LoginForm />
        } break;
        
        case UserLoginStatus.LOGINED: {
          contentHTML = 
            <MessageBox 
              type={'INFO'} 
              title={strlang('LOGIN_LOGINED_TITLE', lang)} 
              text={strlang('LOGIN_LOGINED_TEXT', lang)}
              redirect={{url: '/', delay: 1000}}
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
