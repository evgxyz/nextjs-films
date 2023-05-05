
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import { wrapper, useAppSelector, useAppDispatch } from '@/store';
import { PageStatus, ReqStatus, isReqError, reqErrorToHttpCode } from '@/units/status';
import { strlang } from '@/units/lang';
import { fetchFilmAsync } from '@/store/filmPage';
import { isString } from '@/units/utils';
import { MessagePage } from '@/components/general/MessagePage';
import { FilmPage } from '@/components/special/films/FilmPage';
import { useEffect } from 'react';

interface FilmsNextPageProps {
  pageStatus?: PageStatus
}

const FilmsNextPage: NextPage = function({ pageStatus }: FilmsNextPageProps) {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const reqStatus = useAppSelector(state => state.filmPage.filmState.reqStatus);

  if (pageStatus === PageStatus.WRONG_URL) {
    return <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
  }

  useEffect(() => {
    if (pageStatus === PageStatus.CLIENT) {
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
        dispatch(fetchFilmAsync(filmId));
      }
    }
  }, []);

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

FilmsNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {

  const query = ctx.query;
  console.log('query:', query)
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
    return { pageStatus: PageStatus.WRONG_URL };
  }

  if (!ctx.req) { 
    return { pageStatus: PageStatus.CLIENT }
  }
  
  // on server
  await store.dispatch(fetchFilmAsync(filmId));

  const reqStatus = store.getState().filmPage.filmState.reqStatus;
  
  if (isReqError(reqStatus)) {
    ctx.res && (ctx.res.statusCode = reqErrorToHttpCode(reqStatus));
    return { pageStatus: PageStatus.ERROR };
  }
  
  return { pageStatus: PageStatus.OK };

});

export default FilmsNextPage;