
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
      <p>Задержки подгрузки данных специально увеличены для наглядности.</p>
      <p><Link href='/films'>Films</Link></p>
      <p><a href={process.env.STORYBOOK_URL ?? '/'} target='_blank'>Storybook</a></p>
      <p><Link href='/film/abc'>Wrong url</Link></p>
    </MainLayout>
  )
}