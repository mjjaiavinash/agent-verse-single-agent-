export const successResponse = (res, data = null, message = 'Success', statusCode = 200, meta = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  });
};

export const errorResponse = (res, message = 'An error occurred', statusCode = 500, errorCode = 'SERVER_ERROR', details = null) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
};
