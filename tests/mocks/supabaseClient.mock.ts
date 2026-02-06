import { vi } from 'vitest';

export const mockSupabase = {
  auth: {
    getUser: vi.fn()
  },
  storage: {
    from: vi.fn().mockReturnThis(),
    upload: vi.fn(),
    download: vi.fn(),
    getPublicUrl: vi.fn(),
    list: vi.fn(),
    remove: vi.fn()
  }
};

export const mockSupabaseAdmin = {
  auth: {
    admin: {
      deleteUser: vi.fn()
    }
  }
};

vi.mock('../../src/utils/supabaseClient', () => ({
  supabase: mockSupabase,
  supabaseAdmin: mockSupabaseAdmin
}));
