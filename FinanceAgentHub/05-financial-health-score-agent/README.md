# Financial Health Score Agent (05-financial-health-score-agent)

> Part of the **FinanceAgentHub** Distributed Multi-Agent AI System.

## Overview
Calculates overall Financial Health Score (0-100), financial grade, risk level, and 180-day roadmap.

## Network Ports
- **Frontend Vite Client**: `http://localhost:3004`
- **Backend Express Server**: `http://localhost:5004`

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
