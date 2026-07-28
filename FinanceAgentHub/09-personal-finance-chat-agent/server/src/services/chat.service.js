import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class ChatService {
  async processChatMessage({ message, history = [] }) {
    const messagesPayload = [
      {
        role: 'system',
        content: 'You are Personal Finance Chat Agent, an empathetic, highly knowledgeable AI personal finance consultant. You provide clear, structured financial advice using markdown formatting (bullet points, bold highlights, headers). Always encourage healthy financial habits.'
      },
      ...history.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.message
      })),
      { role: 'user', content: message }
    ];

    try {
      logger.info(`Calling Groq API for Chat message: "${message.substring(0, 30)}..."`);
      const completion = await groqClient.chat.completions.create({
        messages: messagesPayload,
        model: 'llama3-8b-8192',
        temperature: 0.5,
        max_tokens: 1000,
      });

      return completion.choices[0]?.message?.content || "I apologize, I couldn't process that query.";
    } catch (error) {
      logger.warn(`Groq API chat service fallback activated: ${error.message}`);
      return this.heuristicChatResponse({ message });
    }
  }

  heuristicChatResponse({ message }) {
    const lower = message.toLowerCase();
    if (lower.includes('emergency') || lower.includes('fund')) {
      return "An **Emergency Reserve Fund** should cover **3 to 6 months** of fixed living obligations in a liquid High-Yield Savings Account (HYSA).

### Recommended Steps:
1. **Identify Fixed Costs**: Calculate monthly rent, groceries, and debt payments.
2. **Set Initial Goal**: Reach $1,000 first as a cushion.
3. **Automate Transfers**: Set up payday transfers to your HYSA.";
    }
    if (lower.includes('budget') || lower.includes('50/30/20')) {
      return "The **50/30/20 Budgeting Rule** is an effective allocation framework:

- **50% Needs**: Housing, utilities, groceries, transit
- **30% Wants**: Dining out, entertainment, shopping
- **20% Savings**: Emergency fund, investments, debt acceleration";
    }
    if (lower.includes('debt') || lower.includes('loan') || lower.includes('credit')) {
      return "Two primary debt payoff strategies:

1. **Debt Avalanche**: Pay off highest interest rate debt first to minimize total interest paid.
2. **Debt Snowball**: Pay off smallest balances first to build quick psychological momentum.";
    }

    return `I received your query regarding: "${message}".

To build wealth effectively:
- Track monthly cash inflows vs outflows.
- Maintain a liquid emergency fund.
- Automate low-cost index fund investments.`;
  }
}

export const chatService = new ChatService();
