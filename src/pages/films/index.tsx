
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {wrapper, useAppSelector, useAppDispatch} from '@/store';
import {NextPageProps, PageStatus} from '@/units/next';
import {ParsedUrlQuery} from 'querystring';
import {FilmId, FilmSearchParams, filmSearchParamsDefault} from '@/units/films';
import {parseIntArrParam} from '@/units/query';
import {ReqStatus, isReqError, reqErrorToHttpCode} from '@/units/status';
import {strlang} from '@/units/lang';
import {range} from '@/units/utils';
import {
  setFilmSearchParams, 
  updateFilmSearchParams,
  fetchFilmSearchResults
} from '@/store/filmSearch';
import {MessagePage} from '@/components/general/MessagePage';
import {FilmSearchPage} from '@/components/special/films/FilmSearchPage';

interface FilmSearchNextPageProps extends NextPageProps {};

const FilmSearchNextPage: NextPage<FilmSearchNextPageProps> = 
  function({fromServer, initPageStatus}) {
  console.log('FilmSearchNextPage:', {fromServer, initPageStatus});

  const [pageStatus, setPageStatus] = useState(initPageStatus);
  const [firstFlag, setFirstFlag] = useState(true); // first render?

  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const {params, reqStatus} = useAppSelector(state => state.filmSearch);

  function initState() {
    const [error, params] = parseFilmSearchParams(router.query);
    if (!error) {
      dispatch(setFilmSearchParams(params));
      dispatch(fetchFilmSearchResults());
    } 
    else {
      setPageStatus(PageStatus.WRONG_URL);
    }
  };

  function updateState() {
    dispatch(fetchFilmSearchResults());
  };

  useEffect(() => {
    if (pageStatus === PageStatus.OK) {
      if (firstFlag) {
        if (!fromServer) { 
          initState();
        }
        setFirstFlag(false);
      }
      else {
        updateState();
      }
    }
  }, [lang]);

  function filmIdChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    ev.preventDefault();
    if (ev.currentTarget.selectedOptions) {
      const ids = Array.from(
        ev.currentTarget.selectedOptions, 
        opt => parseInt(opt.value)
      )
      .filter(id => Number.isInteger(id));
      dispatch(updateFilmSearchParams({ids}));
      dispatch(fetchFilmSearchResults());
    }
  }

  function updateResults(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    dispatch(fetchFilmSearchResults());
  }

  if (pageStatus === PageStatus.WRONG_URL) {
    return <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
  }

  switch (reqStatus) {
    case ReqStatus.OK: {
      return (
        <>
        <select multiple value={params.ids.map(i => i.toString())} onChange={filmIdChange}> { 
            range(1, 5).map(i => 
              <option key={i} value={i}>{`film ${i}`}</option>
            )
          }
        </select>
        <button onClick={updateResults}>Search</button>
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
      return null;
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

function parseFilmSearchParams(query: ParsedUrlQuery): [boolean, FilmSearchParams] {
  let error = false;
  const params = structuredClone(filmSearchParamsDefault);

  const [err, ids] = parseIntArrParam(query, 'ids');
  if (!err) { 
    params.ids = ids;
  }

  return [error, params];
}

export default FilmSearchNextPage;
