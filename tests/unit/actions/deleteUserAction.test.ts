import { describe, it, expect, vi, beforeEach } from 'vitest';
import deleteUserAction from '../../../src/actions/deleteUserAction';
import deleteUserCommand from '../../../src/commands/deleteUserCommand';
import deleteUserProfilePictureCommand from '../../../src/commands/deleteUserProfilePictureCommand';
import { getUserTypeCommand } from '../../../src/commands/getUserTypeCommand';
import deleteConversationsCommand from '../../../src/commands/deleteConversationsCommand';
import deleteAnimalsCommand from '../../../src/commands/deleteAnimalsCommand';

vi.mock('../../../src/commands/deleteUserCommand');
vi.mock('../../../src/commands/deleteUserProfilePictureCommand');
vi.mock('../../../src/commands/getUserTypeCommand');
vi.mock('../../../src/commands/deleteConversationsCommand');
vi.mock('../../../src/commands/deleteAnimalsCommand');

describe('deleteUserAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete Rehomer user and their animals', async () => {
    vi.mocked(getUserTypeCommand).mockResolvedValue('Rehomer');
    vi.mocked(deleteConversationsCommand).mockResolvedValue(undefined);
    vi.mocked(deleteAnimalsCommand).mockResolvedValue(undefined);
    vi.mocked(deleteUserProfilePictureCommand).mockResolvedValue(undefined);
    vi.mocked(deleteUserCommand).mockResolvedValue(undefined);

    await deleteUserAction('user-123');

    expect(deleteConversationsCommand).toHaveBeenCalledWith('user-123');
    expect(deleteAnimalsCommand).toHaveBeenCalledWith('user-123');
    expect(deleteUserProfilePictureCommand).toHaveBeenCalledWith('user-123');
    expect(deleteUserCommand).toHaveBeenCalledWith('user-123');
  });

  it('should delete Adopter user without deleting animals', async () => {
    vi.mocked(getUserTypeCommand).mockResolvedValue('Adopter');
    vi.mocked(deleteConversationsCommand).mockResolvedValue(undefined);
    vi.mocked(deleteUserProfilePictureCommand).mockResolvedValue(undefined);
    vi.mocked(deleteUserCommand).mockResolvedValue(undefined);

    await deleteUserAction('user-456');

    expect(deleteConversationsCommand).toHaveBeenCalledWith('user-456');
    expect(deleteAnimalsCommand).not.toHaveBeenCalled();
    expect(deleteUserProfilePictureCommand).toHaveBeenCalledWith('user-456');
    expect(deleteUserCommand).toHaveBeenCalledWith('user-456');
  });

  it('should delete user with null userType', async () => {
    vi.mocked(getUserTypeCommand).mockResolvedValue(null);
    vi.mocked(deleteConversationsCommand).mockResolvedValue(undefined);
    vi.mocked(deleteUserProfilePictureCommand).mockResolvedValue(undefined);
    vi.mocked(deleteUserCommand).mockResolvedValue(undefined);

    await deleteUserAction('user-789');

    expect(deleteAnimalsCommand).not.toHaveBeenCalled();
    expect(deleteUserCommand).toHaveBeenCalledWith('user-789');
  });
});
