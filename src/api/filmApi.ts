
import {delay} from '@/units/utils';
import {Lang} from '@/units/lang';
import {ReqStatus} from '@/units/status';
import {
  Film, FilmId, Genre, Country, FilmSearchParams, FilmSearchResults,
  filmDefault
} from '@/units/films';
import {filmsMap, genresMap, countriesMap} from '@/data/filmData';

function getFilm(filmId: FilmId, lang: Lang): (Film | undefined) 
{
  const filmRaw = filmsMap.get(filmId);

  if (!filmRaw) return undefined;

  return {
    id: filmRaw.id,
    title: lang === Lang.EN ? filmRaw.title_en : filmRaw.title_ru,
    
    genres: filmRaw.genres.map(id => { 
        const genreRaw = genresMap.get(id);
        if (!genreRaw) return undefined;
        return {
          id: genreRaw.id,
          name: lang === Lang.EN ? genreRaw.name_en : genreRaw.name_ru,
        }
      })
      .filter(x => !!x) as Genre[],
    
    countries: filmRaw.countries.map(id => { 
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
  Promise<{reqStatus: ReqStatus} & {film?: Film}> 
{
  console.log('call apiFetchFilmPage');
  await delay(1000);
  const film = getFilm(filmId, lang);
  return ( 
    film ? 
      {reqStatus: ReqStatus.OK, film} 
    : {reqStatus: ReqStatus.NOT_FOUND}
  );
}

export async function apiFetchFilmSearchResults(params: FilmSearchParams, lang: Lang): 
  Promise<{reqStatus: ReqStatus} & {results?: FilmSearchResults}> 
{
  console.log('call apiFetchFilmSearchResults');
  await delay(1000);

  const films = Array.from(filmsMap.values())
    .filter(filmRaw => 
      (!params.ids || params.ids.length === 0 || params.ids.includes(filmRaw.id))
    )
    .map(filmRaw => getFilm(filmRaw.id, lang))
    .filter(film => !!film) as Film[];

  return {reqStatus: ReqStatus.OK, results: films};
}