### Common Use Cases

1. **Custom customer-facing analytics** - Expose analytics dashboards to your users
2. **Usage-based billing** - Track per-customer/per-feature usage for metered billing
3. **Service health monitoring** - Per-customer/per-user health metrics
4. **High-frequency instrumentation** - Add telemetry to hot code paths without performance impact
5. **Event tracking** - User actions, API calls, errors, performance metrics

## Configuration

### Wrangler Setup

**wrangler.toml:**
```toml
[[analytics_engine_datasets]]
binding = "WEATHER"
dataset = "weather_data"
```

**wrangler.jsonc:**
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "analytics_engine_datasets": [
    {
      "binding": "WEATHER",
      "dataset": "weather_data"
    }
  ]
}
```

**Key Points:**
- Datasets are created automatically on first write - no manual dashboard setup needed
- `binding` = variable name accessible in Worker env
- `dataset` = logical table name (like SQL table - r