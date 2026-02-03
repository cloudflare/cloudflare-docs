# Cloudflare AI Gateway Skill

Expert guidance for implementing and configuring Cloudflare AI Gateway - a universal gateway for AI model providers with analytics, caching, rate limiting, and routing capabilities.

## When to Use This Skill

- Setting up AI Gateway for any AI provider (OpenAI, Anthropic, Workers AI, etc.)
- Implementing caching, rate limiting, or request retry/fallback
- Configuring dynamic routing with A/B testing or model fallbacks
- Managing provider API keys securely with BYOK
- Setting up observability with logging and custom metadata
- Integrating AI Gateway with Cloudflare Workers or external applications
- Debugging AI Gateway requests or optimizing configurations

## Core Concepts

### Gateway Architecture

AI Gateway acts as a proxy between your application and AI providers:

```
Your App → AI Gateway → AI Provider (OpenAI, Anthropic, etc.)
         ↓
    Analytics, Caching, Rate Limiting, Logging
```

**Key URL patterns:**
- Unified API (OpenAI-compatible): `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/compat/chat/completions`
- Provider-specific: `https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/{provider}/{endpoint}`
- Dynamic routes: Use route name instead of model: `dynamic/{route-name}`

### Gateway Types

1. **Unauthenticated Gateway**: Open access (not recommended for production)
2. **Authenticated Gateway**: Requires `cf-aig-authorization` header with Cloudflare API token (recommended)

### Provider Authentication Options

1. **Unified Billing**: Use AI Gateway billing to pay for inference
2. **BYOK (Store Keys)**: Store provider API keys in Cloudflare dashboard
3. **Request Headers**: Include provider API key in each request

## Common Patterns

### Pattern 1: OpenAI SDK with Unified API Endpoint

Most common pattern - drop-in replacement for OpenAI API with multi-provider support.

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // or any provider's key
  baseURL: `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/compat`,
  defaultHeaders: {
    // Only needed for authenticated gateways
    'cf-aig-authorization': `Bearer ${cfToken}`
  }
});

// Switch providers by changing model format: {provider}/{model}
const response = await client.chat.completions.create({
  model: 'openai/gpt-4o-mini', // or 'anthropic/claude-sonnet-4-5'
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

**Benefits:**
- Works with existing OpenAI SDK tooling
- Switch providers without code changes (just change model param)
- Compatible with most OpenAI-compatible tools

### Pattern 2: Provider-Specific Endpoints

Use when you need the original provider's API schema.

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/openai`
});

// Standard OpenAI request - AI Gateway features still apply
const response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

### Pattern 3: Workers AI Binding with Gateway

For Cloudflare Workers using Workers AI.

```typescript
export default {
  async fetch(request, env, ctx) {
    const response = await env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      { 
        messages: [{ role: 'user', content: 'Hello!' }]
      },
      { 
        gateway: { 
          id: 'my-gateway',
          metadata: { userId: '123', team: 'engineering' }
        } 
      }
    );
    
    return new Response(JSON.stringify(response));
  }
};
```

### Pattern 4: Custom Metadata for Tracking

Tag requests with user IDs, teams, or other identifiers (max 5 metadata entries).

```typescript
const response = await openai.chat.completions.create(
  {
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Hello!' }]
  },
  {
    headers: {
      'cf-aig-metadata': JSON.stringify({
        userId: 'user123',
        team: 'engineering',
        environment: 'production',
        requestType: 'chat',
        internal: true
      })
    }
  }
);
```

### Pattern 5: Per-Request Caching Control

Override default gateway caching settings per request.

```bash
# Skip cache for this request
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'cf-aig-skip-cache: true' \
  --data '{"model": "gpt-4o-mini", "messages": [...]}'

# Custom cache TTL (1 hour)
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'cf-aig-cache-ttl: 3600' \
  --data '{"model": "gpt-4o-mini", "messages": [...]}'

# Custom cache key for deterministic caching
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \
  --header 'Authorization: Bearer $TOKEN' \
  --header 'cf-aig-cache-key: greeting-response' \
  --data '{"model": "gpt-4o-mini", "messages": [...]}'
```

**Cache headers:**
- `cf-aig-skip-cache: true` - Bypass cache
- `cf-aig-cache-ttl: <seconds>` - Custom TTL (min: 60s, max: 1 month)
- `cf-aig-cache-key: <key>` - Custom cache key
- Response header `cf-aig-cache-status: HIT|MISS` indicates cache status

### Pattern 6: BYOK (Bring Your Own Keys)

Store provider keys in dashboard, remove from code.

**Setup:**
1. Enable authentication on gateway
2. Dashboard → AI Gateway → Select gateway → Provider Keys → Add API Key
3. Remove provider API keys from code:

```typescript
// Before BYOK: Include provider key in every request
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Provider key
  baseURL: `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/openai`,
  defaultHeaders: {
    'cf-aig-authorization': `Bearer ${cfToken}` // Gateway auth
  }
});

