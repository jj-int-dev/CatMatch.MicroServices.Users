import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts', 'src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/server.ts', // Entry point that only calls listen()
        'src/config/swaggerOptions.ts', // Configuration file
        'src/database-migrations/**', // Database migrations and schema
        '**/*.d.ts',
        '**/*.config.ts',
        'tests/**'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
    mockReset: true,
    clearMocks: true,
    restoreMocks: true
  }
});
