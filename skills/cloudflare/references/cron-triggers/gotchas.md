# Cron Triggers Gotchas

## Timezone Issues

**⚠️ UTC ONLY** - No timezone configuration

```typescript
// ❌ Wrong: "0 9 * * *" // 9am UTC, not local
// ✅ Right: "0 17 * * *" // 9am PST (UTC-8) = 17:00 UTC
// Calculate: utcHour = (localHour - utcOffset + 24) % 24
```

## Propagation Delay

**Changes take up to 15 minutes**. Verify: Dashboard → Workers → Select Worker → Settings → Triggers

## Limits

| Plan | Triggers/Worker | CPU Time | Execution |
|------|----------------|----------|-----------|
| Free | 3 | 10ms | At-least-once |
| Paid | Unlimited | 50ms | At-least-once |

```typescript
// ❌ BAD: await processLargeDataset(); // May exceed CPU
// ✅ GOOD: ctx.waitUntil(processLargeDataset(env));
// ✅ OR: await env.WORKFLOW.create({});
```

## Duplicate Executions

**At-least-once delivery** - duplicates possible. Make idempotent:

```typescript
export default {
  async scheduled(controller, env, ctx) {
    const execId = `${controller.scheduledTime}-${controller.cron}`;
    if (await env.KV.get(`exec:${execId}`)) return;
    await env.KV.put(`exec:${execId}`, "processing", { expirationTtl: 3600 });
    await performTask(env);
    await env.KV.put(`exec:${execId}`, "complete", { expirationTtl: 86400 });
  },
};
```

## Debugging Not Executing

**Check:** `scheduled()` exported, recent deploy, 15min wait, valid cron ([crontab.guru](https://crontab.guru/)), plan limits

```typescript
export default {
  async scheduled(controller, env, ctx) {
    console.log("EXECUTED", {time: new Date().toISOString(), scheduledTime: new Date(controller.scheduledTime).toISOString(), cron: controller.cron});
    ctx.waitUntil(env.KV.put("last_execution", Date.now().toString()));
  },
};
```

## Execution Failures

**Common:** CPU exceeded, unhandled exceptions, network timeouts, binding misconfiguration

```typescript
export default {
  async scheduled(controller, env, ctx) {
    try {
      const abortCtrl = new AbortController();
      const timeout = setTimeout(() => abortCtrl.abort(), 5000);
      const response = await fetch("https://api.example.com/data", {signal: abortCtrl.signal});
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`API: ${response.status}`);
      await processData(await response.json(), env);
    } catch (error) {
      console.error("Failed", {error: error.message, cron: controller.cron});
      // Don't re-throw to mark success despite errors
    }
  },
};
```

## Local Testing Issues

Ensure `wrangler dev` runs, `scheduled()` exists, update Wrangler: `npm i -g wrangler@latest`

```bash
curl "http://localhost:8787/__scheduled?cron=*/5+*+*+*+*" # URL encode spaces
curl "http://localhost:8787/__scheduled" # No params = default
# Python: curl "http://localhost:8787/cdn-cgi/handler/scheduled?cron=*/5+*+*+*+*"
```

## Security

```typescript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/__scheduled") {
      if (env.ENVIRONMENT === "production") return new Response("Not found", { status: 404 });
      await this.scheduled({scheduledTime: Date.now(), cron: url.searchParams.get("cron") || "* * * * *", type: "scheduled"}, env, ctx);
      return new Response("OK");
    }
    return new Response("Hello");
  },
  async scheduled(controller, env, ctx) {},
};
```

## Secrets Management

```typescript
// ❌ BAD: headers: { "Authorization": "Bearer sk_live_abc123..." }
// ✅ GOOD: headers: { "Authorization": `Bearer ${env.API_KEY}` }
```

```bash
npx wrangler secret put API_KEY
```

## Green Compute

Dashboard: Workers & Pages → Account details → Compute Setting → Green Compute. Tradeoffs: fewer locations, higher latency, ideal for non-time-critical jobs

## Resources

- [Cron Triggers Docs](https://developers.cloudflare.com/workers/configuration/cron-triggers/)
- [Scheduled Handler API](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/)
- [Cloudflare Workflows](https://developers.cloudflare.com/workflows/)
- [Workers Limits](https://developers.cloudflare.com/workers/platform/limits/)
- [Crontab Guru](https://crontab.guru/) - Validator
