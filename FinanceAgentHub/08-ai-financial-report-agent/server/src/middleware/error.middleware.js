import { logger } from '../utils/logger.util.js';
import { errorResponse } from '../utils/response.util.js';

export class AppError extends Error {
  constructor(message, statusCode = 500, errorCode = 'INTERNAL_ERROR', details = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message, err.stack);

  const statusCode = err.statusCode || err.status || 500;
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred on the server.';

  return errorResponse(res, message, statusCode, errorCode, err.details || null);
};
