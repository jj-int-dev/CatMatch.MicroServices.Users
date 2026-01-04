import { PROFILE_PICTURE_STORAGE_BUCKET } from '../utils/constants';
import { supabase } from '../utils/supabaseClient';
import { users } from '../database-migrations/schema';
import { db } from '../utils/databaseClient';
import { eq } from 'drizzle-orm';

/**
 * @param userId The ID of the user whose profile picture should be deleted
 */
export default async function (userId: string): Promise<void> {
  const { data } = await supabase.storage
    .from(PROFILE_PICTURE_STORAGE_BUCKET)
    .list(userId);

  if (data && data.length === 0) {
    await supabase.storage
      .from(PROFILE_PICTURE_STORAGE_BUCKET)
      .remove(data.map((file) => `${userId}/${file.name}`));
  }

  await db
    .update(users)
    .set({
      avatarUrl: null
    })
    .where(eq(users.userId, userId))
    .returning();
}
