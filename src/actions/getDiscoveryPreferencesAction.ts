import { getDiscoveryPreferencesCommand } from '../commands/getDiscoveryPreferencesCommand';
import type { DiscoveryPreferencesSchema } from '../validators/database/discoveryPreferencesValidator';
import HttpResponseError from '../dtos/httpResponseError';

export type GetDiscoveryPreferencesActionResponse =
  Promise<DiscoveryPreferencesSchema>;

/**
 *
 * @param userId The ID of the user whose discovery preferences should be fetched
 * @returns A {@link GetDiscoveryPreferencesActionResponse}
 * @throws A {@link HttpResponseError} If an error occurred while fetching the discovery preferences
 */
export async function getDiscoveryPreferencesAction(
  userId: string
): GetDiscoveryPreferencesActionResponse {
  console.log('Entering GetDiscoveryPreferencesAction ...');
  const { success, data, error } = await getDiscoveryPreferencesCommand(userId);

  if (success) {
    console.log(
      `Successfully retrieved discovery preferences for user with userId ${userId}\nExiting GetDiscoveryPreferencesAction ...`
    );
    return data;
  }

  const errorMsg = `Error occurred while fetching the discovery preferences of user ${userId}`;
  const moreDetails = error?.message ? `: ${error.message}` : '';
  console.error(`${errorMsg}${moreDetails}`);
  throw new HttpResponseError(500, errorMsg);
}
