import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';

// Mock BEFORE importing app
vi.mock('../../src/utils/databaseClient', () => ({
  db: {
    execute: vi.fn()
  }
}));

vi.mock('../../src/utils/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: vi.fn()
    }
  },
  supabaseAdmin: {
    auth: {
      getUser: vi.fn(),
      admin: {
        deleteUser: vi.fn()
      }
    }
  }
}));

import app from '../../src/app';

describe('Health Routes', () => {
  it('should respond with 200 on GET /api/health', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
  });

  it('should return status "OK"', async () => {
    const response = await request(app).get('/api/health');

    expect(response.body.status).toBe('OK');
  });

  it('should return a valid ISO 8601 timestamp', async () => {
    const response = await request(app).get('/api/health');

    expect(response.body.timestamp).toBeDefined();
    expect(() => new Date(response.body.timestamp)).not.toThrow();
    expect(new Date(response.body.timestamp).toISOString()).toBe(
      response.body.timestamp
    );
  });

  it('should return a numeric uptime', async () => {
    const response = await request(app).get('/api/health');

    expect(response.body.uptime).toBeDefined();
    expect(typeof response.body.uptime).toBe('number');
    expect(response.body.uptime).toBeGreaterThanOrEqual(0);
  });

  it('should return a JSON response with all required fields', async () => {
    const response = await request(app).get('/api/health');

    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.body).toMatchObject({
      status: 'OK',
      timestamp: expect.any(String),
      uptime: expect.any(Number)
    });
  });
});
