
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from '@/store';
import {useState} from 'react';
import {GenreId, CountryId} from '@/units/film';
import {strlang} from '@/units/lang';
import {updateFilmSearchParams, fetchFilmSearchResults} from '@/store/filmSearch';
import {buildIntArrParam} from '@/units/url';
import _ from 'lodash';
import css from './FilmSearchFilter.module.scss';

export function FilmSearchFilter() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);
  const {options, params} = useAppSelector(state => state.filmSearch);
  const dispatch = useAppDispatch();

  const [genresExp, setGenresExp] = useState(() => false);
  const [countriesExp, setCountriesExp] = useState(() => false);

  //changeGenre
  const changeGenre = function(genreId: GenreId) {
    const genreIds = [...params.genreIds ?? []];

    if (!genreIds.includes(genreId)) {
      genreIds.push(genreId);
    } else {
      _.pull(genreIds, genreId);
    }
    genreIds.sort();

    dispatch(updateFilmSearchParams({genreIds, page: 1}));
    dispatch(fetchFilmSearchResults());
    updateRouterParams();
  }

  //changeCountry
  const changeCountry = function(countryId: CountryId) {
    const countryIds = [...params.countryIds ?? []];

    if (!countryIds.includes(countryId)) {
      countryIds.push(countryId);
    } else {
      _.pull(countryIds, countryId);
    }
    countryIds.sort();

    dispatch(updateFilmSearchParams({countryIds, page: 1}));
    dispatch(fetchFilmSearchResults());
    updateRouterParams();
  }

  const changeText = function(ev: React.ChangeEvent<HTMLInputElement>) {
    const text = ev.currentTarget.value; 
    dispatch(updateFilmSearchParams({text, page: 1}));
    if (text === '') {
      dispatch(fetchFilmSearchResults());
    }
    updateRouterParams();
  }

  const updateRouterParams = function() {
    const query = {...router.query};

    const genreIds = [...params.genreIds ?? []];
    if (genreIds.length > 0) {
      query.genreIds = buildIntArrParam(genreIds);
    } else {
      delete query.genreIds;
    }

    const countryIds = [...params.countryIds ?? []];
    if (countryIds.length > 0) {
      query.countryIds = buildIntArrParam(countryIds);
    } else {
      delete query.countryIds;
    }

    const text = params.text ?? '';
    if (text.length > 0) {
      query.text = text;
    } else {
      delete query.text;
    }

    query.page = (params.page ?? 1).toString();

    router.push({query}, undefined, {shallow: true}); 
  }

  const updateResults = function(ev: React.FormEvent) {
    ev.preventDefault();
    dispatch(fetchFilmSearchResults());
  }

  const toggleGenres = function() {
    setGenresExp(exp => !exp);
  }

  const onBlurGenres = function(ev: React.FocusEvent) {
    if (ev.relatedTarget?.closest('.' + css['dropdown']) !== ev.currentTarget) {
      setGenresExp(false);
    }
  }

  const toggleCountries = function() {
    setCountriesExp(exp => !exp);
  }

  const onBlurCountries = function(ev: React.FocusEvent) {
    if (ev.relatedTarget?.closest('.' + css['dropdown']) !== ev.currentTarget) {
      setCountriesExp(false);
    }
  }

  return (
    <div className={css['body']}>

      <div className={css['genres']}>
        <div 
          className={[css['dropdown'], genresExp ? css['--exp'] : ''].join(' ')}
          tabIndex={0}
          onBlur={onBlurGenres}
        >
          <div className={css['dropdown-btn']} onClick={toggleGenres}>
            {strlang('FILM_FILTER_GENRES', lang)}
            <span className={css['dropdown-btn__icon']}></span>
          </div>
          <ul className={css['dropdown-list']}>
            { options.genres.map(genre =>
                <li key={genre.id}>
                  <label>
                    <input type='checkbox' 
                      checked={params.genreIds?.includes(genre.id)} 
                      onChange={() => {changeGenre(genre.id)}}
                    />
                    {genre.name}
                  </label>
                </li>
              )
            }
          </ul>
        </div>
      </div>

      <div className={css['countries']}>
        <div 
          className={[css['dropdown'], countriesExp ? css['--exp'] : ''].join(' ')}
          tabIndex={0}
          onBlur={onBlurCountries}
        >
          <div className={css['dropdown-btn']} onClick={toggleCountries}>
            {strlang('FILM_FILTER_COUNTRIES', lang)}
            <span className={css['dropdown-btn__icon']}></span>
          </div>
          <ul className={css['dropdown-list']}>
            { options.countries.map(country =>
                <li key={country.id}>
                  <label>
                    <input type='checkbox' 
                      checked={params.countryIds?.includes(country.id)} 
                      onChange={() => {changeCountry(country.id)}}
                    />
                    {country.name}
                  </label>
                </li>
              )
            }
          </ul>
        </div>
      </div>

      <div className={css['text']}>
        <form className={css['text-form']} onSubmit={updateResults}>
          <input type='text' value={params.text} onChange={changeText} />
          <button type='submit' disabled={!params.text?.length}>
            {strlang('FIND', lang)}
          </button>
        </form>
      </div>

    </div>
  )
}