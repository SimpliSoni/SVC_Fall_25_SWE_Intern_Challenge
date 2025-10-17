import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './client/tests/setup.ts',
    include: ['client/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      all: true,
      reportsDirectory: './client/coverage',
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './client'),
      '@shared': path.resolve(process.cwd(), './shared'),
    },
  },
});