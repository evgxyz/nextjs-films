
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import Link from '@/next/Link';
import _ from 'lodash';

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
      <h1>{title}</h1>
      <p><Link href='/films?genreIds=2+3&countryIds=1+3'>Films</Link></p>
      <p><Link href='/about'>About</Link></p>
      <p><Link href='/film/abc'>Wrong url</Link></p>
      <ul>
        { _.range(1, 6).map(i => 
            <li key={i}><Link href={`/film/${i}`}>{`Film ${i}`}</Link></li>
          )
        }
      </ul>
    </MainLayout>
  )
}