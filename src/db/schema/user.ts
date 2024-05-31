import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
  id: int('id').primaryKey().autoincrement(),
  username: varchar('username', { length: 64 }).notNull(),
  email: varchar('email', { length: 320 }).notNull(),
  passwordHash: varchar('passwordHash', { length: 255 }).notNull(),
});
