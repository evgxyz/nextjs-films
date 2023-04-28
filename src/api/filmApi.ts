
import { ApiStatus } from '@/types/resultTypes';
import { Film, FilmId } from '@/types/filmTypes';
import { filmsAll } from '@/data/filmsAll';

export async function apiFetchFilm(filmId: FilmId): 
  Promise<{ apiStatus: ApiStatus } & { film?: Film }> {
    await new Promise(r => { setTimeout(() => r(1), 1500) });
    const film = filmsAll.find(film => film.id === filmId);
    return ( 
      film ? 
        { apiStatus: ApiStatus.OK, film } 
      : { apiStatus: ApiStatus.NOT_FOUND }
    );
}