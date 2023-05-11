
import {useAppSelector, useAppDispatch} from '@/store';
import {
  setFilmSearchParams, 
  updateFilmSearchParams,
  fetchFilmSearchResults
} from '@/store/filmSearch';
import {range} from '@/units/utils';
import styles from './FilmSearchFilter.module.scss';

export function FilmSearchFilter() {

  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const {params} = useAppSelector(state => state.filmSearch);

  function filmIdChange(ev: React.ChangeEvent<HTMLSelectElement>) {
    ev.preventDefault();
    if (ev.currentTarget.selectedOptions) {
      const ids = Array.from(
        ev.currentTarget.selectedOptions, 
        opt => parseInt(opt.value)
      )
      .filter(id => Number.isInteger(id));
      dispatch(updateFilmSearchParams({ids}));
      dispatch(fetchFilmSearchResults());
    }
  }

  function updateResults(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    dispatch(fetchFilmSearchResults());
  }

  return (
    <div className={styles.filmSearchFilter}>
      <select multiple value={params.ids.map(i => i.toString())} onChange={filmIdChange}> { 
          range(1, 5).map(i => 
            <option key={i} value={i}>{`film ${i}`}</option>
          )
        }
      </select>
      <button onClick={updateResults}>Search</button>
    </div>
  )
}