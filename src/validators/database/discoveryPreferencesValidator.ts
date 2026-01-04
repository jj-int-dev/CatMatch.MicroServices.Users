import * as z from 'zod';

export const discoveryPreferencesValidator = z
  .object({
    minAge: z.number().min(0).nullable(),
    maxAge: z.number().max(480).nullable(),
    gender: z.enum(['', 'Male', 'Female']),
    maxDistanceKm: z.number().min(1).max(250).nullable(),
    neutered: z.boolean().nullable(),
    locationDisplayName: z.string().nullable(),
    searchLocLatitude: z.number(),
    searchLocLongitude: z.number()
  })
  .nullish();

export type DiscoveryPreferencesSchema = z.infer<
  typeof discoveryPreferencesValidator
>;
