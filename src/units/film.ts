
import _ from 'lodash';

// film
export type GenreId = number;
export type CountryId = number;
export type FilmId = number;

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
}

export const filmDefault: Film = { 
  id: 0,
  title: '',
  genres: [],
  countries: [],
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

export const filmSearchSortAll = <const>[
  'title', 'title_DESC',
  'date', 'date_DESC', 
];

export type FilmSearchSort = typeof filmSearchSortAll[number];

export function isFilmSearchSort(sort: any) {
  return _.isString(sort) && filmSearchSortAll.includes(sort as FilmSearchSort);
}

export interface FilmSearchParams {
  text?: string,
  genreIds?: GenreId[],
  countryIds?: CountryId[],
  sort?: string,
  page?: number,
  perPage?: number,
}

export const filmSearchSortDefault = 'title';
export const pageDefault = 1;
export const perPageDefault = 2;

export const filmSearchParamsDefault: FilmSearchParams = { 
  text: '',
  genreIds: [],
  countryIds: [],
  sort: filmSearchSortDefault,
  page: pageDefault,
  perPage: perPageDefault,
}

export interface FilmSearchResults {
  films: Film[],
  totalPages: number,
}

export const filmSearchResultsDefault = {
  films: [],
  totalPages: 0,
}
