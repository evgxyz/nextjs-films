
import _ from 'lodash';
import {NextPage} from 'next';
import {NextPageProps} from '@/units/next';
import {useAppDispatch, useAppSelector} from '@/store';
import {setPageEnv} from '@/store/pageEnv';
import {MainLayout} from '@/components/layouts/MainLayout/MainLayout';
import {strlang} from '@/units/lang';

const AboutNextPage: NextPage<NextPageProps> = function(props) {

  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);

  const title = strlang('ABOUT_PAGE_TITLE', lang);

  dispatch(setPageEnv({title}));

  return (
    <MainLayout>
      <h1>{title}</h1>
      <div>{'props:' + JSON.stringify(props)}</div>
    </MainLayout>
  )
}

export default AboutNextPage;


