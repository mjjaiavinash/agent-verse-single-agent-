import { errorResponse } from '../utils/response.util.js';

export const validateOrchestratorInput = (req, res, next) => {
  const { userQuery, prompt, message } = req.body;
  const query = userQuery || prompt || message;

  if (!query || typeof query !== 'string' || !query.trim()) {
    return errorResponse(
      res,
      'Validation Error: "userQuery" is required and must be a non-empty string.',
      400,
      'INVALID_QUERY'
    );
  }

  req.body.userQuery = query.trim();
  next();
};
