import deleteUserCommand from '../commands/deleteUserCommand';
import deleteUserProfilePictureCommand from '../commands/deleteUserProfilePictureCommand';
import { getUserTypeCommand } from '../commands/getUserTypeCommand';
import deleteConversationsCommand from '../commands/deleteConversationsCommand';
import deleteAnimalsCommand from '../commands/deleteAnimalsCommand';

/**
 * @param userId The ID of the user to delete
 */
export default async function (userId: string): Promise<void> {
  console.log('Entering DeleteUserAction ...');

  await deleteConversationsCommand(userId);

  const userType = await getUserTypeCommand(userId);
  if (userType === 'Rehomer') {
    await deleteAnimalsCommand(userId);
  }

  await deleteUserProfilePictureCommand(userId);
  await deleteUserCommand(userId);

  console.log(`Deleted user ${userId}. Exiting DeleteUserAction...`);
}
