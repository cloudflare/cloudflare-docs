# Tunnel API

## Cloudflare API Access

**Base URL**: `https://api.cloudflare.com/client/v4`

**Authentication**:
```bash
Authorization: Bearer ${CF_API_TOKEN}
```

## Create Tunnel

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "my-tunnel",
    "tunnel_secret": "<base64-secret>"
  }'
```

## List Tunnels

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels" \
  -H "Authorization: Bearer ${CF_API_TOKEN}"
```

## Get Tunnel Info

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels/{tunnel_id}" \
  -H "Authorization: Bearer ${CF_API_TOKEN}"
```

## Update Tunnel Config

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels/{tunnel_id}/configurations" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{
    "config": {
      "ingress": [
        {"hostname": "app.example.com", "service": "http://localhost:8000"},
        {"service": "http_status:404"}
      ]
    }
  }'
```

## Delete Tunnel

```bash
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels/{tunnel_id}" \
  -H "Authorization: Bearer ${CF_API_TOKEN}"
```

## Remotely-Managed Tunnels

### Via Dashboard
1. **Zero Trust** > **Networks** > **Tunnels**
2. **Create a tunnel** > **Cloudflared**
3. Copy install command with token
4. Run on origin:
```bash
cloudflared service install <TOKEN>
```

### Via Token
```bash
# Run with token (no config file needed)
cloudflared tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}

# Docker
docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
```

## DNS Routes API

```bash
# Create DNS route
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels/{tunnel_id}/connections" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  --data '{"hostname": "app.example.com"}'

# Delete route
curl -X DELETE "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels/{tunnel_id}/connections/{route_id}" \
  -H "Authorization: Bearer ${CF_API_TOKEN}"
```

## Private Network Routes API

```bash
# Add IP route
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels/{tunnel_id}/routes" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  --data '{"ip_network": "10.0.0.0/8"}'

# List IP routes
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{account_id}/tunnels/{tunnel_id}/routes" \
  -H "Authorization: Bearer ${CF_API_TOKEN}"
```
