import { Router, type Request, type Response } from 'express';
import isAuthorized from '../validators/requests/isAuthorized';
import userIdValidator from '../validators/requests/userIdValidator';
import getUserProfilePictureAction from '../actions/getUserProfilePictureAction';
import { getUserProfileAction } from '../actions/getUserProfileAction';
import userCanMakeUserUpdatesValidator from '../validators/requests/userCanMakeUserUpdatesValidator';
import userProfilePictureValidator from '../validators/requests/userProfilePictureValidator';
import {
  type UserProfileDataSchema,
  userProfileDataValidator
} from '../validators/requests/userProfileDataValidator';
import { userTypeValidator } from '../validators/requests/userTypeValidator';
import { updateUserProfileAction } from '../actions/updateUserProfileAction';
import updateUserTypeAction from '../actions/updateUserTypeAction';
import getErrorResponseJson from '../utils/getErrorResponseJson';
import updateUserProfilePictureAction from '../actions/updateUserProfilePictureAction';
import deleteUserProfilePictureAction from '../actions/deleteUserProfilePictureAction';
import { getUserTypeAction } from '../actions/getUserTypeAction';
import deleteUserAction from '../actions/deleteUserAction';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT access token obtained from authentication
 *     RefreshToken:
 *       type: apiKey
 *       in: header
 *       name: refresh-token
 *       description: Refresh token for session management
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         displayName:
 *           type: string
 *           nullable: true
 *           description: User's display name
 *         phoneNumber:
 *           type: string
 *           nullable: true
 *           description: User's phone number in E.164 format
 *         gender:
 *           type: string
 *           nullable: true
 *           enum: [Man, Woman, '']
 *           description: User's gender
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: User's date of birth in ISO format (YYYY-MM-DD)
 *         bio:
 *           type: string
 *           nullable: true
 *           description: User's biography text
 *         userType:
 *           type: string
 *           nullable: true
 *           enum: [Rehomer, Adopter]
 *           description: Type of user (Rehomer or Adopter)
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         error:
 *           type: string
 *           description: Detailed error description
 */

