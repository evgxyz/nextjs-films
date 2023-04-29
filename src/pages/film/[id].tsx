
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import { wrapper, useAppDispatch, useAppSelector } from '@/store';
import { ApiStatus, LoadStatus } from '@/types'
import { Film, FilmId } from '@/types/filmTypes';
import { setFilmState, fetchFilmAsync } from '@/store/filmPage';
import { isString, isIntStr } from '@/utils'
import { MainLayout } from '@/components/layouts/MainLayout';

const FilmPage: NextPage = function () {
  
  const router = useRouter();
  console.log('router:', JSON.stringify(router));

  const filmPage = useAppSelector(state => state.filmPage);

  return (
    <MainLayout title={filmPage.film.film.title}>
      <h1>Film</h1>
      <pre>{JSON.stringify(filmPage.film)}</pre>
    </MainLayout>
  )
}

const defaultFilm: Film = { 
  id: 0, 
  title: ''
}

FilmPage.getInitialProps = wrapper.getInitialPageProps(store => async(ctx) => {

  if (isString(ctx.query.id)) {
    let filmId = parseInt(ctx.query.id as string);
    if (ctx.req) {
      await store.dispatch(fetchFilmAsync(filmId));
    } else {
      store.dispatch(fetchFilmAsync(filmId));
    }
  }

  return {};

});

/* export const getServerSideProps = wrapper.getServerSideProps(store => async(ctx) => {

  if (isString(ctx.query.id)) {
    let filmId = parseInt(ctx.query.id as string);
    const res = await store.dispatch(fetchFilmAsync(filmId));
    return { props: {} }
  } 
  else {
    return { notFound: true }
  }
}); */

export default FilmPage;