import { db } from '../utils/databaseClient';
import { users } from '../database-migrations/schema';
import { eq } from 'drizzle-orm';
import { supabaseAdmin } from '../utils/supabaseClient';

/**
 * @param userId The ID of the user to delete
 */
export default async function (userId: string): Promise<void> {
  // delete user from db
  await db.delete(users).where(eq(users.userId, userId));

  // delete user from supabase
  await supabaseAdmin.auth.admin.deleteUser(userId);
}
