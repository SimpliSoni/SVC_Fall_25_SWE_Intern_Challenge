import { beforeAll, afterAll } from 'vitest';
import { Pool } from 'pg';

export let pool: Pool;

beforeAll(() => {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
});

afterAll(async () => {
  if (pool) {
    await pool.end();
  }
});