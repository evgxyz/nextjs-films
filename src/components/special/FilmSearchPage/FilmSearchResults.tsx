
import {useAppSelector} from '@/store';
import {strlang} from '@/units/lang';
import Link from '@/next/Link';
import {Film} from '@/units/film';
import {Pagination} from '@/components/common/Pagination';
import _ from 'lodash';
import css from './FilmSearchResults.module.scss';

//FilmSearchResults
interface FilmSearchResultsProps {
  url: string,
}

export function FilmSearchResults({url}: FilmSearchResultsProps) {

  const lang = useAppSelector(state => state.settings.lang);
  const filmSearch = useAppSelector(state => state.filmSearch);

  const totalPages = filmSearch.results.totalPages ?? 1;
  let page = filmSearch.params.page ?? 1;
  page = _.clamp(page, 1, totalPages);

  const pagination = (
    <Pagination 
      baseUrl={url} 
      paramName={'page'} 
      start={1} 
      end={totalPages} 
      curr={page}
    />
  );
      
  return (
    <div className={css['body']}>
      {pagination}
      <div className={css['film-list']}>
        { filmSearch.results.films.map(film => 
            <FilmSearchItem key={film.id} film={film} />
          )
        }
      </div>
      {pagination}
    </div>
  )
}

//FilmSearchItem
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
