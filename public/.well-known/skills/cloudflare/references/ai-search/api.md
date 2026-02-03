## REST API

**Base URL:** `https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/autorag/rags/{AUTORAG_NAME}`

**Note:** API endpoints still use `autorag` naming; functionality identical to AI Search

### Authentication

Create API token with permissions:
- `AI Search - Read`
- `AI Search Edit`

```bash
curl -H "Authorization: Bearer {API_TOKEN}" \
  -H "Content-Type: application/json"
```

### AI Search Endpoint

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/autorag/rags/{AUTORAG_NAME}/ai-search \
-H "Authorization: Bearer {API_TOKEN}" \
-H "Content-Type: application/json" \
-d '{
  "query": "How do I configure caching?",
  "model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "system_prompt": "You are a technical documentation assistant.",
  "rewrite_query": true,
  "max_num_results": 10,
  "ranking_options": {
    "score_threshold": 0.3
  },
  "reranking": {
    "enabled": true,
    "model": "@cf/baai/bge-reranker-base"
  },
  "stream": false,
  "fil