import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    default: 'session_default',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatMessageSchema);
