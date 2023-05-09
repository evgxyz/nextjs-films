
import {useAppSelector} from '@/store';
import {MainLayout} from '@/components/layouts/MainLayout';
import styles from './FilmPage.module.scss'

export function FilmPage() {
  const lang = useAppSelector(state => state.settings.lang);
  const filmPage = useAppSelector(state => state.filmPage);
  const { film } = filmPage;

  return (
    <MainLayout title={film.title}>
      <h1>{film.title}</h1>
      <div>{`lang=${lang}`}</div>
      <pre>{JSON.stringify(filmPage, null, 2)}</pre>
    </MainLayout>
  )
}