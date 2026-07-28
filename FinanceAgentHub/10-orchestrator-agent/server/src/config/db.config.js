import mongoose from 'mongoose';
import { config } from './env.config.js';
import { logger } from '../utils/logger.util.js';

let isMongoConnected = false;

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isMongoConnected = true;
    logger.info(`MongoDB Connected: ${config.mongodbUri}`);
  } catch (error) {
    isMongoConnected = false;
    logger.warn(`MongoDB Connection warning: ${error.message}. Operating with in-memory fallback persistence.`);
  }
};

export const getDBStatus = () => isMongoConnected;
