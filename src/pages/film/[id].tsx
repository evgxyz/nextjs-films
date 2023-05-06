
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import { wrapper, useAppSelector, useAppDispatch } from '@/store';
import { NextPageProps, GipStatus } from '@/units/next';
import { ReqStatus, isReqError, reqErrorToHttpCode } from '@/units/status';
import { strlang } from '@/units/lang';
import { fetchFilm } from '@/store/filmPage';
import { isString } from '@/units/utils';
import { MessagePage } from '@/components/general/MessagePage';
import { FilmPage } from '@/components/special/films/FilmPage';
import { useEffect, useState } from 'react';

interface FilmNextPageProps extends NextPageProps {};

const FilmNextPage: NextPage<FilmNextPageProps> = function({ fromClient, gipStatus }) {

  console.log('FilmNextPageProps:', {fromClient, gipStatus});

  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const reqStatus = useAppSelector(state => state.filmPage.filmState.reqStatus);
  const [initFlag, setInitFlag] = useState(false);

  if (gipStatus === GipStatus.WRONG_URL) {
    return <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
  }

  function updatePage() {
    console.log('updatePage');

    const query = router.query;
    let valid = false;

    let filmId = 0;
    if (isString(query.id)) {
      filmId = parseInt(query.id as string);
      if (isFinite(filmId) && filmId > 0) {
        valid = true;
      }
    }

    if (valid) {
      dispatch(fetchFilm({filmId, lang}));
    }
  };

  useEffect(() => {
    // не вызываем updatePage на сервере при первом рендеринге 
    if (initFlag || fromClient) {
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

  const isClient = !ctx.req;

  const query = ctx.query;
  let valid = false;

  let filmId = 0;
  if (isString(query.id)) {
    filmId = parseInt(query.id as string);
    if (isFinite(filmId) && filmId > 0) {
      valid = true;
    }
  }

  if (!valid) {
    ctx.res && (ctx.res.statusCode = 404);
    return { fromClient: isClient, gipStatus: GipStatus.WRONG_URL };
  }

  if (isClient) { // if on client
    return { fromClient: true, gipStatus: GipStatus.OK }
  }
  
  // on server
  const lang = store.getState().settings.lang;

  await store.dispatch(fetchFilm({filmId, lang}));

  const reqStatus = store.getState().filmPage.filmState.reqStatus;
  
  if (isReqError(reqStatus)) {
    ctx.res && (ctx.res.statusCode = reqErrorToHttpCode(reqStatus));
    return { fromClient: false, gipStatus: GipStatus.ERROR };
  }
  
  return { fromClient: false, gipStatus: GipStatus.OK };
});

export default FilmNextPage;