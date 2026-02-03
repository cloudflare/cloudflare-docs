# Stream Patterns

Common workflows, full-stack flows, and best practices.

## Full-Stack Upload Flow

**Backend API (Next.js route)**
```typescript
// app/api/upload-url/route.ts
export async function POST(req: Request) {
  const { userId, videoName } = await req.json();
  
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/stream/direct_upload`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CF_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        maxDurationSeconds: 3600,
        requireSignedURLs: true,
        meta: { creator: userId, name: videoName }
      })
    }
  );
  const data = await response.json();
  return Response.json({ uploadURL: data.result.uploadURL, uid: data.result.uid });
}
```

**Frontend component**
```tsx
'use client';
import { useState } from 'react';

export function VideoUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  async function handleUpload(file: File) {
    setUploading(true);
    const { uploadURL, uid } = await fetch('/api/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoName: file.name })
    }).then(r => r.json());
    
    const formData = new FormData();
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) setProgress((e.loaded / e.total) * 100);
    });
    xhr.addEventListener('load', () => {
      setUploading(false);
      window.location.href = `/videos/${uid}`;
    });
    xhr.open('POST', uploadURL);
    xhr.send(formData);
  }
  
  return (
    <div>
      <input type="file" accept="video/*"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        disabled={uploading} />
      {uploading && <progress value={progress} max={100} />}
    </div>
  );
}
```

## Video State Management

```typescript
interface VideoState {
  uid: string;
  readyToStream: boolean;
  status: { state: 'queued' | 'inprogress' | 'ready' | 'error'; pctComplete?: string };
}

async function waitForVideoReady(
  accountId: string, videoId: string, apiToken: string,
  maxAttempts = 60, intervalMs = 5000
): Promise<VideoState> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/${videoId}`,
      { headers: { 'Authorization': `Bearer ${apiToken}` } }
    );
    const { result } = await response.json();
    if (result.readyToStream || result.status.state === 'error') return result;
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  throw new Error('Video processing timeout');
}
```

## Webhook Handler (Workers)

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const signature = request.headers.get('Webhook-Signature');
    if (!signature) return new Response('No signature', { status: 401 });
    
    const body = await request.text();
    // Verify HMAC-SHA256: parse time/sig1, check 5min window, compare signature
    const isValid = await verifySignature(signature, body, env.WEBHOOK_SECRET);
    if (!isValid) return new Response('Invalid', { status: 401 });
    
    const payload = JSON.parse(body);
    if (payload.readyToStream) console.log(`Video ${payload.uid} ready`);
    return new Response('OK');
  }
};
// Full verifySignature impl in gotchas.md
```

## Live Streaming Setup

**OBS**: Server `rtmps://live.cloudflare.com:443/live/`, Stream Key from API

**FFmpeg**: `ffmpeg -re -i input.mp4 -c:v libx264 -preset veryfast -b:v 3000k -c:a aac -f flv rtmps://live.cloudflare.com:443/live/<KEY>`

## Best Practices

1. **Use Direct Creator Uploads** - Avoid proxying video through servers
2. **Enable requireSignedURLs** - Control access to private content
3. **Use signing keys for high volume** - Self-sign tokens instead of API calls
4. **Set allowedOrigins** - Prevent hotlinking
5. **Use webhooks over polling** - Efficient status updates
6. **Cache video metadata** - Reduce API calls
7. **Set maxDurationSeconds** - Prevent abuse on direct uploads
8. **Use creator metadata** - Enable per-user filtering/analytics
9. **Enable recordings for live** - Automatic VOD after stream ends
10. **Monitor with GraphQL analytics** - Track views, watch time, geo

## In This Reference

- [README.md](./README.md) - Overview and quick start
- [configuration.md](./configuration.md) - Setup and config
- [api.md](./api.md) - Upload, playback, live streaming APIs
- [gotchas.md](./gotchas.md) - Error codes, troubleshooting

## See Also

- [workers](../workers/) - Deploy Stream APIs in Workers
- [pages](../pages/) - Integrate Stream with Pages
