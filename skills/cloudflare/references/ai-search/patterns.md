## Common Use Cases

1. **Enterprise search**: Natural language search over company docs
2. **Customer support**: AI-powered chat with product documentation
3. **Knowledge bases**: Semantic search over technical content
4. **Multitenancy SaaS**: Per-tenant data isolation with folder filters
5. **Content discovery**: Finding relevant content across large datasets

## Workers Binding (Recommended)

### Configuration

**wrangler.toml:**
```toml
[ai]
binding = "AI"
```

**wrangler.jsonc:**
```jsonc
{
  "ai": {
    "binding": "AI"
  }
}
```

### Code Patterns

#### AI Search with Generation
```typescript
// Generate AI response with retrieved context
const answer = await env.AI.autorag("my-autorag").aiSearch({
  query: "How do I configure rate limits?",
  model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  rewrite_query: true,
  max_num_results: 10,
  ranking_options: {
    score_threshold: 0.3
  },
  reranking: {
    enabled: true,
    model: "@cf/baai/bge-reranker-base"
  },
  stream: tr