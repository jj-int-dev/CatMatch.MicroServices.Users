import { eq } from 'drizzle-orm';
import { db } from '../utils/databaseClient';
import { users } from '../database-migrations/schema';
import {
  userProfilePictureUrlValidator,
  type UserProfilePictureUrlSchema
} from '../validators/database/userProfilePictureUrlValidator';
import type { ZodSafeParseResult } from 'zod';

export type GetUserProfilePictureCommandResponse = Promise<
  ZodSafeParseResult<UserProfilePictureUrlSchema>
>;

/**
 *
 * @param userId The ID of the user whose profile picture url should be fetched
 * @returns A {@link GetUserProfilePictureCommandResponse}
 */
export async function getUserProfilePictureCommand(
  userId: string
): GetUserProfilePictureCommandResponse {
  return userProfilePictureUrlValidator.safeParse(
    await db.query.users.findFirst({
      columns: { avatarUrl: true },
      where: eq(users.userId, userId)
    })
  );
}
