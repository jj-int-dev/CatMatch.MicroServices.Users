import { users, usertypes } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';

/**
 *
 * @param userId The ID of the user whose user type should be fetched
 * @returns The user's type
 */
export async function getUserTypeCommand(
  userId: string
): Promise<string | null> {
  const [result] = await db
    .select({ userType: usertypes.type })
    .from(usertypes)
    .innerJoin(users, eq(usertypes.userTypeId, users.userTypeId))
    .where(eq(users.userId, userId))
    .limit(1);

  return result?.userType ?? null;
}
