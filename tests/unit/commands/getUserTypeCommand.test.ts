import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../../../tests/mocks/databaseClient.mock';
import { getUserTypeCommand } from '../../../src/commands/getUserTypeCommand';
import { mockDb } from '../../../tests/mocks/databaseClient.mock';

describe('getUserTypeCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user type when found', async () => {
    mockDb.select.mockReturnValue(mockDb);
    mockDb.from.mockReturnValue(mockDb);
    mockDb.innerJoin.mockReturnValue(mockDb);
    mockDb.where.mockReturnValue(mockDb);
    mockDb.limit.mockResolvedValue([{ userType: 'Adopter' }]);

    const result = await getUserTypeCommand('user-123');

    expect(result).toBe('Adopter');
  });

  it('should return null when user type not found', async () => {
    mockDb.select.mockReturnValue(mockDb);
    mockDb.from.mockReturnValue(mockDb);
    mockDb.innerJoin.mockReturnValue(mockDb);
    mockDb.where.mockReturnValue(mockDb);
    mockDb.limit.mockResolvedValue([]);

    const result = await getUserTypeCommand('user-123');

    expect(result).toBeNull();
  });

  it('should handle Rehomer user type', async () => {
    mockDb.select.mockReturnValue(mockDb);
    mockDb.from.mockReturnValue(mockDb);
    mockDb.innerJoin.mockReturnValue(mockDb);
    mockDb.where.mockReturnValue(mockDb);
    mockDb.limit.mockResolvedValue([{ userType: 'Rehomer' }]);

    const result = await getUserTypeCommand('user-456');

    expect(result).toBe('Rehomer');
  });
});
