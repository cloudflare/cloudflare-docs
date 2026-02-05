# Configuration & Deployment

## Wrangler Setup

```toml
name = "my-calls-app"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
CALLS_APP_ID = "your-app-id"
MAX_WEBCAM_BITRATE = "1200000"
MAX_WEBCAM_FRAMERATE = "24"
MAX_WEBCAM_QUALITY_LEVEL = "1080"

# Set secret: wrangler secret put CALLS_APP_SECRET

[[durable_objects.bindings]]
name = "ROOM"
class_name = "Room"
```

## Deploy

```bash
wrangler login
wrangler secret put CALLS_APP_SECRET
wrangler deploy
```

## Environment Variables

**Required:**
- `CALLS_APP_ID`: From dashboard
- `CALLS_APP_SECRET`: From dashboard (secret)

**Optional:**
- `MAX_WEBCAM_BITRATE` (default: 1200000)
- `MAX_WEBCAM_FRAMERATE` (default: 24)
- `MAX_WEBCAM_QUALITY_LEVEL` (default: 1080)
- `TURN_SERVICE_ID`: TURN service
- `TURN_SERVICE_TOKEN`: TURN auth (secret)

## TURN Configuration

```javascript
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.cloudflare.com:3478' },
    {
      urls: [
        'turn:turn.cloudflare.com:3478?transport=udp',
        'turn:turn.cloudflare.com:3478?transport=tcp',
        'turns:turn.cloudflare.com:5349?transport=tcp'
      ],
      username: turnUsername,
      credential: turnCredential
    }
  ]
});
```

**Ports:** 3478 (UDP/TCP), 53 (UDP), 80 (TCP), 443 (TLS), 5349 (TLS)
