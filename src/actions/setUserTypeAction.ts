import { getUserTypeIdCommand } from '../commands/getUserTypeIdCommand';
import setUserTypeCommand from '../commands/setUserTypeCommand';
import HttpResponseError from '../dtos/httpResponseError';

/**
 *
 * @param userId The ID of the user whose user type should be set
 * @param userType The type to assign to the user
 * @throws A {@link HttpResponseError} When the user's type could not be set
 */
export default async function (
  userId: string,
  userType: string
): Promise<void> {
  console.log('Entering SetUserTypeAction...');

  const { success, data, error } = await getUserTypeIdCommand(userType);

  if (!success || !data) {
    console.error(
      `Could not find the userTypeId of the provided user type ${userType}: ${error.message}`
    );
    throw new HttpResponseError(400, 'Invalid user type');
  }

  const numUpdatedRows = await setUserTypeCommand(userId, data.userTypeId);

  if (numUpdatedRows !== 1) {
    const baseErrorMsg = 'Error occurred while setting user type';
    console.error(`${baseErrorMsg}. ${numUpdatedRows} record(s) updated`);
    throw new HttpResponseError(500, baseErrorMsg);
  }

  console.log(
    `Successfully set the type of the user with userId ${userId} to ${userType}. Exiting SetUserTypeAction...`
  );
}
