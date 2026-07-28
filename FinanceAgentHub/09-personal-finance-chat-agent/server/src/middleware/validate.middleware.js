import { errorResponse } from '../utils/response.util.js';

export const validateChatInput = (req, res, next) => {
  const { message, prompt } = req.body;
  const userText = message || prompt;

  if (!userText || typeof userText !== 'string' || !userText.trim()) {
    return errorResponse(
      res,
      'Validation Error: "message" is required and must be a non-empty string.',
      400,
      'INVALID_MESSAGE'
    );
  }

  req.body.message = userText.trim();

  next();
};
