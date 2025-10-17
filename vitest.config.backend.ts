import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    name: 'backend',
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage/backend',
      include: ['server/**/*.ts'],
      exclude: [
        'server/**/*.test.ts',
        'server/**/*.spec.ts',
        'server/node-build.ts',
        'server/routes/test-mongo.ts',
      ],
      all: true,
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
    singleThread: true,
    globalSetup: ['./tests/setup-backend.ts'],
    setupFiles: ['./tests/polyfills.ts', './tests/setup-vitest.ts'],
    hookTimeout: 120000,
    env: {
      TESTCONTAINERS_DOCKER_SOCKET_PATH: '/var/run/docker.sock',
      PING_MESSAGE: 'test ping',
    },
  },
  resolve: {
    alias: {
      '@shared': resolve(__dirname, './shared'),
      '@server': resolve(__dirname, './server'),
    },
  },
});
