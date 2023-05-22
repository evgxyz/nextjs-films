
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {wrapper, useAppSelector, useAppDispatch} from '@/store';
import {NextPageProps, PageStatus} from '@/units/next';
import {ParsedUrlQuery} from 'querystring';
import {FilmSearchParams, filmSearchParamsDefault} from '@/units/film';
import {parseIntParam, parseIntArrParam, parseStrParam} from '@/units/url';
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
  const [firstFlag, setFirstFlag] = useState(true); //first render?

  const router = useRouter();

  const lang = useAppSelector(state => state.settings.lang);
  const dispatch = useAppDispatch();
  
  const [pageLang, setPageLang] = useState(() => lang);

  const [prsError, prsParams] = parseFilmSearchParams(router.query);
  const page = prsParams?.page;

  const updateState = async function() {
    const updateLang = lang !== pageLang;

    if (updateLang) {
      setPageLang(lang);
    }

    if (firstFlag || updateLang) {
      await dispatch(fetchFilmSearchOptions());
    }

    dispatch(setFilmSearchParams(prsParams));
    await dispatch(fetchFilmSearchResults());
  };

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
  }, [lang, page]);

  if (pageStatus === PageStatus.WRONG_URL) {
    return (
      <MessagePage type={'ERROR'} title={strlang('WRONG_URL', lang)} />
    )
  }

  return (
    <FilmSearchPage />
  )
}

FilmSearchNextPage.getInitialProps = 
wrapper.getInitialPageProps(store => async(ctx) => {
  console.log('getInitialProps');

  if (ctx.req) { //on server
    const [prsError, prsParams] = parseFilmSearchParams(ctx.query);

    if (prsError) {
      ctx.res && (ctx.res.statusCode = 404);
      return {fromServer: true, initPageStatus: PageStatus.WRONG_URL};
    }

    await store.dispatch(fetchFilmSearchOptions());
    store.dispatch(setFilmSearchParams(prsParams));
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
  
  const params = structuredClone(filmSearchParamsDefault);

  { const [err, text] = parseStrParam(query, 'text');
    if (!err) { 
      params.text = text;
    }
  }
  
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

  return [false, params];
}

export default FilmSearchNextPage;
