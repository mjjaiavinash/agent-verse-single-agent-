import { groqClient } from '../config/groq.config.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.util.js';

export class SavingsGoalAgent {
  constructor() {
    this.name = "Savings Goal Agent";
    this.description = "Autonomous AI Agent specialized in savings goal tracking and ETA calculation.";
    this.mission = "To track milestones, projected completion dates, and acceleration tips.";
  }

  async execute({ goalName, targetAmount, currentSavings, monthlyContribution }) {
    const remaining = Math.max(0, targetAmount - currentSavings);
    const progress = Math.min(100, Number(((currentSavings / targetAmount) * 100).toFixed(1)));
    const months = monthlyContribution > 0 ? Math.ceil(remaining / monthlyContribution) : 999;

    const targetDateObj = new Date();
    targetDateObj.setMonth(targetDateObj.getMonth() + months);
    const completionDateStr = targetDateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (!config.groqApiKey || config.groqApiKey.includes('your_groq_api_key')) {
      logger.info(`[${this.name}] Proactive fallback activated (Groq API Key omitted/placeholder).`);
      return this.heuristicFallback({ targetAmount, currentSavings, monthlyContribution, remaining, progress, months, completionDateStr });
    }

    try {
      const completion = await groqClient.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are Savings Goal Agent. Return JSON.' },
          { role: 'user', content: `Goal: "${goalName}", Target: $${targetAmount}, Current: $${currentSavings}, Contrib: $${monthlyContribution}` }
        ],
        model: 'llama-3.1-8b-instant',
        response_format: { type: 'json_object' }
      });
      return JSON.parse(completion.choices[0]?.message?.content);
    } catch (error) {
      logger.warn(`[${this.name}] Reactive fallback activated: ${error.message}`);
      return this.heuristicFallback({ targetAmount, currentSavings, monthlyContribution, remaining, progress, months, completionDateStr });
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
        'Deposit tax refunds directly to accelerate milestones.',
        'Keep goal funds in a 4.5%+ APY High-Yield Savings Account.'
      ]
    };
  }
}

export const savingsGoalAgent = new SavingsGoalAgent();
