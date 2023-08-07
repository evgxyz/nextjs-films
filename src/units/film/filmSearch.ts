
import {ReqStatus} from '@/units/status';
import {
  Film,
  Genre, GenreId, 
  Country, CountryId
} from '@/units/film';
import {Autocompl} from '@/units/components';
import _ from 'lodash';

// filmSearch

export interface FilmSearchOptions {
  genres: Genre[],
  countries: Country[],
}

export const filmSearchOptionsDefault = {
  genres: [],
  countries: [],
}

export const filmSearchSorts = <const>[
  'title', 
  'title_DESC',
  'year', 
  'year_DESC', 
];

export type FilmSearchSort = typeof filmSearchSorts[number];

export function isFilmSearchSort(value: any) {
  return _.isString(value) && filmSearchSorts.includes(value as FilmSearchSort);
}

export const filmSearchSortKeys = <const>{
  title: 'FILM_SEARCH_SORT_TITLE', 
  title_DESC: 'FILM_SEARCH_SORT_TITLE_DESC',
  year: 'FILM_SEARCH_SORT_YEAR', 
  year_DESC: 'FILM_SEARCH_SORT_YEAR_DESC', 
};

export interface FilmSearchParams {
  genreIds?: GenreId[],
  countryIds?: CountryId[],
  yearFrom?: number,
  yearTo?: number,
  text?: string,
  sort?: string,
  page?: number,
  perPage?: number,
}

export const filmSearchSortDefault = 'title';
export const filmSearchPageDefault = 1;
export const filmSearchPerPageDefault = 6;

export const filmSearchParamsDefault: FilmSearchParams = { 
  genreIds: [],
  countryIds: [],
  yearFrom: undefined,
  yearTo: undefined,
  text: '',
  sort: filmSearchSortDefault,
  page: filmSearchPageDefault,
  perPage: filmSearchPerPageDefault,
}

export const filmSearchQueryTempl: Record<string, string | undefined> = {
  genreIds: undefined,
  countryIds: undefined,
  yearFrom: undefined,
  yearTo: undefined,
  text: undefined,
  sort: undefined,
  page: undefined,
}

export interface FilmSearchResults {
  films: Film[],
  totalPages: number,
}

export const filmSearchResultsDefault = {
  films: [],
  totalPages: 0,
}

// filmSearch store

export interface FilmSearchState {
  options: FilmSearchOptions & {reqStatus: ReqStatus},
  autocompl: {
    text: {value: Autocompl, reqStatus: ReqStatus}
  },
  params: FilmSearchParams,
  results: FilmSearchResults & {reqStatus: ReqStatus},
}

export const filmSearchStateDefault: FilmSearchState = {
  options: {...filmSearchOptionsDefault, reqStatus: ReqStatus.NONE},
  autocompl: {
    text: {value: [], reqStatus: ReqStatus.NONE},
  },
  params: filmSearchParamsDefault,
  results: {...filmSearchResultsDefault, reqStatus: ReqStatus.NONE},
}

export function getFilmSearchParamsStr(filmSearchState: FilmSearchState) {
  const {options, params} = filmSearchState;

  let str = '';

  { const s = options.genres
      .filter(genre => params.genreIds?.includes(genre.id))
      .map(genre => genre.name).join(', ');
    if (s !== '') {
      if (str !== '') str += ' & ';
      str += s;
    }
  }

  { const s = options.countries
      .filter(country => params.countryIds?.includes(country.id))
      .map(country => country.name).join(', ');
    if (s !== '') {
      if (str !== '') str += ' & ';
      str += s;
    }
  }

  return str;
}