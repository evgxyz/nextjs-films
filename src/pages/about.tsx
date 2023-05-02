
import { NextPage } from 'next';
//import cookies from 'js-cookie';
import { wrapper, useAppSelector } from '@/store';
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';

interface AboutNextPageProps {
  cookies?: string
}

const AboutNextPage: NextPage<AboutNextPageProps> = function(props) {
  return (
    <MainLayout title={'About'}>
      <h1>About</h1>
      <div>{JSON.stringify(props.cookies)}</div>
    </MainLayout>
  )
}

AboutNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {
  if (ctx.req) { // on server 
    const cookies = ctx.req.headers.cookie;
    return { cookies }
  } 
  else { // on client
    
  }
  return {}
});

export default AboutNextPage;


