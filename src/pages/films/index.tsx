
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {wrapper, useAppSelector, useAppDispatch} from '@/store';
import {NextPageProps, PageStatus} from '@/units/next';
import {ParsedUrlQuery} from 'querystring';
import {FilmId, FilmSearchParams} from '@/units/films';
import {parseIntParam} from '@/units/parseParams';
import {ReqStatus, isReqError, reqErrorToHttpCode} from '@/units/status';
import {strlang} from '@/units/lang';
import {setFilmSearchParams, fetchFilmSearchResults} from '@/store/filmSearch';
import {MessagePage} from '@/components/general/MessagePage';
import {FilmSearchPage} from '@/components/special/films/FilmSearchPage';

interface FilmSearchNextPageProps extends NextPageProps {};

const FilmSearchNextPage: NextPage<FilmSearchNextPageProps> = 
  function({fromServer, initPageStatus}) {
  console.log('FilmSearchNextPage:', {fromServer, initPageStatus});

  const [pageStatus, setPageStatus] = useState(initPageStatus);
  const [initFlag, setInitFlag] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const reqStatus = useAppSelector(state => state.filmSearch.reqStatus);

  function updatePage() {
    const [error, params] = parseFilmSearchParams(router.query);
    if (!error) {
      dispatch(setFilmSearchParams(params));
      dispatch(fetchFilmSearchResults());
    } else {
      setPageStatus(PageStatus.WRONG_URL);
    }
  };

  useEffect(() => {
    if (pageStatus === PageStatus.OK) {
      if (initFlag || !fromServer) { 
        updatePage();
      }
      setInitFlag(true);
    }
  }, [lang]);

  if (pageStatus === PageStatus.WRONG_URL) {
    return <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
  }

  switch (reqStatus) {
    case ReqStatus.OK: {
      return (
        <>
        <FilmSearchPage />
        </>
      )
    }
    case ReqStatus.LOADING: {
      return <MessagePage type={'INFO'} title={strlang('LOADING', lang)} />
    }
    case ReqStatus.NOT_FOUND: {
      return <MessagePage type={'ERROR'} title={strlang('NOT_FOUND', lang)} />
    }
    case ReqStatus.ERROR: {
      return <MessagePage type={'ERROR'} title={strlang('ERROR', lang)} />
    }
    default:
      return <>{'null: reqStatus='+reqStatus}</>;
  }
}

FilmSearchNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {
  console.log('getInitialProps');

  if (ctx.req) { // on server
    const [error, params] = parseFilmSearchParams(ctx.query);

    if (error) {
      ctx.res && (ctx.res.statusCode = 404);
      return {fromServer: true, initPageStatus: PageStatus.WRONG_URL};
    }

    store.dispatch(setFilmSearchParams(params));

    await store.dispatch(fetchFilmSearchResults());

    const reqStatus = store.getState().filmSearch.reqStatus;
    if (isReqError(reqStatus)) {
      ctx.res && (ctx.res.statusCode = reqErrorToHttpCode(reqStatus));
      return {fromServer: true, initPageStatus: PageStatus.ERROR};
    } 
    else {
      return {fromServer: true, initPageStatus: PageStatus.OK};
    }
  } 
  else { // on client
    return {fromServer: false, initPageStatus: PageStatus.OK}
  }
});

function parseFilmSearchParams(query: ParsedUrlQuery): [boolean, FilmSearchParams] 
{
  let error = false;
  const params = { 
    filmId: 0,
    title: '',
    genreIds: [],
    countryIds: [],
  }

  const [err, filmId] = parseIntParam(query, 'filmId');
  if (!err) { 
    params.filmId = filmId;
  } else { 
    error = true;
  }
  
  return [error, {filmId}];
}

export default FilmSearchNextPage;
