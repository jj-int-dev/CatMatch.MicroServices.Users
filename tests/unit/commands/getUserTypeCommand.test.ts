import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../../../tests/mocks/databaseClient.mock';
import { getUserTypeCommand } from '../../../src/commands/getUserTypeCommand';
import { mockDb } from '../../../tests/mocks/databaseClient.mock';

describe('getUserTypeCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user type when found', async () => {
    mockDb.where.mockReturnValue(mockDb);
    mockDb._limitFn.mockResolvedValue([{ userType: 'Adopter' }]);

    const result = await getUserTypeCommand('user-123');

    expect(result).toBe('Adopter');
    expect(mockDb._selectFn).toHaveBeenCalled();
    expect(mockDb._fromFn).toHaveBeenCalled();
    expect(mockDb._innerJoinFn).toHaveBeenCalled();
    expect(mockDb.where).toHaveBeenCalled();
    expect(mockDb._limitFn).toHaveBeenCalled();
  });

  it('should return null when user type not found', async () => {
    mockDb.where.mockReturnValue(mockDb);
    mockDb._limitFn.mockResolvedValue([]);

    const result = await getUserTypeCommand('user-123');

    expect(result).toBeNull();
  });

  it('should handle Rehomer user type', async () => {
    mockDb.where.mockReturnValue(mockDb);
    mockDb._limitFn.mockResolvedValue([{ userType: 'Rehomer' }]);

    const result = await getUserTypeCommand('user-456');

    expect(result).toBe('Rehomer');
  });
});