// After BYOK: Only gateway auth needed
const client = new OpenAI({
  // No apiKey needed - stored in dashboard
  baseURL: `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/openai`,
  defaultHeaders: {
    'cf-aig-authorization': `Bearer ${cfToken}` // Only gateway auth
  }
});
```

### Pattern 7: Dynamic Routing with Fallbacks

Configure routing logic in dashboard, not code.

```typescript
// Use route name instead of model
const response = await client.chat.completions.create({
  model: 'dynamic/support', // Route name from dashboard
  messages: [{ role: 'user', content: 'Hello!' }]
});
```

**Dynamic routing use cases:**
- A/B testing between models
- Rate/budget limits per user/team
- Model fallbacks on errors
- Conditional routing (paid vs free users)

**Route configuration (in dashboard):**
1. Create route: Dashboard → Gateway → Dynamic Routes → Add Route
2. Define flow with nodes:
   - **Conditional**: Branch on metadata (e.g., `user.plan == "paid"`)
   - **Percentage**: A/B split (e.g., 80% model A, 20% model B)
   - **Rate Limit**: Quota enforcement, fallback when exceeded
   - **Budget Limit**: Cost quota enforcement
   - **Model**: Call specific provider/model
3. Save & deploy version

### Pattern 8: Error Handling

```typescript
try {
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Hello!' }]
  });
} catch (error) {
  // Rate limit exceeded
  if (error.status === 429) {
    console.error('Rate limit exceeded:', error.message);
    // Implement backoff or use dynamic routing with fallback
  }
  
  // Gateway authentication failed
  if (error.status === 401) {
    console.error('Gateway authentication failed - check cf-aig-authorization token');
  }
  
  // Provider authentication failed
  if (error.status === 403) {
    console.error('Provider authentication failed - check API key or BYOK setup');
  }
  
  throw error;
}
```

## Configuration Reference

### Dashboard Setup

**Create gateway:**
```bash
# Via Dashboard: AI > AI Gateway > Create Gateway
# Or via API:
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai-gateway/gateways \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "my-gateway",
    "cache_ttl": 3600,
    "cache_invalidate_on_update": true,
    "rate_limiting_interval": 60,
    "rate_limiting_limit": 100,
    "rate_limiting_technique": "sliding",
    "collect_logs": true
  }'
```

### Feature Configuration

**Caching:**
- Dashboard: Settings → Cache Responses → Enable
- Default TTL: Set in gateway settings
- Cache behavior: Only for identical requests (text & image responses)
- Use case: Support bots with limited prompt options

**Rate Limiting:**
- Dashboard: Settings → Rate-limiting → Enable
- Parameters:
  - Limit: Number of requests
  - Interval: Time period (seconds)
  - Technique: `fixed` or `sliding` window
- Response: `429 Too Many Requests` when exceeded

**Logging:**
- Dashboard: Settings → Logs
- Default: Enabled (up to 10M logs per gateway)
- Per-request: `cf-aig-collect-log: false` to skip
- Auto-delete: Enable to remove oldest logs when limit reached
- Filter logs by: status, cache, provider, model, cost, tokens, duration, metadata

### Wrangler Integration

**Gateway with Workers AI:**

```toml
# wrangler.toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[ai]
binding = "AI"

[[ai.gateway]]
id = "my-gateway"
```

```typescript
// src/index.ts
export default {
  async fetch(request, env, ctx): Promise<Response> {
    const response = await env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      { prompt: 'Hello!' },
      { gateway: { id: 'my-gateway' } }
    );
    
    return Response.json(response);
  }
} satisfies ExportedHandler<Env>;
```

**Environment variables for gateways:**

```toml
# wrangler.toml
[vars]
CF_ACCOUNT_ID = "your-account-id"
GATEWAY_ID = "my-gateway"

