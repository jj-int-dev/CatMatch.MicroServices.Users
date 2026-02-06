import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateUserProfileAction } from '../../../src/actions/updateUserProfileAction';
import updateUserProfileDataCommand from '../../../src/commands/updateUserProfileDataCommand';
import { getUserProfileAction } from '../../../src/actions/getUserProfileAction';
import HttpResponseError from '../../../src/dtos/httpResponseError';

vi.mock('../../../src/commands/updateUserProfileDataCommand');
vi.mock('../../../src/actions/getUserProfileAction');

describe('updateUserProfileAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update profile and return updated data', async () => {
    const profileData = {
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man' as const,
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover'
    };

    const updatedProfile = {
      email: 'test@example.com',
      ...profileData,
      userType: null
    };

    vi.mocked(updateUserProfileDataCommand).mockResolvedValue(1);
    vi.mocked(getUserProfileAction).mockResolvedValue(updatedProfile);

    const result = await updateUserProfileAction('user-123', profileData);

    expect(result).toEqual(updatedProfile);
    expect(updateUserProfileDataCommand).toHaveBeenCalledWith(
      'user-123',
      profileData
    );
  });

  it('should throw error when no rows updated', async () => {
    const profileData = {
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man' as const,
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover'
    };

    vi.mocked(updateUserProfileDataCommand).mockResolvedValue(0);

    await expect(
      updateUserProfileAction('user-123', profileData)
    ).rejects.toThrow(HttpResponseError);
  });
});
