import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class CategorizerService {
  async categorizeExpense({ expenseName, amount, description }) {
    const promptText = `Analyze and categorize the following transaction:
Expense Name: "${expenseName}"
Amount: $${amount}
Description: "${description || 'N/A'}"

Available Categories:
- Food & Dining
- Transportation
- Utilities & Bills
- Shopping & Retail
- Entertainment & Leisure
- Health & Fitness
- Housing & Rent
- Subscriptions & Software
- Travel & Lodging
- Personal Care
- Business Expenses
- Miscellaneous

Respond STRICTLY with valid JSON in the following exact format:
{
  "category": "Selected Category",
  "confidenceScore": 0.95,
  "reason": "Detailed explanation of why this transaction fits the selected category based on vendor name, item type, or context."
}`;

    try {
      logger.info(`Calling Groq API to categorize expense: "${expenseName}"`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Expense Categorizer Agent, an expert AI financial classifier. You analyze transaction titles, amounts, and notes to return accurate spending categories with confidence scores and reasoning. Always output valid JSON.'
          },
          { role: 'user', content: promptText }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.2,
        max_tokens: 500,
        response_format: { type: 'json_object' }
      });

      const responseString = completion.choices[0]?.message?.content;
      const parsed = JSON.parse(responseString);

      return {
        category: parsed.category || 'Miscellaneous',
        confidenceScore: typeof parsed.confidenceScore === 'number' ? parsed.confidenceScore : 0.92,
        reason: parsed.reason || `Transaction "${expenseName}" categorized as ${parsed.category || 'Miscellaneous'}.`,
      };
    } catch (error) {
      logger.warn(`Groq API categorization fallback used for "${expenseName}": ${error.message}`);
      return this.heuristicFallback({ expenseName, amount, description });
    }
  }

  heuristicFallback({ expenseName, amount, description }) {
    const nameLower = (expenseName + ' ' + (description || '')).toLowerCase();

    if (nameLower.match(/coffee|starbucks|restaurant|burger|pizza|diner|grocery|walmart|food|cafe|baking|taco|sushi/)) {
      return {
        category: 'Food & Dining',
        confidenceScore: 0.95,
        reason: `Keyword match identified food vendor or dining items in "${expenseName}".`,
      };
    }
    if (nameLower.match(/uber|lyft|gas|shell|chevron|transit|subway|flight|airline|parking|taxi/)) {
      return {
        category: 'Transportation',
        confidenceScore: 0.94,
        reason: `Vendor keyword match indicates commuting, transit, or fuel expenses.`,
      };
    }
    if (nameLower.match(/netflix|spotify|hulu|apple|google|adobe|subscription|saas|software|aws|cloud/)) {
      return {
        category: 'Subscriptions & Software',
        confidenceScore: 0.97,
        reason: `Recognized digital subscription or recurring software service vendor.`,
      };
    }
    if (nameLower.match(/electric|water|power|utility|internet|comcast|verizon|att|bill/)) {
      return {
        category: 'Utilities & Bills',
        confidenceScore: 0.93,
        reason: `Utility or telecommunications provider pattern matched.`,
      };
    }
    if (nameLower.match(/amazon|target|nike|zara|shopping|store|clothing|mall|ebay/)) {
      return {
        category: 'Shopping & Retail',
        confidenceScore: 0.91,
        reason: `Retail merchant pattern matched for consumer goods.`,
      };
    }

    return {
      category: 'Miscellaneous',
      confidenceScore: 0.85,
      reason: `General transaction classified under Miscellaneous based on expense payload context.`,
    };
  }
}

export const categorizerService = new CategorizerService();
