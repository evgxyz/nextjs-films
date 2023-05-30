
import {ReqStatus} from '@/units/status';
import {
  Film,
  Genre, GenreId, 
  Country, CountryId
} from '@/units/film';
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
  year?: number,
  text?: string,
  sort?: string,
  page?: number,
  perPage?: number,
}

export const filmSearchSortDefault = 'title';
export const filmSearchPageDefault = 1;
export const filmSearchPerPageDefault = 4;

export const filmSearchParamsDefault: FilmSearchParams = { 
  genreIds: [],
  countryIds: [],
  year: 0,
  text: '',
  sort: filmSearchSortDefault,
  page: filmSearchPageDefault,
  perPage: filmSearchPerPageDefault,
}

export const filmSearchQueryTempl: Record<string, string | undefined> = {
  genreIds: undefined,
  countryIds: undefined,
  year: undefined,
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
  options: FilmSearchOptions,
  params: FilmSearchParams,
  results: FilmSearchResults,
  reqStatus: {
    opt: ReqStatus,
    res: ReqStatus,
  },
}

export const filmSearchStateDefault: FilmSearchState = {
  options: filmSearchOptionsDefault,
  params: filmSearchParamsDefault,
  results: filmSearchResultsDefault,
  reqStatus: {
    opt: ReqStatus.NONE,
    res: ReqStatus.NONE,
  },
}

export function getFilmSearchParamsStr(filmSearchState: FilmSearchState) {

  const {options, params} = filmSearchState;

  let str = '';

  if (str !== '') str += ' & ';
  str += options.genres
    .filter(genre => params.genreIds?.includes(genre.id))
    .map(genre => genre.name).join(', ');

  if (str !== '') str += ' & ';
  str += options.countries
    .filter(country => params.countryIds?.includes(country.id))
    .map(country => country.name).join(', ');

  return str;
}