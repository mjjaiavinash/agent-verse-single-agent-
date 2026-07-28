import mongoose from 'mongoose';

const orchestrationLogSchema = new mongoose.Schema({
  userQuery: {
    type: String,
    required: true,
  },
  selectedAgents: [{ type: String }],
  agentResponses: [
    {
      agentName: String,
      port: Number,
      status: String,
      responseTimeMs: Number,
      data: mongoose.Schema.Types.Mixed,
    }
  ],
  orchestrationTimeline: [
    {
      step: String,
      status: String,
      latencyMs: Number,
    }
  ],
  totalExecutionTimeMs: Number,
  finalSynthesizedResponse: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const OrchestrationLog = mongoose.models.OrchestrationLog || mongoose.model('OrchestrationLog', orchestrationLogSchema);
