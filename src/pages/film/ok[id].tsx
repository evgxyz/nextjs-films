
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import { wrapper, useAppSelector, useAppDispatch } from '@/store';
import { PageStatus, ReqStatus, isReqError, reqErrorToHttpCode } from '@/units/status';
import { locstr } from '@/units/locale';
import { fetchFilmAsync } from '@/store/filmPage';
import { isString } from '@/units/utils';
import { MessagePage } from '@/components/general/MessagePage';
import { FilmPage } from '@/components/special/films/FilmPage';
import { useEffect } from 'react';

interface FilmNextPageProps {
  pageStatus?: PageStatus
}

const FilmNextPage: NextPage = function({ pageStatus }: FilmNextPageProps) {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const reqStatus = useAppSelector(state => state.filmPage.filmState.reqStatus);

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

      if (!valid) {
        pageStatus = PageStatus.WRONG_URL;
      }

      if (valid) {
        dispatch(fetchFilmAsync(filmId));
      }
    }
  }, []);

  if (pageStatus === PageStatus.WRONG_URL) {
    return <MessagePage type={'ERROR'} title={locstr('WRONG_URL', lang)} />
  }

  switch (reqStatus) {
    case ReqStatus.OK: {
      return <FilmPage />
    }
    case ReqStatus.LOADING: {
      return <MessagePage type={'INFO'} title={locstr('LOADING', lang)} />
    }
    case ReqStatus.NOT_FOUND: {
      return <MessagePage type={'ERROR'} title={locstr('NOT_FOUND', lang)} />
    }
    case ReqStatus.ERROR: {
      return <MessagePage type={'ERROR'} title={locstr('ERROR', lang)} />
    }
    default:
      return null;
  }
}

FilmNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {

  if (!ctx.req) { 
    return { pageStatus: PageStatus.CLIENT }
  }

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
    return { pageStatus: PageStatus.WRONG_URL };
  }
  
  await store.dispatch(fetchFilmAsync(filmId));

  const reqStatus = store.getState().filmPage.filmState.reqStatus;
  
  if (isReqError(reqStatus)) {
    ctx.res && (ctx.res.statusCode = reqErrorToHttpCode(reqStatus));
    return { pageStatus: PageStatus.ERROR };
  }
  
  return { pageStatus: PageStatus.OK };

});

/* export const getServerSideProps = wrapper.getServerSideProps(store => async(ctx) => {

  console.log('call getServerSideProps:', ctx.req.cookies);

  let valid = false;
  let filmId = 0;
  if (isString(ctx.query.id)) {
    filmId = parseInt(ctx.query.id as string);
    if (isFinite(filmId) && filmId > 0) {
      valid = true;
    }
  }

  if (!valid) {
    ctx.res.statusCode = 404;
    return { props: { pageStatus: PageStatus.WRONG_URL } };
  }

  await store.dispatch(fetchFilmAsync(filmId));

  const reqStatus = store.getState().filmPage.filmState.reqStatus;
  if (isReqError(reqStatus)) {
    ctx.res.statusCode = reqErrorToHttpCode(reqStatus);
  }
  
  return { props: { pageStatus: PageStatus.OK } };

}); */

export default FilmNextPage;