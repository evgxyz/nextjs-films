
import {useAppDispatch, useAppSelector} from '@/store';
import {setPageEnv} from '@/store/pageEnv';
import {strlang} from '@/units/lang';
import {MainLayout} from '@/components/layouts/MainLayout';
import Link from 'next/link';
import _ from 'lodash';

export function IndexPage() {

  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);

  const title = strlang('INDEX_PAGE_TITLE', lang);
  dispatch(setPageEnv({title}));

  return (
    <MainLayout>
      <h1>{title}</h1>
      <p><Link href='/films?genreIds=2+3'>Films</Link></p>
      <p><Link href='/about'>About</Link></p>
      <p><Link href='/film/abc'>Wrong url</Link></p>
      <ul>
        {
          _.range(1, 6).map(i => 
            <li key={i}><Link href={`/film/${i}`}>{`Film ${i}`}</Link></li>
          )
        }
      </ul>
    </MainLayout>
  )
}