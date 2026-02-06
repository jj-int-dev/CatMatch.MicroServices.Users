import { vi } from 'vitest';

export const mockAxiosRehomersClient = {
  delete: vi.fn(),
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn()
};

export const mockAxiosMessagesClient = {
  delete: vi.fn(),
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  patch: vi.fn()
};

vi.mock('../../src/utils/axiosClient', () => ({
  axiosRehomersClient: mockAxiosRehomersClient,
  axiosMessagesClient: mockAxiosMessagesClient
}));
