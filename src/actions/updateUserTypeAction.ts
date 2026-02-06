import { getUserTypeCommand } from '../commands/getUserTypeCommand';
import deleteConversationsCommand from '../commands/deleteConversationsCommand';
import deleteAnimalsCommand from '../commands/deleteAnimalsCommand';
import setUserTypeAction from './setUserTypeAction';

export type UpdateUserTypeActionResponse = {
  userType: string;
  deletedUserData: boolean;
};

/**
 *
 * @param userId The ID of the user
 * @param userType The type to update the user to
 */
export default async function (
  userId: string,
  userType: string
): Promise<UpdateUserTypeActionResponse> {
  console.log('Entering UpdateUserTypeAction...');

  const currentUserType = await getUserTypeCommand(userId);

  if (!currentUserType) {
    console.log(`User ${userId} does not have a type yet.`);
    await setUserTypeAction(userId, userType);
    console.log('Exiting UpdateUserTypeAction...');
    return { userType, deletedUserData: false };
  }

  await deleteConversationsCommand(userId);

  if (currentUserType === 'Rehomer') {
    await deleteAnimalsCommand(userId);
  }

  await setUserTypeAction(userId, userType);
  console.log('Exiting UpdateUserTypeAction...');
  return { userType, deletedUserData: true };
}
