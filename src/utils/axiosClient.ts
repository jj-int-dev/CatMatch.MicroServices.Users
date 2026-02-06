import config from '../config/config';
import axios from 'axios';

const axiosRehomersClient = axios.create({
  baseURL: config.ANIMALS_MICROSERVICE_REHOMER_BASE_URL,
  timeout: 30000
});

const axiosMessagesClient = axios.create({
  baseURL: config.MESSAGES_MICROSERVICE_BASE_URL,
  timeout: 30000
});

export { axiosRehomersClient, axiosMessagesClient };
