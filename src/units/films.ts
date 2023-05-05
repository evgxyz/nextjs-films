

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