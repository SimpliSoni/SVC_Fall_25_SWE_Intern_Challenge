import { beforeAll, afterAll } from 'vitest';
import { startDatabase, stopDatabase, getClient } from './db';
import fs from 'fs';
import path from 'path';

beforeAll(async () => {
  await startDatabase();
  const client = getClient();
  const schema = fs.readFileSync(path.resolve(__dirname, './database-setup.sql'), 'utf-8');
  await client.query(schema);
});

afterAll(async () => {
  await stopDatabase();
});