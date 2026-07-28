export const inMemoryPredictions = [
  {
    _id: 'mem_prediction_1',
    monthlyIncome: 5500,
    recentMonthlyAvg: 4000,
    predictedNextMonthSpending: 4120.00,
    confidenceScore: 0.94,
    expectedMonthlySavings: 1380.00,
    expectedAnnualSavings: 16560.00,
    financialRiskLevel: 'Low',
    futureTrends: [
      { month: 'Month +1', projectedSpending: 4120.00, projectedSavings: 1380.00, trajectory: 'Stable' },
      { month: 'Month +2', projectedSpending: 4250.00, projectedSavings: 1250.00, trajectory: 'Slight Rise' },
      { month: 'Month +3', projectedSpending: 3980.00, projectedSavings: 1520.00, trajectory: 'Decreasing' }
    ],
    riskFactors: [
      "Seasonal utility cost increase anticipated in Month +2.",
      "Variable dining out velocity shows potential 5-8% budget pressure."
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];
