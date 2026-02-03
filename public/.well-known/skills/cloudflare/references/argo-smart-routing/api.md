## API Reference

### Base Endpoint
```
https://api.cloudflare.com/client/v4
```

### Authentication
Use API tokens with Zone:Argo Smart Routing:Edit permissions:

```bash
# Headers required
X-Auth-Email: user@example.com
Authorization: Bearer YOUR_API_TOKEN
```

### Get Argo Smart Routing Status

**Endpoint:** `GET /zones/{zone_id}/argo/smart_routing`

**Description:** Retrieves current Argo Smart Routing enablement status.

**cURL Example:**
```bash
curl -X GET "https://api.cloudflare.com/client/v4/zones/{zone_id}/argo/smart_routing" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json"
```

**Response:**
```json
{
  "result": {
    "id": "smart_routing",
    "value": "on",
    "editable": true,
    "modified_on": "2024-01-11T12:00:00Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

**TypeScript SDK Example:**
```typescript
import Cloudflare from 'cloudflare';

const client = new Cloudflare({
  apiToken: process.env.CLOUDFLARE_API_TOKE