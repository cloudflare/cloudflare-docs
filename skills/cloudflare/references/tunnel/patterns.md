# Tunnel Patterns

## Docker Deployment

### Quick Tunnel
```dockerfile
FROM cloudflare/cloudflared:latest
CMD ["tunnel", "--url", "http://app:8080"]
```

### Named Tunnel
```yaml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
    restart: unless-stopped
  app:
    image: myapp:latest
```

### With Config File
```yaml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    volumes:
      - ./config.yml:/etc/cloudflared/config.yml:ro
      - ./credentials.json:/etc/cloudflared/credentials.json:ro
    command: tunnel --config /etc/cloudflared/config.yml run
```

## Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cloudflared
spec:
  replicas: 2
  selector:
    matchLabels:
      app: cloudflared
  template:
    metadata:
      labels:
        app: cloudflared
    spec:
      containers:
      - name: cloudflared
        image: cloudflare/cloudflared:latest
        args:
        - tunnel
        - --no-autoupdate
        - run
        - --token
        - $(TUNNEL_TOKEN)
        env:
        - name: TUNNEL_TOKEN
          valueFrom:
            secretKeyRef:
              name: tunnel-credentials
              key: token
```

## High Availability

```yaml
# Same config on multiple servers
tunnel: <UUID>
credentials-file: /path/to/creds.json

ingress:
  - hostname: app.example.com
    service: http://localhost:8000
  - service: http_status:404
```

Run on multiple machines:
```bash
# Server 1
cloudflared tunnel run my-tunnel

# Server 2 (same config)
cloudflared tunnel run my-tunnel
```

Cloudflare automatically load balances. Long-lived connections (WebSocket, SSH) will drop during updates.

## Use Cases

### Web Application
```yaml
ingress:
  - hostname: myapp.example.com
    service: http://localhost:3000
  - service: http_status:404
```

### SSH Access
```yaml
ingress:
  - hostname: ssh.example.com
    service: ssh://localhost:22
  - service: http_status:404
```

Client:
```bash
cloudflared access ssh --hostname ssh.example.com
```

### gRPC Service
```yaml
ingress:
  - hostname: grpc.example.com
    service: http://localhost:50051
    originRequest:
      http2Origin: true
  - service: http_status:404
```

### Multiple Environments
```yaml
ingress:
  - hostname: prod.example.com
    service: http://localhost:8001
  - hostname: staging.example.com
    service: http://localhost:8002
  - hostname: dev.example.com
    service: http://localhost:8003
  - service: http_status:404
```

## Service Installation

### Linux systemd
```bash
cloudflared service install
systemctl start cloudflared
systemctl enable cloudflared
systemctl status cloudflared

# Logs
journalctl -u cloudflared -f
```

### macOS launchd
```bash
sudo cloudflared service install
sudo launchctl start com.cloudflare.cloudflared
sudo launchctl load -w /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

# Logs
tail -f /Library/Logs/com.cloudflare.cloudflared.err.log
```
