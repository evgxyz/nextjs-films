
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

// filmSearch

export interface FilmSearchOptions {
  genres: Genre[],
  countries: Country[],
}

export interface FilmSearchParams {
  id: FilmId,
  title: string,
  genreIds: GenreId[],
  countryIds: CountryId[],
}

export const filmSearchParamsDefault: FilmSearchParams = { 
  id: 0,
  title: '',
  genreIds: [],
  countryIds: [],
}

export type FilmSearchResults = Film[];
