import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserProfileAction } from '../../../src/actions/getUserProfileAction';
import * as getUserProfileCommand from '../../../src/commands/getUserProfileCommand';
import HttpResponseError from '../../../src/dtos/httpResponseError';

vi.mock('../../../src/commands/getUserProfileCommand');

describe('getUserProfileAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user profile on success', async () => {
    const mockData = {
      email: 'test@example.com',
      displayName: 'John Doe',
      phoneNumber: '+1234567890',
      gender: 'Man',
      dateOfBirth: '1990-01-15',
      bio: 'Cat lover',
      userType: { type: 'Adopter' }
    };

    vi.spyOn(getUserProfileCommand, 'getUserProfileCommand').mockResolvedValue({
      success: true,
      data: mockData,
      error: undefined
    } as any);

    const result = await getUserProfileAction('user-123');

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

  it('should throw HttpResponseError when user not found', async () => {
    vi.spyOn(getUserProfileCommand, 'getUserProfileCommand').mockResolvedValue({
      success: false,
      data: null,
      error: { message: 'Not found' }
    } as any);

    await expect(getUserProfileAction('user-123')).rejects.toThrow(
      HttpResponseError
    );
  });

  it('should throw HttpResponseError with 500 status when data is missing', async () => {
    vi.spyOn(getUserProfileCommand, 'getUserProfileCommand').mockResolvedValue({
      success: true,
      data: null,
      error: undefined
    } as any);

    await expect(getUserProfileAction('user-123')).rejects.toThrow(
      HttpResponseError
    );
  });
});
