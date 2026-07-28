import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class ExpenseCategorizerAgent {
  constructor() {
    this.name = "Expense Categorizer Agent";
    this.description = "Autonomous AI Agent specialized in financial transaction classification and confidence scoring.";
    this.mission = "To accurately categorize raw user financial expenses into standardized spending categories with high precision and reasoning.";
    this.responsibilities = [
      "Analyze raw expense titles, amounts, and optional user descriptions.",
      "Assign the most accurate financial category from standard taxonomies.",
      "Calculate an AI confidence score between 0.0 and 1.0.",
      "Provide clear, logical justification for the classification."
    ];
    this.rules = [
      "Always return output strictly as a JSON object.",
      "Do not include conversational filler or extra markdown wrappers in the LLM response.",
      "Default to 'Miscellaneous' if data is ambiguous."
    ];
    this.constraints = [
      "Confidence score must be a decimal between 0.00 and 1.00.",
      "Must adhere strictly to expected JSON keys: category, confidenceScore, reason."
    ];
    this.systemPrompt = `
IDENTITY & ROLE:
You are the Expense Categorizer Agent, an autonomous, highly specialized AI financial intelligence agent.

MISSION:
Accurately categorize financial transactions based on transaction details, amounts, and descriptions.

RESPONSIBILITIES:
1. Determine the appropriate spending category (e.g., Food & Dining, Utilities, Transportation, Entertainment, Shopping, Health, Housing, Education, Miscellaneous).
2. Assign a numerical confidence score between 0.0 and 1.0.
3. Provide a brief 1-sentence reasoning for the categorization.

RULES & CONSTRAINTS:
- You must respond ONLY with valid JSON. No conversational text.
- Standardize category names cleanly.

EXPECTED JSON OUTPUT FORMAT:
{
  "category": "Food & Dining",
  "confidenceScore": 0.95,
  "reason": "Starbucks is a well-known coffee chain categorized under Food & Dining."
}
`.trim();
  }

  async execute({ name, amount, description }) {
    const userPrompt = `Categorize this expense:
Expense Name: "${name}"
Amount: $${amount}
Description: "${description || 'N/A'}"`;

    try {
      logger.info(`[${this.name}] Executing AI categorization for "${name}"`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.1,
        max_tokens: 500,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Groq API fallback executed: ${error.message}`);
      return this.heuristicFallback({ name, amount });
    }
  }

  heuristicFallback({ name, amount }) {
    const lower = (name || '').toLowerCase();
    let cat = 'Miscellaneous';
    if (lower.includes('coffee') || lower.includes('starbucks') || lower.includes('burger') || lower.includes('food') || lower.includes('restaurant')) cat = 'Food & Dining';
    else if (lower.includes('uber') || lower.includes('gas') || lower.includes('flight') || lower.includes('transit')) cat = 'Transportation';
    else if (lower.includes('rent') || lower.includes('utility') || lower.includes('electric')) cat = 'Housing & Utilities';

    return {
      category: cat,
      confidenceScore: 0.90,
      reason: `Categorized as ${cat} based on keyword match for "${name}".`
    };
  }
}

export const expenseCategorizerAgent = new ExpenseCategorizerAgent();
