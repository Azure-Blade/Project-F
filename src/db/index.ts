import { MySql2Client, drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { BUILDING, ENV } from '@/env';
import * as schema from './schema';

async function createDbConnection() {
  if (BUILDING) {
    const mockConnection = {} as unknown as MySql2Client;
    return drizzle(mockConnection, { schema, mode: 'default' });
  }

  const connection = await mysql.createConnection({
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    database: ENV.DB_DATABASE,
    password: ENV.DB_PASS,
  });

  return drizzle(connection, { schema, mode: 'default' });
}

export const db = await createDbConnection();
export { schema };
