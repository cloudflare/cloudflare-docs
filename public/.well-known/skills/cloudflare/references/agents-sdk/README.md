# Cloudflare Agents SDK

Cloudflare Agents SDK enables building AI-powered agents on Durable Objects with state, WebSockets, SQL, scheduling, and AI integration.

## Core Value
Build stateful, globally distributed AI agents with persistent memory, real-time connections, scheduled tasks, and async workflows.

## When to Use
- Persistent state + memory required
- Real-time WebSocket connections
- Long-running workflows (minutes/hours)
- Chat interfaces with AI models
- Scheduled/recurring tasks with state
- DB queries with agent state

## Quick Start
```typescript
import { Agent } from "agents";

export class MyAgent extends Agent<Env> {
  onStart() {
    this.sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY)`;
  }
  
  async onRequest(request: Request) {
    return Response.json({ state: this.state });
  }
}
```

## See Also
- durable-objects - Agent infrastructure
- d1 - External database integration
- workers-ai - AI model integration
- vectorize - Vector search for RAG patterns