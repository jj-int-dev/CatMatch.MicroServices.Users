import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../../../tests/mocks/databaseClient.mock';
import updateUserProfileDataCommand from '../../../src/commands/updateUserProfileDataCommand';
import { mockDb } from '../../../tests/mocks/databaseClient.mock';

describe('updateUserProfileDataCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update user profile and return row count', async () => {
    const profileData = {
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man' as const,
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover'
    };

    mockDb.update.mockReturnValue(mockDb);
    mockDb.set.mockReturnValue(mockDb);
    mockDb.where.mockReturnValue(mockDb);
    mockDb.returning.mockResolvedValue([{ userId: 'user-123' }]);

    const result = await updateUserProfileDataCommand('user-123', profileData);

    expect(result).toBe(1);
    expect(mockDb.update).toHaveBeenCalledOnce();
    expect(mockDb.set).toHaveBeenCalledWith(
      expect.objectContaining({
        displayName: 'John Doe',
        phoneNumber: '+1234567890',
        gender: 'Man',
        dateOfBirth: '1990-01-15',
        bio: 'Cat lover'
      })
    );
  });

  it('should include userType when provided', async () => {
    const profileData = {
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man' as const,
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover',
      userType: 'Adopter' as const
    };

    mockDb.update.mockReturnValue(mockDb);
    mockDb.set.mockReturnValue(mockDb);
    mockDb.where.mockReturnValue(mockDb);
    mockDb.returning.mockResolvedValue([{ userId: 'user-123' }]);

    const result = await updateUserProfileDataCommand('user-123', profileData);

    expect(result).toBe(1);
    expect(mockDb.set).toHaveBeenCalledWith(
      expect.objectContaining({
        userType: 'Adopter'
      })
    );
  });

  it('should return 0 when no rows updated', async () => {
    const profileData = {
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man' as const,
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover'
    };

    mockDb.update.mockReturnValue(mockDb);
    mockDb.set.mockReturnValue(mockDb);
    mockDb.where.mockReturnValue(mockDb);
    mockDb.returning.mockResolvedValue([]);

    const result = await updateUserProfileDataCommand('user-123', profileData);

    expect(result).toBe(0);
  });
});
