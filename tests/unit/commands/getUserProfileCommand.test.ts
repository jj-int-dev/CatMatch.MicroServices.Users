import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../../../tests/mocks/databaseClient.mock';
import { getUserProfileCommand } from '../../../src/commands/getUserProfileCommand';
import { mockDb } from '../../../tests/mocks/databaseClient.mock';

describe('getUserProfileCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user profile when found', async () => {
    const mockUserData = [
      {
        email: 'test@example.com',
        displayName: 'John Doe',
        phoneNumber: '+1234567890',
        gender: 'Man',
        dateOfBirth: '1990-01-15',
        bio: 'Cat lover',
        userType: 'Adopter'
      }
    ];

    // Mock the query chain: select().from().leftJoin().where()
    mockDb.where.mockResolvedValue(mockUserData);

    const result = await getUserProfileCommand('user-123');

    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockUserData);
    expect(mockDb._selectFn).toHaveBeenCalled();
    expect(mockDb._fromFn).toHaveBeenCalled();
    expect(mockDb._leftJoinFn).toHaveBeenCalled();
    expect(mockDb.where).toHaveBeenCalled();
  });

  it('should handle null user data', async () => {
    mockDb.where.mockResolvedValue(null);

    const result = await getUserProfileCommand('non-existent-user');

    // Validator expects an array, so null should fail validation
    expect(result.success).toBe(false);
  });

  it('should handle undefined user data', async () => {
    mockDb.where.mockResolvedValue(undefined);

    const result = await getUserProfileCommand('non-existent-user');

    // Validator expects an array, so undefined should fail validation
    expect(result.success).toBe(false);
  });
});
