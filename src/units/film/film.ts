
// film general

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
  title_orig: string,
  genres: Genre[],
  countries: Country[],
  year: FilmYear,
}

