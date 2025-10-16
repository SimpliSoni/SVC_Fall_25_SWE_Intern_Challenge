import { GenericContainer, StartedTestContainer, Wait } from "testcontainers";
import { Client } from "pg";

let container: StartedTestContainer;
let client: Client;

export async function startDatabase() {
  const containerInstance = await new GenericContainer("postgres:15")
    .withExposedPorts(5432)
    .withEnvironment({
      POSTGRES_DB: "test",
      POSTGRES_USER: "test",
      POSTGRES_PASSWORD: "test",
    })
    .withWaitStrategy(Wait.forLogMessage("database system is ready to accept connections"))
    .start();

  container = containerInstance;

  const connectionString = `postgres://test:test@${container.getHost()}:${container.getMappedPort(5432)}/test`;
  process.env.TEST_DATABASE_URL = connectionString;

  client = new Client({ connectionString });
  await client.connect();

  return { container, client };
}

export async function stopDatabase() {
  await client.end();
  await container.stop();
}

export function getClient() {
  return client;
}