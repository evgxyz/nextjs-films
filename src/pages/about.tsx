
import { NextPage } from 'next';
import { wrapper, useAppSelector } from '@/store';
import { cookies } from 'next/headers';
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';

const AboutNextPage: NextPage = function() {
  return (
    <MainLayout title={'About'}>
      <h1>About</h1>
    </MainLayout>
  )
}

AboutNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {
  if (ctx.req) { // on server 
    const cookieStore = cookies();
    console.log(cookieStore.get('settings'));
  } 
  else { // on client
    
  }
  return {}
});

export default AboutNextPage;


