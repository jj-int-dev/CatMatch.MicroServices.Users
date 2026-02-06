import { vi, beforeEach } from 'vitest';

// Mock environment variables
process.env.PORT = '3000';
process.env.NODE_ENV = 'test';
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_PUBLISHABLE_KEY = 'test-publishable-key';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.DATABASE_INTROSPECT_URL =
  'postgresql://test:test@localhost:5432/test';
process.env.AUTHORIZED_CALLER = 'http://localhost:3001';
process.env.ANIMALS_MICROSERVICE_REHOMER_BASE_URL = 'http://localhost:3002';
process.env.MESSAGES_MICROSERVICE_BASE_URL = 'http://localhost:3003';

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});
