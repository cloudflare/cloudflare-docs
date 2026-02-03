# RealtimeKit Configuration

Configuration guide for RealtimeKit setup, client SDKs, and wrangler integration.

## Installation

### React
```bash
npm install @cloudflare/realtimekit @cloudflare/realtimekit-react-ui
```

### Angular
```bash
npm install @cloudflare/realtimekit @cloudflare/realtimekit-angular-ui
```

### Web Components/HTML
```bash
npm install @cloudflare/realtimekit @cloudflare/realtimekit-ui
```

## Client SDK Configuration

### React UI Kit
```tsx
import { RtkMeeting } from '@cloudflare/realtimekit-react-ui';
<RtkMeeting authToken="<token>" onLeave={() => {}} />
```

### Angular UI Kit
```typescript
@Component({ template: `<rtk-meeting [authToken]="authToken" (rtkLeave)="onLeave($event)"></rtk-meeting>` })
export class AppComponent { authToken = '<token>'; onLeave() {} }
```

### Web Components
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@cloudflare/realtimekit-ui/dist/realtimekit-ui/realtimekit-ui.esm.js"></script>
<rtk-meeting id="meeting"></rtk-meeting>
<script>
  document.getElementById('meeting').authToken = '<token>';
</script>
```

### Core SDK Configuration
```typescript
import RealtimeKitClient from '@cloudflare/realtimekit';

const meeting = new RealtimeKitClient({
  authToken: '<token>',
  video: true, audio: true, autoSwitchAudioDevice: true,
  mediaConfiguration: {
    video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    screenshare: { width: { max: 1920 }, height: { max: 1080 }, frameRate: { ideal: 15 } }
  }
});
await meeting.join();
```

## Backend Setup

### Create App & Credentials

**Dashboard**: https://dash.cloudflare.com/?to=/:account/realtime/kit

**API**:
```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/apps' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <api_token>' \
  -d '{"name": "My RealtimeKit App"}'
```

**Required Permissions**: API token with **Realtime / Realtime Admin** permissions

### Create Presets

```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/<app_id>/presets' \
  -H 'Authorization: Bearer <api_token>' \
  -d '{
    "name": "host",
    "permissions": {
      "canShareAudio": true,
      "canShareVideo": true,
      "canRecord": true,
      "canLivestream": true,
      "canStartStopRecording": true
    }
  }'
```

## Wrangler Configuration

### Basic Configuration
```jsonc
// wrangler.jsonc
{
  "name": "realtimekit-app",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01",  // Use current date
  "vars": {
    "CLOUDFLARE_ACCOUNT_ID": "abc123",
    "REALTIMEKIT_APP_ID": "xyz789"
  }
  // Secrets: wrangler secret put CLOUDFLARE_API_TOKEN
}
```

### With Database & Storage
```jsonc
{
  "d1_databases": [{ "binding": "DB", "database_name": "meetings", "database_id": "d1-id" }],
  "r2_buckets": [{ "binding": "RECORDINGS", "bucket_name": "recordings" }],
  "kv_namespaces": [{ "binding": "SESSIONS", "id": "kv-id" }]
}
```

### Multi-Environment
```bash
# Deploy to environments
wrangler deploy --env staging
wrangler deploy --env production
```

## TURN Service Configuration

RealtimeKit can use Cloudflare's TURN service for connectivity through restrictive networks:

```jsonc
// wrangler.jsonc
{
  "vars": {
    "TURN_SERVICE_ID": "your_turn_service_id"
  }
  // Set secret: wrangler secret put TURN_SERVICE_TOKEN
}
```

TURN automatically configured when enabled in account - no client-side changes needed.

## See Also

- [API](./api.md) - Meeting APIs, REST endpoints
- [Patterns](./patterns.md) - Backend integration examples
- [README](./README.md) - Overview and quick start
