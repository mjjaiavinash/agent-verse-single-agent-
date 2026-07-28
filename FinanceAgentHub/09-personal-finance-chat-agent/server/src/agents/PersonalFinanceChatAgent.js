import { groqClient } from '../config/groq.config.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export class PersonalFinanceChatAgent {
  constructor() {
    this.name = "Personal Finance Chat Agent";
    this.description = "Autonomous AI Agent specialized in conversational financial consultation.";
    this.mission = "To engage in intelligent financial dialogue using Markdown formatting.";
  }

  async execute({ message, history = [] }) {
    if (!config.groqApiKey || config.groqApiKey.includes('your_groq_api_key')) {
      logger.info(`[${this.name}] Proactive fallback activated (Groq API Key omitted/placeholder).`);
      return this.heuristicFallback({ message });
    }

    try {
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are Personal Finance Chat Agent. Respond with markdown guidance.' },
          ...history.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.message })),
          { role: 'user', content: message }
        ],
        model: 'llama-3.1-8b-instant',
        temperature: 0.5,
        max_tokens: 1000,
      });
      return completion.choices[0]?.message?.content || "I apologize, I couldn't process that query.";
    } catch (error) {
      logger.warn(`[${this.name}] Reactive fallback activated: ${error.message}`);
      return this.heuristicFallback({ message });
    }
  }

  heuristicFallback({ message }) {
    const lower = message.toLowerCase();
    if (lower.includes('emergency') || lower.includes('fund')) {
      return "An **Emergency Reserve Fund** should cover **3 to 6 months** of fixed living obligations in a liquid High-Yield Savings Account (HYSA).

### Recommended Steps:
1. **Identify Fixed Costs**: Calculate monthly rent, groceries, and debt payments.
2. **Set Initial Goal**: Reach ₹1,000 first as a cushion.
3. **Automate Transfers**: Set up payday transfers to your HYSA.";
    }
    if (lower.includes('budget') || lower.includes('50/30/20')) {
      return "The **50/30/20 Budgeting Rule** is an effective allocation framework:

- **50% Needs**: Housing, utilities, groceries, transit
- **30% Wants**: Dining out, entertainment, shopping
- **20% Savings**: Emergency fund, investments, debt acceleration";
    }

    return `I received your query regarding: "${message}".

To build wealth effectively:
- Track monthly cash inflows vs outflows.
- Maintain a liquid emergency fund.
- Automate low-cost index fund investments.`;
  }
}

export const personalFinanceChatAgent = new PersonalFinanceChatAgent();
