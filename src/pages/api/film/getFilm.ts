
import {NextApiRequest, NextApiResponse} from 'next';
import {dbQuery, dbEscape} from '@/units/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filmId = parseInt(req.query.filmId as string);
  
  if (!isFinite(filmId)) {
    res.status(400).json({error: 'Bad parameters'});
  }
  
  const queryStr = `SELECT * FROM films_table WHERE id=${dbEscape(filmId)}`;
  const queryResult = await dbQuery(queryStr);

  const {error, results} = queryResult;

  if (!error) {
    res.status(200).json(results);
  } else {
    res.status(500).json({error: 'Fetch data error'});
  }
}