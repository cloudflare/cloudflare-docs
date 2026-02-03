## Configuration Patterns

### Enable Workers Logs

```jsonc
// wrangler.jsonc
{
  "observability": {
    "enabled": true,
    "head_sampling_rate": 1  // 100% sampling (default)
  }
}
```

```toml
# wrangler.toml
[observability]
enabled = true
head_sampling_rate = 1  # 100% sampling
```

**Best Practice**: Use structured JSON logging for better indexing

```typescript
// Good - structured logging
console.log({ 
  user_id: 123, 
  action: "login", 
  status: "success",
  duration_ms: 45
});

// Avoid - unstructured string
console.log("user_id: 123 logged in successfully in 45ms");
```

### Enable Workers Traces

```jsonc
// wrangler.jsonc
{
  "observability": {
    "traces": {
      "enabled": true,
      "head_sampling_rate": 0.05  // 5% sampling
    }
  }
}
```

```toml
# wrangler.toml
[observability.traces]
enabled = true
head_sampling_rate = 0.05  # 5% sampling
```

**Note**: Default sampling is 100%. For high-traffic Workers, use lower sampling (0.01-0.1).

### Configure Analytics