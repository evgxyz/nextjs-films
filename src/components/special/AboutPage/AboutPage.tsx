
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {normalizeURL} from '@/units/query';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import _ from 'lodash';

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
      <h1 className='page-title'>{title}</h1>
      <p>Lorem ipsum dolor sit, 
        amet consectetur adipisicing elit. 
        Cupiditate nesciunt adipisci voluptatem ipsa alias iste dolorem officiis nisi 
        voluptatibus, iusto laborum minima illo ipsum placeat amet error incidunt tempora
        blanditiis?</p>
    </MainLayout>
  )
}