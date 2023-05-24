
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from '@/store';
import {GenreId, CountryId} from '@/units/film';
import {updateFilmSearchParams, fetchFilmSearchResults} from '@/store/filmSearch';
import {buildIntArrParam} from '@/units/url';
import _ from 'lodash';
import css from './FilmSearchFilter.module.scss';

export function FilmSearchFilter() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);
  const {options, params} = useAppSelector(state => state.filmSearch);
  const dispatch = useAppDispatch();

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

  const changeText = function(ev: React.ChangeEvent<HTMLInputElement>) {
    const text = ev.currentTarget.value;
    dispatch(updateFilmSearchParams({text}));

    const query = {...router.query};
    if (text.length > 0) {
      query.text = text;
    } else {
      delete query.text;
    }
    router.push({query}, undefined, {shallow: true});
  }

  const updateResults = function(ev: React.SyntheticEvent) {
    ev.preventDefault();
    dispatch(fetchFilmSearchResults());
  }

  return (
    <div className={css['body']}>

      <div className={css['text']}>
        <form className={css['text-form']} onSubmit={updateResults}>
          <input type='text' value={params.text} onChange={changeText} />
          <button type='submit' disabled={!params.text?.length}>Search</button>
        </form>
      </div>

      <div className={css['genres']}>
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

      <div className={css['countries']}>
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

    </div>
  )
}