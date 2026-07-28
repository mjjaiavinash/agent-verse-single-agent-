import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5005,
  nodeEnv: process.env.NODE_ENV || 'development',
  groqApiKey: process.env.GROQ_API_KEY || '',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/spending_prediction_db',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3005',
};
