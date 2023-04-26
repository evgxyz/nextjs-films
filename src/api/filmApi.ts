
import { ApiStatus, ApiResult } from '@/types/apiTypes';
import { Film, FilmId } from '@/types/filmTypes';
import { filmsAll } from '@/data/filmsAll';

export async function apiFetchFilm(filmId: FilmId): 
  Promise<{ film?: Film } & ApiResult> {
    await new Promise(r => { setTimeout(() => r(1), 1500) });
    const film = filmsAll.find(film => film.id === filmId);
    return ( 
      film ? 
        { apiStatus: ApiStatus.OK, film } 
      : { apiStatus: ApiStatus.NOT_FOUND }
    );
}