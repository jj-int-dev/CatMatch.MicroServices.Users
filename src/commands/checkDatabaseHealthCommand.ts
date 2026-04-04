import { sql } from 'drizzle-orm';
import { db } from '../utils/databaseClient';

export default async function (): Promise<void> {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('Database connection is healthy.');
  } catch (error) {
    throw new Error(
      `Database connection failed${error instanceof Error ? ': ' + error.message : '.'}`
    );
  }
}
