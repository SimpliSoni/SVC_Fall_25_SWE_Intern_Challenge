import { File } from 'buffer';

if (!global.File) {
  global.File = File as any;
}

import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

let container: StartedPostgreSqlContainer;

export async function setup() {
  console.log('Starting PostgreSQL container...');
  container = await new PostgreSqlContainer('postgres:15').start();
  const connectionUri = container.getConnectionUri();
  process.env.DATABASE_URL = connectionUri;

  console.log('PostgreSQL container started. Seeding database...');
  const pool = new Pool({ connectionString: connectionUri });
  const schema = fs.readFileSync(path.resolve(__dirname, './database-setup.sql'), 'utf-8');
  await pool.query(schema);
  await pool.end();
  console.log('Database seeded.');
}

export async function teardown() {
  console.log('Stopping PostgreSQL container...');
  if (container) {
    await container.stop();
  }
  console.log('PostgreSQL container stopped.');
}