
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchFilmAsync } from '@/store/filmPage';
import { useEffect } from 'react';

export default function FilmPage() {
  
  const router = useRouter();
  console.log('router:', JSON.stringify(router));

  const filmPage = useAppSelector(state => state.filmPage);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(fetchFilmAsync(3))
  }, []);

  return (
    <>
      <h1>Film</h1>
      <pre>{JSON.stringify(filmPage)}</pre>
    </>
  )
}