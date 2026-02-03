# Stream API Reference

Upload, playback, live streaming, and management APIs.

## Upload APIs

### Direct Creator Upload (Recommended)

**Backend: Create upload URL**
```typescript
async function createUploadURL(accountId: string, apiToken: string) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/direct_upload`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maxDurationSeconds: 3600,
        expiry: new Date(Date.now() + 3600000).toISOString(),
        requireSignedURLs: true,
        meta: { creator: 'user-123' }
      })
    }
  );
  const data = await response.json();
  return { uploadURL: data.result.uploadURL, uid: data.result.uid };
}
```

**Frontend: Upload to Stream**
```typescript
async function uploadVideo(file: File, uploadURL: string) {
  const formData = new FormData();
  formData.append('file', file);
  return fetch(uploadURL, { method: 'POST', body: formData }).then(r => r.json());
}
```

### Upload from URL

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/copy" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/video.mp4",
    "meta": {"name": "My Video"},
    "requireSignedURLs": false
  }'
```

## Playback APIs

### Embed Player (iframe)

```html
<iframe
  src="https://customer-<CODE>.cloudflarestream.com/<VIDEO_ID>/iframe?autoplay=true&muted=true"
  style="border: none;" height="720" width="1280"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

### HLS/DASH Manifest URLs

```typescript
// HLS
const hlsUrl = `https://customer-<CODE>.cloudflarestream.com/${videoId}/manifest/video.m3u8`;

// DASH
const dashUrl = `https://customer-<CODE>.cloudflarestream.com/${videoId}/manifest/video.mpd`;
```

### Thumbnails

```typescript
// At specific time (seconds)
const thumb = `https://customer-<CODE>.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?time=10s`;

// By percentage
const thumbPct = `https://customer-<CODE>.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?time=50%`;

// Animated GIF
const gif = `https://customer-<CODE>.cloudflarestream.com/${videoId}/thumbnails/thumbnail.gif`;
```

## Signed URLs

```typescript
// Low volume (<1k/day): Use API
async function getSignedToken(accountId: string, videoId: string, apiToken: string) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${videoId}/token`,
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + 3600,
        accessRules: [{ type: 'ip.geoip.country', action: 'allow', country: ['US'] }]
      })
    }
  );
  return (await response.json()).result.token;
}

// High volume: Self-sign with RS256 JWT using crypto.subtle (see patterns.md)
```

## Live Streaming APIs

### Create Live Input

```typescript
async function createLiveInput(accountId: string, apiToken: string) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/live_inputs`,
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recording: { mode: 'automatic', timeoutSeconds: 30 },
        deleteRecordingAfterDays: 30
      })
    }
  );
  const { result } = await response.json();
  return {
    uid: result.uid,
    rtmps: { url: result.rtmps.url, streamKey: result.rtmps.streamKey },
    srt: { url: result.srt.url, streamId: result.srt.streamId, passphrase: result.srt.passphrase }
  };
}
```

### Check Live Status

```typescript
async function getLiveStatus(accountId: string, liveInputId: string, apiToken: string) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/live_inputs/${liveInputId}`,
    { headers: { 'Authorization': `Bearer ${apiToken}` } }
  );
  const { result } = await response.json();
  return { isLive: result.status?.current?.state === 'connected', recording: result.recording };
}
```

### Create Live Output (Simulcast)

```typescript
async function createLiveOutput(
  accountId: string, liveInputId: string, apiToken: string,
  outputUrl: string, streamKey: string
) {
  return fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/live_inputs/${liveInputId}/outputs`,
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: `${outputUrl}/${streamKey}`, enabled: true })
    }
  ).then(r => r.json());
}
```

## Video Management APIs

```typescript
// List videos
async function listVideos(accountId: string, apiToken: string, search?: string) {
  const params = new URLSearchParams(search ? { search } : {});
  return fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream?${params}`,
    { headers: { 'Authorization': `Bearer ${apiToken}` } }
  ).then(r => r.json());
}

// Update video
async function updateVideo(accountId: string, videoId: string, apiToken: string, updates: unknown) {
  return fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${videoId}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  }).then(r => r.json());
}

// Delete, clip: similar pattern with DELETE/POST
```

## In This Reference

- [README.md](./README.md) - Overview and quick start
- [configuration.md](./configuration.md) - Setup and config
- [patterns.md](./patterns.md) - Full-stack flows, best practices
- [gotchas.md](./gotchas.md) - Error codes, troubleshooting

## See Also

- [workers](../workers/) - Deploy Stream APIs in Workers
