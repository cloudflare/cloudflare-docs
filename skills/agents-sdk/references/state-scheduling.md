# State, Scheduling & Queues

## State Management

State persists automatically to SQLite and broadcasts to connected clients.

### Define Typed State

```typescript
type State = { 
  count: number;
  items: string[];
  lastUpdated: Date;
};

export class MyAgent extends Agent<Env, State> {
  initialState: State = { 
    count: 0, 
    items: [],
    lastUpdated: new Date()
  };
}
```

### Read and Update State

```typescript
// Read (lazy-loaded from SQLite on first access)
const count = this.state.count;

// Update (persists to SQLite, broadcasts to clients)
this.setState({ 
  ...this.state, 
  count: this.state.count + 1 
});
```

### React to State Changes

```typescript
onStateUpdate(state: State, source: Connection | "server") {
  if (source !== "server") {
    // Client updated state via WebSocket
    console.log("Client update:", state);
  }
}
```

### Client-Side State Sync (React)

```tsx
import { useAgent } from "agents/react";
import { useState } from "react";

function App() {
  const [state, setLocalState] = useState<State>({ count: 0 });
  
  const agent = useAgent<State>({
    agent: "MyAgent",
    name: "instance-1",
    onStateUpdate: (newState) => setLocalState(newState)
  });

  const increment = () => {
    agent.setState({ ...state, count: state.count + 1 });
  };

  return <button onClick={increment}>Count: {state.count}</button>;
}
```

The `onStateUpdate` callback receives state changes from the server. Use local React state to store and render the synced state.

## Scheduling

Schedule methods to run at specific times using `this.schedule()`.

### Schedule Types

```typescript
// At specific Date
await this.schedule(new Date("2025-12-25T00:00:00Z"), "sendGreeting", { to: "user" });

// Delay in seconds
await this.schedule(60, "checkStatus", { id: "abc123" }); // 1 minute

// Cron expression (recurring)
await this.schedule("0 * * * *", "hourlyCleanup", {}); // Every hour
await this.schedule("0 9 * * 1-5", "weekdayReport", {}); // 9am weekdays
```

### Schedule Handler

```typescript
export class MyAgent extends Agent<Env, State> {
  async sendGreeting(payload: { to: string }, schedule: Schedule) {
    console.log(`Sending greeting to ${payload.to}`);
    // Cron schedules automatically reschedule; one-time schedules are deleted
  }
}
```

### Manage Schedules

```typescript
// Get all schedules
const schedules = this.getSchedules();

// Get by type
const crons = this.getSchedules({ type: "cron" });

// Get by time range
const upcoming = this.getSchedules({ 
  timeRange: { start: new Date(), end: nextWeek } 
});

// Cancel
await this.cancelSchedule(schedule.id);
```

## Task Queue

Process tasks sequentially with automatic dequeue on success.

### Queue a Task

```typescript
await this.queue("processItem", { itemId: "123", priority: "high" });
```

### Queue Handler

```typescript
async processItem(payload: { itemId: string }, queueItem: QueueItem) {
  const item = await fetchItem(payload.itemId);
  await processItem(item);
  // Task automatically dequeued on success
}
```

### Queue Operations

```typescript
// Manual dequeue
await this.dequeue(queueItem.id);

// Dequeue all
await this.dequeueAll();

// Dequeue by callback
await this.dequeueAllByCallback("processItem");

// Query queue
const pending = await this.getQueues("priority", "high");
```

## SQL API

Direct SQLite access for custom queries:

```typescript
// Create table
this.sql`
  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    name TEXT,
    created_at INTEGER DEFAULT (unixepoch())
  )
`;

// Insert with params
this.sql`INSERT INTO items (id, name) VALUES (${id}, ${name})`;

// Query with types
const items = this.sql<{ id: string; name: string }>`
  SELECT * FROM items WHERE name LIKE ${`%${search}%`}
`;
```

## Lifecycle Callbacks

```typescript
export class MyAgent extends Agent<Env, State> {
  // Called when agent starts (after hibernation or first create)
  async onStart() {
    console.log("Agent started:", this.name);
  }

  // WebSocket connected
  onConnect(conn: Connection, ctx: ConnectionContext) {
    console.log("Client connected:", conn.id);
  }

  // WebSocket message (non-RPC)
  onMessage(conn: Connection, message: WSMessage) {
    console.log("Received:", message);
  }

  // State changed
  onStateUpdate(state: State, source: Connection | "server") {}

  // Error handler
  onError(error: unknown) {
    console.error("Agent error:", error);
    throw error; // Re-throw to propagate
  }
}
```