# Secrets (use wrangler secret put)
# CF_API_TOKEN - for authenticated gateways
# OPENAI_API_KEY - if not using BYOK
```

```bash
# Set secrets
wrangler secret put CF_API_TOKEN
wrangler secret put OPENAI_API_KEY
```

### API Token Permissions

**For gateway management:**
- AI Gateway - Read
- AI Gateway - Edit

**For authenticated gateway access:**
- Create API token with appropriate permissions
- Pass in `cf-aig-authorization: Bearer {token}` header

## Supported Providers

AI Gateway works with 15+ providers via unified API or provider-specific endpoints:

| Provider | Unified API | Provider Endpoint | Notes |
|----------|-------------|-------------------|-------|
| OpenAI | ✅ `openai/gpt-4o` | `/openai/*` | Full support |
| Anthropic | ✅ `anthropic/claude-3-5-sonnet` | `/anthropic/*` | Full support |
| Google AI Studio | ✅ `google-ai-studio/gemini-2.0-flash` | `/google-ai-studio/*` | Full support |
| Workers AI | ✅ `workersai/@cf/meta/llama-3` | `/workers-ai/*` | Native integration |
| Azure OpenAI | ✅ `azure-openai/*` | `/azure-openai/*` | Deployment names |
| AWS Bedrock | ❌ | `/bedrock/*` | Provider endpoint only |
| Groq | ✅ `groq/*` | `/groq/*` | Fast inference |
| Mistral | ✅ `mistral/*` | `/mistral/*` | Full support |
| Cohere | ✅ `cohere/*` | `/cohere/*` | Full support |
| Perplexity | ✅ `perplexity/*` | `/perplexity/*` | Full support |
| xAI (Grok) | ✅ `grok/*` | `/grok/*` | Full support |
| DeepSeek | ✅ `deepseek/*` | `/deepseek/*` | Full support |
| Cerebras | ✅ `cerebras/*` | `/cerebras/*` | Fast inference |
| Replicate | ❌ | `/replicate/*` | Provider endpoint only |
| HuggingFace | ❌ | `/huggingface/*` | Provider endpoint only |

See [full provider list](https://developers.cloudflare.com/ai-gateway/usage/providers/)

## Observability

### Analytics Dashboard

View in Dashboard → AI Gateway → Select gateway:
- Request count over time
- Token usage (input/output)
- Cost tracking (estimated or custom)
- Cache hit rate
- Error rates by provider/model
- Latency percentiles

### Log Structure

Each log entry contains:
- User prompt & model response
- Provider & model
- Timestamp
- Request status (success/error)
- Token usage (input/output/total)
- Cost
- Duration (ms)
- Cache status (HIT/MISS)
- Custom metadata
- Request/Event ID

### Custom Cost Tracking

For custom models or providers not in Cloudflare's pricing database:

```bash
# Dashboard: Gateway → Settings → Custom Costs
# Or via API:
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/custom-costs \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -d '{
    "model": "custom-model-v1",
    "input_cost": 0.01,
    "output_cost": 0.03
  }'
```

## Advanced Use Cases

### Multi-Model Chat with Fallbacks

```typescript
// Configure in dashboard:
// Route: dynamic/smart-chat
// - Try GPT-4 first
// - Fallback to Claude if error
// - Fallback to Llama if both fail

const response = await client.chat.completions.create({
  model: 'dynamic/smart-chat',
  messages: [{ role: 'user', content: 'Complex reasoning task' }]
});
```

### A/B Testing Models

```typescript
// Dashboard: Create route with Percentage node
// - 50% to gpt-4o-mini
// - 50% to claude-sonnet-4-5
// Analyze logs to compare quality/cost/latency

const response = await client.chat.completions.create({
  model: 'dynamic/ab-test',
  messages: [{ role: 'user', content: prompt }],
  // Add metadata to track experiments
  headers: {
    'cf-aig-metadata': JSON.stringify({ experiment: 'model-comparison-v1' })
  }
});
```

### User-Based Rate Limiting

```typescript
// Dashboard: Create route with Rate Limit node
// - Condition: Check metadata.userId
// - Limit: 100 requests/hour per user
// - Fallback: Return error or use cheaper model

const response = await client.chat.completions.create(
  {
    model: 'dynamic/user-limited',
    messages: [{ role: 'user', content: prompt }]
  },
  {
    headers: {
      'cf-aig-metadata': JSON.stringify({ userId })
    }
  }
);
```

### Semantic Caching (Future)

Currently, caching requires identical requests. Semantic caching (similar but not identical requests) is planned.

**Current workaround:**
```typescript
// Use cf-aig-cache-key for grouped responses
const normalizedPrompt = normalizePrompt(userInput); // Your logic
const cacheKey = hashPrompt(normalizedPrompt);

const response = await fetch(gatewayUrl, {
  headers: {
    'cf-aig-cache-key': cacheKey,
    'cf-aig-cache-ttl': '3600'
  },
  // ... rest of request
});
```

## Debugging & Troubleshooting

### Check Gateway Status

```bash
# List all gateways
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai-gateway/gateways \
  -H "Authorization: Bearer $CF_API_TOKEN"

# Get specific gateway
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/ai-gateway/gateways/{gateway_id} \
  -H "Authorization: Bearer $CF_API_TOKEN"
```

### Inspect Request Logs

Dashboard → Gateway → Logs

**Filter examples:**
- `status: error` - All failed requests
- `provider: openai` - OpenAI requests only
- `metadata.userId: user123` - Specific user
- `cache: not cached` - Cache misses only
- `cost > 0.01` - Expensive requests

### Common Issues

**401 Unauthorized:**
- Authenticated gateway without `cf-aig-authorization` header
- Invalid/expired CF API token
- Check token permissions (AI Gateway - Read)

**403 Forbidden:**
- Provider API key invalid/missing
- BYOK key not configured or expired
- Provider quota exceeded

**429 Rate Limited:**
- Gateway rate limit exceeded
- Check settings: Dashboard → Gateway → Settings → Rate-limiting
- Implement backoff or use dynamic routing

**Cache not working:**
- Requests must be identical (body, model, parameters)
- Caching only supports text/image responses
- Check `cf-aig-cache-status` header in response
- Verify caching enabled: Dashboard → Settings → Cache Responses

**Logs not appearing:**
- Check log limit (default: 10M per gateway)
- Verify logs enabled: Dashboard → Settings → Logs
- Per-request `cf-aig-collect-log: false` bypasses logging
- Wait 30-60s for logs to appear

## API Reference

### Gateway Management

```bash
# Create gateway
POST /accounts/{account_id}/ai-gateway/gateways

# Update gateway
PUT /accounts/{account_id}/ai-gateway/gateways/{gateway_id}

# Delete gateway
DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}

# List gateways
GET /accounts/{account_id}/ai-gateway/gateways
```

### Log Management

```bash
# Get logs
GET /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs

# Delete logs
DELETE /accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs

# Filter logs (query params)
?status=error&provider=openai&cache=not_cached
```

### Headers Reference

**Gateway authentication:**
- `cf-aig-authorization: Bearer {token}` - Required for authenticated gateways

**Caching:**
- `cf-aig-cache-ttl: {seconds}` - Cache duration (60s - 1 month)
- `cf-aig-skip-cache: true` - Bypass cache
- `cf-aig-cache-key: {key}` - Custom cache key
- Response: `cf-aig-cache-status: HIT|MISS`

**Logging:**
- `cf-aig-collect-log: false` - Skip logging for this request

**Metadata:**
- `cf-aig-metadata: {json}` - Custom tracking data (max 5 entries, string/number/boolean values)

## Best Practices

1. **Always use authenticated gateways in production**
   - Prevents unauthorized access
   - Protects against log storage abuse
   - Required for BYOK

2. **Use BYOK for provider keys**
   - Removes keys from codebase
   - Easier key rotation
   - Centralized management

3. **Add custom metadata to all requests**
   - Track users, teams, environments
   - Filter logs effectively
   - Debug production issues faster

4. **Configure appropriate rate limits**
   - Prevent runaway costs
   - Use dynamic routing for per-user limits
   - Combine with budget limits

5. **Enable caching for deterministic prompts**
   - Support bots with fixed options
   - Static content generation
   - Reduces costs & latency

6. **Use dynamic routing for resilience**
   - Model fallbacks on errors
   - A/B testing without code changes
   - Gradual rollouts

7. **Monitor logs regularly**
   - Set up automatic log deletion
   - Export logs for long-term analysis
   - Track cost trends

8. **Test with provider-specific endpoints first**
   - Validates provider integration
   - Easier debugging
   - Migrate to unified API after validation

## Examples Repository

See real-world usage:
- [NextChat](https://github.com/ChatGPTNextWeb/NextChat/blob/main/app/utils/cloudflare.ts) - URL parsing utilities
- [LibreChat](https://github.com/danny-avila/LibreChat) - Multi-provider chat with AI Gateway
- [Continue.dev](https://github.com/continuedev/continue/blob/main/core/llm/llms/Cloudflare.ts) - IDE integration
- [Big-AGI](https://github.com/enricoros/big-AGI) - Complex gateway path handling

## Resources

- [Official Docs](https://developers.cloudflare.com/ai-gateway/)
- [API Reference](https://developers.cloudflare.com/api/resources/ai_gateway/)
- [Provider Guides](https://developers.cloudflare.com/ai-gateway/usage/providers/)
- [Workers AI Integration](https://developers.cloudflare.com/workers-ai/)
- [Discord Community](https://discord.cloudflare.com)

## Quick Reference

**Create gateway:**
```bash
Dashboard → AI → AI Gateway → Create Gateway
```

**Basic request:**
```typescript
const client = new OpenAI({
  baseURL: `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/compat`
});
```

**Check cache status:**
```bash
# Response header: cf-aig-cache-status: HIT|MISS
```

**Get account/gateway IDs:**
```bash
# Account ID: Dashboard → Overview → Account ID
# Gateway ID: Dashboard → AI Gateway → Gateway name/ID
```

**Required env vars:**
```bash
CF_ACCOUNT_ID=xxx
GATEWAY_ID=xxx
CF_API_TOKEN=xxx  # For authenticated gateways
PROVIDER_API_KEY=xxx  # If not using BYOK
```
