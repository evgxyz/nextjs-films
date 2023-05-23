
import {Lang} from '@/units/lang';
import {ReqStatus} from '@/units/status';
import {
  Film, FilmId, Genre, Country, 
  FilmSearchOptions, FilmSearchParams, FilmSearchResults,
} from '@/units/film';
import {filmsMap, genresMap, countriesMap} from '@/data/filmData';
import {delay} from '@/units/utils';
import _ from 'lodash';

function getFilm(filmId: FilmId, lang: Lang): (Film | undefined) {

  const filmRaw = filmsMap.get(filmId);

  if (!filmRaw) return undefined;

  return {
    id: filmRaw.id,
    title: lang === Lang.EN ? filmRaw.title_en : filmRaw.title_ru,
    
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
  }
}

export async function apiFetchFilmPage(filmId: FilmId, lang: Lang): 
  Promise<{reqStatus: ReqStatus} & {film?: Film}> {
//
  console.log('call apiFetchFilmPage');
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
  Promise<{reqStatus: ReqStatus} & {options?: FilmSearchOptions}> {
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
    countries 
  }

  return {
    reqStatus: ReqStatus.OK, 
    options
  };
}

export async function apiFetchFilmSearchResults(params: FilmSearchParams, lang: Lang): 
  Promise<{reqStatus: ReqStatus} & {results?: FilmSearchResults}> {
//
  console.log('call apiFetchFilmSearchResults');
  await delay(1000);

  let {
    text = '',
    genreIds,
    countryIds,
    page = 1,
    perPage = 10
  } = params;

  text = text.toLowerCase();
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
      //text
      ( text === '' || 
        filmRaw.title_ru.toLowerCase().includes(text) || 
        filmRaw.title_en.toLowerCase().includes(text) )
    )
    .map(filmRaw => getFilm(filmRaw.id, lang))
    .filter(film => !!film) as Film[];

  const totalPages = Math.ceil(films.length / perPage);
  page = _.clamp(page, 1, totalPages);

  const indexFrom = perPage * (page - 1);
  const indexTo = indexFrom + perPage;

  const results = {
    films: films.slice(indexFrom, indexTo),
    totalPages
  }

  return {
    reqStatus: ReqStatus.OK,
    results
  };
}