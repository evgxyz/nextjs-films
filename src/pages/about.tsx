
import { NextPage } from 'next';
import cookie from 'js-cookie';

import { wrapper, useAppSelector } from '@/store';
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';

interface AboutNextPageProps {
  id?: number,
  cookies?: string
}

const AboutNextPage: NextPage = function(props) {
  return (
    <MainLayout title={'About'}>
      <h1>About</h1>
      <div>{'props:' + JSON.stringify(props)}</div>
      <button onClick={() => cookie.set('lang', 'RU')}>set</button>
    </MainLayout>
  )
}

export default AboutNextPage;


