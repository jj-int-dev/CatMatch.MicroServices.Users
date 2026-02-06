import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import userIdValidator from '../../../src/validators/requests/userIdValidator';

describe('userIdValidator', () => {
  it('should call next() when userId is valid', () => {
    const req = {
      params: { userId: 'valid-user-id-123' }
    } as unknown as Request;
    const res = {} as Response;
    const next = vi.fn();

    userIdValidator(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('should return 400 when userId is missing', () => {
    const req = {
      params: {}
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userIdValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 when userId is empty string', () => {
    const req = {
      params: { userId: '' }
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userIdValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 when userId is only whitespace', () => {
    const req = {
      params: { userId: '   ' }
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userIdValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
    expect(next).not.toHaveBeenCalled();
  });
});
