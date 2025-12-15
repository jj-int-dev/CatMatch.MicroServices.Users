import { db } from '../utils/databaseClient';
import { sql } from 'drizzle-orm';
import type { DiscoveryPreferencesSchema } from '../validators/requests/discoveryPreferencesValidator';

/**
 *
 * @param userId The ID of the user whose discovery preferences should be updated
 * @param discoveryPreferences Thenew discovery preferences to set for the user
 * @returns The amount of rows in the database that were updated
 */
export default async function (
  userId: string,
  discoveryPreferences: DiscoveryPreferencesSchema
): Promise<number> {
  const updatedRows = await db.execute(sql`
      UPDATE user_search_preferences
      SET
        min_age_months = ${discoveryPreferences.minAge},
        max_age_months = ${discoveryPreferences.maxAge},
        gender = ${discoveryPreferences.gender},
        max_distance_km = ${discoveryPreferences.maxDistanceKm},
        neutered = ${discoveryPreferences.neutered},
        location_display_name = ${discoveryPreferences.locationDisplayName},
        location = ST_SetSRID(ST_MakePoint(${discoveryPreferences.searchLocLongitude}, ${discoveryPreferences.searchLocLatitude}), 4326)::geography
      WHERE user_id = ${userId}
      RETURNING *;`);

  // Return the number of updated rows
  return updatedRows.length;
}
