# Cron Triggers Configuration

## wrangler.jsonc

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-cron-worker",
  "main": "src/index.ts",
  "compatibility_date": "2024-01-01",
  
  "triggers": {
    "crons": [
      "*/5 * * * *",     // Every 5 minutes
      "0 */2 * * *",     // Every 2 hours
      "0 9 * * MON-FRI", // Weekdays at 9am UTC
      "0 2 1 * *"        // Monthly on 1st at 2am UTC
    ]
  }
}
```

## wrangler.toml

```toml
name = "my-cron-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[triggers]
crons = [
  "*/5 * * * *",     # Every 5 minutes
  "0 */2 * * *",     # Every 2 hours
  "0 9 * * MON-FRI", # Weekdays at 9am UTC
  "0 2 1 * *"        # Monthly on 1st at 2am UTC
]
```

## Environment-Specific Schedules

```jsonc
{
  "name": "my-cron-worker",
  "triggers": {
    "crons": ["0 */6 * * *"]  // Prod: every 6 hours
  },
  "env": {
    "staging": {
      "triggers": {
        "crons": ["*/15 * * * *"]  // Staging: every 15min
      }
    },
    "dev": {
      "triggers": {
        "crons": ["*/5 * * * *"]  // Dev: every 5min
      }
    }
  }
}
```

```toml
name = "my-cron-worker"

[triggers]
crons = ["0 */6 * * *"]  # Prod: every 6 hours

[env.staging.triggers]
crons = ["*/15 * * * *"]  # Staging: every 15min

[env.dev.triggers]
crons = ["*/5 * * * *"]  # Dev: every 5min
```

## Schedule Format

**5-field structure:**
```
minute hour day-of-month month day-of-week
```

**Special characters:**
- `*` - Any value
- `,` - List: `1,15,30 * * * *` (minutes 1, 15, 30)
- `-` - Range: `0 9-17 * * *` (9am-5pm)
- `/` - Step: `*/10 * * * *` (every 10 minutes)
- `L` - Last: `0 0 L * *` (last day of month), `0 18 * * FRI-L` (last Friday)
- `W` - Weekday: `0 9 15W * *` (weekday nearest 15th)
- `#` - Nth: `0 10 * * MON#1` (1st Monday)

## Managing Triggers

**Remove all:**
```jsonc
{
  "triggers": {
    "crons": []  // Empty array removes all
  }
}
```

**Preserve existing:**
```jsonc
{
  // Omit "triggers" entirely to keep existing crons
}
```

## Deployment

```bash
# Deploy with config crons
npx wrangler deploy

# Deploy specific environment
npx wrangler deploy --env production

# View deployments
npx wrangler deployments list
```

**⚠️ Changes take up to 15 minutes to propagate globally**

## API Management

**Get triggers:**
```bash
curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts/{script_name}/schedules" \
  -H "Authorization: Bearer {api_token}"
```

**Update triggers:**
```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts/{script_name}/schedules" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d '{"crons": ["*/5 * * * *", "0 2 * * *"]}'
```

**Delete all:**
```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/workers/scripts/{script_name}/schedules" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -d '{"crons": []}'
```

## See Also

- [README.md](./README.md) - Overview, quick start
- [api.md](./api.md) - Handler implementation
