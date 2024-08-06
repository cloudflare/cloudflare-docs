---
_build:
  publishResources: false
  render: never
  list: never
---

Below is a curl example and the associated data being posted to the API.

**API example:**

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/spectrum/apps" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{"dns":{"type":"CNAME","name":"spectrum-cname.example.com"},"ip_firewall":false,"protocol":"tcp/22","proxy_protocol":"off","tls":"off","origin_dns": {"name": "cname-to-origin.example.com", "ttl": 1200}, "origin_port": 22}'
```

**Example data:**

```json
{
  "dns": {
    "type": "CNAME",
    "name": "spectrum-cname.example.com"
  },
  "ip_firewall": false,
  "protocol": "tcp/22",
  "proxy_protocol": "off",
  "tls": "off",
  "origin_dns": {
    "name": "cname-to-origin.example.com",
    "ttl": 1200
  },
  "origin_port": 22
}
```