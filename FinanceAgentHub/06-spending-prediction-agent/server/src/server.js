import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.config.js';
import { connectDB } from './config/db.config.js';
import predictionRoutes from './routes/prediction.routes.js';
import { apiRateLimiter } from './middleware/rateLimiter.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import { logger } from './utils/logger.util.js';

const app = express();

connectDB();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:3005', config.corsOrigin] }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/', apiRateLimiter);

app.use('/api', predictionRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`==================================================`);
  logger.info(`Spending Prediction Agent running on Port ${config.port}`);
  logger.info(`Client Expected on: http://localhost:3005`);
  logger.info(`==================================================`);
});

export default app;
