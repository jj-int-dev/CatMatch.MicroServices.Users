import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { userSearchPreferences } from '../database-migrations/schema';
import {
  discoveryPreferencesValidator,
  type DiscoveryPreferencesSchema
} from '../validators/database/discoveryPreferencesValidator';
import type { ZodSafeParseResult } from 'zod';

export type GetDiscoveryPreferencesCommandResponse = Promise<
  ZodSafeParseResult<DiscoveryPreferencesSchema>
>;

/**
 *
 * @param userId The ID of the user whose discovery preferences should be updated
 * @returns A {@link GetDiscoveryPreferencesCommandResponse}
 */
export async function getDiscoveryPreferencesCommand(
  userId: string
): GetDiscoveryPreferencesCommandResponse {
  return discoveryPreferencesValidator.safeParse(
    await db.query.userSearchPreferences.findFirst({
      columns: {
        minAgeMonths: true,
        maxAgeMonths: true,
        gender: true,
        maxDistanceKm: true,
        neutered: true
      },
      where: eq(userSearchPreferences.userId, userId)
    })
  );
}
