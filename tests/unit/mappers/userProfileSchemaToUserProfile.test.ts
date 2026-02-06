import { describe, it, expect } from 'vitest';
import { toUserProfile } from '../../../src/mappers/userProfileSchemaToUserProfile';
import type { UserProfileSchema } from '../../../src/validators/database/userProfileValidator';

describe('toUserProfile', () => {
  it('should map complete user profile schema to user profile', () => {
    const schema: UserProfileSchema = {
      email: 'test@example.com',
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man',
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover',
      userType: { type: 'Adopter' }
    };

    const result = toUserProfile(schema);

    expect(result).toEqual({
      email: 'test@example.com',
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man',
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover',
      userType: 'Adopter'
    });
  });

  it('should handle null values correctly', () => {
    const schema: UserProfileSchema = {
      email: 'test@example.com',
      displayName: null,
      phoneNumber: null,
      gender: null,
      dateOfBirth: null,
      bio: null,
      userType: null
    };

    const result = toUserProfile(schema);

    expect(result).toEqual({
      email: 'test@example.com',
      displayName: null,
      phoneNumber: null,
      gender: null,
      dateOfBirth: null,
      bio: null,
      userType: null
    });
  });

  it('should return null when schema is null', () => {
    const result = toUserProfile(null);
    expect(result).toBeNull();
  });

  it('should return null when schema is undefined', () => {
    const result = toUserProfile(undefined);
    expect(result).toBeNull();
  });

  it('should extract userType.type correctly', () => {
    const schema: UserProfileSchema = {
      email: 'test@example.com',
      displayName: 'Jane',
      phoneNumber: null,
      gender: 'Woman',
      dateOfBirth: null,
      bio: null,
      userType: { type: 'Rehomer' }
    };

    const result = toUserProfile(schema);

    expect(result?.userType).toBe('Rehomer');
  });
});
