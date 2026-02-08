import { vi } from 'vitest';

// Create a chainable mock that returns itself for most methods
// Use regular functions instead of vi.fn() for chaining to survive vi.clearAllMocks()
const createChainableMock = () => {
  const chain: any = {
    _selectFn: vi.fn(),
    _fromFn: vi.fn(),
    _leftJoinFn: vi.fn(),
    _innerJoinFn: vi.fn(),
    _whereFn: vi.fn(),
    _limitFn: vi.fn(),
    _updateFn: vi.fn(),
    _setFn: vi.fn(),
    _returningFn: vi.fn(),
    _deleteFn: vi.fn()
  };

  // Create chainable methods that call the tracking functions but always return chain
  chain.select = (...args: any[]) => {
    chain._selectFn(...args);
    return chain;
  };
  chain.from = (...args: any[]) => {
    chain._fromFn(...args);
    return chain;
  };
  chain.leftJoin = (...args: any[]) => {
    chain._leftJoinFn(...args);
    return chain;
  };
  chain.innerJoin = (...args: any[]) => {
    chain._innerJoinFn(...args);
    return chain;
  };
  chain.where = vi.fn().mockReturnValue(chain); // where can chain or return promise
  chain.limit = (...args: any[]) => {
    return chain._limitFn(...args);
  };
  chain.update = (...args: any[]) => {
    chain._updateFn(...args);
    return chain;
  };
  chain.set = (...args: any[]) => {
    chain._setFn(...args);
    return chain;
  };
  chain.returning = (...args: any[]) => {
    return chain._returningFn(...args);
  };
  chain.delete = (...args: any[]) => {
    chain._deleteFn(...args);
    return chain;
  };

  return chain;
};

export const mockDb = {
  query: {
    users: {
      findFirst: vi.fn()
    },
    usertypes: {
      findFirst: vi.fn()
    }
  },
  ...createChainableMock()
};

export const mockClient = {};

vi.mock('../../src/utils/databaseClient', () => ({
  db: mockDb,
  client: mockClient
}));
