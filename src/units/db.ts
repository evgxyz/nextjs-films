
import mysql from 'mysql2/promise';

export async function dbQuery(queryStr: string, values?: any) {
  try {
    const dbConn = await mysql.createConnection({
      host: 'localhost',
      database: 'filmsite',
      user: 'filmsite',
      password: 'matreshkin123'
    });

    const result = await dbConn.execute(queryStr, values);

    return result;
  } 
  catch (error) {
    return {error};
  }
}
