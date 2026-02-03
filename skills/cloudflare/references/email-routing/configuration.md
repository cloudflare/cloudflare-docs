## Wrangler Configuration

### Basic Email Worker

```toml
name = "email-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[send_email]]
name = "EMAIL"
```

Or in JSON:

```jsonc
{
  "name": "email-worker",
  "main": "src/index.ts",
  "compatibility_date": "2024-01-01",
  "send_email": [
    {
      "name": "EMAIL"
    }
  ]
}
```

### With KV/R2 Bindings

```toml
name = "email-processor"
main = "src/index.ts"

[[send_email]]
name = "EMAIL"

[[kv_namespaces]]
binding = "EMAIL_METADATA"
id = "your-kv-namespace-id"

[[r2_buckets]]
binding = "EMAIL_BUCKET"
bucket_name = "email-archive"
```

### Local Development

Run locally with `wrangler dev`:

```bash
npx wrangler dev
```

Test receiving email via curl:

```bash
curl --request POST 'http://localhost:8787/cdn-cgi/handler/email' \
  --url-query 'from=sender@example.com' \
  --url-query 'to=recipient@example.com' \
  --header 'Content-Type: application/json' \
  --data-raw 'From: sender@example.com
To: recipient@example.co