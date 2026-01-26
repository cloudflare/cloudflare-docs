## Best Practices

### 1. Use Selective Worker-First Routing

Instead of `run_worker_first = true`, use array patterns:

```jsonc
{
  "assets": {
    "run_worker_first": [
      "/api/*",           // API routes
      "/admin/*",         // Admin area
      "!/admin/assets/*"  // Except admin assets
    ]
  }
}
```

**Benefits:**
- Reduces Worker invocations
- Lowers costs
- Improves asset delivery performance

### 2. Leverage Navigation Request Optimization

For SPAs, use `compatibility_date = "2025-04-01"` or later:

```jsonc
{
  "compatibility_date": "2025-04-01",
  "assets": {
    "not_found_handling": "single-page-application"
  }
}
```

Navigation requests skip Worker invocation, reducing costs.

### 3. Type Safety with Bindings

Always type your environment:

```typescript
interface