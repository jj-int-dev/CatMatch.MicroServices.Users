import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { users } from '../database-migrations/schema';
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
    await db.query.users.findFirst({
      columns: {
        email: true,
        displayName: true,
        phoneNumber: true,
        gender: true,
        dateOfBirth: true,
        bio: true
      },
      with: {
        userType: {
          columns: { type: true }
        }
      },
      where: eq(users.userId, userId)
    })
  );
}
