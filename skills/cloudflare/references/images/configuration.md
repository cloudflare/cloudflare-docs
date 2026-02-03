## Wrangler Integration

### Upload via Wrangler

Wrangler doesn't have built-in Cloudflare Images commands, but you can use the API:

```typescript
// scripts/upload-image.ts
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

async function uploadImage(filePath: string) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
      body: formData,
    }
  );
  
  const result = await response.json();
  console.log('Uploaded:', result);
}

uploadImage('./photo.jpg');
```

### Access Images from Workers

Store account hash as an environment variable:

```toml
# wrangler.toml
[vars]
IMAGES_ACCOUNT