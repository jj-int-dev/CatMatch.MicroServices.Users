import { axiosMessagesClient } from '../utils/axiosClient';
import config from '../config/config';

export default async function (userId: string): Promise<void> {
  try {
    await axiosMessagesClient.delete(
      `${config.MESSAGES_MICROSERVICE_BASE_URL}/${userId}/conversations`
    );
  } catch (error) {
    console.error(
      `Error deleting conversations for user ${userId}: ${(error as Error).message}`
    );
  }
}
