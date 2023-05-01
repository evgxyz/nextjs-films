
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { wrapper, useAppDispatch, useAppSelector } from '@/store';
import { 
  PageStatus, 
  ReqStatus, 
  isReqStatusError, 
  reqStatusToHttpCode,
  reqStatusToPageStatus 
} from '@/units/status';
import { Film, FilmId } from '@/units/films';
import { setFilmState, fetchFilmAsync } from '@/store/filmPage';
import { isString, isIntStr } from '@/units/utils';
import { MainLayout } from '@/components/layouts/MainLayout';
import { MessagePage } from '@/components/general/MessagePage';
import { FilmPage } from '@/components/special/films/FilmPage';

interface FilmNextPageProps {
  pageStatus?: PageStatus
}

const FilmNextPage: NextPage = function({ pageStatus }: FilmNextPageProps) {

  switch (pageStatus) {
    case PageStatus.NOT_FOUND:
      return <MessagePage type={'ERROR'} title={'Not found'} />
    case PageStatus.ERROR:
      return <MessagePage type={'ERROR'} title={'Error'} />
  }

  if (pageStatus?.valueOf() === PageStatus.NOT_FOUND || )

  const reqStatus = useAppSelector(state => state.filmPage.filmState.reqStatus);

  switch (reqStatus) {
    case ReqStatus.LOADING:
      return <MessagePage type={'INFO'} title={'Loading...'} />
    case ReqStatus.NOT_FOUND:
      return <MessagePage type={'ERROR'} title={'Not found'} />
    case ReqStatus.ERROR:
      return <MessagePage type={'ERROR'} title={'Error'} />
  }

  return <FilmPage />
}

FilmNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {

  let validQuery = false;
  let filmId = NaN;
  if (isString(ctx.query.id)) {
    filmId = parseInt(ctx.query.id as string);
    if (isFinite(filmId) && filmId > 0) {
      validQuery = true;
    }
  }

  if (!validQuery) {
    ctx.res && (ctx.res.statusCode = 404);
    return { pageStatus: PageStatus.NOT_FOUND }
  }
  
  if (ctx.req) { // on server 
    await store.dispatch(fetchFilmAsync(filmId));

    const reqStatus = store.getState().filmPage.filmState.reqStatus;
    if (isReqStatusError(reqStatus)) {
      ctx.res && (ctx.res.statusCode = reqStatusToHttpCode(reqStatus));
      return { pageStatus: reqStatusToPageStatus(reqStatus) };
    }
  } 
  else { // on client
    store.dispatch(fetchFilmAsync(filmId));
  }

  return {}

});

export default FilmNextPage;