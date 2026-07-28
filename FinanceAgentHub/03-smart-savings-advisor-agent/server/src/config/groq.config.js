import Groq from 'groq-sdk';
import { config } from './env.config.js';

export const groqClient = new Groq({
  apiKey: config.groqApiKey || 'placeholder_key',
});
