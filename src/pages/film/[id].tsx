
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { wrapper, useAppDispatch, useAppSelector } from '@/store';
import { ApiStatus, LoadStatus } from '@/types/resultTypes'
import { Film, FilmId } from '@/types/filmTypes';
import { setFilmState, fetchFilmAsync } from '@/store/filmPage';
import { isString, isIntStr } from '@/utils'
import { apiFetchFilm } from '@/api/filmApi'
import { useEffect } from 'react';

const FilmPage: NextPage = function () {
  
  const router = useRouter();
  console.log('router:', JSON.stringify(router));

  const filmPage = useAppSelector(state => state.filmPage);

  return (
    <>
      <h1>Film</h1>
      <pre>{JSON.stringify(filmPage.film)}</pre>
    </>
  )
}

const defaultFilm: Film = { 
  id: 0, 
  title: ''
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {

  if (isString(ctx.query.id)) {
    let filmId = parseInt(ctx.query.id as string);
    store.dispatch(fetchFilmAsync(filmId));
  }

  return { props: {} }
});

/* FilmPage.getInitialProps = async function (ctx) {
  console.log('call getInitialProps, req url:', ctx.req?.url);
  const appDispatch = useAppDispatch();
  
  if (ctx.req) { 
    if (isString(ctx.query.id)) {
      let filmId = parseInt(ctx.query.id as string);
      return await apiFetchFilm(filmId);
    } else {
      return ({ apiStatus: ApiStatus.NOT_FOUND })
    }
  } 
  else
    return {};
} */

export default FilmPage;