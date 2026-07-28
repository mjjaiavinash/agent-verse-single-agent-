import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class SavingsGoalAgent {
  constructor() {
    this.name = "Savings Goal Agent";
    this.description = "Autonomous AI Agent specialized in target savings goal tracking, completion ETA calculation, and milestone acceleration.";
    this.mission = "To track target goal milestones, calculate completion timelines, and recommend Groq AI acceleration strategies.";
    this.responsibilities = [
      "Calculate percentage completion progress.",
      "Determine projected completion ETA date.",
      "Define 50%, 75%, and 100% milestone targets.",
      "Synthesize goal acceleration suggestions."
    ];
    this.rules = ["Always return output strictly as a JSON object."];
    this.constraints = ["Adhere strictly to expected JSON structure."];
    this.systemPrompt = `
IDENTITY & ROLE:
You are the Savings Goal Agent, an autonomous AI goal acceleration strategist.

MISSION:
Calculate goal progress percentage, remaining balance, completion ETA date, milestones, and acceleration tips.

EXPECTED JSON OUTPUT FORMAT:
{
  "progressPercentage": 42.5,
  "remainingAmount": 11500.00,
  "monthsToCompletion": 23,
  "completionDate": "June 2028",
  "milestones": [
    { "milestone": "50% Target", "targetDate": "September 2026", "status": "Upcoming" }
  ],
  "suggestions": [
    "Suggestion 1..."
  ]
}
`.trim();
  }

  async execute({ goalName, targetAmount, currentSavings, monthlyContribution }) {
    const remaining = Math.max(0, targetAmount - currentSavings);
    const progress = Math.min(100, Number(((currentSavings / targetAmount) * 100).toFixed(1)));
    const months = monthlyContribution > 0 ? Math.ceil(remaining / monthlyContribution) : 999;

    const targetDateObj = new Date();
    targetDateObj.setMonth(targetDateObj.getMonth() + months);
    const completionDateStr = targetDateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const userPrompt = `Analyze savings goal:
Goal Name: "${goalName}"
Target Amount: $${targetAmount}
Current Savings: $${currentSavings} (Progress: ${progress}%)
Monthly Contribution: $${monthlyContribution}
Calculated Months: ${months} (ETA: ${completionDateStr})`;

    try {
      logger.info(`[${this.name}] Executing goal analysis for "${goalName}"`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.2,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Groq API fallback executed: ${error.message}`);
      return this.heuristicFallback({ goalName, targetAmount, currentSavings, monthlyContribution, remaining, progress, months, completionDateStr });
    }
  }

  heuristicFallback({ targetAmount, currentSavings, monthlyContribution, remaining, progress, months, completionDateStr }) {
    const boostContrib = Math.round(monthlyContribution * 1.3);

    return {
      progressPercentage: progress,
      remainingAmount: remaining,
      monthsToCompletion: months,
      completionDate: completionDateStr,
      milestones: [
        { milestone: '50% Target Milestone', targetDate: 'Mid Timeline', status: progress >= 50 ? 'Completed' : 'Upcoming' },
        { milestone: '75% Target Milestone', targetDate: 'Late Timeline', status: progress >= 75 ? 'Completed' : 'Upcoming' },
        { milestone: '100% Goal Completion', targetDate: completionDateStr, status: 'Target Goal' }
      ],
      suggestions: [
        `Increasing monthly contribution to $${boostContrib}/mo will shorten completion ETA by ${Math.round(months * 0.25)} months.`,
        'Deposit tax refunds or annual bonuses directly to accelerate milestones.',
        'Keep goal funds in a 4.5%+ APY High-Yield Savings Account.'
      ]
    };
  }
}

export const savingsGoalAgent = new SavingsGoalAgent();
