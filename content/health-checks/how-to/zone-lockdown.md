---
title: Zone Lockdown
pcx_content_type: how-to
weight: 8
meta:
  title: Zone lockdown migration guide
---

# Zone Lockdown migration guide

Currently, any Cloudflare customer on a paid plan can configure Health Checks against any host or IP. [Zone Lockdown](/waf/tools/zone-lockdown/) specifies a list of one or more IP addresses, CIDR ranges, or networks that are the only IPs allowed to access a domain, subdomain, or URL. It allows multiple destinations in a single rule as well as IPv4 and IPv6 addresses. IP addresses not specified in the Zone Lockdown rule are denied access to the specified resources.

When a customer enables zone lockdown, any Health Checks targeting that zone regardless of ownership will still get through because Cloudflare's ASN is on an allow-list.

Cloudflare's ASN is on an allow-list. This allows health checks to bypass zone lockdown. However, this creates a vulnerability and that behavior will change, resulting in Health Checks no longer being allowed through zone lockdown by default. Customers who use zone lockdown and want their health checks to continue passing can follow the guide below to bypass zone lockdown.

## Bypass zone lockdown

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Security** > **WAF** > **Firewall Rules**.
3. Select **Create firewall rule**.
4. Create a firewall rule matching on **user agent**.
5. Set the action to **Bypass** and the corresponding feature to **Zone Lockdown**.

Cloudflare Health Checks have a user agent of the following format:
`Mozilla/5.0 (compatible;Cloudflare-Healthchecks/1.0;"+https://www.cloudflare.com/; healthcheck-id: XXX)` where `XXX` is replaced with the first 16 characters of the Health Check ID.

To allow a specific Health Check, verify if the user agent contains the first 16 characters of the Health Check ID.

### Via the API

```json

curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/firewall/rules" \
     -H "X-Auth-Email: user@example.com" \
     -H "X-Auth-Key: <AUTH_KEY>" \
     -H "Content-Type: application/json" \
     --data '[{ "description": "bypass zone lockdown - specific healthcheck","action": "bypass","products": ["zoneLockdown"],"filter": {"expression": "(http.user_agent contains \"1234567890abcdef\")"}}]

```
