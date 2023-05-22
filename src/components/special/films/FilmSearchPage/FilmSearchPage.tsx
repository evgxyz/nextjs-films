
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {ReqStatus} from '@/units/status';
import {strlang} from '@/units/lang';
import {normalizeURL} from '@/units/url';
import {perPageDefault} from '@/units/film';
import {MainLayout} from '@/components/layouts/MainLayout';
import {MessageBox} from '@/components/common/MessageBox';
import {LoadingBox} from '@/components/common/LoadingBox';
import {Pagination} from '@/components/common/Pagination';
import {FilmSearchFilter} from './FilmSearchFilter'; 
import css from './FilmSearchPage.module.scss';

export function FilmSearchPage() {

  const router = useRouter();
  const url = normalizeURL(router.asPath);
  
  const lang = useAppSelector(state => state.settings.lang);
  const filmSearch = useAppSelector(state => state.filmSearch);

  let title = strlang('FILM_SEARCH_TITLE', lang);
  let content = <></>;

  switch (filmSearch.reqStatus) {
    case ReqStatus.OK: {
      content = (
        <>
          <Pagination 
            baseUrl={url} 
            paramName={'page'} 
            start={1} 
            end={filmSearch.results.totalPages ?? 1} 
            curr={filmSearch.params.page ?? 1}
          />
          <pre>
            { JSON.stringify(filmSearch.results, null, 2) }
          </pre>
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
    navStack: [{url, text: title}],
    description: 'Film lorem ipsum dolor sit',
    keywords: 'film, lorem, ipsum, dolor'
  }

  return (
    <MainLayout pageEnv={pageEnv}>
      <h1 className='page-title'>{title}</h1>
      <FilmSearchFilter />
      {content}
    </MainLayout>
  )
}