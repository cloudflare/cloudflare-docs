---
type: overview
pcx-content-type: reference
order: 2
---

# Advanced TCP Protection API

You can configure Advanced TCP Protection using the Advanced TCP Protection API.

The Advanced TCP Protection API only supports API token authentication. For more information on API authentication, refer to [Getting Started: Requests](https://api.cloudflare.com/#getting-started-requests) in the Cloudflare API documentation.

## Endpoints

To obtain the complete endpoint, append the Advanced TCP Protection API endpoints listed below to the Cloudflare API base URL.

The Cloudflare API base URL is:

```txt
https://api.cloudflare.com/client/v4
```

The `<ACCOUNT_ID>` argument is the account ID (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following table summarizes the available operations.

Operation | Method + Endpoint | Description
----------|-------------------|------------
Get Advanced TCP Protection status | `GET accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection` | Gets the global feature status (enabled or disabled).
Update Advanced TCP Protection status | `PATCH accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection` | Enables or disables the Advanced TCP Protection feature.

## Common API calls

### Get Advanced TCP Protection status

This example obtains the current status of Advanced TCP Protection (enabled or disabled).

```bash
---
header: Request
---
curl "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json"
```

```json
---
header: Response
---
{
  "result": {
    "enabled": false
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Enable Advanced TCP Protection

This example enables Advanced TCP Protection.

```json
---
header: Request
---
curl -X PATCH \
"https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/magic/advanced_tcp_protection" \
-H "Authorization: Bearer <API_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "enabled": true
}'
```

```json
---
header: Response
---
{
  "result": {
    "enabled": true
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
