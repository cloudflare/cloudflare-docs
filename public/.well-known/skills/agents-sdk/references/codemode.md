# Code Mode (Experimental)

Code Mode generates executable JavaScript instead of making individual tool calls. This significantly reduces token usage and enables complex multi-tool workflows.

## Why Code Mode?

Traditional tool calling:
- One tool call per LLM request
- Multiple round-trips for chained operations
- High token usage for complex workflows

Code Mode:
- LLM generates code that orchestrates multiple tools
- Single execution for complex workflows
- Self-debugging and error recovery
- Ideal for MCP server orchestration

## Setup

### 1. Wrangler Config

```jsonc
{
  "name": "my-agent-worker",
  "compatibility_flags": ["experimental", "enable_ctx_exports"],
  "durable_objects": {
    // "class_name" must match your Agent class name exactly
    "bindings": [{ "name": "MyAgent", "class_name": "MyAgent" }]
  },
  "migrations": [
    // Required: list all Agent classes for SQLite storage
    { "tag": "v1", "new_sqlite_classes": ["MyAgent"] }
  ],
  "services": [
    {
      "binding": "globalOutbound",
      // "service" must match "name" above
      "service": "my-agent-worker",
      "entrypoint": "globalOutbound"
    },
    {
      "binding": "CodeModeProxy",
      "service": "my-agent-worker",
      "entrypoint": "CodeModeProxy"
    }
  ],
  "worker_loaders": [{ "binding": "LOADER" }]
}
```

### 2. Export Required Classes

```typescript
// Export the proxy for tool execution (required for codemode)
export { CodeModeProxy } from "@cloudflare/codemode/ai";

// Define outbound fetch handler for security filtering
export const globalOutbound = {
  fetch: async (input: string | URL | RequestInfo, init?: RequestInit) => {
    const url = new URL(
      typeof input === "string"
        ? input
        : typeof input === "object" && "url" in input
          ? input.url
          : input.toString()
    );
    // Block certain domains if needed
    if (url.hostname === "blocked.example.com") {
      return new Response("Not allowed", { status: 403 });
    }
    return fetch(input, init);
  }
};
```

### 3. Install Dependencies

```bash
npm install @cloudflare/codemode ai @ai-sdk/openai zod
```

### 4. Use Code Mode in Agent

```typescript
import { Agent } from "agents";
import { experimental_codemode as codemode } from "@cloudflare/codemode/ai";
import { streamText, tool, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import { env } from "cloudflare:workers";
import { z } from "zod";

const tools = {
  getWeather: tool({
    description: "Get weather for a location",
    parameters: z.object({ location: z.string() }),
    execute: async ({ location }) => `Weather: ${location} 72°F`
  }),
  sendEmail: tool({
    description: "Send an email",
    parameters: z.object({ to: z.string(), subject: z.string(), body: z.string() }),
    execute: async ({ to, subject, body }) => `Email sent to ${to}`
  })
};

export class MyAgent extends Agent<Env, State> {
  tools = {};

  // Method called by codemode proxy
  callTool(functionName: string, args: unknown[]) {
    return this.tools[functionName]?.execute?.(args, {
      abortSignal: new AbortController().signal,
      toolCallId: "codemode",
      messages: []
    });
  }

  async onChatMessage() {
    this.tools = { ...tools, ...this.mcp.getAITools() };

    const { prompt, tools: wrappedTools } = await codemode({
      model: openai("gpt-4o"),  // Optional: defaults to openai("gpt-4.1")
      prompt: "You are a helpful assistant...",
      tools: this.tools,
      globalOutbound: env.globalOutbound,
      loader: env.LOADER,
      proxy: this.ctx.exports.CodeModeProxy({
        props: {
          binding: "MyAgent",  // Class name
          name: this.name,     // Instance name
          callback: "callTool" // Method to call
        }
      })
    });

    const result = streamText({
      system: prompt,
      model: openai("gpt-4o"),
      messages: await convertToModelMessages(this.state.messages),
      tools: wrappedTools  // Use wrapped tools, not original
    });

    // ... handle stream
  }
}
```

## API Reference

### `experimental_codemode(options)`

Wraps your tools to enable code generation mode for the LLM.

**Parameters:**

- `options.model` (optional): `LanguageModel` - AI SDK-compatible model instance (defaults to `openai("gpt-4.1")`)
- `options.tools`: `ToolSet` - Object containing tool definitions
- `options.prompt`: `string` - System prompt for the agent
- `options.globalOutbound`: `Fetcher` - Outbound fetch handler for security filtering
- `options.loader`: `WorkerLoader` - Worker loader binding for dynamic code execution
- `options.proxy`: `Fetcher<CodeModeProxy>` - Proxy for routing tool calls back to the agent

**Returns:**

```typescript
Promise<{
  prompt: string;
  tools: ToolSet;
}>
```

The returned `tools` should be used instead of your original tools when calling `streamText()`.

**Example:**

```typescript
const { prompt, tools: wrappedTools } = await codemode({
  model: openai("gpt-4o"),  // Optional: defaults to openai("gpt-4.1")
  prompt: "You are a helpful assistant...",
  tools: myTools,
  globalOutbound: env.globalOutbound,
  loader: env.LOADER,
  proxy: this.ctx.exports.CodeModeProxy({ props: { ... } })
});
```

## Generated Code Example

When user asks "Check the weather in NYC and email me the forecast", codemode generates:

```javascript
async function executeTask() {
  const weather = await codemode.getWeather({ location: "NYC" });
  
  await codemode.sendEmail({
    to: "user@example.com",
    subject: "NYC Weather Forecast",
    body: `Current weather: ${weather}`
  });
  
  return { success: true, weather };
}
```

## MCP Server Orchestration

Code Mode excels at orchestrating multiple MCP servers:

```javascript
async function executeTask() {
  // Query file system MCP
  const files = await codemode.listFiles({ path: "/projects" });
  
  // Query database MCP
  const status = await codemode.queryDatabase({
    query: "SELECT * FROM projects WHERE name = ?",
    params: [files[0].name]
  });
  
  // Conditional logic based on results
  if (status.length === 0) {
    await codemode.createTask({
      title: `Review: ${files[0].name}`,
      priority: "high"
    });
  }
  
  return { files, status };
}
```

## When to Use

| Scenario | Use Code Mode? |
|----------|---------------|
| Single tool call | No |
| Chained tool calls | Yes |
| Conditional logic across tools | Yes |
| MCP multi-server workflows | Yes |
| Token budget constrained | Yes |
| Simple Q&A chat | No |

## Model Configuration

The `model` parameter is optional and defaults to `openai("gpt-4.1")`. You can specify any AI SDK-compatible model:

```typescript
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";

// Using a different OpenAI model
const { prompt, tools: wrappedTools } = await codemode({
  model: openai("gpt-4o"),
  prompt: "You are a helpful assistant...",
  tools: myTools,
  // ... other options
});

// Or use a different provider entirely
const { prompt, tools: wrappedTools } = await codemode({
  model: anthropic("claude-3-5-sonnet-20241022"),
  prompt: "You are a helpful assistant...",
  tools: myTools,
  // ... other options
});

// Or omit to use the default
const { prompt, tools: wrappedTools } = await codemode({
  prompt: "You are a helpful assistant...",
  tools: myTools,
  // ... other options
  // model defaults to openai("gpt-4.1")
});
```

## Limitations

- Experimental - API may change
- Requires Cloudflare Workers
- JavaScript execution only (Python planned)
- Requires additional wrangler config
