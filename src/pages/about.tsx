
import { NextPage } from 'next';
import cookie from 'js-cookie';

import { wrapper, useAppSelector } from '@/store';
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';

interface AboutNextPageProps {
  cookies?: string
}

const AboutNextPage: NextPage<AboutNextPageProps> = function(props) {
  return (
    <MainLayout title={'About'}>
      <h1>About</h1>
      <div>{'cookies:' + JSON.stringify(props.cookies)}</div>
      <button onClick={() => cookie.set('lang', 'RU')}>set</button>
    </MainLayout>
  )
}

AboutNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {
  if (ctx.req) { // on server 
    const cookie = ctx.req.headers.cookie;
    return { cookie }
  } 
  else { // on client
    cookie.set('lang', 'EN')
  }
  return {}
});

export default AboutNextPage;


