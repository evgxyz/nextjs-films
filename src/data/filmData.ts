
const films = [
  {
    id: 1,
    title_ru: "Фильм 1",
    title_en: "Film 1",
    genreIds: [1, 2],
    countryIds: [1]
  },
  {
    id: 2,
    title_ru: "Фильм 2",
    title_en: "Film 2",
    genreIds: [2, 3],
    countryIds: [1, 3]
  },
  {
    id: 3,
    title_ru: "Фильм 3",
    title_en: "Film 3",
    genreIds: [3],
    countryIds: [4]
  },
  {
    id: 4,
    title_ru: "Фильм 4",
    title_en: "Film 4",
    genreIds: [1],
    countryIds: [2]
  },
  {
    id: 5,
    title_ru: "Фильм 5",
    title_en: "Film 5",
    genreIds: [2],
    countryIds: [1]
  },
  {
    id: 6,
    title_ru: "Фильм 6",
    title_en: "Film 6",
    genreIds: [1, 2],
    countryIds: [3]
  },
  {
    id: 7,
    title_ru: "Фильм 7",
    title_en: "Film 7",
    genreIds: [1],
    countryIds: [4]
  },
  {
    id: 8,
    title_ru: "Фильм 8",
    title_en: "Film 8",
    genreIds: [2, 4],
    countryIds: [1, 4]
  },
  {
    id: 9,
    title_ru: "Фильм 9",
    title_en: "Film 9",
    genreIds: [1, 3],
    countryIds: [1, 2, 4]
  },
  {
    id: 10,
    title_ru: "Фильм 10",
    title_en: "Film 10",
    genreIds: [2, 4],
    countryIds: [2, 3, 4]
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
  {
    id: 4,
    name_ru: "Документальный", 
    name_en: "Documentary"
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