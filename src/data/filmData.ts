
const films = [
  {
    id: 1,
    title_orig: "Буратино",
    title_ru: "Буратино",
    title_en: "Buratino",
    genreIds: [1, 2],
    countryIds: [1],
    year: 1999
  },
  {
    id: 2,
    title_orig: "Чиполлинно",
    title_ru: "Чиполлинно",
    title_en: "Chipollino",
    genreIds: [2, 3],
    countryIds: [1, 3],
    year: 1961
  },
  {
    id: 3,
    title_orig: "Винни-пух",
    title_ru: "Винни-пух",
    title_en: "Vinni-puh",
    genreIds: [3],
    countryIds: [4],
    year: 1985
  },
  {
    id: 4,
    title_orig: "Чебурашка",
    title_ru: "Чебурашка",
    title_en: "Cheburashka",
    genreIds: [1],
    countryIds: [2],
    year: 1990
  },
  {
    id: 5,
    title_orig: "Ну-погоди!",
    title_ru: "Ну-погоди!",
    title_en: "Well wait!",
    genreIds: [2],
    countryIds: [1],
    year: 1976
  },
  {
    id: 6,
    title_orig: "Home Alone",
    title_ru: "Один дома",
    title_en: "Home Alone",
    genreIds: [1, 2],
    countryIds: [3],
    year: 2003
  },
  {
    id: 7,
    title_orig: "Terminator",
    title_ru: "Терминатор",
    title_en: "Terminator",
    genreIds: [1],
    countryIds: [4],
    year: 1991
  },
  {
    id: 8,
    title_orig: "The matrix",
    title_ru: "Матрица",
    title_en: "The matrix",
    genreIds: [2, 4],
    countryIds: [1, 4],
    year: 2003
  },
  {
    id: 9,
    title_orig: "Terminator 2",
    title_ru: "Терминатор 2",
    title_en: "Terminator 2",
    genreIds: [1, 3],
    countryIds: [1, 2, 4],
    year: 2002
  },
  {
    id: 10,
    title_orig: "Avatar",
    title_ru: "Аватар",
    title_en: "Avatar",
    genreIds: [2, 4],
    countryIds: [2, 3, 4],
    year: 2007
  },
  {
    id: 11,
    title_orig: "Avatar 2",
    title_ru: "Аватар 2",
    title_en: "Avatar 2",
    genreIds: [2, 4],
    countryIds: [2, 3, 4],
    year: 2022
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