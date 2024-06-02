import mongoose from 'mongoose';

import { env } from '../utils/env.js';
import { MONGO_VARS } from '../constants/index.js';

export const initMongoDb = async () => {
  try {
    const user = env(MONGO_VARS.MONGODB_USER);
    const password = env(MONGO_VARS.MONGODB_PASSWORD);
    const url = env(MONGO_VARS.MONGODB_URL);
    const db = env(MONGO_VARS.MONGODB_DB, '');

    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`,
    );
    console.log('MongoDb connected');
  } catch (error) {
    console.log('Error while connection to database\n', error);
    throw error;
    // process.exit(1);
  }
};
