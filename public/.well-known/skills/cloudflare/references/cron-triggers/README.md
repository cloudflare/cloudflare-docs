# Cloudflare Cron Triggers

Schedule Workers execution using cron expressions. Runs on Cloudflare's global network during underutilized periods.

## Key Features

- **UTC-only execution** - All schedules run on UTC time
- **5-field cron syntax** - Quartz scheduler extensions (L, W, #)
- **Global propagation** - 15min deployment delay
- **At-least-once delivery** - Rare duplicate executions possible
- **Workflow integration** - Trigger long-running multi-step tasks

## Cron Syntax

```
 ┌─────────── minute (0-59)
 │ ┌───────── hour (0-23)
 │ │ ┌─────── day of month (1-31)
 │ │ │ ┌───── month (1-12, JAN-DEC)
 │ │ │ │ ┌─── day of week (1-7, SUN-SAT, 1=Sunday)
 * * * * *
```

**Special chars:** `*` (any), `,` (list), `-` (range), `/` (step), `L` (last), `W` (weekday), `#` (nth)

## Common Schedules

```bash
*/5 * * * *        # Every 5 minutes
0 * * * *          # Hourly
0 2 * * *          # Daily 2am UTC (off-peak)
0 9 * * MON-FRI    # Weekdays 9am UTC
0 0 1 * *          # Monthly 1st midnight UTC
0 9 L * *          # Last day of month 9am UTC
0 10 * * MON#2     # 2nd Monday 10am UTC
*/10 9-17 * * MON-FRI  # Every 10min, 9am-5pm weekdays
```

## Quick Start

**wrangler.jsonc:**
```jsonc
{
  "name": "my-cron-worker",
  "triggers": {
    "crons": ["*/5 * * * *", "0 2 * * *"]
  }
}
```

**Handler:**
```typescript
export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<void> {
    console.log("Cron:", controller.cron);
    console.log("Time:", new Date(controller.scheduledTime));
    
    ctx.waitUntil(asyncTask(env)); // Non-blocking
  },
};
```

**Test locally:**
```bash
npx wrangler dev
curl "http://localhost:8787/__scheduled?cron=*/5+*+*+*+*"
```

## Limits

- **Free:** 3 triggers/worker, 10ms CPU
- **Paid:** Unlimited triggers, 50ms CPU
- **Propagation:** 15min global deployment
- **Timezone:** UTC only

## See Also

- [configuration.md](./configuration.md) - wrangler config, env-specific schedules
- [api.md](./api.md) - ScheduledController, handler params
- [patterns.md](./patterns.md) - Use cases, batch processing, monitoring
- [gotchas.md](./gotchas.md) - Timezone issues, debugging, limits
