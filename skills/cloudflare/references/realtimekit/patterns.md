# RealtimeKit Patterns

## UI Kit (Minimal Code)

```tsx
// React
import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';
<RtkMeeting authToken="<token>" onLeave={() => console.log('Left')} />

// Angular
@Component({ template: `<rtk-meeting [authToken]="authToken" (rtkLeave)="onLeave($event)"></rtk-meeting>` })
export class AppComponent { authToken = '<token>'; onLeave(event: unknown) {} }

// HTML/Web Components
<script type="module" src="https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit-ui/dist/realtimekit-ui/realtimekit-ui.esm.js"></script>
<rtk-meeting id="meeting"></rtk-meeting>
<script>document.getElementById('meeting').authToken = '<token>';</script>
```

## Core SDK Patterns

### Basic Setup
```typescript
import RealtimeKitClient from '@cloudflare/realtimekit';

const meeting = new RealtimeKitClient({ authToken, video: true, audio: true });
meeting.self.on('roomJoined', () => console.log('Joined:', meeting.meta.meetingTitle));
meeting.participants.joined.on('participantJoined', (p) => console.log(`${p.name} joined`));
await meeting.join();
```

### Video Grid (React)
```typescript
function VideoGrid({ meeting }) {
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    const update = () => setParticipants(meeting.participants.joined.toArray());
    meeting.participants.joined.on('participantJoined', update);
    meeting.participants.joined.on('participantLeft', update);
    update();
    return () => { meeting.participants.joined.off('participantJoined', update); meeting.participants.joined.off('participantLeft', update); };
  }, [meeting]);
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
    {participants.map(p => <VideoTile key={p.id} participant={p} />)}
  </div>;
}

function VideoTile({ participant }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && participant.videoTrack) videoRef.current.srcObject = new MediaStream([participant.videoTrack]);
  }, [participant.videoTrack]);
  return <div><video ref={videoRef} autoPlay playsInline muted /><div>{participant.name}</div></div>;
}
```

### Device Selection & Chat
```typescript
// Device selection
const devices = await meeting.self.getAllDevices();
const audioInputs = devices.filter(d => d.kind === 'audioinput');
const videoInputs = devices.filter(d => d.kind === 'videoinput');
meeting.self.on('deviceListUpdate', ({ added, removed }) => console.log('Devices:', { added, removed }));
const switchCamera = (deviceId: string) => { const d = devices.find(x => x.deviceId === deviceId); if (d) await meeting.self.setDevice(d); };

// Chat component
function ChatComponent({ meeting }) {
  const [messages, setMessages] = useState(meeting.chat.messages);
  const [input, setInput] = useState('');
  useEffect(() => {
    const handleUpdate = ({ messages }) => setMessages(messages);
    meeting.chat.on('chatUpdate', handleUpdate);
    return () => meeting.chat.off('chatUpdate', handleUpdate);
  }, [meeting]);
  const send = async () => { if (input.trim()) { await meeting.chat.sendTextMessage(input); setInput(''); } };
  return <div><div>{messages.map((msg, i) => <div key={i}><strong>{msg.senderName}:</strong> {msg.text}</div>)}</div><input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} /><button onClick={send}>Send</button></div>;
}

// Custom hook
export function useMeeting(authToken: string) {
  const [meeting, setMeeting] = useState<RealtimeKitClient | null>(null);
  const [joined, setJoined] = useState(false);
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    const client = new RealtimeKitClient({ authToken });
    client.self.on('roomJoined', () => setJoined(true));
    const update = () => setParticipants(client.participants.joined.toArray());
    client.participants.joined.on('participantJoined', update);
    client.participants.joined.on('participantLeft', update);
    setMeeting(client);
    return () => { client.leave(); };
  }, [authToken]);
  return { meeting, joined, participants, join: async () => meeting?.join(), leave: async () => meeting?.leave() };
}
```

## Backend Integration

### Token Generation (Express)
```typescript
app.post('/api/join-meeting', async (req, res) => {
  const { meetingId, userName, presetName } = req.body;
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/realtime/kit/${process.env.APP_ID}/meetings/${meetingId}/participants`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` },
      body: JSON.stringify({ name: userName, preset_name: presetName, custom_participant_id: req.user.id })
    }
  );
  const data = await response.json();
  res.json({ authToken: data.result.authToken });
});
```

### Workers Integration
```typescript
export interface Env { CLOUDFLARE_API_TOKEN: string; CLOUDFLARE_ACCOUNT_ID: string; REALTIMEKIT_APP_ID: string; }

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname === '/api/create-meeting') {
      return fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/realtime/kit/${env.REALTIMEKIT_APP_ID}/meetings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${env.CLOUDFLARE_API_TOKEN}` },
        body: JSON.stringify({ title: 'Team Meeting' })
      });
    }
    return new Response('Not found', { status: 404 });
  }
};
```

## Best Practices

### Security
1. **Never expose API tokens client-side** - Generate participant tokens server-side only
2. **Don't reuse participant tokens** - Generate fresh token per session, use refresh endpoint if expired
3. **Use custom participant IDs** - Map to your user system for cross-session tracking

### Performance
1. **Event-driven updates** - Listen to events, don't poll. Use `toArray()` only when needed
2. **Media quality constraints** - Set appropriate resolution/bitrate limits based on network conditions
3. **Device management** - Enable `autoSwitchAudioDevice` for better UX, handle device list updates

### Architecture
1. **Separate Apps for environments** - staging vs production to prevent data mixing
2. **Preset strategy** - Create presets at App level, reuse across meetings
3. **Token management** - Backend generates tokens, frontend receives via authenticated endpoint

## In This Reference
- [README.md](./README.md) - Overview, core concepts, quick start
- [configuration.md](./configuration.md) - SDK config, presets, wrangler setup
- [api.md](./api.md) - Client SDK APIs, REST endpoints
- [gotchas.md](./gotchas.md) - Common issues, troubleshooting, limits
