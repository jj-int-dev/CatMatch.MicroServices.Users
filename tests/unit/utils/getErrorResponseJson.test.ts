import { describe, it, expect, vi } from 'vitest';
import type { Response } from 'express';
import getErrorResponseJson from '../../../src/utils/getErrorResponseJson';
import HttpResponseError from '../../../src/dtos/httpResponseError';

describe('getErrorResponseJson', () => {
  it('should handle HttpResponseError with correct status code', () => {
    const error = new HttpResponseError(404, 'User not found');
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;

    getErrorResponseJson(error, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should handle HttpResponseError with 500 status', () => {
    const error = new HttpResponseError(500, 'Internal server error');
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;

    getErrorResponseJson(error, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should handle generic Error with 500 status', () => {
    const error = new Error('Something went wrong');
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;

    getErrorResponseJson(error, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong' });
  });

  it('should handle unknown error type', () => {
    const error = { message: 'Unknown error' };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;

    getErrorResponseJson(error, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unknown error' });
  });
});
