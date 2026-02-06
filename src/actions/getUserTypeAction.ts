import { getUserTypeCommand } from '../commands/getUserTypeCommand';

/**
 * @param userId The ID of the user whose type should be fetched
 * @returns The user's type
 */
export async function getUserTypeAction(
  userId: string
): Promise<string | null> {
  console.log('Entering GetUserTypeAction ...');
  const userType = await getUserTypeCommand(userId);
  console.log(
    `User with userId ${userId} has user type: ${userType}\nExiting GetUserTypeAction ...`
  );
  return userType;
}
