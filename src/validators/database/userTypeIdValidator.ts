import * as z from 'zod';

export const userTypeIdValidator = z.object({
  userTypeId: z.string().min(1)
});

export type UserTypeIdSchema = z.infer<typeof userTypeIdValidator>;
