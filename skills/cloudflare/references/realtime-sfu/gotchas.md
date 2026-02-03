# Gotchas & Troubleshooting

## Common Issues

**Slow connect (~1.8s):** First STUN delayed (consensus forming), normal, subsequent faster
**USE-CANDIDATE delay (Chrome):** CF detects DTLS ClientHello early to compensate

**No media flow checklist:**
1. SDP exchange done? 2. `pc.connectionState === 'connected'`? 3. Tracks added before offer? 4. Browser perms? 5. `chrome://webrtc-internals`

**Track not RX checklist:**
1. Published OK? 2. Track ID shared? 3. Session IDs match? 4. `pc.ontrack` before answer? 5. Renegotiation done?

## Debug

`chrome://webrtc-internals`: ICE pairs, DTLS, media stats, bandwidth

Logging:
```ts
pc.addEventListener('icecandidateerror', (e) => console.error('ICE err:', e));
pc.addEventListener('connectionstatechange', () => console.log('Conn:', pc.connectionState));
pc.addEventListener('iceconnectionstatechange', () => console.log('ICE:', pc.iceConnectionState));
```

Quality:
```ts
setInterval(async () => {
  const stats = await pc.getStats();
  stats.forEach(r => {
    if (r.type === 'inbound-rtp' && r.kind === 'video')
      console.log('Loss:', r.packetsLost, 'Jitter:', r.jitter, 'Bytes:', r.bytesReceived);
  });
}, 1000);
```

## Security

❌ Never expose App Secret client-side (use backend env vars, Wrangler secrets)
Track IDs = capabilities, authz required:
```ts
app.post('/api/sessions/:sid/tracks', async (req, res) => {
  for (const t of req.body.tracks)
    if (!await canAccessTrack(req.user.id, t.trackName)) return res.status(403).json({error: 'Unauth'});
  // CF API call
});
```
Validate session ownership, timeouts, cleanup abandoned

## Pricing & Limits

Free: 1TB/mo egress. Paid: $0.05/GB. Inbound free. TURN free w/SFU. No participant/track limits (client bandwidth/CPU bound). Optimize: bitrates, simulcast, adaptive, cleanup

## vs Traditional SFUs

| Aspect | Traditional | Cloudflare |
|--------|------------|------------|
| Deploy | Single region | 310+ DCs |
| Route | Manual | Anycast |
| SDK | Often required | Pure WebRTC |
| Arch | Rooms | Sessions/tracks |
| Scale | Vertical/horiz | Auto global |
| TURN | Separate | Integrated |
| State | Centralized | Distributed |

## Quick Ref

```bash
POST /v1/apps/{appId}/sessions/new  # Create
POST .../sessions/{sid}/tracks/new  # Pub: {sessionDescription, tracks: [{location:'local',trackName}]}
POST .../sessions/{sid}/tracks/new  # Sub: {tracks:[{location:'remote',trackName,sessionId}]}
PUT .../sessions/{sid}/renegotiate  # Renegotiate
PUT .../sessions/{sid}/tracks/close # Close
```

CF SFU: unopinionated, full WebRTC control, max flexibility, needs fundamentals
