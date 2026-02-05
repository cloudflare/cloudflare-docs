## Common Use Cases

### 1. SSH Server Protection

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{
    "protocol": "tcp/22",
    "dns": {"type": "CNAME", "name": "ssh.example.com"},
    "origin_direct": ["tcp://10.0.1.5:22"],
    "ip_firewall": true,
    "argo_smart_routing": true
  }'
```

**Benefits:**
- Hide origin IP from attackers
- DDoS protection at L3/L4
- Argo reduces latency
- IP firewall for additional access control

### 2. Game Server (e.g., Minecraft)

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps" \
  --request POST \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{
    "protocol": "tcp/25565",
    "dns": {"type": "CNAME", "name": "mc.example.com"},
    "origin_direct": ["tcp://192.168.1.10:25565"],
    "proxy_protocol": "v1",
    "argo_smart_routing": true
  }'
```

**Benefits:**
- Protection