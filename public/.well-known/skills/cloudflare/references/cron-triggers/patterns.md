# Cron Triggers Patterns

## API Data Sync

```typescript
export default {
  async scheduled(controller, env, ctx) {
    const response = await fetch("https://api.example.com/data", {headers: { "Authorization": `Bearer ${env.API_KEY}` }});
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    ctx.waitUntil(env.MY_KV.put("cached_data", JSON.stringify(await response.json()), {expirationTtl: 3600}));
  },
};
```

## Database Cleanup

```typescript
export default {
  async scheduled(controller, env, ctx) {
    const result = await env.DB.prepare(`DELETE FROM sessions WHERE expires_at < datetime('now')`).run();
    console.log(`Deleted ${result.meta.changes} expired sessions`);
    ctx.waitUntil(env.DB.prepare("VACUUM").run());
  },
};
```

## Report Generation

```typescript
export default {
  async scheduled(controller, env, ctx) {
    const startOfWeek = new Date(); startOfWeek.setDate(startOfWeek.getDate() - 7);
    const { results } = await env.DB.prepare(`SELECT date, revenue, orders FROM daily_stats WHERE date >= ? ORDER BY date`).bind(startOfWeek.toISOString()).all();
    const report = {period: "weekly", totalRevenue: results.reduce((sum, d) => sum + d.revenue, 0), totalOrders: results.reduce((sum, d) => sum + d.orders, 0), dailyBreakdown: results};
    const reportKey = `reports/weekly-${Date.now()}.json`;
    await env.REPORTS_BUCKET.put(reportKey, JSON.stringify(report));
    ctx.waitUntil(env.SEND_EMAIL.fetch("https://example.com/send", {method: "POST", body: JSON.stringify({to: "team@example.com", subject: "Weekly Report", reportUrl: `https://reports.example.com/${reportKey}`})}));
  },
};
```

## Health Checks

```typescript
export default {
  async scheduled(controller, env, ctx) {
    const services = [{name: "API", url: "https://api.example.com/health"}, {name: "CDN", url: "https://cdn.example.com/health"}];
    const checks = await Promise.all(services.map(async (service) => {
      const start = Date.now();
      try {
        const response = await fetch(service.url, { signal: AbortSignal.timeout(5000) });
        return {name: service.name, status: response.ok ? "up" : "down", responseTime: Date.now() - start};
      } catch (error) {
        return {name: service.name, status: "down", responseTime: Date.now() - start, error: error.message};
      }
    }));
    ctx.waitUntil(env.STATUS_KV.put("health_status", JSON.stringify(checks)));
    const failures = checks.filter(c => c.status === "down");
    if (failures.length > 0) ctx.waitUntil(fetch(env.ALERT_WEBHOOK, {method: "POST", body: JSON.stringify({text: `${failures.length} service(s) down: ${failures.map(f => f.name).join(", ")}`})}));
  },
};
```

## Batch Processing (Rate-Limited)

```typescript
export default {
  async scheduled(controller, env, ctx) {
    const queueData = await env.QUEUE_KV.get("pending_items", "json");
    if (!queueData || queueData.length === 0) return;
    const batch = queueData.slice(0, 100);
    const results = await Promise.allSettled(batch.map(item => fetch("https://api.example.com/process", {method: "POST", headers: {"Authorization": `Bearer ${env.API_KEY}`, "Content-Type": "application/json"}, body: JSON.stringify(item)})));
    console.log(`Processed ${results.filter(r => r.status === "fulfilled").length}/${batch.length} items`);
    ctx.waitUntil(env.QUEUE_KV.put("pending_items", JSON.stringify(queueData.slice(100))));
  },
};
```

## Monitoring & Logging

```typescript
export default {
  async scheduled(controller, env, ctx) {
    const startTime = Date.now();
    console.log(`[START] Cron ${controller.cron} at ${new Date(controller.scheduledTime).toISOString()}`);
    try {
      const result = await performTask(env);
      const duration = Date.now() - startTime;
      console.log(`[SUCCESS] Completed in ${duration}ms`, {cron: controller.cron, recordsProcessed: result.count});
      ctx.waitUntil(logToExternal(env.ANALYTICS_ENDPOINT, {event: "cron_success", duration, cron: controller.cron}));
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`[ERROR] Failed after ${duration}ms`, {cron: controller.cron, error: error.message});
      ctx.waitUntil(notifyFailure(env.ALERT_WEBHOOK, {cron: controller.cron, error: error.message}));
      throw error;
    }
  },
};
```

## View Past Events

**Dashboard:** Workers & Pages → Select Worker → Settings → Triggers → Cron Events

**Wrangler:**
```bash
npx wrangler tail
npx wrangler tail --format json | jq 'select(.event.cron != null)'
```

**GraphQL:**
```graphql
query CronMetrics($accountTag: string!, $workerName: string!) {
  viewer { accounts(filter: { accountTag: $accountTag }) { workersInvocationsAdaptive(filter: {scriptName: $workerName, eventType: "scheduled"}, limit: 100) { dimensions { datetime, status }, sum { requests, errors } } } }
}
```

## See Also

- [README.md](./README.md) - Overview
- [api.md](./api.md) - Handler implementation
- [gotchas.md](./gotchas.md) - Troubleshooting
