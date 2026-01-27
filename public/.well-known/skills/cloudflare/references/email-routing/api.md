## REST API Operations

### Authentication

Use API tokens (preferred) or API keys:

```bash
# API Token (recommended)
curl -H "Authorization: Bearer $API_TOKEN" \
  https://api.cloudflare.com/client/v4/...

# API Key (legacy)
curl -H "X-Auth-Email: $EMAIL" \
     -H "X-Auth-Key: $API_KEY" \
  https://api.cloudflare.com/client/v4/...
```

### Enable Email Routing

```bash
POST /zones/{zone_id}/email/routing/dns

curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/dns" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json"
```

### Disable Email Routing

```bash
DELETE /zones/{zone_id}/email/routing/dns

curl -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/dns" \
  -H "Authorization: Bearer $API_TOKEN"
```

### Get Email Routing Settings

```bash
GET /zones/{zone_id}/email/routing

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing" \
  -H "Authorization: Bearer $API_TOKEN"
```

Resp