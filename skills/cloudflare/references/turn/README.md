# Cloudflare TURN Service

Expert guidance for implementing Cloudflare TURN Service in WebRTC applications.

## Overview

Cloudflare TURN (Traversal Using Relays around NAT) Service is a managed relay service for WebRTC applications. TURN acts as a relay point for traffic between WebRTC clients and SFUs, particularly when direct peer-to-peer communication is obstructed by NATs or firewalls. The service runs on Cloudflare's global anycast network across 310+ cities.

## Key Characteristics

- **Anycast Architecture**: Automatically connects clients to the closest Cloudflare location
- **Global Network**: Available across Cloudflare's entire network (excluding China Network)
- **Zero Configuration**: No need to manually select regions or servers
- **Protocol Support**: STUN/TURN over UDP, TCP, and TLS
- **Free Tier**: Free when used with Cloudflare Calls SFU, otherwise $0.05/GB outbound

## Service Addresses and Ports

### STUN over UDP
- **Primary**: `stun.cloudflare.com:3478/udp`
- **Alternate**: `stun.cloudflare.com:53/udp` (not recommended as primary, blocked by many ISPs/browsers)

### TURN over UDP
- **Primary**: `turn.cloudflare.com:3478/udp`
- **Alternate**: `turn.cloudflare.com:53/udp`

### TURN over TCP
- **Primary**: `turn.cloudflare.com:3478/tcp`
- **Alternate**: `turn.cloudflare.com:80/tcp`

### TURN over TLS
- **Primary**: `turn.cloudflare.com:5349/tcp`
- **Alternate**: `turn.cloudflare.com:443/tcp`

## API Endpoints

All API endpoints require authentication with a Cloudflare API token with "Calls Write" permission.

Base URL: `https://api.cloudflare.com/client/v4`

### List TURN Keys
```
GET /accounts/{account_id}/calls/turn_keys
```

### Get TURN Key Details
```
GET /accounts/{account_id}/calls/turn_keys/{key_id}
```

### Create TURN Key
```
POST /accounts/{account_id}/calls/turn_keys
Content-Type: application/json

{
  "name": "my-turn-key"
}
```

**Response includes**:
- `uid`: Key identifier
- `key`: The actual secret key (only returned on creation)
- `name`: Human-readable name
- `created`: ISO 8601 timestamp
- `modified`: ISO 8601 timestamp

### Update TURN Key
```
PUT /accounts/{account_id}/calls/turn_keys/{key_id}
Content-Type: application/json

{
  "name": "updated-name"
}
```

### Delete TURN Key
```
DELETE /accounts/{account_id}/calls/turn_keys/{key_id}
```

## Generate Temporary Credentials

To use TURN, clients need temporary credentials. Generate them via:

```
POST https://rtc.live.cloudflare.com/v1/turn/keys/{key_id}/credentials/generate
Authorization: Bearer {key_secret}
Content-Type: application/json

{
  "ttl": 86400  // optional, defaults to reasonable value
}
```

**Response**:
```json
{
  "iceServers": {
    "urls": [
      "stun:stun.cloudflare.com:3478",
      "turn:turn.cloudflare.com:3478?transport=udp",
      "turn:turn.cloudflare.com:3478?transport=tcp",
      "turns:turn.cloudflare.com:5349?transport=tcp"
    ],
    "username": "generated-username",
    "credential": "generated-credential"
  }
}
```

## Implementation Patterns

### Basic TURN Configuration (Browser)

```typescript
interface RTCIceServer {
  urls: string | string[];
  username?: string;
  credential?: string;
  credentialType?: "password" | "oauth";
}

async function getTURNConfig(): Promise<RTCIceServer[]> {
  const response = await fetch('/api/turn-credentials');
  const data = await response.json();
  
  return [
    {
      urls: 'stun:stun.cloudflare.com:3478'
    },
    {
      urls: [
        'turn:turn.cloudflare.com:3478?transport=udp',
        'turn:turn.cloudflare.com:3478?transport=tcp',
        'turns:turn.cloudflare.com:5349?transport=tcp'
      ],
      username: data.username,
      credential: data.credential,
      credentialType: 'password'
    }
  ];
}

// Use in RTCPeerConnection
const iceServers = await getTURNConfig();
const peerConnection = new RTCPeerConnection({ iceServers });
```

### Credential Generation (Backend - Node.js/TypeScript)

