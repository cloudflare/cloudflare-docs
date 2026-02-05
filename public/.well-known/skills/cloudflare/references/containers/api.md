### HTTP Requests

**Default port (recommended):**
```typescript
// Uses defaultPort from Container class
const container = env.MY_CONTAINER.getByName("id");
const response = await container.fetch(request);
```

**Specific port:**
```typescript
const port = this.ctx.container.getTcpPort(8080);
const response = await port.fetch("http://container/api", {
  method: "POST",
  body: JSON.stringify(data)
});
```

### TCP Connections

```typescript
const port = this.ctx.container.getTcpPort(8080);
const conn = port.connect('10.0.0.1:8080');
await conn.opened;

try {
  if (request.body) {
    await request.body.pipeTo(conn.writable);
  }
  return new Response(conn.readable);
} catch (err) {
  return new Response("Failed to proxy", { status: 502 });
}
```

### WebSocket Forwarding

```typescript
export default {
  async fetch(request: Request, env: Env) {
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader === "websocket") {
      const container = env.MY_CONTAINER.g