import { usertypes } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';
import {
  userTypeIdValidator,
  type UserTypeIdSchema
} from '../validators/database/userTypeIdValidator';
import type { ZodSafeParseResult } from 'zod';

export type GetUserTypeIdCommandResponse = Promise<
  ZodSafeParseResult<UserTypeIdSchema>
>;

/**
 *
 * @param userId The ID of the user whose user type ID should be fetched
 * @returns A {@link GetUserTypeIdCommandResponse}
 */
export async function getUserTypeIdCommand(
  userType: string
): GetUserTypeIdCommandResponse {
  return userTypeIdValidator.safeParse(
    await db.query.usertypes.findFirst({
      columns: { userTypeId: true },
      where: eq(usertypes.type, userType)
    })
  );
}
