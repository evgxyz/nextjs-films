
import {useAppSelector} from '@/store';
import {MainLayout} from '@/components/layouts/MainLayout';
import styles from './FilmSearchPage.module.scss'

export function FilmSearchPage() {
  const lang = useAppSelector(state => state.settings.lang);
  const filmSearch = useAppSelector(state => state.filmSearch);

  return (
    <MainLayout title={'Film Search'}>
      <h1>{'Film Search'}</h1>
      <div>{`lang=${lang}`}</div>
      <pre>{JSON.stringify(filmSearch, null, 2)}</pre>
    </MainLayout>
  )
}