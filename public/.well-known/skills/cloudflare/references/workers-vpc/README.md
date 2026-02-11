# Cloudflare Workers VPC Skill

Expert guidance for connecting Cloudflare Workers to private networks (AWS/Azure/GCP/on-prem) using TCP Sockets, Cloudflare Tunnel, and related technologies.

## What is Workers VPC Connectivity?

Workers VPC connectivity enables Workers to communicate with resources in private networks through:

1. **TCP Sockets API** (`connect()`) - Direct outbound TCP connections from Workers
2. **Cloudflare Tunnel** - Secure connections to private networks without exposing public IPs
3. **Hyperdrive** - Optimized connections to external databases with pooling
4. **Smart Placement** - Automatic Worker placement near backend services

## Core APIs

### TCP Sockets (`connect()`)

Create outbound TCP connections to private resources:

```typescript
import { connect } from 'cloudflare:sockets';

export default {
  async fetch(req: Request): Promise<Response> {
    const socket = connect({
      hostname: "internal-db.private.com",
      port: 5432
    }, {
      secureTransport: "starttls" // or "on" for immediate TLS
    });

    // Get readable/writable streams
    const writer = socket.writable.getWriter();
    const reader = socket.readable.getReader();

    // Write data
    const encoder = new TextEncoder();
    await writer.write(encoder.encode("QUERY\r\n"));
    await writer.close();

    // Read response
    const { value } = await reader.read();
    
    await socket.close();
    return new Response(value);
  }
};
```

### SocketOptions

```typescript
interface SocketOptions {
  secureTransport?: "off" | "on" | "starttls"; // Default: "off"
  allowHalfOpen?: boolean; // Default: false
}

interface SocketAddress {
  hostname: string; // e.g., "db.private.net"
  port: number;     // e.g., 5432
}
```

### Socket Interface

```typescript
interface Socket {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;
  opened: Promise<SocketInfo>;
  closed: Promise<void>;
  close(): Promise<void>;
  startTls(): Socket; // Upgrade to TLS
}
```

## Common Use Cases

### 1. Connect to Internal Database

```typescript
import { connect } from 'cloudflare:sockets';

export default {
  async fetch(req: Request) {
    const socket = connect(
      { hostname: "10.0.1.50", port: 5432 },
      { secureTransport: "on" }
    );

    try {
      await socket.opened; // Wait for connection
      
      const writer = socket.writable.getWriter();
      await writer.write(new TextEncoder().encode("SELECT 1\n"));
      await writer.close();

      return new Response(socket.readable);
    } catch (error) {
      return new Response(`Connection failed: ${error}`, { status: 500 });
    } finally {
      await socket.close();
    }
  }
};
```

### 2. StartTLS Pattern (Opportunistic TLS)

Many databases require starting insecure then upgrading:

```typescript
import { connect } from 'cloudflare:sockets';

const socket = connect(
  { hostname: "postgres.internal", port: 5432 },
  { secureTransport: "starttls" }
);

// Initially insecure connection
const writer = socket.writable.getWriter();
await writer.write(new TextEncoder().encode("STARTTLS\n"));

// Upgrade to TLS
const secureSocket = socket.startTls();

// Now use secureSocket for encrypted communication
const secureWriter = secureSocket.writable.getWriter();
await secureWriter.write(new TextEncoder().encode("AUTH\n"));
```

### 3. SSH/MQTT/SMTP Protocols

```typescript
// SSH connection example
import { connect } from 'cloudflare:sockets';

export default {
  async fetch(req: Request) {
    const socket = connect(
      { hostname: "bastion.internal", port: 22 },
      { secureTransport: "on" }
    );

    const writer = socket.writable.getWriter();
    const reader = socket.readable.getReader();

    // SSH handshake
    await writer.write(new TextEncoder().encode("SSH-2.0-CloudflareWorker\r\n"));

    // Read server response
    const { value } = await reader.read();
    const response = new TextDecoder().decode(value);

    await socket.close();
    return new Response(response);
  }
};
```

### 4. Connection with Error Handling

