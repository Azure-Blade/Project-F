import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const BUILDING =
  z
    .enum(['true'], { message: 'BUILDING must be "TRUE" if set' })
    .optional()
    .parse(process.env.BUILDING) ?? false;

export const ENV = createEnv({
  server: {
    DB_HOST: z.string(),
    DB_USER: z.string(),
    DB_PASS: z.string(),
    DB_DATABASE: z.string(),
  },
  skipValidation: BUILDING,
});
