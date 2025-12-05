import {
  ALLOWED_FILE_TYPES,
  PROFILE_PICTURE_STORAGE_BUCKET
} from '../utils/constants';
import { supabase } from '../utils/supabaseClient';

export type ImageUploadResponse = Promise<{
  error?: string;
  publicUrl?: string;
}>;

/**
 *
 * @param userId The ID of the user whose profile picture should be updated
 * @param profilePicture The image file to upload
 * @returns An {@link ImageUploadResponse}
 */
export async function uploadUserProfilePictureCommand(
  userId: string,
  profilePicture: Express.Multer.File
): ImageUploadResponse {
  const picturePath = `${userId}/profile_picture.${ALLOWED_FILE_TYPES[profilePicture.mimetype]}`;

  const { error: uploadError } = await supabase.storage
    .from(PROFILE_PICTURE_STORAGE_BUCKET)
    .upload(picturePath, profilePicture.buffer, {
      contentType: profilePicture.mimetype,
      upsert: true // overwrite if already exists
    });

  if (uploadError) return { error: uploadError.message };

  // verify that file now exists in the storage bucket by attempting to download it
  const { error: downloadError } = await supabase.storage
    .from(PROFILE_PICTURE_STORAGE_BUCKET)
    .download(picturePath);

  if (downloadError) return { error: downloadError.message };

  // file exists, return the public URL
  return {
    publicUrl: supabase.storage
      .from(PROFILE_PICTURE_STORAGE_BUCKET)
      .getPublicUrl(picturePath).data.publicUrl
  };
}
