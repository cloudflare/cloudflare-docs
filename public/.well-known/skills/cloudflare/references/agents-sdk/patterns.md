# Patterns & Use Cases

## Chat

```ts
export class ChatAgent extends Agent<Env, ChatState> {
  initialState = {messages: [], participants: []};
  async onConnect(conn: Connection, ctx: ConnectionContext) {
    conn.accept();
    const userId = ctx.request.headers.get("X-User-ID");
    conn.setState({userId});
    this.setState({...this.state, participants: [...this.state.participants, userId]});
    conn.send(JSON.stringify({type: "history", messages: this.state.messages}));
  }
  async onMessage(conn: Connection, msg: WSMessage) {
    const m = JSON.parse(msg as string);
    if (m.type === "chat")
      this.setState({...this.state, messages: [...this.state.messages, {userId: conn.state.userId, text: m.text, timestamp: Date.now()}]});
  }
}
```

## AI w/Tools

```ts
import {tool} from "ai"; import {z} from "zod";
const weatherTool = tool({description: "Get weather", inputSchema: z.object({city: z.string()}), execute: async ({city}) => `Weather: ${city} Sunny 72°F`});
export class AIAgent extends Agent<Env> {
  tools = {getWeather: weatherTool};
  async onMessage(conn: Connection, msg: WSMessage) {
    const m = JSON.parse(msg as string);
    conn.send(JSON.stringify({response: await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {prompt: m.prompt, tools: this.tools})}));
  }
}
```

## Streaming

```ts
import {OpenAI} from "openai";
export class StreamingAgent extends Agent<Env> {
  async onMessage(conn: Connection, msg: WSMessage) {
    const m = JSON.parse(msg as string);
    const stream = await new OpenAI({apiKey: this.env.OPENAI_API_KEY}).chat.completions.create({model: "gpt-4", messages: [{role: "user", content: m.prompt}], stream: true});
    for await (const chunk of stream) { const c = chunk.choices[0]?.delta?.content || ""; if (c) conn.send(JSON.stringify({type: "chunk", content: c})); }
    conn.send(JSON.stringify({type: "done"}));
  }
}
```

## Cron/Scheduled

```ts
export class TaskAgent extends Agent<Env> {
  onStart() { this.schedule("0 0 * * *", "dailyCleanup", {}); this.schedule("0 * * * *", "syncData", {}); }
  async dailyCleanup() { this.sql`DELETE FROM logs WHERE created_at < ${Date.now() - 86400000}`; }
  async syncData() { const data = await (await fetch(this.env.API_URL)).json(); this.sql`INSERT INTO cache (data,updated_at) VALUES (${JSON.stringify(data)},${Date.now()})`; }
}
```

## Email+AI

```ts
export class EmailAgent extends Agent<Env> {
  async onEmail(email: AgentEmail) {
    const [text, from, subject] = [await email.text(), email.from, email.headers.get("subject")];
    this.sql`INSERT INTO emails (from_addr,subject,body,received_at) VALUES (${from},${subject},${text},${Date.now()})`;
    const r = await this.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {prompt: `Summarize: ${text}`});
    this.setState({...this.state, lastEmail: {from, subject, summary: r}});
    this.connections.forEach(c => c.send(JSON.stringify({type: "new_email", from, subject})));
  }
}
```

## Game

```ts
export class GameAgent extends Agent<Env, GameState> {
  initialState = {players: [], score: 0, round: 1};
  async onConnect(conn: Connection, ctx: ConnectionContext) {
    conn.accept(); const playerId = ctx.request.headers.get("X-Player-ID"); conn.setState({playerId});
    this.setState({...this.state, players: [...this.state.players, {id: playerId, score: 0}]});
  }
  async onMessage(conn: Connection, msg: WSMessage) {
    const m = JSON.parse(msg as string);
    if (m.type === "move") this.setState({...this.state, players: this.state.players.map(p => p.id === conn.state.playerId ? {...p, score: p.score + m.points} : p)});
  }
}
```
