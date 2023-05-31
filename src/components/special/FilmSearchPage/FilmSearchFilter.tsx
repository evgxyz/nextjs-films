
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from '@/store';
import {useState} from 'react';
import {
  GenreId, CountryId, 
  isFilmSearchSort, filmSearchSortDefault, filmSearchSorts, filmSearchSortKeys, 
  filmSearchQueryTempl,
} from '@/units/film';
import {strlang} from '@/units/lang';
import {
  updateFilmSearchParams, 
  fetchFilmSearchTextAutocompl,
  fetchFilmSearchResults 
} from '@/store/filmSearch';
import {buildIntArrParam} from '@/units/url';
import _ from 'lodash';
import css from './FilmSearchFilter.module.scss';
import { AutocomplBox } from '@/components/common/AutocomplBox';

export function FilmSearchFilter() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);
  const {options, params, autocompl} = useAppSelector(state => state.filmSearch);
  const dispatch = useAppDispatch();

  const [genresExp, setGenresExp] = useState(() => false);
  const [countriesExp, setCountriesExp] = useState(() => false);
  const [textAutocomplExp, setTextAutocomplExp] = useState(() => false);

  const changeGenre = function(genreId: GenreId) {
    const genreIds = [...params.genreIds ?? []];
    if (!genreIds.includes(genreId)) {
      genreIds.push(genreId);
    } else {
      _.pull(genreIds, genreId);
    }
    genreIds.sort();
    const page = 1;
    dispatch(updateFilmSearchParams({genreIds, page}));
    dispatch(fetchFilmSearchResults());
    updateRouterQuery({ 
      genreIds: genreIds.length > 0 ? buildIntArrParam(genreIds) : undefined,
      page: page.toString()
    });
  }

  const changeCountry = function(countryId: CountryId) {
    const countryIds = [...params.countryIds ?? []];
    if (!countryIds.includes(countryId)) {
      countryIds.push(countryId);
    } else {
      _.pull(countryIds, countryId);
    }
    countryIds.sort();
    const page = 1;
    dispatch(updateFilmSearchParams({countryIds, page}));
    dispatch(fetchFilmSearchResults());
    updateRouterQuery({ 
      countryIds: countryIds.length > 0 ? buildIntArrParam(countryIds) : undefined,
      page: page.toString()
    });
  }

  const changeText = function(ev: React.ChangeEvent<HTMLInputElement>) {
    setTextAutocomplExp(true);
    const text = ev.currentTarget.value;
    dispatch(updateFilmSearchParams({text}));
    dispatch(fetchFilmSearchTextAutocompl());
    if (text === '') {
      dispatch(fetchFilmSearchResults());
    }
    updateRouterQuery({ 
      text: text.length > 0 ? text : undefined
    });
  }

  const autocomplSetText = function(text: string) {
    console.log('call autocomplSetText');
    dispatch(updateFilmSearchParams({text}));
    dispatch(fetchFilmSearchResults());
    updateRouterQuery({ 
      text: text.length > 0 ? text : undefined
    });
    setTextAutocomplExp(false);
  }

  const onFocusText = function() {
    dispatch(fetchFilmSearchTextAutocompl());
    setTextAutocomplExp(true);
  }

  const onBlurText = function(ev: React.FocusEvent) {
    console.log('ev:', ev)
    if (!ev.relatedTarget?.closest('.' + css['text-autocompl'])) {
      console.log('call onBlurText2');
      setTextAutocomplExp(false);
    }
  }

  const changeSort = function(ev: React.ChangeEvent<HTMLSelectElement>) {
    ev.preventDefault(); 
    const sort = ev.target.value;
    if (!isFilmSearchSort(sort)) {
      return;
    }
    const page = 1;
    dispatch(updateFilmSearchParams({sort, page}));
    dispatch(fetchFilmSearchResults());
    updateRouterQuery({ 
      sort: sort !== filmSearchSortDefault ? sort : undefined,
      page: page.toString()
    });
  }

  const updateResults = function() {
    const page = 1;
    dispatch(updateFilmSearchParams({page}));
    dispatch(fetchFilmSearchResults());
    updateRouterQuery({ 
      page: page.toString()
    });
  }

  const updateRouterQuery = function(updParams: Record<string, string | undefined>) {
    let query = Object.assign(
      structuredClone(filmSearchQueryTempl),
      router.query,
      updParams
    );
    query = Object.fromEntries(
      Object.entries(query)
      .filter(rec => rec[1] !== undefined)
    )
    router.push({query}, undefined, {shallow: true});
  }

  const submitSearch = function(ev: React.FormEvent) {
    ev.preventDefault();
    updateResults();
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
            {strlang('FILM_SEARCH_GENRES', lang)}
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
            {strlang('FILM_SEARCH_COUNTRIES', lang)}
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
        <form className={css['text-form']} onSubmit={submitSearch}>
          <input type='text' 
            value={params.text} 
            onChange={changeText}
            onFocus={onFocusText}
            onBlur={onBlurText}
          />
          <div 
            className={[
              css['text-autocompl'], 
              textAutocomplExp ? css['--exp'] : ''
            ].join(' ')}
            tabIndex={0}
          >
            <AutocomplBox 
              autocompl={autocompl.text.value} 
              setValue={autocomplSetText}
            />
          </div>
          <button type='submit' disabled={!params.text?.length}>
            {strlang('FILM_SEARCH_BUTTON', lang)}
          </button>
        </form>
      </div>

      <div className={css['sort']}>
        { strlang('FILM_SEARCH_SORT', lang) + ': ' }
        <select value={params.sort} onChange={changeSort}>
          { filmSearchSorts.map(sort => 
              <option key={sort} value={sort}>
                { strlang(filmSearchSortKeys[sort], lang)}
              </option>
            )
          }
        </select>
      </div>

    </div>
  )
}