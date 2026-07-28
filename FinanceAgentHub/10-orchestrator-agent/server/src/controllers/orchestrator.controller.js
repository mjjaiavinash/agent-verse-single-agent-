import { orchestratorService } from '../services/orchestrator.service.js';
import { OrchestrationLog } from '../models/OrchestrationLog.js';
import { getDBStatus } from '../config/db.config.js';
import { inMemoryOrchestrations } from '../utils/memoryStore.util.js';
import { logger } from '../utils/logger.util.js';

export const orchestrateRequest = async (req, res, next) => {
  try {
    const { userQuery } = req.body;

    logger.info(`[Orchestrator Agent] Processing master query: "${userQuery}"`);

    const resultPayload = await orchestratorService.executeOrchestration({ userQuery });

    const payload = {
      userQuery,
      selectedAgents: resultPayload.selectedAgents,
      agentResponses: resultPayload.agentResponses,
      orchestrationTimeline: resultPayload.orchestrationTimeline,
      totalExecutionTimeMs: resultPayload.totalExecutionTimeMs,
      finalSynthesizedResponse: resultPayload.finalSynthesizedResponse,
      createdAt: new Date(),
    };

    let savedRecord = null;

    if (getDBStatus()) {
      try {
        savedRecord = await OrchestrationLog.create(payload);
      } catch (dbErr) {
        logger.warn(`Database save error: ${dbErr.message}. Falling back to memory store.`);
      }
    }

    if (!savedRecord) {
      savedRecord = {
        _id: 'mem_orch_' + Date.now(),
        ...payload,
      };
      inMemoryOrchestrations.unshift(savedRecord);
    }

    return res.status(200).json({
      agent: "Orchestrator Agent",
      status: "success",
      result: {
        id: savedRecord._id,
        userQuery: savedRecord.userQuery,
        selectedAgents: savedRecord.selectedAgents,
        agentResponses: savedRecord.agentResponses,
        orchestrationTimeline: savedRecord.orchestrationTimeline,
        totalExecutionTimeMs: savedRecord.totalExecutionTimeMs,
        finalSynthesizedResponse: savedRecord.finalSynthesizedResponse,
        createdAt: savedRecord.createdAt,
      }
    });

  } catch (error) {
    next(error);
  }
};

export const checkAgentHealth = async (req, res, next) => {
  try {
    const networkStatus = await orchestratorService.pingAgentsStatus();
    return res.status(200).json({
      agent: "Orchestrator Agent",
      status: "success",
      count: networkStatus.length,
      result: networkStatus,
    });
  } catch (error) {
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    let history = [];

    if (getDBStatus()) {
      try {
        history = await OrchestrationLog.find().sort({ createdAt: -1 }).limit(20);
      } catch (dbErr) {
        history = inMemoryOrchestrations;
      }
    } else {
      history = inMemoryOrchestrations;
    }

    return res.status(200).json({
      agent: "Orchestrator Agent",
      status: "success",
      count: history.length,
      result: history,
    });
  } catch (error) {
    next(error);
  }
};