```typescript
import { connect } from 'cloudflare:sockets';

async function connectToPrivateService(
  host: string,
  port: number,
  data: string
): Promise<string> {
  let socket: ReturnType<typeof connect> | null = null;

  try {
    socket = connect({ hostname: host, port }, { secureTransport: "on" });
    
    await socket.opened; // Throws if connection fails

    const writer = socket.writable.getWriter();
    await writer.write(new TextEncoder().encode(data));
    await writer.close();

    const reader = socket.readable.getReader();
    const chunks: Uint8Array[] = [];
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }

    const combined = new Uint8Array(
      chunks.reduce((acc, chunk) => acc + chunk.length, 0)
    );
    let offset = 0;
    chunks.forEach(chunk => {
      combined.set(chunk, offset);
      offset += chunk.length;
    });

    return new TextDecoder().decode(combined);
  } catch (error) {
    throw new Error(`Socket error: ${error}`);
  } finally {
    if (socket) await socket.close();
  }
}
```

## Integration with Cloudflare Tunnel

Connect Workers to private networks via Cloudflare Tunnel:

### Architecture Pattern

```
Worker → TCP Socket → Cloudflare Tunnel → Private Network
```

### Setup

1. **Install cloudflared in your private network:**

```bash
# On private network server
cloudflared tunnel create my-private-network
cloudflared tunnel route ip add 10.0.0.0/24 my-private-network
```

2. **Configure tunnel:**

```yaml
# config.yml
tunnel: <TUNNEL_ID>
credentials-file: /path/to/credentials.json

ingress:
  - hostname: db.internal.example.com
    service: tcp://10.0.1.50:5432
  - hostname: api.internal.example.com
    service: http://10.0.1.100:8080
  - service: http_status:404
```

3. **Connect from Worker:**

```typescript
import { connect } from 'cloudflare:sockets';

export default {
  async fetch(req: Request) {
    // Connect through Tunnel to private resource
    const socket = connect({
      hostname: "db.internal.example.com",
      port: 5432
    }, {
      secureTransport: "on"
    });

    // Use socket...
  }
};
```

## Wrangler Configuration

### Enable TCP Sockets

```toml
# wrangler.toml
name = "private-network-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# No special configuration needed - TCP sockets are available by default
# in Workers runtime

[env.production]
routes = [
  { pattern = "api.example.com/*", zone_name = "example.com" }
]
```

### Environment Variables for Endpoints

```toml
[vars]
DB_HOST = "10.0.1.50"
DB_PORT = "5432"
API_HOST = "internal-api.private.net"
API_PORT = "8080"
```

```typescript
interface Env {
  DB_HOST: string;
  DB_PORT: string;
}

export default {
  async fetch(req: Request, env: Env) {
    const socket = connect({
      hostname: env.DB_HOST,
      port: parseInt(env.DB_PORT)
    });
    // ...
  }
};
```

## Smart Placement

Auto-locate Workers near backend services:

```toml
# wrangler.toml
[placement]
mode = "smart"
```

```typescript
export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    // Worker automatically runs closest to your backend
    const socket = connect({ hostname: "backend.internal", port: 8080 });
    // Minimized latency to private network
  }
};
```

## Hyperdrive for Databases

For PostgreSQL/MySQL, use Hyperdrive instead of raw TCP sockets:

```toml
# wrangler.toml
[[hyperdrive]]
binding = "DB"
id = "<HYPERDRIVE_ID>"
```

```typescript
import { Client } from 'pg';

interface Env {
  DB: Hyperdrive;
}

export default {
  async fetch(req: Request, env: Env) {
    const client = new Client({
      connectionString: env.DB.connectionString
    });
    
    await client.connect();
    const result = await client.query('SELECT * FROM users');
    await client.end();

    return Response.json(result.rows);
  }
};
```

## Limits and Considerations

### TCP Socket Limits

- **Max simultaneous connections:** 6 per Worker execution
- **Blocked destinations:**
  - Cloudflare IPs
  - `localhost` / `127.0.0.1`
  - Port 25 (SMTP - use Email Workers instead)
  - Cannot connect back to the calling Worker (loop detection)
- **Scope:** Sockets must be created in handlers (fetch/scheduled/queue), not global scope

### Performance

```typescript
// ❌ BAD: Creating socket in global scope
// import { connect } from 'cloudflare:sockets';
// const globalSocket = connect({ hostname: "db", port: 5432 }); // ERROR

// ✅ GOOD: Create in handler
export default {
  async fetch(req: Request) {
    const socket = connect({ hostname: "db", port: 5432 });
    // Use socket
    await socket.close();
  }
};
```

### Security