```typescript
async function generateTURNCredentials(
  turnKeyId: string,
  turnKeySecret: string,
  ttl: number = 86400
): Promise<{ username: string; credential: string; urls: string[] }> {
  const response = await fetch(
    `https://rtc.live.cloudflare.com/v1/turn/keys/${turnKeyId}/credentials/generate`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${turnKeySecret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ttl })
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to generate TURN credentials: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    username: data.iceServers.username,
    credential: data.iceServers.credential,
    urls: data.iceServers.urls
  };
}
```

### Cloudflare Worker Integration

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname !== '/turn-credentials') {
      return new Response('Not found', { status: 404 });
    }

    // Validate client (implement your auth logic)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Generate credentials
    const response = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.TURN_KEY_SECRET}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ttl: 3600 })
      }
    );

    if (!response.ok) {
      return new Response('Failed to generate credentials', { status: 500 });
    }

    const data = await response.json();
    
    return new Response(JSON.stringify({
      iceServers: [
        {
          urls: 'stun:stun.cloudflare.com:3478'
        },
        {
          urls: data.iceServers.urls,
          username: data.iceServers.username,
          credential: data.iceServers.credential
        }
      ]
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
```

### Credentials Caching Pattern

```typescript
class TURNCredentialsManager {
  private credentials: {
    username: string;
    credential: string;
    urls: string[];
    expiresAt: number;
  } | null = null;

  async getCredentials(
    turnKeyId: string,
    turnKeySecret: string
  ): Promise<RTCIceServer[]> {
    const now = Date.now();
    
    // Return cached credentials if still valid
    if (this.credentials && this.credentials.expiresAt > now) {
      return this.buildIceServers(this.credentials);
    }

    // Generate new credentials
    const ttl = 3600; // 1 hour
    const data = await this.generateCredentials(turnKeyId, turnKeySecret, ttl);
    
    this.credentials = {
      username: data.username,
      credential: data.credential,
      urls: data.urls,
      expiresAt: now + (ttl * 1000) - 60000 // Refresh 1 min early
    };

    return this.buildIceServers(this.credentials);
  }

  private async generateCredentials(
    turnKeyId: string,
    turnKeySecret: string,
    ttl: number
  ) {
    const response = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${turnKeyId}/credentials/generate`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${turnKeySecret}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ttl })
      }
    );

    const data = await response.json();
    return {
      username: data.iceServers.username,
      credential: data.iceServers.credential,
      urls: data.iceServers.urls
    };
  }

  private buildIceServers(creds: {
    username: string;
    credential: string;
    urls: string[];
  }): RTCIceServer[] {
    return [
      { urls: 'stun:stun.cloudflare.com:3478' },
      {
        urls: creds.urls,
        username: creds.username,
        credential: creds.credential,
        credentialType: 'password' as const
      }
    ];
  }
}
```

### Type-Safe Configuration

```typescript
interface CloudflareTURNConfig {
  keyId: string;
  keySecret: string;
  ttl?: number;
  protocols?: ('udp' | 'tcp' | 'tls')[];
}

interface TURNCredentials {
  username: string;
  credential: string;
  urls: string[];
  expiresAt: Date;
}

function validateRTCIceServer(obj: unknown): obj is RTCIceServer {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const server = obj as Record<string, unknown>;

  if (typeof server.urls !== 'string' && !Array.isArray(server.urls)) {
    return false;
  }

  if (server.username && typeof server.username !== 'string') {
    return false;
  }

  if (server.credential && typeof server.credential !== 'string') {
    return false;
  }

  return true;
}

