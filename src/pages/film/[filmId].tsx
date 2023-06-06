
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {wrapper, useAppSelector, useAppDispatch} from '@/store';
import {NextPageProps, PageStatus} from '@/units/next';
import {ParsedUrlQuery} from 'querystring';
import {FilmId} from '@/units/film';
import {parseIntParam} from '@/units/url';
import {isReqStatusError, reqStatusToHttpCode} from '@/units/status';
import {strlang} from '@/units/lang';
import {fetchFilmPage} from '@/store/filmPage';
import {MessagePage} from '@/components/general/MessagePage';
import {FilmPage} from '@/components/special/FilmPage';

interface FilmNextPageProps extends NextPageProps {};

const FilmNextPage: NextPage<FilmNextPageProps> = function({fromServer, initPageStatus}) {
  console.log('FilmNextPage:', {fromServer, initPageStatus});

  const [pageStatus, setPageStatus] = useState(initPageStatus);
  const [firstFlag, setFirstFlag] = useState(true); //first render?

  const router = useRouter();
  
  const lang = useAppSelector(state => state.settings.lang);
  const dispatch = useAppDispatch();

  const [prsError, {filmId}] = parseFilmPageParams(router.query);

  const updateState = async function() {
    await dispatch(fetchFilmPage({filmId}));
  }

  useEffect(() => {
    if (pageStatus === PageStatus.OK) {  
      if (!(fromServer && firstFlag)) {
        if (!prsError) {
          updateState();
        } else {
          setPageStatus(PageStatus.WRONG_URL);
        }
      }

      firstFlag && setFirstFlag(false);
    }
  }, [lang]);

  if (pageStatus === PageStatus.WRONG_URL) {
    return (
      <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
    )
  }
  
  return (
    <FilmPage />
  )
}

FilmNextPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {
  console.log('getInitialProps');

  if (ctx.req) { //on server
    const [error, {filmId}] = parseFilmPageParams(ctx.query);
    if (error) {
      ctx.res && (ctx.res.statusCode = 404);
      return {fromServer: true, initPageStatus: PageStatus.WRONG_URL};
    }

    await store.dispatch(fetchFilmPage({filmId}));

    const reqStatus = store.getState().filmPage.film.reqStatus;
    if (isReqStatusError(reqStatus)) {
      ctx.res && (ctx.res.statusCode = reqStatusToHttpCode(reqStatus));
      return {fromServer: true, initPageStatus: PageStatus.ERROR};
    } 
    else {
      return {fromServer: true, initPageStatus: PageStatus.OK};
    }
  } 
  else { //on client
    return {fromServer: false, initPageStatus: PageStatus.OK}
  }
});

function parseFilmPageParams(query: ParsedUrlQuery): [boolean, {filmId: FilmId}] {
  let error = false;

  const [err, filmId] = parseIntParam(query, 'filmId');
  if (err) {
    error = true;
  }

  return [error, {filmId}];
}

export default FilmNextPage;
