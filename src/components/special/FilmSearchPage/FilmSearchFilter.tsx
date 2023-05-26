
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

  const [genresActive, setGenresActive] = useState(() => false);
  const [countriesActive, setCountriesActive] = useState(() => false);

  //changeGenre
  function changeGenre(genreId: GenreId) {
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

  //changeCountry
  function changeCountry(countryId: CountryId) {
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

    if (text === '') {
      dispatch(fetchFilmSearchResults());
    }

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

  const toggleGenres = function() {
    console.log('toggleGenres')
    setGenresActive(active => !active);
  }

  const openGenres = function() {
    console.log('openGenres')
    setGenresActive(true);
  }

  const closeGenres = function() {
    console.log('closeGenres')
    setGenresActive(false);
  }

  const toggleCountries = function() {
    setCountriesActive(active => !active);
  }

  const closeCountries = function() {
    setCountriesActive(false);
  }

  return (
    <div className={css['body']}>

      <div className={css['genres']}>
        <div 
          className={[css['dropdown'], genresActive ? css['--active'] : ''].join(' ')}
        >
          <div className={css['dropdown-btn']} 
            onClick={ev => {
              ev.preventDefault(); 
              const listElem = 
                ev.currentTarget
                .parentElement
                ?.querySelector<HTMLElement>('ul');  
                if (listElem) {
                  if (genresActive) {
                    listElem.blur();
                  } else {
                    listElem.focus(); 
                  }
                }  
            }}>
            {'Genres'}
          </div>
          <ul 
            className={[
              css['dropdown-list'], 
              genresActive ? css['--active'] : ''
            ].join(' ')}
            tabIndex={0}
          >
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
          className={[
            css['dropdown'], 
            genresActive ? css['--active'] : ''
          ].join(' ')}
          tabIndex={0}
          onBlur={closeCountries}
        >
          <div className={css['dropdown-btn']} onClick={toggleCountries}>
            {'Countries'}
          </div>
          <ul className={[
              css['dropdown-list'],
              countriesActive ? css['--active'] : ''
            ].join(' ')}
          >
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