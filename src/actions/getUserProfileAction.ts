import { getUserProfileCommand } from '../commands/getUserProfileCommand';
import userProfileSchemaToUserProfile from '../mappers/userProfileSchemaToUserProfile';
import type { UserProfile } from '../dtos/userProfile';
import HttpResponseError from '../dtos/httpResponseError';

export type GetUserProfileActionResponse = Promise<UserProfile>;

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

  if (success && data) {
    const profileDetails = userProfileSchemaToUserProfile(data);
    console.log(
      `Successfully retrieved profile for user with userId ${userId}\nExiting GetUserProfilePictureAction ...`
    );
    return profileDetails;
  }

  const errorMsg = `Could not find the profile for user ${userId}`;
  const moreDetails = error?.message ? `: ${error.message}` : '';
  console.error(`${errorMsg}${moreDetails}`);
  throw new HttpResponseError(500, errorMsg);
}
