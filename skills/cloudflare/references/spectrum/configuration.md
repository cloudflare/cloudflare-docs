## Configuration Patterns

### Basic TCP Application with Direct IP Origin

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{
    "protocol": "tcp/22",
    "dns": {
      "type": "CNAME",
      "name": "ssh.example.com"
    },
    "origin_direct": ["tcp://192.0.2.1:22"],
    "proxy_protocol": "off",
    "ip_firewall": true,
    "tls": "off",
    "edge_ips": {
      "type": "dynamic",
      "connectivity": "all"
    },
    "traffic_type": "direct",
    "argo_smart_routing": true
  }'
```

### TCP Application with CNAME Origin

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{
    "dns": {
      "type": "CNAME",
      "name": "game.example.com"
    },
    "protocol": "tcp/27015",
    "proxy_protocol": "v1",
    "tls": "off",
    "origin_dns": {
 