
import {NextPage} from 'next';
import cookie from 'js-cookie';
import _ from 'lodash';
import {wrapper, useAppSelector} from '@/store';
import {MainLayout} from '@/components/layouts/MainLayout/MainLayout';

interface AboutNextPageProps {
  id?: number,
  cookies?: string
}

const AboutNextPage: NextPage<AboutNextPageProps> = function(props) {
  return (
    <MainLayout title={'About'}>
      <h1>About</h1>
      <div>{'props:' + JSON.stringify(props)}</div>
    </MainLayout>
  )
}

export default AboutNextPage;


