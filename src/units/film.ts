
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

export const filmDefault: Film = { 
  id: 0,
  title: '',
  genres: [],
  countries: [],
  year: 0,
}

//film search
export interface FilmSearchOptions {
  genres: Genre[],
  countries: Country[],
}

export const filmSearchOptionsDefault = {
  genres: [],
  countries: [],
}

/* export const filmSearchSortAll = <const>[
  'title', 'title_DESC',
  'date', 'date_DESC', 
];

export type FilmSearchSort = typeof filmSearchSortAll[number];

export function isFilmSearchSort(sort: any) {
  return _.isString(sort) && filmSearchSortAll.includes(sort as FilmSearchSort);
} */

export interface FilmSearchParams {
  text?: string,
  genreIds?: GenreId[],
  countryIds?: CountryId[],
  year?: number,
  sort?: string,
  page?: number,
  perPage?: number,
}

export const filmSearchSortDefault = 'title';
export const filmSearchPageDefault = 1;
export const filmSearchPerPageDefault = 2;

export const filmSearchParamsDefault: FilmSearchParams = { 
  text: '',
  genreIds: [],
  countryIds: [],
  year: 0,
  sort: filmSearchSortDefault,
  page: filmSearchPageDefault,
  perPage: filmSearchPerPageDefault,
}

export interface FilmSearchResults {
  films: Film[],
  totalPages: number,
}

export const filmSearchResultsDefault = {
  films: [],
  totalPages: 0,
}
