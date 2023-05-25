
import {useRouter} from 'next/router';
import {useAppSelector} from '@/store';
import {ReqStatus, isReqStatusOK} from '@/units/status';
import {strlang} from '@/units/lang';
import {normalizeURL} from '@/units/url';
import {MainLayout} from '@/components/layouts/MainLayout';
import {MessageBox} from '@/components/common/MessageBox';
import {LoadingBox} from '@/components/common/LoadingBox';
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

  let filterHTML = (
    isReqStatusOK(filmSearch.reqStatus.opt) ? 
      <FilmSearchFilter /> 
    : <></>
  );

  let contentHTML = <></>;
  switch (filmSearch.reqStatus.res) {
    case ReqStatus.LOADING: {
      contentHTML = (
        <LoadingBox />
      )
    } break;

    case ReqStatus.OK: {
      contentHTML = (
        <FilmSearchResults url={url} />
      )
    } break;
   
    case ReqStatus.NOT_FOUND: {
      contentHTML = (
        <MessageBox type={'ERROR'} title={strlang('NOT_FOUND', lang)} />
      )
    } break;

    case ReqStatus.ERROR: {
      contentHTML = (
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
      {filterHTML}
      {contentHTML}
    </MainLayout>
  )
}