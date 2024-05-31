import { db, schema } from '@/db';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';
import { InferInsertModel } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function page() {
  const pass = faker.internet.password();
  const passwordHash = await argon2.hash(pass);
  const user = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    passwordHash,
  } satisfies InferInsertModel<typeof schema.user>;
  const result = await db.insert(schema.user).values(user);

  return (
    <>
      <h1>
        A user with the name of {user.username} was inserted with an id of{' '}
        {result[0].insertId}
      </h1>
    </>
  );
}
