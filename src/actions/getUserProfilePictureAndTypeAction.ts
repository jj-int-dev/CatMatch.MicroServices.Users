import { getUserProfilePictureAndTypeCommand } from '../commands/getUserProfilePictureAndTypeCommand';
import HttpResponseError from '../dtos/httpResponseError';
import type { UserProfilePictureAndType } from '../dtos/userProfilePictureAndType';

export type GetUserProfilePictureAndTypeActionResponse =
  Promise<UserProfilePictureAndType>;

/**
 *
 * @param userId The ID of the user whose profile picture url and user type should be fetched
 * @returns The profile picture url and user type
 * @throws A {@link HttpResponseError} When a valid image url and user type could not be fetched from the database
 */
export async function getUserProfilePictureAndTypeAction(
  userId: string
): GetUserProfilePictureAndTypeActionResponse {
  console.log('Entering GetUserProfilePictureAndTypeAction ...');

  const { success, data, error } =
    await getUserProfilePictureAndTypeCommand(userId);

  if (success && data) {
    const userPicAndType: UserProfilePictureAndType = {
      avatarUrl: data.avatarUrl,
      userType: data.userType?.type ?? null
    };
    console.log(
      `Successfully retrieved profile picture url and type for user with userId ${userId}:` +
        `\nUser type: ${userPicAndType.userType}, Picture Url: ${userPicAndType.avatarUrl}` +
        `\nExiting GetUserProfilePictureAndTypeAction ...`
    );
    return userPicAndType;
  }

  const errorMsg = `Could not fetch the profile picture url and user type for user ${userId}`;
  const moreDetails = error?.message ? `: ${error.message}` : '';
  console.error(`${errorMsg}${moreDetails}`);
  throw new HttpResponseError(500, errorMsg);
}
