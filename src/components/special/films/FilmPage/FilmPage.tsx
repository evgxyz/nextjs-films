
import { useAppDispatch, useAppSelector } from '@/store';
import { MainLayout } from '@/components/layouts/MainLayout'
import styles from './FilmPage.module.scss'

export function FilmPage() {

  const { filmState } = useAppSelector(state => state.filmPage);
  const { film } = filmState;

  return (
    <MainLayout title={film.title}>
      <h1>{film.title}</h1>
      <pre>{JSON.stringify(filmState)}</pre>
    </MainLayout>
  )
}