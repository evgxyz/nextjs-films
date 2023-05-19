
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {ReqStatus} from '@/units/status';
import {strlang} from '@/units/lang';
import {normalizeURL} from '@/units/query';
import {MainLayout} from '@/components/layouts/MainLayout';
import {MessageBox} from '@/components/general/MessageBox';
import {LoadingBox} from '@/components/common/LoadingBox';
import {FilmSearchFilter} from './FilmSearchFilter'; 
import styles from './FilmSearchPage.module.scss';

export function FilmSearchPage() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);
  const filmSearch = useAppSelector(state => state.filmSearch);
  const {params, results, reqStatus} = filmSearch;

  let title = strlang('FILM_SEARCH_TITLE', lang);
  let content = <></>;

  switch (reqStatus) {
    case ReqStatus.OK: {
      content = (
        <>
          <pre>{JSON.stringify(filmSearch, null, 2)}</pre>
        </>
      )
    } break;
    case ReqStatus.LOADING: {
      content = (
        <LoadingBox />
      )
    } break;
    case ReqStatus.NOT_FOUND: {
      content = (
        <MessageBox type={'ERROR'} title={strlang('NOT_FOUND', lang)} />
      )
    } break;
    case ReqStatus.ERROR: {
      content = (
        <MessageBox type={'ERROR'} title={strlang('ERROR', lang)} />
      )
    } break;
  }

  const pageEnv = {
    title,
    navStack: [{url: normalizeURL(router.asPath), text: title}],
    description: 'Film lorem ipsum dolor sit',
    keywords: 'film, lorem, ipsum, dolor'
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <h1>{title}</h1>
      <FilmSearchFilter />
      {content}
    </MainLayout>
  )
}