
import { useAppDispatch, useAppSelector } from '@/store';
import { MainLayout } from '@/components/layouts/MainLayout'
import styles from './FilmPage.module.scss'

export function FilmPage() {

  const { filmState } = useAppSelector(state => state.filmPage);

  return (
    <MainLayout title={filmState.film.title}>
      <h1>{filmState.film.title}</h1>
      <pre>{JSON.stringify(filmState)}</pre>
    </MainLayout>
  )
}