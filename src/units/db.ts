
import mysql from 'mysql2/promise';

const dbConnConfig = {
  host: 'localhost',
  database: 'filmsite',
  user: 'filmsite',
  password: 'matreshkin123'
};

export async function dbQuery(queryStr: string, values?: any) {
  try {
    const dbConn = await mysql.createConnection(dbConnConfig);
    const execResult = await dbConn.execute(queryStr, values);
    const queryResults = Object.assign({}, execResult[0]) as Record<string, unknown>[];

    return {
      results: queryResults
    };
  } 
  catch (error) {
    return {
      error: 1
    };
  }
}

export function dbEscape(value: any) {
  return mysql.escape(value)
}
