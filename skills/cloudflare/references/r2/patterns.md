# R2 Patterns & Best Practices

## Streaming Large Files

```typescript
const object = await env.MY_BUCKET.get(key);
if (!object) return new Response('Not found', { status: 404 });

const headers = new Headers();
object.writeHttpMetadata(headers);
headers.set('etag', object.httpEtag);

return new Response(object.body, { headers });
```

## Conditional GET (304 Not Modified)

```typescript
const ifNoneMatch = request.headers.get('if-none-match');
const object = await env.MY_BUCKET.get(key, {
  onlyIf: { etagDoesNotMatch: ifNoneMatch?.replace(/"/g, '') || '' }
});

if (!object) return new Response('Not found', { status: 404 });
if (!object.body) return new Response(null, { status: 304, headers: { 'etag': object.httpEtag } });

return new Response(object.body, { headers: { 'etag': object.httpEtag } });
```

## Upload with Validation

```typescript
const key = url.pathname.slice(1);
if (!key || key.includes('..')) return new Response('Invalid key', { status: 400 });

const object = await env.MY_BUCKET.put(key, request.body, {
  httpMetadata: { contentType: request.headers.get('content-type') || 'application/octet-stream' },
  customMetadata: { uploadedAt: new Date().toISOString(), ip: request.headers.get('cf-connecting-ip') || 'unknown' }
});

return Response.json({ key: object.key, size: object.size, etag: object.httpEtag });
```

## Multipart with Progress

```typescript
const PART_SIZE = 5 * 1024 * 1024; // 5MB
const partCount = Math.ceil(file.size / PART_SIZE);
const multipart = await env.MY_BUCKET.createMultipartUpload(key, { httpMetadata: { contentType: file.type } });

const uploadedParts: R2UploadedPart[] = [];
try {
  for (let i = 0; i < partCount; i++) {
    const start = i * PART_SIZE;
    const part = await multipart.uploadPart(i + 1, file.slice(start, start + PART_SIZE));
    uploadedParts.push(part);
    onProgress?.(Math.round(((i + 1) / partCount) * 100));
  }
  return await multipart.complete(uploadedParts);
} catch (error) {
  await multipart.abort();
  throw error;
}
```

## Batch Delete

```typescript
async function deletePrefix(prefix: string, env: Env) {
  let cursor: string | undefined;
  let truncated = true;

  while (truncated) {
    const listed = await env.MY_BUCKET.list({ prefix, limit: 1000, cursor });
    if (listed.objects.length > 0) {
      await env.MY_BUCKET.delete(listed.objects.map(o => o.key));
    }
    truncated = listed.truncated;
    cursor = listed.cursor;
  }
}
```

## Checksum Validation

```typescript
const hash = await crypto.subtle.digest('SHA-256', data);
await env.MY_BUCKET.put(key, data, { sha256: hash });

// Verify on retrieval
const object = await env.MY_BUCKET.get(key);
const retrievedHash = await crypto.subtle.digest('SHA-256', await object.arrayBuffer());
const valid = object.checksums.sha256 && arrayBuffersEqual(retrievedHash, object.checksums.sha256);
```

## Storage Class Transitions

```typescript
// Use S3 SDK CopyObject to transition
const s3 = new S3Client({...});
await s3.send(new CopyObjectCommand({
  Bucket: 'my-bucket',
  Key: key,
  CopySource: `/my-bucket/${key}`,
  StorageClass: 'STANDARD_IA'
}));
```

## Public Bucket with Custom Domain

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const key = new URL(request.url).pathname.slice(1);
    const object = await env.MY_BUCKET.get(key);
    if (!object) return new Response('Not found', { status: 404 });

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('access-control-allow-origin', '*');
    headers.set('cache-control', 'public, max-age=31536000, immutable');

    return new Response(object.body, { headers });
  }
};
```
