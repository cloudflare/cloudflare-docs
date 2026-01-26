---
name: agents-sdk
description: Build stateful AI agents using the Cloudflare Agents SDK. Load when creating agents with persistent state, scheduling, RPC, MCP servers, email handling, or streaming chat. Covers Agent class, AIChatAgent, state management, and Code Mode for reduced token usage.
---

# Cloudflare Agents SDK

Build persistent, stateful AI agents on Cloudflare Workers using the `agents` npm package.

## FIRST: Verify Installation

```bash
npm install agents
```

Agents require a binding in `wrangler.jsonc`:

```jsonc
{
  "durable_objects": {
    // "class_name" must match your Agent class name exactly
    "bindings": [{ "name": "Counter", "class_name": "Counter" }]
  },
  "migrations": [
    // Required: list all Agent classes for SQLite storage
    { "tag": "v1", "new_sqlite_classes": ["Counter"] }
  ]
}
```

## Choosing an Agent Type

| Use Case | Base Class | Package |
|----------|------------|---------|
| Custom state + RPC, no chat | `Agent` | `agents` |
| Chat with message persistence | `AIChatAgent` | `@cloudflare/ai-chat` |
| Building an MCP server | `McpAgent` | `agents/mcp` |

## Key Concepts

- **Agent** base class provides state, scheduling, RPC, MCP, and email capabilities
- **AIChatAgent** adds streaming chat with automatic message persistence and resumable streams
- **Code Mode** generates executable code instead of tool calls—reduces token usage significantly
- **this.state / this.setState()** - automatic persistence to SQLite, broadcasts to clients
- **this.schedule()** - schedule tasks at Date, delay (seconds), or cron expression
- **@callable** decorator - expose methods to clients via WebSocket RPC

## Quick Reference

| Task | API |
|------|-----|
| Persist state | `this.setState({ count: 1 })` |
| Read state | `this.state.count` |
| Schedule task | `this.schedule(60, "taskMethod", payload)` |
| Schedule cron | `this.schedule("0 * * * *", "hourlyTask")` |
| Cancel schedule | `this.cancelSchedule(id)` |
| Queue task | `this.queue("processItem", payload)` |
| SQL query | `` this.sql`SELECT * FROM users WHERE id = ${id}` `` |
| RPC method | `@callable() async myMethod() { ... }` |
| Streaming RPC | `@callable({ streaming: true }) async stream(res) { ... }` |

## Minimal Agent

```typescript
import { Agent, routeAgentRequest, callable } from "agents";

type State = { count: number };

export class Counter extends Agent<Env, State> {
  initialState = { count: 0 };

  @callable()
  increment() {
    this.setState({ count: this.state.count + 1 });
    return this.state.count;
  }
}

export default {
  fetch: (req, env) => routeAgentRequest(req, env) ?? new Response("Not found", { status: 404 })
};
```

## Streaming Chat Agent

Use `AIChatAgent` for chat with automatic message persistence and resumable streaming.

**Install additional dependencies first:**
```bash
npm install @cloudflare/ai-chat ai @ai-sdk/openai
```

**Add wrangler.jsonc config** (same pattern as base Agent):
```jsonc
{
  "durable_objects": {
    "bindings": [{ "name": "Chat", "class_name": "Chat" }]
  },
  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["Chat"] }]
}
```

```typescript
import { AIChatAgent } from "@cloudflare/ai-chat";
import { routeAgentRequest } from "agents";
import { streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";

export class Chat extends AIChatAgent<Env> {
  async onChatMessage(onFinish) {
    const result = streamText({
      model: openai("gpt-4o"),
      messages: await convertToModelMessages(this.messages),
      onFinish
    });
    return result.toUIMessageStreamResponse();
  }
}

export default {
  fetch: (req, env) => routeAgentRequest(req, env) ?? new Response("Not found", { status: 404 })
};
```

**Client** (React):
```tsx
import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";

const agent = useAgent({ agent: "Chat", name: "my-chat" });
const { messages, input, handleSubmit } = useAgentChat({ agent });
```

## Detailed References

- **[references/state-scheduling.md](references/state-scheduling.md)** - State persistence, scheduling, queues
- **[references/streaming-chat.md](references/streaming-chat.md)** - AIChatAgent, resumable streams, UI patterns
- **[references/codemode.md](references/codemode.md)** - Generate code instead of tool calls (token savings)
- **[references/mcp.md](references/mcp.md)** - MCP server integration
- **[references/email.md](references/email.md)** - Email routing and handling

## When to Use Code Mode

Code Mode generates executable JavaScript instead of making individual tool calls. Use it when:

- Chaining multiple tool calls in sequence
- Complex conditional logic across tools
- MCP server orchestration (multiple servers)
- Token budget is constrained

See [references/codemode.md](references/codemode.md) for setup and examples.

## Best Practices

1. **Prefer streaming**: Use `streamText` and `toUIMessageStreamResponse()` for chat
2. **Use AIChatAgent for chat**: Handles message persistence and resumable streams automatically
3. **Type your state**: `Agent<Env, State>` ensures type safety for `this.state`
4. **Use @callable for RPC**: Cleaner than manual WebSocket message handling
5. **Code Mode for complex workflows**: Reduces round-trips and token usage
6. **Schedule vs Queue**: Use `schedule()` for time-based, `queue()` for sequential processing
