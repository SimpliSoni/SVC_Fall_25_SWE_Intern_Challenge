import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    name: 'backend',
    environment: 'node',
    globals: true,
    env: {
      TESTCONTAINERS_DOCKER_SOCKET_PATH: '/var/run/docker.sock',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage/backend',
      include: ['server/**/*.ts'],
      exclude: [
        'server/**/*.test.ts',
        'server/**/*.spec.ts',
        'server/node-build.ts',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    setupFiles: ['tests/polyfills.ts', 'tests/setup-backend.ts'],
    hookTimeout: 60000,
  },
  resolve: {
    alias: {
      '@shared': resolve(__dirname, './shared'),
      '@server': resolve(__dirname, './server'),
    },
  },
});
