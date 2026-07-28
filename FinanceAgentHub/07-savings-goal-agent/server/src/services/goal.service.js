import { groqClient } from '../config/groq.config.js';
import { logger } from '../utils/logger.util.js';

export class GoalService {
  async analyzeGoal({ goalName, targetAmount, currentSavings, monthlyContribution }) {
    const remaining = Math.max(0, targetAmount - currentSavings);
    const progress = Math.min(100, Number(((currentSavings / targetAmount) * 100).toFixed(1)));
    const months = monthlyContribution > 0 ? Math.ceil(remaining / monthlyContribution) : 999;

    const targetDateObj = new Date();
    targetDateObj.setMonth(targetDateObj.getMonth() + months);
    const completionDateStr = targetDateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const promptText = `Analyze the following savings goal tracking metrics:
Goal Name: "${goalName}"
Target Amount: $${targetAmount}
Current Savings: $${currentSavings} (Progress: ${progress}%, Remaining: $${remaining})
Monthly Contribution: $${monthlyContribution}
Calculated Months to Completion: ${months} months (Projected Date: ${completionDateStr})

Requirements:
Generate 3 milestone targets (50%, 75%, 100%), and provide 3 actionable Groq AI acceleration suggestions (e.g. contribution boost, yield optimization, bonus allocation).

Respond STRICTLY with valid JSON matching this schema:
{
  "progressPercentage": ${progress},
  "remainingAmount": ${remaining},
  "monthsToCompletion": ${months},
  "completionDate": "${completionDateStr}",
  "milestones": [
    { "milestone": "50% Target", "targetDate": "Date string...", "status": "Upcoming" },
    { "milestone": "75% Target", "targetDate": "Date string...", "status": "Upcoming" },
    { "milestone": "100% Goal Reached", "targetDate": "${completionDateStr}", "status": "Goal Target" }
  ],
  "suggestions": [
    "Suggestion 1...",
    "Suggestion 2...",
    "Suggestion 3..."
  ]
}`;

    try {
      logger.info(`Calling Groq API for Savings Goal Analysis ("${goalName}")`);
      const completion = await groqClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Savings Goal Agent, an expert AI goal tracking strategist. You calculate completion timelines, milestone dates, remaining obligations, and actionable acceleration tips. Output strict JSON.'
          },
          { role: 'user', content: promptText }
        ],
        model: 'llama3-8b-8192',
        temperature: 0.2,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`Groq API goal service fallback activated: ${error.message}`);
      return this.heuristicGoal({ goalName, targetAmount, currentSavings, monthlyContribution, remaining, progress, months, completionDateStr });
    }
  }

  heuristicGoal({ goalName, targetAmount, currentSavings, monthlyContribution, remaining, progress, months, completionDateStr }) {
    const boostContrib = Math.round(monthlyContribution * 1.3);
    const acceleratedMonths = monthlyContribution > 0 ? Math.ceil(remaining / boostContrib) : months;

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
        `Increasing monthly contribution to $${boostContrib}/mo will shorten your completion ETA by ${months - acceleratedMonths} months.`,
        'Deposit lump-sum windfalls or annual tax refunds directly to accelerate milestone achievements.',
        'Keep goal reserves in a 4.5%+ APY High-Yield Savings Account to earn passive interest while saving.'
      ]
    };
  }
}

export const goalService = new GoalService();
