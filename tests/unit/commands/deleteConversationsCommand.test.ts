import { describe, it, expect, vi, beforeEach } from 'vitest';
import '../../../tests/mocks/axiosClient.mock';
import deleteConversationsCommand from '../../../src/commands/deleteConversationsCommand';
import { mockAxiosMessagesClient } from '../../../tests/mocks/axiosClient.mock';

describe('deleteConversationsCommand', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete conversations via messages microservice', async () => {
    mockAxiosMessagesClient.delete.mockResolvedValue({
      data: { success: true }
    });

    await deleteConversationsCommand('user-123');

    expect(mockAxiosMessagesClient.delete).toHaveBeenCalledWith(
      expect.stringContaining('user-123/conversations')
    );
  });

  it('should handle errors gracefully', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockAxiosMessagesClient.delete.mockRejectedValue(
      new Error('Network error')
    );

    await expect(deleteConversationsCommand('user-123')).resolves.not.toThrow();

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });
});
