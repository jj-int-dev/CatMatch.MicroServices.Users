import { describe, it, expect, vi } from 'vitest';
import type { Request, Response, NextFunction } from 'express';
import { userProfileDataValidator } from '../../../src/validators/requests/userProfileDataValidator';

describe('userProfileDataValidator', () => {
  it('should call next() with valid profile data', () => {
    const req = {
      body: {
        displayName: 'John Doe',
        phoneNumber: '+1234567890',
        gender: 'Man',
        dateOfBirth: '1990-01-15',
        bio: 'Cat lover'
      }
    } as Request;
    const res = {} as Response;
    const next = vi.fn();

    userProfileDataValidator(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('should call next() with empty strings (clearing values)', () => {
    const req = {
      body: {
        displayName: 'John',
        phoneNumber: '',
        gender: '',
        dateOfBirth: '',
        bio: ''
      }
    } as Request;
    const res = {} as Response;
    const next = vi.fn();

    userProfileDataValidator(req, res, next);

    expect(next).toHaveBeenCalledOnce();
  });

  it('should return 400 for invalid displayName (too short)', () => {
    const req = {
      body: {
        displayName: '',
        phoneNumber: '+1234567890',
        gender: 'Man',
        dateOfBirth: '1990-01-15',
        bio: 'Cat lover'
      }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userProfileDataValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid user profile data'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 for invalid phoneNumber format', () => {
    const req = {
      body: {
        displayName: 'John Doe',
        phoneNumber: 'invalid-phone',
        gender: 'Man',
        dateOfBirth: '1990-01-15',
        bio: 'Cat lover'
      }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userProfileDataValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid user profile data'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 for invalid gender', () => {
    const req = {
      body: {
        displayName: 'John Doe',
        phoneNumber: '+1234567890',
        gender: 'InvalidGender',
        dateOfBirth: '1990-01-15',
        bio: 'Cat lover'
      }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userProfileDataValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid user profile data'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 400 for future dateOfBirth', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const req = {
      body: {
        displayName: 'John Doe',
        phoneNumber: '+1234567890',
        gender: 'Man',
        dateOfBirth: futureDate.toISOString().split('T')[0],
        bio: 'Cat lover'
      }
    } as Request;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as Response;
    const next = vi.fn();

    userProfileDataValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid user profile data'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should accept optional userType', () => {
    const req = {
      body: {
        displayName: 'John Doe',
        phoneNumber: '+1234567890',
        gender: 'Woman',
        dateOfBirth: '1990-01-15',
        bio: 'Cat lover',
        userType: 'Adopter'
      }
    } as Request;
    const res = {} as Response;
    const next = vi.fn();

    userProfileDataValidator(req, res, next);

    expect(next).toHaveBeenCalledOnce();
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

    userProfileDataValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid user profile data'
    });
  });
});
