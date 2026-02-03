# Patterns & Use Cases

## Architecture

```
Client (WebRTC) <---> CF Edge <---> Backend (HTTP)
                           |
                    CF Backbone (310+ DCs)
                           |
                    Other Edges <---> Other Clients
```

Anycast: Last-mile <50ms (95%), no region select, NACK shield, distributed consensus

Cascading trees auto-scale to millions:
```
Publisher -> Edge A -> Edge B -> Sub1
                    \-> Edge C -> Sub2,3
```

## Use Cases

**1:1:** A creates session+publishes, B creates+subscribes to A+publishes, A subscribes to B
**N:N:** All create session+publish, backend broadcasts track IDs, all subscribe to others
**1:N:** Publisher creates+publishes, viewers each create+subscribe (no fan-out limit)
**Breakout:** Same PeerConnection! Backend closes/adds tracks, no recreation

## Backend

Express:
```js
app.post('/api/new-session', async (req, res) => {
  const r = await fetch(`${CALLS_API}/apps/${process.env.CALLS_APP_ID}/sessions/new`,
    {method: 'POST', headers: {'Authorization': `Bearer ${process.env.CALLS_APP_SECRET}`}});
  res.json(await r.json());
});
```

Workers:
```ts
export default {
  async fetch(req: Request, env: Env) {
    return fetch(`https://rtc.live/v1/apps/${env.CALLS_APP_ID}/sessions/new`,
      {method: 'POST', headers: {'Authorization': `Bearer ${env.CALLS_APP_SECRET}`}});
  }
};
```

DO Presence:
```ts
export class Room {
  sessions = new Map(); // sessionId -> {userId, tracks: [{trackName, kind}]}

  async fetch(req: Request) {
    const {pathname} = new URL(req.url);
    if (pathname === '/join') {
      const {sessionId, userId} = await req.json();
      this.sessions.set(sessionId, {userId, tracks: []});
      const existingTracks = Array.from(this.sessions.entries())
        .filter(([id]) => id !== sessionId)
        .flatMap(([id, data]) => data.tracks.map(t => ({...t, sessionId: id})));
      return Response.json({existingTracks});
    }
    if (pathname === '/publish') {
      const {sessionId, tracks} = await req.json();
      this.sessions.get(sessionId)?.tracks.push(...tracks); // Notify others via WS
      return new Response('OK');
    }
  }
}
```

## Advanced

Bandwidth mgmt:
```ts
const s = pc.getSenders().find(s => s.track?.kind === 'video');
const p = s.getParameters();
if (!p.encodings) p.encodings = [{}];
p.encodings[0].maxBitrate = 1200000; p.encodings[0].maxFramerate = 24;
await s.setParameters(p);
```

Simulcast (CF auto-forwards best layer):
```ts
pc.addTransceiver('video', {direction: 'sendonly', sendEncodings: [
  {rid: 'high', maxBitrate: 1200000},
  {rid: 'med', maxBitrate: 600000, scaleResolutionDownBy: 2},
  {rid: 'low', maxBitrate: 200000, scaleResolutionDownBy: 4}
]});
```

DataChannel:
```ts
const dc = pc.createDataChannel('chat', {ordered: true, maxRetransmits: 3});
dc.onopen = () => dc.send(JSON.stringify({type: 'chat', text: 'Hi'}));
dc.onmessage = (e) => console.log('RX:', JSON.parse(e.data));
```

Integrations: R2 for recording `env.R2_BUCKET.put(...)`, Queues for analytics

Perf: 100-250ms connect, ~50ms latency (95%), 200-400ms glass-to-glass, no participant limit (client: 10-50 tracks)
