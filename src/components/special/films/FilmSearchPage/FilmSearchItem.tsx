
import {useAppSelector, useAppDispatch} from '@/store';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import {Film} from '@/units/film';
import css from './FilmSearchItem.module.scss';

interface FilmSearchItemProps {
  film: Film,
}

export function FilmSearchItem({film}: FilmSearchItemProps) {

  const lang = useAppSelector(state => state.settings.lang);

  return (
    <div className={css['body']}>
      <div className={css['title']}>
        <Link href={`/film/${film.id}`}>
          {film.title}
        </Link>

        <div className={css['countries']}>
          { strlang( 
              film.countries.length > 1 ? 'FILM_COUNTRIES' : 'FILM_COUNTRY', 
              lang
            ) + ': ' 
          }
          { film.countries.map((country, idx) =>
              <span key={country.id} className={css['country']}>
                { (idx > 0 ? ', ': '') + country.name }
              </span>
            )
          }
        </div>

        <div className={css['genres']}>
          { strlang( 
              film.genres.length > 1 ? 'FILM_GENRES' : 'FILM_GENRE', 
              lang
            ) + ': ' 
          }
          { film.genres.map((genre, idx) =>
              <span key={genre.id} className={css['genre']}>
                { (idx > 0 ? ', ': '') + genre.name }
              </span>
            )
          }
        </div>
      </div>
    </div>
  )
}