async function fetchTURNServers(
  config: CloudflareTURNConfig
): Promise<RTCIceServer[]> {
  const response = await fetch(
    `https://rtc.live.cloudflare.com/v1/turn/keys/${config.keyId}/credentials/generate`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.keySecret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ttl: config.ttl ?? 3600 })
    }
  );

  if (!response.ok) {
    throw new Error(`TURN credential generation failed: ${response.status}`);
  }

  const data = await response.json();
  const iceServers = [
    { urls: 'stun:stun.cloudflare.com:3478' },
    {
      urls: data.iceServers.urls,
      username: data.iceServers.username,
      credential: data.iceServers.credential,
      credentialType: 'password' as const
    }
  ];

  // Validate before returning
  if (!iceServers.every(validateRTCIceServer)) {
    throw new Error('Invalid ICE server configuration received');
  }

  return iceServers;
}
```

## Common Use Cases

### 1. Video Conferencing
Use TURN as fallback when direct peer-to-peer fails due to restrictive NATs/firewalls.

```typescript
const config: RTCConfiguration = {
  iceServers: await getTURNConfig(),
  iceTransportPolicy: 'all' // Try direct connection first
};
```

### 2. Screen Sharing Applications
Ensure connectivity for high-bandwidth screen sharing streams.

```typescript
const iceServers = await getTURNConfig();
const pc = new RTCPeerConnection({ 
  iceServers,
  bundlePolicy: 'max-bundle' // Reduce overhead
});
```

### 3. IoT Device Communication
Enable WebRTC for devices behind restrictive NATs.

```typescript
// Prefer relay for predictable connectivity
const config: RTCConfiguration = {
  iceServers: await getTURNConfig(),
  iceTransportPolicy: 'relay' // Force TURN usage
};
```

### 4. Live Streaming (WHIP/WHEP)
Integrate with Cloudflare Stream for low-latency broadcasting.

```typescript
const turnServers = await getTURNConfig();
// Use in WHIP/WHEP workflow with Cloudflare Stream
```

## Limits and Quotas

Per TURN allocation (per user):
- **IP addresses**: >5 new unique IPs per second
- **Packet rate**: 5-10k packets per second (inbound/outbound)
- **Data rate**: 50-100 Mbps (inbound/outbound)
- **MTU**: No specific limit
- **Burst rates**: Higher than documented limits

Limits apply per allocation, not account-wide. Exceeding limits results in packet drops.

## TLS Configuration

### Supported TLS Versions
- TLS 1.1
- TLS 1.2
- TLS 1.3

### Recommended Ciphers (TLS 1.3)
- AEAD-AES128-GCM-SHA256
- AEAD-AES256-GCM-SHA384
- AEAD-CHACHA20-POLY1305-SHA256

### Recommended Ciphers (TLS 1.2)
- ECDHE-ECDSA-AES128-GCM-SHA256
- ECDHE-RSA-AES128-GCM-SHA256
- ECDHE-RSA-AES128-SHA (also TLS 1.1)
- AES128-GCM-SHA256

## Environment Variables Pattern

```bash
# .env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
TURN_KEY_ID=your_turn_key_id
TURN_KEY_SECRET=your_turn_key_secret
```

```typescript
// config.ts
import { z } from 'zod';

const envSchema = z.object({
  CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
  CLOUDFLARE_API_TOKEN: z.string().min(1),
  TURN_KEY_ID: z.string().min(1),
  TURN_KEY_SECRET: z.string().min(1)
});

export const config = envSchema.parse(process.env);
```

## Wrangler Configuration

```toml
# wrangler.toml
name = "turn-credentials-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[vars]
TURN_KEY_ID = "your-turn-key-id"

[[env.production.kv_namespaces]]
binding = "CREDENTIALS_CACHE"
id = "your-kv-namespace-id"

[env.production]
vars = { ENVIRONMENT = "production" }

# Store TURN_KEY_SECRET in secrets
# wrangler secret put TURN_KEY_SECRET
```

## Security Best Practices

1. **Never expose TURN key secrets client-side**
   - Always generate credentials server-side
   - Use a backend API endpoint

2. **Implement rate limiting**
   ```typescript
   // Limit credential generation per client
   const rateLimiter = new Map<string, number>();
   
   function checkRateLimit(clientId: string): boolean {
     const lastRequest = rateLimiter.get(clientId) ?? 0;
     const now = Date.now();
     
     if (now - lastRequest < 5000) { // 5 second cooldown
       return false;
     }
     
     rateLimiter.set(clientId, now);
     return true;
   }
   ```

3. **Set appropriate TTLs**
   - Short-lived sessions: 1800-3600 seconds (30 min - 1 hour)
   - Long-lived sessions: 86400 seconds (24 hours max recommended)

4. **Validate client authentication**
   ```typescript
   async function validateClient(request: Request): Promise<boolean> {
     const token = request.headers.get('Authorization')?.split(' ')[1];
     if (!token) return false;
     
     // Implement JWT validation or session check
     return validateToken(token);
   }
   ```

5. **Monitor usage**
   - Track credential generation requests
   - Alert on unusual patterns
   - Log failed authentication attempts

## Troubleshooting

### Issue: TURN credentials not working
**Check:**
- Key ID and secret are correct
- Credentials haven't expired (check TTL)
- Server can reach rtc.live.cloudflare.com
- Network allows outbound HTTPS

### Issue: Slow connection establishment
**Solutions:**
- Ensure proper ICE candidate gathering
- Check network latency to Cloudflare edge
- Verify firewall allows WebRTC ports
- Consider using TURN over TLS (port 443)

### Issue: High packet loss
**Check:**
- Not exceeding rate limits (5-10k pps)
- Not exceeding bandwidth limits (50-100 Mbps)
- Not connecting to too many unique IPs (>5/sec)
- Client network quality

### Debugging ICE Connectivity

```typescript
pc.addEventListener('icecandidate', (event) => {
  if (event.candidate) {
    console.log('ICE candidate:', {
      type: event.candidate.type,
      protocol: event.candidate.protocol,
      address: event.candidate.address,
      port: event.candidate.port
    });
  }
});

