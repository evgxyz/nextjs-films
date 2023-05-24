
import {useAppSelector} from '@/store';
import {FilmSearchItem} from './FilmSearchItem';
import css from './FilmSearchResults.module.scss';

export function FilmSearchResults() {

  const lang = useAppSelector(state => state.settings.lang);
  const results = useAppSelector(state => state.filmSearch.results);

  return (
    <div className={css['body']}>
      { results.films.map(film => 
          <FilmSearchItem film={film} />
        )
      }
    </div>
  )
}