
import { useAppSelector } from '@/store';
import { strlang } from '@/units/lang';
import { MainLayout } from '@/components/layouts/MainLayout';
import Link from 'next/link';
import { range } from '@/units/utils';
import styles from './IndexPage.module.scss';

export function IndexPage() {

  const lang = useAppSelector(state => state.settings.lang);

  const pageTitle = strlang('INDEX_PAGE_TITLE', lang);

  return (
    <MainLayout title={pageTitle}>
      <h1>{pageTitle}</h1>
      <p><Link href='/films'>Films</Link></p>
      <p><Link href='/about'>About</Link></p>
      <p><Link href='/film/abc'>Wrong url</Link></p>
      <ul>
        {
          range(1, 5).map(i => 
            <li key={i}><Link href={`/film/${i}`}>{`Film ${i}`}</Link></li>
          )
        }
      </ul>
    </MainLayout>
  )
}