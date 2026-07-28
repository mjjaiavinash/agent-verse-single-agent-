# Personal Finance Chat Agent (09-personal-finance-chat-agent)

> Part of the **FinanceAgentHub** Distributed Multi-Agent AI System.

## Overview
Interactive AI financial chatbot with conversation history, suggested queries, and voice-ready architecture.

## Network Ports
- **Frontend Vite Client**: `http://localhost:3008`
- **Backend Express Server**: `http://localhost:5008`

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