/**
 * @swagger
 * /api/users/{userId}/profile-picture:
 *   get:
 *     summary: Get user profile picture URL
 *     description: Retrieves the profile picture URL for a specific user. Requires authentication with valid access token and refresh token. The authenticated user must have authorization to view the profile picture.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *       - RefreshToken: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose profile picture URL is to be fetched
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's profile picture URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarUrl:
 *                   type: string
 *                   format: uri
 *                   description: URL of the user's profile picture
 *                   example: https://example.com/profile-pictures/user123.jpg
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/:userId/profile-picture',
  isAuthorized,
  userIdValidator,
  async (req: Request, res: Response) => {
    try {
      const avatarUrl = await getUserProfilePictureAction(req.params.userId!);
      return res.status(200).json({ avatarUrl });
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

/**
 * @swagger
 * /api/users/{userId}/type:
 *   get:
 *     summary: Get user type
 *     description: Retrieves the user type (Rehomer or Adopter) for a specific user. Requires authentication with valid access token and refresh token.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *       - RefreshToken: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose type is to be fetched
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully retrieved the user type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userType:
 *                   type: string
 *                   enum: [Rehomer, Adopter]
 *                   description: The type of user
 *                   example: Adopter
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found or user type not set
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/:userId/type',
  isAuthorized,
  userIdValidator,
  async (req: Request, res: Response) => {
    try {
      const userType = await getUserTypeAction(req.params.userId!);
      return res.status(200).json({ userType });
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

/**
 * @swagger
 * /api/users/{userId}/profile:
 *   get:
 *     summary: Get user profile details
 *     description: Retrieves complete profile information for a specific user including email, display name, phone number, gender, date of birth, bio, and user type. Requires authentication with valid access token and refresh token.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *       - RefreshToken: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose profile data is to be fetched
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's profile details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
  '/:userId/profile',
  isAuthorized,
  userIdValidator,
  async (req: Request, res: Response) => {
    try {
      const userProfile = await getUserProfileAction(req.params.userId!);
      return res.status(200).json(userProfile);
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

/**
 * @swagger
 * /api/users/{userId}/profile:
 *   patch:
 *     summary: Update user profile
 *     description: Updates one or more profile fields for a specific user. Only the authenticated user can update their own profile. Fields can be set to empty strings to clear previously set values. All fields are optional in the request body.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *       - RefreshToken: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose profile is to be updated
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 description: User's display name (required if provided, 1-200 characters)
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number in E.164 format or empty string to clear
 *                 example: '+1234567890'
 *               gender:
 *                 type: string
 *                 enum: [Man, Woman, '']
 *                 description: User's gender or empty string to clear
 *                 example: Man
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth in ISO format (YYYY-MM-DD), must be before today, or empty string to clear
 *                 example: '1990-01-15'
 *               bio:
 *                 type: string
 *                 description: User biography text (can be empty string)
 *                 example: 'Cat lover and animal advocate'
 *               userType:
 *                 type: string
 *                 enum: [Rehomer, Adopter]
 *                 description: Type of user (optional)
 *                 example: Adopter
 *     responses:
 *       200:
 *         description: Successfully updated the user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userProfile:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Invalid request - validation errors in the provided data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - User is not authorized to update this profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch(
  '/:userId/profile',
  isAuthorized,
  userIdValidator,
  userCanMakeUserUpdatesValidator,
  userProfileDataValidator,
  async (req: Request, res: Response) => {
    try {
      const updatedUserProfile = await updateUserProfileAction(
        req.params.userId!,
        req.body as UserProfileDataSchema
      );
      return res.status(200).json({ userProfile: updatedUserProfile });
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

/**
 * @swagger
 * /api/users/{userId}/user-type:
 *   put:
 *     summary: Update user type
 *     description: Updates the user type (Rehomer or Adopter) for a specific user. Only the authenticated user can update their own user type. This endpoint replaces the entire user type value.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *       - RefreshToken: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose type is to be updated
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userType
 *             properties:
 *               userType:
 *                 type: string
 *                 enum: [Rehomer, Adopter]
 *                 description: The new user type to set
 *                 example: Adopter
 *     responses:
 *       200:
 *         description: Successfully updated the user type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userType:
 *                   type: string
 *                   enum: [Rehomer, Adopter]
 *                   description: The updated user type
 *                   example: Adopter
 *       400:
 *         description: Invalid request - user type must be either Rehomer or Adopter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - User is not authorized to update this user type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  '/:userId/user-type',
  isAuthorized,
  userIdValidator,
  userCanMakeUserUpdatesValidator,
  userTypeValidator,
  async (req: Request, res: Response) => {
    try {
      const result = await updateUserTypeAction(
        req.params.userId!,
        req.body.userType as string
      );
      return res.status(200).json(result);
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

/**
 * @swagger
 * /api/users/{userId}/profile-picture:
 *   put:
 *     summary: Upload or update user profile picture
 *     description: Uploads a new profile picture or replaces an existing one for a specific user. Only the authenticated user can update their own profile picture. Accepts JPG, PNG, or WEBP image files up to 1MB in size.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *       - RefreshToken: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose profile picture is to be updated
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - profile_picture
 *             properties:
 *               profile_picture:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPG, PNG, or WEBP) with maximum size of 1MB
 *     responses:
 *       200:
 *         description: Successfully uploaded the profile picture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 avatarUrl:
 *                   type: string
 *                   format: uri
 *                   description: URL of the newly uploaded profile picture
 *                   example: https://example.com/profile-pictures/user123.jpg
 *       400:
 *         description: Invalid request - file validation error (missing file, wrong format, or file too large)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - User is not authorized to update this profile picture
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  '/:userId/profile-picture',
  isAuthorized,
  userIdValidator,
  userCanMakeUserUpdatesValidator,
  userProfilePictureValidator,
  async (req: Request, res: Response) => {
    try {
      const updatedAvatarUrl = await updateUserProfilePictureAction(
        req.params.userId!,
        req.file!
      );
      return res.status(200).json({ avatarUrl: updatedAvatarUrl });
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

/**
 * @swagger
 * /api/users/{userId}/profile-picture:
 *   delete:
 *     summary: Delete user profile picture
 *     description: Deletes the profile picture for a specific user and removes the reference from the database. Only the authenticated user can delete their own profile picture. Returns 204 No Content on successful deletion.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *       - RefreshToken: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose profile picture is to be deleted
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Successfully deleted the profile picture (No Content)
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - User is not authorized to delete this profile picture
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User or profile picture not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  '/:userId/profile-picture',
  isAuthorized,
  userIdValidator,
  userCanMakeUserUpdatesValidator,
  async (req: Request, res: Response) => {
    try {
      await deleteUserProfilePictureAction(req.params.userId!);
      return res.sendStatus(204);
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Delete user account
 *     description: Permanently deletes a user account along with all associated data including profile information, profile picture, animals, and conversations. Only the authenticated user can delete their own account. This action cannot be undone. Returns 204 No Content on successful deletion.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *       - RefreshToken: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user account to be deleted
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Successfully deleted the user account (No Content)
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized - Invalid or missing authentication tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - User is not authorized to delete this account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  '/:userId',
  isAuthorized,
  userIdValidator,
  userCanMakeUserUpdatesValidator,
  async (req: Request, res: Response) => {
    try {
      await deleteUserAction(req.params.userId!);
      return res.sendStatus(204);
    } catch (error) {
      return getErrorResponseJson(error, res);
    }
  }
);

export default router;
