import { getUserProfileCommand } from '../commands/getUserProfileCommand';
import HttpResponseError from '../dtos/httpResponseError';

export type GetUserProfileActionResponse = Promise<{
  email: string;
  displayName: string | null;
  phoneNumber: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  bio: string | null;
  userType: string | null;
}>;

/**
 *
 * @param userId The ID of the user whose profile picture should be fetched
 * @returns A {@link GetUserProfileActionResponse}
 * @throws A {@link HttpResponseError} When no user data was returned from the database
 */
export async function getUserProfileAction(
  userId: string
): GetUserProfileActionResponse {
  console.log('Entering GetUserProfileAction ...');
  const { success, data, error } = await getUserProfileCommand(userId);

  if (success && data?.length > 0) {
    console.log(
      `Successfully retrieved profile for user with userId ${userId}\nExiting GetUserProfilePictureAction ...`
    );
    return data[0]!;
  }

  const errorMsg = `Could not find the profile for user ${userId}`;
  const moreDetails = error?.message ? `: ${error.message}` : '';
  console.error(`${errorMsg}${moreDetails}`);
  throw new HttpResponseError(500, errorMsg);
}
