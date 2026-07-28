# Spending Pattern Analyzer Agent (02-spending-pattern-analyzer-agent)

> Part of the **FinanceAgentHub** Distributed Multi-Agent AI System.

## Overview
Analyzes user spending history, generating weekly/monthly trends, top category charts, and heatmaps.

## Network Ports
- **Frontend Vite Client**: `http://localhost:3001`
- **Backend Express Server**: `http://localhost:5001`

## API Endpoints
- `POST /api/analyze` (or `/api/chat` for Agent 09 / `/api/orchestrate` for Agent 10)
- `GET /api/history`
- `GET /api/health`

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Axios.
- **Backend**: Node.js, Express, Groq SDK (`llama3-8b-8192`), Mongoose, Cors, Helmet.

## Running Locally

```bash
# 1. Start Server
cd server
npm install
npm run dev

# 2. Start Client
cd ../client
npm install
npm run dev
```
