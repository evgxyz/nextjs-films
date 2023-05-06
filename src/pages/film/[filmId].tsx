
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {wrapper, useAppSelector, useAppDispatch} from '@/store';
import {NextPageProps, GipStatus} from '@/units/next';
import {ParsedUrlQuery} from 'querystring';
import {FilmId} from '@/units/films';
import {parseIntParam} from '@/units/parseParams';
import {ReqStatus, isReqError, reqErrorToHttpCode} from '@/units/status';
import {strlang} from '@/units/lang';
import {fetchFilm} from '@/store/filmPage';
import {MessagePage} from '@/components/general/MessagePage';
import {FilmPage} from '@/components/special/films/FilmPage';

interface FilmNextPageProps extends NextPageProps {};

const FilmNextPage: NextPage<FilmNextPageProps> = function({fromServer, gipStatus}) {
  console.log('FilmNextPage:', {fromServer, gipStatus});

  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const reqStatus = useAppSelector(state => state.filmPage.filmState.reqStatus);
  const [initFlag, setInitFlag] = useState(false);

  if (gipStatus === GipStatus.WRONG_URL) {
    return <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
  }

  function updatePage() {
    const [valid, {filmId}] = parseFilmPageParams(router.query);
    
    if (valid) {
      dispatch(fetchFilm({filmId, lang}));
    }
  };

  useEffect(() => {
    //при первом рендере на сервере не вызываем updatePage 
    if (initFlag || !fromServer) { 
      updatePage();
    }
    setInitFlag(true);
  }, [lang]);

  switch (reqStatus) {
    case ReqStatus.OK: {
      return <FilmPage />
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
      return null;
  }
}

FilmNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {
  console.log('getInitialProps');

  const isServer = !!ctx.req;

  const [valid, {filmId}] = parseFilmPageParams(ctx.query);

  if (!valid) {
    ctx.res && (ctx.res.statusCode = 404);
    return {fromClient: isServer, gipStatus: GipStatus.WRONG_URL};
  }

  if (isServer) { // on server
    const lang = store.getState().settings.lang;

    await store.dispatch(fetchFilm({filmId, lang}));

    const reqStatus = store.getState().filmPage.filmState.reqStatus;
    
    if (isReqError(reqStatus)) {
      ctx.res && (ctx.res.statusCode = reqErrorToHttpCode(reqStatus));
      return {fromServer: true, gipStatus: GipStatus.ERROR};
    } else {
      return {fromServer: true, gipStatus: GipStatus.OK};
    }
  } 
  else { // on client
    return {fromServer: false, gipStatus: GipStatus.OK}
  }
});

function parseFilmPageParams(query: ParsedUrlQuery): [boolean, {filmId: FilmId}] {
  let valid = true;

  const [error, filmId] = parseIntParam(query, 'filmId') as [boolean, FilmId];
  if (error) valid = false;
  
  return [valid, {filmId}];
}

export default FilmNextPage;