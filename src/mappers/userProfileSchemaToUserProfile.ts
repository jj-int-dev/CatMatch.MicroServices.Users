import type { UserProfileSchema } from '../validators/database/userProfileValidator';

export type UserProfile = {
  email: string;
  displayName: string | null;
  phoneNumber: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  bio: string | null;
  userType: string | null;
} | null;

export function toUserProfile(
  userProfileSchema: UserProfileSchema
): UserProfile {
  if (userProfileSchema == null) return null;

  const {
    email,
    displayName,
    phoneNumber,
    gender,
    dateOfBirth,
    bio,
    userType
  } = userProfileSchema!;
  return {
    email,
    displayName,
    phoneNumber,
    gender,
    dateOfBirth,
    bio,
    userType: userType?.type ?? null
  };
}
