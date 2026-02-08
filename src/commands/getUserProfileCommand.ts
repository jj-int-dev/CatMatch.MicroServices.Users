import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { users, usertypes } from '../database-migrations/schema';
import {
  userProfileValidator,
  type UserProfileSchema
} from '../validators/database/userProfileValidator';
import type { ZodSafeParseResult } from 'zod';

export type GetUserProfileCommandResponse = Promise<
  ZodSafeParseResult<UserProfileSchema>
>;

/**
 *
 * @param userId The ID of the user whose profile should be fetched
 * @returns A {@link GetUserProfileCommandResponse}
 */
export async function getUserProfileCommand(
  userId: string
): GetUserProfileCommandResponse {
  return userProfileValidator.safeParse(
    await db
      .select({
        email: users.email,
        displayName: users.displayName,
        phoneNumber: users.phoneNumber,
        gender: users.gender,
        dateOfBirth: users.dateOfBirth,
        bio: users.bio,
        userType: usertypes.type
      })
      .from(users)
      .leftJoin(usertypes, eq(users.userTypeId, usertypes.userTypeId))
      .where(eq(users.userId, userId))
  );
}
