
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {ReqStatus} from '@/units/status';
import {strlang} from '@/units/lang';
import {normalizeURL} from '@/units/url';
import {MainLayout} from '@/components/layouts/MainLayout';
import {MessageBox} from '@/components/common/MessageBox';
import {LoadingBox} from '@/components/common/LoadingBox';
import {Pagination} from '@/components/common/Pagination';
import {FilmSearchFilter} from './FilmSearchFilter'; 
import {FilmSearchResults} from './FilmSearchResults';
import _ from 'lodash';
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
      const totalPages = filmSearch.results.totalPages ?? 1;
      let page = filmSearch.params.page ?? 1;
      page = _.clamp(page, 1, totalPages);
      
      content = (
        <>
          <Pagination 
            baseUrl={url} 
            paramName={'page'} 
            start={1} 
            end={totalPages} 
            curr={page}
          />
          <FilmSearchResults />
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