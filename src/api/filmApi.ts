
import {Lang} from '@/units/lang';
import {ReqStatus} from '@/units/status';
import {
  Film, FilmId, Genre, Country, 
  FilmSearchOptions, 
  FilmSearchParams, 
  filmSearchSortDefault, 
  filmSearchPageDefault, filmSearchPerPageDefault, 
  FilmSearchResults,
} from '@/units/film';
import {Autocompl} from '@/units/components';
import {filmsMap, genresMap, countriesMap} from '@/data/filmData';
import {signCompare, delay} from '@/units/utils';
import _ from 'lodash';

function getFilm(filmId: FilmId, lang: Lang): (Film | undefined) {

  const filmRaw = filmsMap.get(filmId);

  if (!filmRaw) return undefined;

  return {
    id: filmRaw.id,

    title: lang === Lang.EN ? filmRaw.title_en : filmRaw.title_ru,
    
    title_orig: filmRaw.title_orig,
    
    genres: filmRaw.genreIds.map(id => { 
        const genreRaw = genresMap.get(id);
        if (!genreRaw) return undefined;
        return {
          id: genreRaw.id,
          name: lang === Lang.EN ? genreRaw.name_en : genreRaw.name_ru,
        }
      })
      .filter(x => !!x) as Genre[],
    
    countries: filmRaw.countryIds.map(id => { 
        const countryRaw = countriesMap.get(id);
        if (!countryRaw) return undefined;
        return {
          id: countryRaw.id,
          name: lang === Lang.EN ? countryRaw.name_en : countryRaw.name_ru,
        }
      })
      .filter(x => !!x) as Country[],

    year: filmRaw.year,
  }
}

/* export async function apiFetchFilm(filmId: FilmId, lang: Lang): 
  Promise<{reqStatus: ReqStatus} & {film?: Film}> {
//
  console.log('call apiFetchFilm');
  await delay(1000);

  const film = getFilm(filmId, lang);
  if (film) {
    return {
      reqStatus: ReqStatus.OK, 
      film
    }
  } else {
    return {
      reqStatus: ReqStatus.NOT_FOUND
    }
  }
} */

export async function apiFetchFilm(filmId: FilmId, lang: Lang): 
  Promise<{reqStatus: ReqStatus} & {film?: Film}> {
//
  console.log('call apiFetchFilm');
  await delay(1000);

  const film = getFilm(filmId, lang);
  if (film) {
    return {
      reqStatus: ReqStatus.OK, 
      film
    }
  } else {
    return {
      reqStatus: ReqStatus.NOT_FOUND
    }
  }
}

export async function apiFetchFilmSearchOptions(lang: Lang): 
  Promise<{options: FilmSearchOptions, reqStatus: ReqStatus}> {
//
  console.log('call apiFetchFilmSearchOptions');
  await delay(1000);

  const genres: Genre[] = Array.from(genresMap.values())
    .map(genreRaw => 
      ({
        id: genreRaw.id,
        name: lang === Lang.EN ? genreRaw.name_en : genreRaw.name_ru,
      })
    );

  const countries: Country[] = Array.from(countriesMap.values())
    .map(countryRaw => 
      ({
        id: countryRaw.id,
        name: lang === Lang.EN ? countryRaw.name_en : countryRaw.name_ru
      })
    );

  const options = {
    genres,
    countries,
  }

  return {
    options,
    reqStatus: ReqStatus.OK,  
  };
}

export async function apiFetchFilmSearchTextAutocompl(text: string): 
  Promise<{autocompl: Autocompl, reqStatus: ReqStatus}> {
//
  console.log('call apiFetchFilmSearchTextAutocompl');
  await delay(500);

  text = text.toLowerCase();

  let autocompl: Autocompl = [];
  
  if (text.trim() !== '') {
    const films = Array.from(filmsMap.values());
    const titles: string[] = [];
    films.forEach(filmRaw => titles.push(filmRaw.title_ru, filmRaw.title_en));
    autocompl = titles.filter(title => title.toLowerCase().includes(text));
    autocompl = autocompl.slice(0, 5);
  }
  
  return {
    autocompl, 
    reqStatus: ReqStatus.OK,
  }
}

export async function apiFetchFilmSearchResults(params: FilmSearchParams, lang: Lang): 
  Promise<{results: FilmSearchResults, reqStatus: ReqStatus}> {
//
  console.log('call apiFetchFilmSearchResults');
  await delay(1000);

  let {
    genreIds,
    countryIds,
    yearFrom,
    yearTo,
    text = '',
    sort = filmSearchSortDefault,
    page = filmSearchPageDefault,
    perPage = filmSearchPerPageDefault
  } = params;

  text = text.toLowerCase();

  let sortCompareFun: (filmX: Film, filmY: Film) => number;
  switch (sort) {
    case 'title': 
    default: {
      sortCompareFun = (filmX, filmY) => signCompare(filmX.title, filmY.title);
    } break;

    case 'title_DESC': {
      sortCompareFun = (filmX, filmY) => -signCompare(filmX.title, filmY.title);
    } break;

    case 'year': {
      sortCompareFun = (filmX, filmY) => signCompare(filmX.year, filmY.year);
    } break;

    case 'year_DESC': {
      sortCompareFun = (filmX, filmY) => -signCompare(filmX.year, filmY.year);
    } break;
  }

  page = Math.max(1, page);
  perPage = Math.max(1, perPage);

  const films = Array.from(filmsMap.values())
    .filter(filmRaw => 
      //genres
      ( !genreIds || genreIds.length == 0 || 
        _.intersection(genreIds, filmRaw.genreIds).length > 0 ) &&
      //countries
      ( !countryIds || countryIds.length == 0 || 
        _.intersection(countryIds, filmRaw.countryIds).length > 0 ) &&
      //years
      ( !yearFrom || filmRaw.year >= yearFrom ) && 
      ( !yearTo || filmRaw.year <= yearTo ) &&
      //text
      ( text === '' || 
        filmRaw.title_ru.toLowerCase().includes(text) || 
        filmRaw.title_en.toLowerCase().includes(text) )
    )
    .map(filmRaw => getFilm(filmRaw.id, lang))
    .filter(film => !!film) as Film[];
  
  films.sort(sortCompareFun);

  const totalPages = Math.ceil(films.length / perPage);
  page = _.clamp(page, 1, totalPages);

  const indexFrom = perPage * (page - 1);
  const indexTo = indexFrom + perPage;

  const results = {
    films: films.slice(indexFrom, indexTo),
    totalPages
  }

  return {
    results,
    reqStatus: ReqStatus.OK
  };
}