
import {NextApiRequest, NextApiResponse} from 'next';
import {dbQuery, dbEscape} from '@/units/db';
import {Lang, isLang, langDefault} from '@/units/lang';
import {Film} from '@/units/film';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filmId = parseInt(req.query.filmId as string);
  
  if (!isFinite(filmId)) {
    return res.status(400).json({error: 'Bad parameters'});
  }

  const lang = (isLang(req.query.lang) ? req.query.lang : langDefault) as Lang;

  let langSuff: string = langDefault;
  switch (lang) {
    default: 
    case Lang.RU: langSuff = 'ru'; break;
    case Lang.EN: langSuff = 'en'; break;
  }

  const {queryError, queryResult} = await dbQuery(
    `SELECT 
    t1.*,
    t1.title_${langSuff} AS title,
    ( SELECT 
      JSON_ARRAYAGG(JSON_OBJECT('id', t2.id, 'name', t2.name_${langSuff})) 
      FROM genres_table AS t2
      JOIN films_genres_table AS t12 ON t12.film_id=t1.id AND t12.genre_id=t2.id
      GROUP BY t1.id ) AS film_genres,
    ( SELECT 
      JSON_ARRAYAGG(JSON_OBJECT('id', t3.id, 'name', t3.name_${langSuff})) 
      FROM countries_table AS t3
      JOIN films_countries_table AS t13 ON t13.film_id=t1.id AND t13.country_id=t3.id
      GROUP BY t1.id ) AS film_countries
    FROM films_table AS t1 
    WHERE t1.id=${dbEscape(filmId)};`
  );

  if (queryError) {
    return res.status(500).json({error: 'Fetch data error'});
  }

  const result = queryResult?.[0];

  const film = result ? {
    id: result.id,
    title: result.title,
    title_orig: result.title_orig,
    genres: result.film_genres ?? [],
    countries: result.film_countries ?? [],
    year: result.year,
  } as Film : null;

  res.status(200).json(film);
}