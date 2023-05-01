
import { ReqStatus } from '@/units/status';
import { Film, FilmId } from '@/units/films';
import { filmsAll } from '@/data/filmsAll';

export async function apiFetchFilm(filmId: FilmId): 
  Promise<{ reqStatus: ReqStatus } & { film?: Film }> {
    console.log('call apiFetchFilm');
    await new Promise(r => { setTimeout(() => r(1), 1500) });
    const film = filmsAll.find(film => film.id === filmId);
    return ( 
      film ? 
        { reqStatus: ReqStatus.OK, film } 
      : { reqStatus: ReqStatus.NOT_FOUND }
    );
}