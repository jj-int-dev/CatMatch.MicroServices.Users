import * as z from 'zod';

export const userProfileValidator = z.array(
  z.object({
    email: z.email(),
    displayName: z.string().nullable(),
    phoneNumber: z.e164().nullable(),
    gender: z.enum(['Man', 'Woman', '']).nullable(),
    bio: z.string().nullable(),
    userType: z.enum(['Rehomer', 'Adopter']).nullable(),
    dateOfBirth: z.iso
      .date()
      .refine((date) => new Date(date) < new Date(), {
        message: 'Date of birth must be before today'
      })
      .nullable()
  })
);

export type UserProfileSchema = z.infer<typeof userProfileValidator>;