```typescript
// Validate destinations
function isAllowedHost(hostname: string): boolean {
  const allowed = [
    'internal-db.company.com',
    'api.private.net',
    /^10\.0\.1\.\d+$/ // Private subnet regex
  ];
  
  return allowed.some(pattern => 
    pattern instanceof RegExp 
      ? pattern.test(hostname)
      : pattern === hostname
  );
}

export default {
  async fetch(req: Request) {
    const url = new URL(req.url);
    const target = url.searchParams.get('target');
    
    if (!target || !isAllowedHost(target)) {
      return new Response('Forbidden', { status: 403 });
    }
    
    const socket = connect({ hostname: target, port: 443 });
    // ...
  }
};
```

## Common Errors

### `proxy request failed, cannot connect to the specified address`

**Cause:** Attempting to connect to disallowed address (Cloudflare IPs, localhost, blocked IPs)

**Solution:** Use public internet addresses or properly configured Tunnel endpoints

### `TCP Loop detected`

**Cause:** Worker connecting back to itself

**Solution:** Ensure destination is external service, not the Worker's own URL

### `Connections to port 25 are prohibited`

**Cause:** Attempting SMTP on port 25

**Solution:** Use [Email Workers](https://developers.cloudflare.com/email-routing/email-workers/)

### `socket is not open`

**Cause:** Trying to read/write after socket closed

**Solution:** Check socket state, use try/finally with close()

## Testing

### Local Development with Wrangler

```bash
wrangler dev
```

### Test TCP Connection

```typescript
// test.ts
import { connect } from 'cloudflare:sockets';

export default {
  async fetch(req: Request) {
    const socket = connect({ hostname: "google.com", port: 80 });
    
    const writer = socket.writable.getWriter();
    await writer.write(
      new TextEncoder().encode("GET / HTTP/1.0\r\n\r\n")
    );
    await writer.close();

    return new Response(socket.readable, {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
```

## Best Practices

1. **Always close sockets:**
   ```typescript
   const socket = connect(...);
   try {
     // Use socket
   } finally {
     await socket.close();
   }
   ```

2. **Use Hyperdrive for databases** - Better performance, connection pooling

3. **Validate destinations** - Prevent connections to unintended hosts

4. **Handle errors gracefully:**
   ```typescript
   try {
     const socket = connect(...);
     await socket.opened;
     // Use socket
   } catch (error) {
     console.error('Socket error:', error);
     return new Response('Service unavailable', { status: 503 });
   }
   ```

5. **Use Smart Placement** for latency-sensitive applications

6. **Prefer fetch() for HTTP** - Use TCP sockets only when necessary

## Real-World Patterns

### Multi-Protocol Gateway

```typescript
import { connect } from 'cloudflare:sockets';

interface Protocol {
  connect(host: string, port: number): Promise<string>;
}

class SSHProtocol implements Protocol {
  async connect(host: string, port: number): Promise<string> {
    const socket = connect({ hostname: host, port }, { secureTransport: "on" });
    // SSH implementation
    await socket.close();
    return "SSH connection established";
  }
}

class PostgresProtocol implements Protocol {
  async connect(host: string, port: number): Promise<string> {
    const socket = connect(
      { hostname: host, port },
      { secureTransport: "starttls" }
    );
    
    // Postgres wire protocol
    const secureSocket = socket.startTls();
    await secureSocket.close();
    return "Postgres connection established";
  }
}

export default {
  async fetch(req: Request) {
    const url = new URL(req.url);
    const protocol = url.pathname.slice(1); // /ssh or /postgres
    
    const protocols: Record<string, Protocol> = {
      ssh: new SSHProtocol(),
      postgres: new PostgresProtocol()
    };
    
    const handler = protocols[protocol];
    if (!handler) {
      return new Response('Unknown protocol', { status: 400 });
    }
    
    const result = await handler.connect('internal.net', 22);
    return new Response(result);
  }
};
```

## Reference

- [TCP Sockets Documentation](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)
- [Hyperdrive](https://developers.cloudflare.com/hyperdrive/)
- [Smart Placement](https://developers.cloudflare.com/workers/configuration/smart-placement/)
- [Email Workers](https://developers.cloudflare.com/email-routing/email-workers/)

---

This skill focuses exclusively on connecting Workers to private networks and VPCs. For general Workers development, see the `cloudflare-workers` skill.
