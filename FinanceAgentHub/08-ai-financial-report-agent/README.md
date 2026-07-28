# AI Financial Report Agent (08-ai-financial-report-agent)

> Part of the **FinanceAgentHub** Distributed Multi-Agent AI System.

## Overview
Synthesizes monthly executive financial reports, income/expense summaries, and PDF export capabilities.

## Network Ports
- **Frontend Vite Client**: `http://localhost:3007`
- **Backend Express Server**: `http://localhost:5007`

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
