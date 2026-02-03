# API Reference

## Lifecycle

**onStart()** - Init/hibernation restart:
```ts
onStart() {
  this.sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT)`;
  if (!this.state.initialized) this.setState({initialized: true, messages: []});
}
```

**onRequest(req)** - HTTP:
```ts
async onRequest(req: Request) {
  const {pathname} = new URL(req.url);
  if (pathname === "/users") return Response.json(this.sql<{id,name}>`SELECT * FROM users`);
  return new Response("Not found", {status: 404});
}
```

**onConnect(conn, ctx)** - WebSocket:
```ts
async onConnect(conn: Connection, ctx: ConnectionContext) {
  conn.accept();
  conn.setState({userId: ctx.request.headers.get("X-User-ID")});
  conn.send(JSON.stringify({type: "connected", state: this.state}));
}
```

**onMessage(conn, msg)** - WS messages:
```ts
async onMessage(conn: Connection, msg: WSMessage) {
  const m = JSON.parse(msg as string);
  if (m.type === "chat") {
    this.setState({messages: [...this.state.messages, m]});
    this.connections.forEach(c => c.send(JSON.stringify(m)));
  }
}
```

**onEmail(email)** - Email routing:
```ts
async onEmail(email: AgentEmail) {
  const text = await email.text();
  this.sql`INSERT INTO emails (from_addr,subject,body) VALUES (${email.from},${email.headers.get("subject")},${text})`;
}
```

## State

```ts
this.setState({count: 42, users: []}); // Auto-syncs
this.setState({...this.state, count: this.state.count + 1});
const s = this.state;
```

## SQL

```ts
this.sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT)`;
this.sql`INSERT INTO users (id,name) VALUES (${userId},${name})`;
const users = this.sql<{id,name}>`SELECT * FROM users`;
const user = this.sql<{name}>`SELECT name FROM users WHERE id = ${userId}`; // Prevents injection
```

## Scheduling

```ts
await this.schedule(new Date("2026-12-25T00:00:00Z"), "sendGreeting", {msg:"Hi"}); // Time
await this.schedule(60, "checkStatus", {}); // Delay (sec)
await this.schedule("0 0 * * *", "dailyCleanup", {}); // Cron
await this.schedule("*/5 * * * *", "syncData", {}); // Every 5min
const schedules = await this.getSchedules();
await this.cancelSchedule(scheduleId);
```

## Connections

```ts
this.connections.forEach(c => c.send(JSON.stringify(msg))); // Broadcast
conn.send(JSON.stringify({type:"update",data})); // Specific
conn.close(1000, "Goodbye");
conn.setState({userId:"123",role:"admin"});
const uid = conn.state.userId;
```

## AI

```ts
const r = await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {prompt});

const stream = await client.chat.completions.create({
  model: "gpt-4", messages: [{role:"user",content:prompt}], stream: true
});
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) conn.send(JSON.stringify({type:"chunk",content}));
}
```
