import * as z from 'zod';

export const userProfilePictureUrlAndTypeValidator = z
  .object({
    avatarUrl: z
      .string()
      .regex(/^https:\/\/.+/)
      .nullable(),
    userType: z.object({ type: z.enum(['Rehomer', 'Adopter']) }).nullable()
  })
  .optional();

export type UserProfilePictureUrlAndTypeSchema = z.infer<
  typeof userProfilePictureUrlAndTypeValidator
>;
