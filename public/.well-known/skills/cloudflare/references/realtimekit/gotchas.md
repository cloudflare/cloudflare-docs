# RealtimeKit Gotchas & Troubleshooting

## Common Issues

### Issue: Cannot connect to meeting
**Causes**:
- Auth token invalid or expired
- API credentials lack correct permissions
- Network blocks WebRTC traffic (firewall/proxy)

**Solutions**:
- Verify token validity
- Check API token has **Realtime / Realtime Admin** permissions
- Enable TURN service for restrictive networks

### Issue: No video/audio tracks
**Causes**:
- Browser permissions not granted
- `video: true, audio: true` not set in initialization
- Device in use by another app
- Device not available

**Solutions**:
- Request browser permissions explicitly
- Verify initialization config
- Use `meeting.self.getAllDevices()` to debug device availability
- Close other apps using the device

### Issue: Participant count mismatched
**Cause**: `meeting.participants` doesn't include `meeting.self`

**Solution**: Total count = `meeting.participants.joined.size() + 1`

### Issue: Events not firing
**Causes**:
- Event listeners registered after actions occur
- Incorrect event name spelling
- Wrong namespace (e.g., `meeting.self` vs `meeting.participants`)

**Solutions**:
- Register listeners before calling `meeting.join()`
- Check event names against API documentation
- Verify correct namespace for events

### Issue: CORS errors in API calls
**Cause**: Making REST API calls from client-side

**Solution**: All REST API calls **must** be server-side (Workers, backend). Never expose API tokens to clients.

### Issue: Preset not applying
**Causes**:
- Preset doesn't exist in App
- `preset_name` doesn't match exactly (case-sensitive)
- Participant created before preset

**Solutions**:
- Verify preset exists via Dashboard or API
- Check exact spelling and case
- Create preset before adding participants

### Issue: Token reuse errors
**Cause**: Reusing participant tokens across sessions

**Solution**: Generate fresh token per session. Use refresh endpoint if token expires during session.

### Issue: Video quality poor
**Causes**:
- Network bandwidth insufficient
- Resolution/bitrate too high for connection
- CPU overload

**Solutions**:
- Lower `mediaConfiguration.video` resolution/frameRate
- Monitor network conditions
- Reduce participant count or grid size

### Issue: Echo or audio feedback
**Cause**: Multiple devices picking up same audio source

**Solutions**:
- Enable `echoCancellation: true` in `mediaConfiguration.audio`
- Use headphones
- Mute when not speaking

### Issue: Screen share not working
**Causes**:
- Browser doesn't support screen sharing API
- Permission denied by user
- Wrong `displaySurface` configuration

**Solutions**:
- Use Chrome/Edge/Firefox (Safari limited support)
- Check browser permissions
- Try different `displaySurface` values ('window', 'monitor', 'browser')

## Limits

| Resource | Limit |
|----------|-------|
| Max participants per session | 100 |
| Max concurrent sessions per App | 1000 |
| Max recording duration | 6 hours |
| Max meeting duration | 24 hours |
| Max chat message length | 4000 characters |
| Max preset name length | 64 characters |
| Max meeting title length | 256 characters |
| Max participant name length | 256 characters |
| Token expiration | 24 hours (default) |
| WebRTC ports required | UDP 1024-65535 |

## Network Requirements

### Firewall Rules
Allow outbound UDP/TCP to:
- `*.cloudflare.com` ports 443, 80
- UDP ports 1024-65535 (WebRTC media)

### TURN Service
Enable for users behind restrictive firewalls/proxies:
```jsonc
// wrangler.jsonc
{
  "vars": {
    "TURN_SERVICE_ID": "your_turn_service_id"
  }
  // Set secret: wrangler secret put TURN_SERVICE_TOKEN
}
```

TURN automatically configured in SDK when enabled in account.

## Debugging Tips

```typescript
// Check devices
const devices = await meeting.self.getAllDevices();
meeting.self.on('deviceListUpdate', ({ added, removed, devices }) => console.log('Devices:', { added, removed, devices }));

// Monitor participants
meeting.participants.joined.on('participantJoined', (p) => console.log(`${p.name} joined:`, { id: p.id, userId: p.userId, audioEnabled: p.audioEnabled, videoEnabled: p.videoEnabled }));

// Check room state
meeting.self.on('roomJoined', () => console.log('Room:', { meetingId: meeting.meta.meetingId, meetingTitle: meeting.meta.meetingTitle, participantCount: meeting.participants.joined.size() + 1, audioEnabled: meeting.self.audioEnabled, videoEnabled: meeting.self.videoEnabled }));

// Log all events
['roomJoined', 'audioUpdate', 'videoUpdate', 'screenShareUpdate', 'deviceUpdate', 'deviceListUpdate'].forEach(event => meeting.self.on(event, (data) => console.log(`[self] ${event}:`, data)));
['participantJoined', 'participantLeft'].forEach(event => meeting.participants.joined.on(event, (data) => console.log(`[participants] ${event}:`, data)));
meeting.chat.on('chatUpdate', (data) => console.log('[chat] chatUpdate:', data));
```

## Security & Performance

### Security: Do NOT
- Expose `CLOUDFLARE_API_TOKEN` in client code, hardcode credentials in frontend
- Reuse participant tokens, store tokens in localStorage without encryption
- Allow client-side meeting creation

### Security: DO
- Generate tokens server-side only, use HTTPS, implement rate limiting
- Validate user auth before generating tokens, use `custom_participant_id` to map to your user system
- Set appropriate preset permissions per user role, rotate API tokens regularly

### Performance
- **CPU**: Lower video resolution/frameRate, disable video for audio-only, use `meeting.participants.active` for large meetings, implement virtual scrolling
- **Bandwidth**: Set max resolution in `mediaConfiguration`, disable screenshare audio if unneeded, use audio-only mode, implement adaptive bitrate
- **Memory**: Clean up event listeners on unmount, call `meeting.leave()` when done, don't store large participant arrays

## In This Reference
- [README.md](./README.md) - Overview, core concepts, quick start
- [configuration.md](./configuration.md) - SDK config, presets, wrangler setup
- [api.md](./api.md) - Client SDK APIs, REST endpoints
- [patterns.md](./patterns.md) - Common patterns, React hooks, backend integration
