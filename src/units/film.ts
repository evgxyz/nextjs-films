
import {ReqStatus} from '@/units/status';
import _ from 'lodash';

// film
export type FilmId = number;
export type FilmYear = number;

export type GenreId = number;
export type CountryId = number;

export interface Genre {
  id: GenreId,
  name: string,
}

export interface Country {
  id: CountryId,
  name: string,
}

export interface Film {
  id: FilmId,
  title: string,
  genres: Genre[],
  countries: Country[],
  year: FilmYear,
}

// filmPage

export const filmDefault: Film = { 
  id: 0,
  title: '',
  genres: [],
  countries: [],
  year: 0,
}

// filmPage store
export interface FilmPageState {
  film: Film,
  reqStatus: {
    film: ReqStatus,
  }
}

export const filmPageStateDefault: FilmPageState = {
  film: filmDefault,
  reqStatus: {
    film: ReqStatus.NONE
  },
}

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

/* export function getFilmSearchTitle(filmSearchOptions: ) {

} */