
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
import {InputAutocompl} from '@/components/common/InputAutocompl';
import {CheckboxList} from '@/components/common/CheckboxList';
import _ from 'lodash';
import css from './FilmSearchFilter.module.scss';

export function FilmSearchFilter() {

  const router = useRouter();
  const lang = useAppSelector(state => state.settings.lang);
  const {options, params, autocompl} = useAppSelector(state => state.filmSearch);
  const dispatch = useAppDispatch();

  const [countriesExp, setCountriesExp] = useState(() => false);

  const genreOnChange = function(genreId: GenreId) {
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

  const textOnFocus = function() {
    dispatch(fetchFilmSearchTextAutocompl());
  }

  const textOnChange = function(text: string) {
    dispatch(updateFilmSearchParams({text}));
    dispatch(fetchFilmSearchTextAutocompl());
    /* if (text === '') {
      dispatch(fetchFilmSearchResults());
    } */
    updateRouterQuery({ 
      text: text.length > 0 ? text : undefined
    });
  }

  const textOnSelect = function(text: string) {
    dispatch(updateFilmSearchParams({text}));
    dispatch(fetchFilmSearchResults());
    updateRouterQuery({ 
      text: text.length > 0 ? text : undefined
    });
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
        <CheckboxList 
          title={strlang('FILM_SEARCH_GENRES', lang)}
          options={options.genres}
          checkedIds={params.genreIds}
          callbackOnChange={genreOnChange}
        />

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
          <InputAutocompl 
            value={params.text}
            autocompl={autocompl.text.value}
            callbackOnFocus={textOnFocus}
            callbackOnChange={textOnChange}
            callbackOnSelect={textOnSelect}
          />
          <button type='submit'>
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