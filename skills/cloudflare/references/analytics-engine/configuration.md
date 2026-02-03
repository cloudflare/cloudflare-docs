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
- `dataset` = logical table name (like SQL table - rows/columns should have consistent meaning)
- Multiple datasets can be defined per Worker

### TypeScript Types

```typescript
interface Env {
  WEATHER: AnalyticsEngineDataset;
}

// The binding exposes this interface
interface AnalyticsEngineDataset {
  writeDataPoint(data: AnalyticsEngineDataPoint): void;
}

interface AnalyticsEngineDataPoint {
  blobs?: string[];      // Up to 20 strings (dimensions for grouping/filtering)
  doubles?