pc.addEventListener('iceconnectionstatechange', () => {
  console.log('ICE connection state:', pc.iceConnectionState);
});

// Check which candidate pair was selected
const stats = await pc.getStats();
stats.forEach(report => {
  if (report.type === 'candidate-pair' && report.selected) {
    console.log('Selected candidate pair:', report);
  }
});
```

## Monitoring and Analytics

```typescript
interface TURNMetrics {
  totalRequests: number;
  failedRequests: number;
  averageLatency: number;
  activeConnections: number;
}

class TURNMonitor {
  private metrics: TURNMetrics = {
    totalRequests: 0,
    failedRequests: 0,
    averageLatency: 0,
    activeConnections: 0
  };

  async trackRequest<T>(
    operation: () => Promise<T>
  ): Promise<T> {
    const start = Date.now();
    this.metrics.totalRequests++;

    try {
      const result = await operation();
      this.updateLatency(Date.now() - start);
      return result;
    } catch (error) {
      this.metrics.failedRequests++;
      throw error;
    }
  }

  private updateLatency(latency: number): void {
    this.metrics.averageLatency = 
      (this.metrics.averageLatency + latency) / 2;
  }

  getMetrics(): TURNMetrics {
    return { ...this.metrics };
  }
}
```

## Architecture Considerations

### Anycast Benefits
- **Automatic routing**: Clients connect to nearest location
- **No region selection**: BGP handles routing
- **Low latency**: 95% of users within 50ms of edge
- **Fault tolerance**: Network handles failover

### When to Use TURN
- **Restrictive NATs**: Symmetric NATs that block direct connections
- **Corporate firewalls**: Environments blocking WebRTC ports
- **Mobile networks**: Carrier-grade NAT scenarios
- **Predictable connectivity**: When reliability > efficiency

### Integration with Cloudflare Calls SFU
```typescript
// TURN is automatically used when needed
// Cloudflare Calls handles TURN + SFU coordination
const session = await callsClient.createSession({
  appId: 'your-app-id',
  sessionId: 'meeting-123'
});
```

## Cost Optimization

1. **Use appropriate TTLs**: Don't over-provision credential lifetime
2. **Implement credential caching**: Reuse credentials when possible
3. **Set iceTransportPolicy wisely**:
   - `'all'`: Try direct first (recommended for most cases)
   - `'relay'`: Force TURN (only when necessary)
4. **Monitor usage**: Track bandwidth to avoid surprises
5. **Use with Cloudflare Calls**: Free when used with SFU

## Additional Resources

- [Cloudflare Calls Documentation](https://developers.cloudflare.com/calls/)
- [Cloudflare TURN Service Docs](https://developers.cloudflare.com/realtime/turn/)
- [Cloudflare API Reference](https://developers.cloudflare.com/api/resources/calls/subresources/turn/)
- [WebRTC for the Curious](https://webrtcforthecurious.com/)
- [Orange Meets (Open Source Example)](https://github.com/cloudflare/orange)

## Related Cloudflare Services

- **Cloudflare Calls SFU**: Managed Selective Forwarding Unit
- **Cloudflare Stream**: Video streaming with WHIP/WHEP support
- **Cloudflare Workers**: Backend for credential generation
- **Cloudflare KV**: Credential caching
- **Cloudflare Durable Objects**: Session state management
