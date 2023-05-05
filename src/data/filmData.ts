
const films = [
  {
    id: 1,
    title_ru: "Фильм 1",
    title_en: "Film 1",
    genres: [1, 2],
    countries: [1]
  },
  {
    id: 2,
    title_ru: "Фильм 2",
    title_en: "Film 2",
    genres: [2, 3],
    countries: [1, 3]
  },
  {
    id: 3,
    title_ru: "Фильм 3",
    title_en: "Film 3",
    genres: [3],
    countries: [4]
  }
];

const genres = [
  {
    id: 1,
    name_ru: "Драма", 
    name_en: "Drama"
  },
  {
    id: 2,
    name_ru: "Мелодрама", 
    name_en: "Melodrama"
  },
  {
    id: 3,
    name_ru: "Фантастика", 
    name_en: "Fiction"
  },
];

const countries = [
  {
    id: 1,
    name_ru: "Россия", 
    name_en: "Russia"
  },
  {
    id: 2,
    name_ru: "США",  
    name_en: "USA"
  },
  {
    id: 3,
    name_ru: "Япония",  
    name_en: "Japan"
  },
  {
    id: 4,
    name_ru: "Франция",  
    name_en: "France"
  },
];

export const filmsMap = new Map(
  films.map(obj => [obj.id, obj])
);

export const genresMap = new Map(
  genres.map(obj => [obj.id, obj])
);

export const countriesMap = new Map(
  countries.map(obj => [obj.id, obj])
);