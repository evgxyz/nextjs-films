
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import {PageTitle} from '@/components/general/PageTitle';
import Link from '@/next/Link';
import _ from 'lodash';
import css from './IndexPage.module.scss';

export function IndexPage() {

  const lang = useAppSelector(state => state.settings.lang);

  const title = strlang('INDEX_PAGE_TITLE', lang);
  const pageEnv = {
    title,
    navStack: [],
    description: 'Index lorem ipsum dolor sit',
    keywords: 'index, lorem, ipsum, dolor'
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <PageTitle title={title} />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, explicabo sequi doloremque perferendis laboriosam deleniti saepe voluptatibus odio blanditiis facilis, ad tempora suscipit amet laborum cum omnis. Dolorum, aliquam debitis.</p>
      <p><Link href='/films?genreIds=2+3&countryIds=1+3'>Films</Link></p>
      <p><Link href='/about'>About</Link></p>
      <p><Link href='/film/abc'>Wrong url</Link></p>
    </MainLayout>
  )
}