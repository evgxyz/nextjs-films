
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from '@/store';
import {GenreId, CountryId} from '@/units/films';
import {
  updateFilmSearchParams,
  fetchFilmSearchResults
} from '@/store/filmSearch';
import {buildIntArrParam} from '@/units/query';
import _ from 'lodash';
import styles from './FilmSearchFilter.module.scss';

export function FilmSearchFilter() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const lang = useAppSelector(state => state.settings.lang);
  const {options, params} = useAppSelector(state => state.filmSearch);

  //toggleGenre
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

  //toggleCountry
  function toggleCountry(countryId: CountryId) {
    const countryIds = [...params.countryIds ?? []];

    if (!countryIds.includes(countryId)) {
      countryIds.push(countryId);
    } else {
      _.pull(countryIds, countryId);
    }
    countryIds.sort();

    dispatch(updateFilmSearchParams({countryIds}));
    dispatch(fetchFilmSearchResults());

    const query = {...router.query};
    
    if (countryIds.length > 0) {
      query.countryIds = buildIntArrParam(countryIds);
    } else {
      delete query.countryIds;
    }

    router.push({query}, undefined, {shallow: true});
  }

  //updateResults
  function updateResults(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    dispatch(fetchFilmSearchResults());
  }

  return (
    <div className={styles['body']}>

      <div className={styles['genres']}>
        <ul>
          { options.genres.map(genre =>
              <li key={genre.id}>
                <label>
                  <input type='checkbox' 
                    checked={params.genreIds?.includes(genre.id)} 
                    onChange={() => {toggleGenre(genre.id)}}
                  />
                  {genre.name}
                </label>
              </li>
            )
          }
        </ul>
      </div>

      <div className={styles['countries']}>
        <ul>
          { options.countries.map(country =>
              <li key={country.id}>
                <label>
                  <input type='checkbox' 
                    checked={params.countryIds?.includes(country.id)} 
                    onChange={() => {toggleCountry(country.id)}}
                  />
                  {country.name}
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