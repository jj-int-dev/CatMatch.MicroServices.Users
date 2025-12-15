import { sql } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
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
  const records = await db.execute(sql`
      SELECT
        min_age_months AS minAgeMonths,
        max_age_months AS maxAgeMonths,
        gender,
        max_distance_km AS maxDistanceKm,
        neutered,
        location_display_name AS locationDisplayName,
        ST_Y(location::geometry) AS searchLocLatitude,
        ST_X(location::geometry) AS searchLocLongitude
      FROM user_search_preferences
      WHERE user_id = ${userId};
    `);

  return discoveryPreferencesValidator.safeParse(
    Array.isArray(records) && records.length > 0 ? records[0] : null
  );
}
