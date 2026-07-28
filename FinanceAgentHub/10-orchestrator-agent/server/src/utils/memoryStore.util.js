export const inMemoryOrchestrations = [
  {
    _id: 'mem_orch_1',
    userQuery: 'Categorize my $85 Starbucks transaction, check my budget limits, and assess financial health.',
    selectedAgents: [
      '01-expense-categorizer-agent',
      '04-budget-planner-agent',
      '05-financial-health-score-agent'
    ],
    agentResponses: [
      {
        agentName: '01-expense-categorizer-agent',
        port: 5000,
        status: 'success',
        responseTimeMs: 140,
        data: { category: 'Food & Dining', confidenceScore: 0.98 }
      },
      {
        agentName: '04-budget-planner-agent',
        port: 5003,
        status: 'success',
        responseTimeMs: 165,
        data: { budgetAllocation: { wants: { amount: 1800 } } }
      },
      {
        agentName: '05-financial-health-score-agent',
        port: 5004,
        status: 'success',
        responseTimeMs: 190,
        data: { score: 84, grade: 'A' }
      }
    ],
    orchestrationTimeline: [
      { step: '1. Intent & Agent Selection', status: 'completed', latencyMs: 35 },
      { step: '2. Parallel REST API Dispatch', status: 'completed', latencyMs: 190 },
      { step: '3. Multi-Agent Synthesis', status: 'completed', latencyMs: 110 }
    ],
    totalExecutionTimeMs: 335,
    finalSynthesizedResponse: "The $85 purchase at Starbucks was categorized as **Food & Dining** (98% confidence). Based on your monthly $1,800 discretionary allowance, this expenditure represents 4.7% of your dining cap without degrading your **Grade A (84/100)** Financial Health Score.",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
