
import { NextPage, NextPageContext } from 'next'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store';
import { ApiStatus } from '@/types/apiTypes'
import { Film, FilmId } from '@/types/filmTypes';
import { setFilm, fetchFilmAsync } from '@/store/filmPage';
import { isIntStr } from '@/utils'
import { apiFetchFilm } from '@/api/filmApi'
import { useEffect } from 'react';

interface FilmPageProps {
  apiStatus?: ApiStatus,
  film?: Film | undefined,
}

const FilmPage: NextPage<FilmPageProps> = function (props) {
  
  const router = useRouter();
  console.log('router:', JSON.stringify(router));

  const filmPage = useAppSelector(state => state.filmPage);
  const appDispatch = useAppDispatch();

  console.log('FilmPage props:', JSON.stringify(props));

  useEffect(() => {
    if (props?.film) {
      appDispatch(setFilm(props.film))
    } else {
      appDispatch(fetchFilmAsync(3))
    }
  }, []);

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

FilmPage.getInitialProps = async function (ctx) {
  console.log('call getInitialProps, req url:', ctx.req?.url);
  if (ctx.req) { 
    if (typeof ctx.query.id === 'string') {
      let filmId = parseInt(ctx.query.id);
      return await apiFetchFilm(filmId);
    } else {
      return ({ apiStatus: ApiStatus.NOT_FOUND })
    }
  } 
  else
    return {};
}

export default FilmPage;