import { axiosRehomersClient } from '../utils/axiosClient';
import config from '../config/config';

export default async function (userId: string): Promise<void> {
  try {
    await axiosRehomersClient.delete(
      `${config.ANIMALS_MICROSERVICE_REHOMER_BASE_URL}/${userId}/remove-all-animals`
    );
  } catch (error) {
    console.error(
      `Error deleting animals for user ${userId}: ${(error as Error).message}`
    );
  }
}
