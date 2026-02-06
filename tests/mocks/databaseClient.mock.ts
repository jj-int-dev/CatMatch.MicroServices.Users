import { vi } from 'vitest';

export const mockDb = {
  query: {
    users: {
      findFirst: vi.fn()
    },
    usertypes: {
      findFirst: vi.fn()
    }
  },
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  innerJoin: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  set: vi.fn().mockReturnThis(),
  returning: vi.fn(),
  delete: vi.fn().mockReturnThis()
};

export const mockClient = {};

vi.mock('../../src/utils/databaseClient', () => ({
  db: mockDb,
  client: mockClient
}));
