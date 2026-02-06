import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { userTypeValidator } from '../../../src/validators/requests/userTypeValidator';

describe('userTypeValidator', () => {
  it('should call next() when userType is Rehomer', () => {
    const req = {
      body: { userType: 'Rehomer' }
    } as Request;
    const res = {} as Response;
    const next = vi.fn();

    userTypeValidator(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('should call next() when userType is Adopter', () => {
    const req = {
      body: { userType: 'Adopter' }
    } as Request;
    const res = {} as Response;
    const next = vi.fn();

    userTypeValidator(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('should return 400 for invalid userType', () => {
    const req = {
      body: { userType: 'InvalidType' }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userTypeValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user type' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 when userType is missing', () => {
    const req = {
      body: {}
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userTypeValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user type' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 for null body', () => {
    const req = {
      body: null
    } as unknown as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userTypeValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid user type'
    });
  });
});
