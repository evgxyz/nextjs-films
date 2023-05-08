
import {delay} from '@/units/utils';
import {Lang} from '@/units/lang';
import {ReqStatus} from '@/units/status';
import {
  Film, FilmId, Genre, Country, FilmSearchParams, FilmSearchResults,
  filmDefault
} from '@/units/films';
import {filmsMap, genresMap, countriesMap} from '@/data/filmData';

export async function apiFetchFilm(filmId: FilmId, lang: Lang): 
  Promise<{reqStatus: ReqStatus} & {film?: Film}> 
{
    console.log('call apiFetchFilm');
    
    await delay(1500);
    
    const filmRaw = filmsMap.get(filmId);

    if (!filmRaw) {
      return {reqStatus: ReqStatus.NOT_FOUND}
    }

    const film = {
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

    return {reqStatus: ReqStatus.OK, film}; 
}

/* export async function apiFetchFilmSearchFilter(lang: Lang): 
  Promise<{ reqStatus: ReqStatus } & { filter?: FilmSearchFilter }> {
  console.log('call apiFetchFilmSearchFilter');
  return { reqStatus: ReqStatus.OK, filter: filmSearchFilterDefault }
} */

export async function apiFetchFilmSearchResults(params: FilmSearchParams, lang: Lang): 
  Promise<{reqStatus: ReqStatus} & {results?: FilmSearchResults}> 
{
  console.log('call apiFetchFilmSearchResults');
  const {reqStatus, film} = await apiFetchFilm(params.id, lang);
  if (reqStatus === ReqStatus.OK && film) {
    return {reqStatus: ReqStatus.OK, results: [film]};
  } else {
    return {reqStatus};
  }
}