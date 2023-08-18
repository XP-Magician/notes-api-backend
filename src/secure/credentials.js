import environment from '../utils/environment.js';

const MONGO_DB_URI = environment();
const APP_CREDENTIALS = {
  MONGO: MONGO_DB_URI
};
export default APP_CREDENTIALS;
