import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../../../tests/mocks/databaseClient.mock';
import { getUserProfileCommand } from '../../../src/commands/getUserProfileCommand';
import { mockDb } from '../../../tests/mocks/databaseClient.mock';

describe('getUserProfileCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user profile when found', async () => {
    const mockUserData = {
      email: 'test@example.com',
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man',
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover',
      userType: { type: 'Adopter' }
    };

    mockDb.query.users.findFirst.mockResolvedValue(mockUserData);

    const result = await getUserProfileCommand('user-123');

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockUserData);
    expect(mockDb.query.users.findFirst).toHaveBeenCalledOnce();
  });

  it('should handle null user data', async () => {
    mockDb.query.users.findFirst.mockResolvedValue(null);

    const result = await getUserProfileCommand('non-existent-user');

    // nullish() validator accepts null/undefined as valid
    expect(result.success).toBe(true);
    expect(result.data).toBeNull();
    expect(mockDb.query.users.findFirst).toHaveBeenCalledOnce();
  });

  it('should handle undefined user data', async () => {
    mockDb.query.users.findFirst.mockResolvedValue(undefined);

    const result = await getUserProfileCommand('non-existent-user');

    // nullish() validator accepts null/undefined as valid
    expect(result.success).toBe(true);
    expect(result.data).toBeUndefined();
    expect(mockDb.query.users.findFirst).toHaveBeenCalledOnce();
  });
});
