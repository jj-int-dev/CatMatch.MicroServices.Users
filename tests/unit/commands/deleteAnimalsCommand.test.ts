import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../../../tests/mocks/axiosClient.mock';
import deleteAnimalsCommand from '../../../src/commands/deleteAnimalsCommand';
import { mockAxiosRehomersClient } from '../../../tests/mocks/axiosClient.mock';

describe('deleteAnimalsCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete animals via rehomers microservice', async () => {
    mockAxiosRehomersClient.delete.mockResolvedValue({
      data: { success: true }
    });

    await deleteAnimalsCommand('user-123');

    expect(mockAxiosRehomersClient.delete).toHaveBeenCalledWith(
      expect.stringContaining('user-123/remove-all-animals')
    );
  });

  it('should handle errors gracefully', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockAxiosRehomersClient.delete.mockRejectedValue(
      new Error('Network error')
    );

    await expect(deleteAnimalsCommand('user-123')).resolves.not.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
