
import _ from 'lodash';
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from '@/store';
import {GenreId} from '@/units/films';
import {
  updateFilmSearchParams,
  fetchFilmSearchResults
} from '@/store/filmSearch';
import {buildIntArrParam} from '@/units/query';
import styles from './FilmSearchFilter.module.scss';

export function FilmSearchFilter() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const {options, params} = useAppSelector(state => state.filmSearch);

  function changeFilmIds(ev: React.ChangeEvent<HTMLSelectElement>) {
    ev.preventDefault();
    if (ev.currentTarget.selectedOptions) {
      const ids = Array.from(
        ev.currentTarget.selectedOptions, 
        opt => parseInt(opt.value)
      )
      .filter(id => Number.isInteger(id));
      dispatch(updateFilmSearchParams({ids}));
      dispatch(fetchFilmSearchResults());
      router.replace({
        query: { ...router.query, ids: buildIntArrParam(ids) },
      });
    }
  }

  function toggleGenre(genreId: GenreId) {
    const genreIds = [...params.genreIds ?? []];

    if (!genreIds.includes(genreId)) {
      genreIds.push(genreId);
    } else {
      _.pull(genreIds, genreId);
    }
    genreIds.sort();

    dispatch(updateFilmSearchParams({genreIds}));
    dispatch(fetchFilmSearchResults());

    const query = {...router.query};
    if (genreIds.length > 0) {
      query.genreIds = buildIntArrParam(genreIds);
    } else {
      delete query.genreIds;
    }
    router.push({query}, undefined, {shallow: true});
  }

  function updateResults(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    dispatch(fetchFilmSearchResults());
  }

  return (
    <div className={styles.filmSearchFilter}>

      <div className={styles.filmSearchFilter__ids}>
        <select multiple 
          value={params.ids?.map(i => i.toString())} 
          onChange={changeFilmIds}
        > { 
            _.range(1, 5).map(i => 
              <option key={i} value={i}>{`film ${i}`}</option>
            )
          }
        </select>
      </div>

      <div className={styles.filmSearchFilter__genres}>
        <ul>
          { 
            options.genres.map(genre =>
              <li key={genre.id}>
                <label>
                  <input type='checkbox' 
                    checked={!!params.genreIds?.includes(genre.id)} 
                    onChange={() => {toggleGenre(genre.id)}}
                  />
                  {genre.name}
                </label>
              </li>
            )
          }
        </ul>
      </div>

      <button onClick={updateResults}>Search</button>
    </div>
  )
}