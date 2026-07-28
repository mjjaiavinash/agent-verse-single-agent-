import { personalFinanceChatAgent } from '../agents/PersonalFinanceChatAgent.js';
import { ChatMessage } from '../models/ChatMessage.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryChat } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const sendMessage = async (req, res, next) => {
  try {
    const { message, sessionId = 'session_default' } = req.body;

    logger.info(`[Personal Finance Chat Controller] Delegating message to PersonalFinanceChatAgent`);

    let history = [];
    if (getDBStatus()) {
      try {
        history = await ChatMessage.find({ sessionId }).sort({ createdAt: 1 }).limit(10);
      } catch (dbErr) {
        history = inMemoryChat;
      }
    } else {
      history = inMemoryChat;
    }

    // Execute Agent
    const botResponse = await personalFinanceChatAgent.execute({ message, history });

    const userPayload = { sender: 'user', message, sessionId, createdAt: new Date() };
    const botPayload = { sender: 'assistant', message: botResponse, sessionId, createdAt: new Date() };

    if (getDBStatus()) {
      try {
        await ChatMessage.create([userPayload, botPayload]);
      } catch (dbErr) {
        inMemoryChat.push(userPayload, botPayload);
      }
    } else {
      inMemoryChat.push(userPayload, botPayload);
    }

    return res.status(200).json({
      agent: "Personal Finance Chat",
      status: "success",
      result: {
        id: 'msg_' + Date.now(),
        userMessage: message,
        botResponse,
        sessionId,
        createdAt: botPayload.createdAt,
      }
    });

  } catch (error) {
    next(error);
  }
};

export const getChatHistory = async (req, res, next) => {
  try {
    let history = [];
    if (getDBStatus()) {
      try {
        history = await ChatMessage.find().sort({ createdAt: 1 }).limit(50);
      } catch (dbErr) {
        history = inMemoryChat;
      }
    } else {
      history = inMemoryChat;
    }

    return res.status(200).json({
      agent: "Personal Finance Chat",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
