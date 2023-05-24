
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import {Film} from '@/units/film';
import css from './FilmSearchResults.module.scss';

export function FilmSearchResults() {

  const lang = useAppSelector(state => state.settings.lang);
  const results = useAppSelector(state => state.filmSearch.results);

  return (
    <div className={css['body']}>
      { results.films.map(film => 
          <FilmSearchItem film={film} />
        )
      }
    </div>
  )
}

interface FilmSearchItemProps {
  film: Film,
}

function FilmSearchItem({film}: FilmSearchItemProps) {

  const lang = useAppSelector(state => state.settings.lang);

  return (
    <div className={css['film']}>

      <div className={css['film-title']}>
        <Link href={`/film/${film.id}`}>
          {film.title}
        </Link>
      </div>

      <div className={css['film-countries']}>
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

      <div className={css['film-genres']}>
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
  )
}