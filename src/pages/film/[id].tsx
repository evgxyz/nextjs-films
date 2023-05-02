
import { NextPage } from 'next'
import { wrapper, useAppSelector } from '@/store';
import { 
  PageStatus, 
  ReqStatus, 
  isReqError, 
  reqErrorToHttpCode,
} from '@/units/status';
import { locstr } from '@/units/locale'
import { fetchFilmAsync } from '@/store/filmPage';
import { isString } from '@/units/utils';
import { MessagePage } from '@/components/general/MessagePage';
import { FilmPage } from '@/components/special/films/FilmPage';

interface FilmNextPageProps {
  pageStatus?: PageStatus
}

const FilmNextPage: NextPage = function({ pageStatus }: FilmNextPageProps) {

  if (pageStatus && pageStatus === PageStatus.WRONG_URL) {
    return <MessagePage type={'ERROR'} title={locstr('WRONG_URL')} />
  }

  const reqStatus = useAppSelector(state => state.filmPage.filmState.reqStatus);

  switch (reqStatus) {
    case ReqStatus.OK: {
      return <FilmPage />
    }
    case ReqStatus.LOADING: {
      return <MessagePage type={'INFO'} title={locstr('LOADING')} />
    }
    case ReqStatus.NOT_FOUND: {
      return <MessagePage type={'ERROR'} title={locstr('NOT_FOUND')} />
    }
    case ReqStatus.ERROR: {
      return <MessagePage type={'ERROR'} title={locstr('ERROR')} />
    }
    default:
      return null;
  }
}

FilmNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {

  let valid = false;
  let filmId = 0;
  if (isString(ctx.query.id)) {
    filmId = parseInt(ctx.query.id as string);
    if (isFinite(filmId) && filmId > 0) {
      valid = true;
    }
  }

  if (!valid) {
    ctx.res && (ctx.res.statusCode = 404);
    return { pageStatus: PageStatus.WRONG_URL };
  }
  
  if (ctx.req) { // on server 
    await store.dispatch(fetchFilmAsync(filmId));
    const reqStatus = store.getState().filmPage.filmState.reqStatus;
    if (isReqError(reqStatus)) {
      ctx.res && (ctx.res.statusCode = reqErrorToHttpCode(reqStatus));
    }
  } 
  else { // on client
    store.dispatch(fetchFilmAsync(filmId));
  }

  return {};

});

export default FilmNextPage;