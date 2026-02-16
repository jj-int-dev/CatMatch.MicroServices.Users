import * as z from 'zod';

export const userProfileValidator = z.array(
  z.object({
    email: z.email(),
    displayName: z.string().nullable(),
    phoneNumber: z.string().nullable(),
    gender: z.enum(['Man', 'Woman', '']).nullable(),
    bio: z.string().nullable(),
    userType: z.enum(['Rehomer', 'Adopter']).nullable(),
    dateOfBirth: z
      .string()
      .refine(
        (date) => {
          if (!date) return true;
          const parsedDate = new Date(date);
          return !isNaN(parsedDate.getTime()) && parsedDate < new Date();
        },
        {
          message: 'Date of birth must be before today'
        }
      )
      .nullable()
  })
);

export type UserProfileSchema = z.infer<typeof userProfileValidator>;
