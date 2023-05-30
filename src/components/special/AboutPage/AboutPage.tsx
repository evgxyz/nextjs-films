
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {normalizeURL} from '@/units/url';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import {MainLayout} from '@/components/layouts/MainLayout';
import {LoadingBox} from '@/components/common/LoadingBox';
import {Pagination} from '@/components/common/Pagination';
import _ from 'lodash';
import css from './AboutPage.module.scss';
import { PageTitle } from '@/components/general/PageTitle';

export function AboutPage() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);

  const title = strlang('ABOUT_PAGE_TITLE', lang);
  const pageEnv = {
    title,
    navStack: [{url: normalizeURL(router.asPath), text: title}],
    description: 'About lorem ipsum dolor sit',
    keywords: 'about, lorem, ipsum, dolor'
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <PageTitle 
        title={title} 
        subTitle={'This is subtitle'} 
      />
      <p><Link href='/films?genreIds=2+3&countryIds=1+3'>Films</Link></p>
      <LoadingBox />
      <Pagination 
        baseUrl={'/films?genreIds=2+3&countryIds=1+3'} 
        paramName={'page'} 
        start={1} 
        end={10} 
        curr={6}
      />
      <p>Lorem ipsum dolor sit, 
        amet consectetur adipisicing elit. 
        Cupiditate nesciunt adipisci voluptatem ipsa alias iste dolorem officiis nisi 
        voluptatibus, iusto laborum minima illo ipsum placeat amet error incidunt tempora
        blanditiis?</p>
    </MainLayout>
  )
}