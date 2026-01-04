import deleteUserProfilePictureCommand from '../commands/deleteUserProfilePictureCommand';

/**
 * @param userId The ID of the user whose profile picture should be deleted
 */
export default async function (userId: string): Promise<void> {
  console.log('Entering DeleteUserProfilePictureAction ...');

  await deleteUserProfilePictureCommand(userId);

  console.log(
    `Deleted profile picture for user ${userId}. Exiting DeleteUserProfilePictureAction...`
  );
}
