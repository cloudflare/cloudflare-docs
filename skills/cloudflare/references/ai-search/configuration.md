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
  stream: true
});

// Response includes: search_query, response, data[], has_more, next_page
```

#### Search Only (No Generation)
```typescript
// Retrieve relevant chunks without generation
const results = await env.AI.autorag("my-autorag").search({
  query: "rate limiting configuration",
  rewrite_query: true,
  max_num_results: 5,
  ranking_options: {
    score_threshold: 0.4
  },
  reranking: {
    enab