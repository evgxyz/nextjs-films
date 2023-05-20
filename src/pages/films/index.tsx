
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {wrapper, useAppSelector, useAppDispatch} from '@/store';
import {NextPageProps, PageStatus} from '@/units/next';
import {normalizeURL} from '@/units/url';
import {ParsedUrlQuery} from 'querystring';
import {FilmSearchParams, filmSearchParamsDefault} from '@/units/films';
import {parseIntParam, parseIntArrParam} from '@/units/url';
import {isReqError, reqErrorToHttpCode} from '@/units/status';
import {strlang} from '@/units/lang';
import {
  setFilmSearchParams, 
  fetchFilmSearchResults,
  fetchFilmSearchOptions
} from '@/store/filmSearch';
import {MessagePage} from '@/components/general/MessagePage';
import {FilmSearchPage} from '@/components/special/films/FilmSearchPage';

interface FilmSearchNextPageProps extends NextPageProps {};

const FilmSearchNextPage: NextPage<FilmSearchNextPageProps> = 
function({fromServer, initPageStatus}) {
  console.log('FilmSearchNextPage:', {fromServer, initPageStatus});

  const [pageStatus, setPageStatus] = useState(initPageStatus);
  //const [firstFlag, setFirstFlag] = useState(true); //first render?

  const router = useRouter();
  const [prsError, prsParams] = parseFilmSearchParams(router.query);
  const page = prsParams?.page;

  const lang = useAppSelector(state => state.settings.lang);
  const dispatch = useAppDispatch();

  async function updateState() {
    if (!prsError) {
      await dispatch(fetchFilmSearchOptions());
      dispatch(setFilmSearchParams(prsParams));
      await dispatch(fetchFilmSearchResults());
    } 
    else {
      setPageStatus(PageStatus.WRONG_URL);
    }
  };

  useEffect(() => {
    if (pageStatus === PageStatus.OK) {
      updateState();
    }
  }, [lang, page]);

  if (pageStatus === PageStatus.WRONG_URL) {
    return <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
  }

  return <FilmSearchPage />
}

FilmSearchNextPage.getInitialProps = 
wrapper.getInitialPageProps(store => async(ctx) => {
  console.log('getInitialProps');

  if (ctx.req) { //on server
    const [error, params] = parseFilmSearchParams(ctx.query);

    if (error) {
      ctx.res && (ctx.res.statusCode = 404);
      return {fromServer: true, initPageStatus: PageStatus.WRONG_URL};
    }

    await store.dispatch(fetchFilmSearchOptions());

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
  else { //on client
    return {fromServer: false, initPageStatus: PageStatus.OK}
  }
});

function parseFilmSearchParams(query: ParsedUrlQuery): [boolean, FilmSearchParams] {
  let error = false;
  const params = structuredClone(filmSearchParamsDefault);

  { const [err, genreIds] = parseIntArrParam(query, 'genreIds');
    if (!err) { 
      params.genreIds = genreIds;
    }
  }

  { const [err, countryIds] = parseIntArrParam(query, 'countryIds');
    if (!err) { 
      params.countryIds = countryIds;
    }
  }

  { const [err, page] = parseIntParam(query, 'page');
    if (!err) { 
      params.page = page;
    }
  }

  return [error, params];
}

export default FilmSearchNextPage;
