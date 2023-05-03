
import { useAppSelector } from '@/store';
import { MainLayout } from '@/components/layouts/MainLayout'
import styles from './FilmPage.module.scss'

export function FilmPage() {
  const lang = useAppSelector(state => state.settings.lang);
  const filmState = useAppSelector(state => state.filmPage.filmState);
  const { film } = filmState;

  return (
    <MainLayout title={film.title}>
      <h1>{film.title}</h1>
      <div>{`lang=${lang}`}</div>
      <pre>{JSON.stringify(filmState)}</pre>
    </MainLayout>
  )
}