
import {NextApiRequest, NextApiResponse} from 'next';
import {dbQuery} from '@/units/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const queryStr = 'SELECT * FROM `films_table`';
  const dbQueryResult = await dbQuery(queryStr);

  console.log('results:', results);
  console.log('fields:', fields);

  res
  .status(200)
  .json({});
}