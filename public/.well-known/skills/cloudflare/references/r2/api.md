# R2 API Reference

## PUT (Upload)

```typescript
// Basic
await env.MY_BUCKET.put(key, value);

// With metadata
await env.MY_BUCKET.put(key, value, {
  httpMetadata: {
    contentType: 'image/jpeg',
    contentDisposition: 'attachment; filename="photo.jpg"',
    cacheControl: 'max-age=3600'
  },
  customMetadata: { userId: '123', version: '2' },
  storageClass: 'Standard', // or 'InfrequentAccess'
  sha256: arrayBufferOrHex, // Integrity check
  ssecKey: arrayBuffer32bytes // SSE-C encryption
});

// Value types: ReadableStream | ArrayBuffer | string | Blob
```

## GET (Download)

```typescript
const object = await env.MY_BUCKET.get(key);
if (!object) return new Response('Not found', { status: 404 });

// Body formats
const buffer = await object.arrayBuffer();
const text = await object.text();
const json = await object.json();
const stream = object.body; // ReadableStream

// Ranged reads
const object = await env.MY_BUCKET.get(key, {
  range: { offset: 0, length: 1024 }
});

// Conditional GET
const object = await env.MY_BUCKET.get(key, {
  onlyIf: { etagMatches: '"abc123"' }
});
```

## HEAD (Metadata Only)

```typescript
const object = await env.MY_BUCKET.head(key);
console.log(object?.size, object?.etag, object?.storageClass);
```

## DELETE

```typescript
await env.MY_BUCKET.delete(key);
await env.MY_BUCKET.delete([key1, key2, key3]); // Batch (max 1000)
```

## LIST

```typescript
const listed = await env.MY_BUCKET.list({
  limit: 1000,
  prefix: 'photos/',
  cursor: cursorFromPrevious,
  delimiter: '/',
  include: ['httpMetadata', 'customMetadata']
});

// Pagination (always use truncated flag)
while (listed.truncated) {
  const next = await env.MY_BUCKET.list({ cursor: listed.cursor });
  listed.objects.push(...next.objects);
  listed.truncated = next.truncated;
  listed.cursor = next.cursor;
}
```

## Multipart Uploads

```typescript
const multipart = await env.MY_BUCKET.createMultipartUpload(key, {
  httpMetadata: { contentType: 'video/mp4' }
});

const uploadedParts: R2UploadedPart[] = [];
for (let i = 0; i < partCount; i++) {
  const part = await multipart.uploadPart(i + 1, partData);
  uploadedParts.push(part);
}

const object = await multipart.complete(uploadedParts);
// OR: await multipart.abort();

// Resume
const multipart = env.MY_BUCKET.resumeMultipartUpload(key, uploadId);
```

## R2Object Interface

```typescript
interface R2Object {
  key: string;
  version: string;
  size: number;
  etag: string; // Unquoted
  httpEtag: string; // Quoted (use for headers)
  uploaded: Date;
  httpMetadata: R2HTTPMetadata;
  customMetadata: Record<string, string>;
  storageClass: 'Standard' | 'InfrequentAccess';
  checksums: R2Checksums;
  writeHttpMetadata(headers: Headers): void;
}
```

## CLI Operations

```bash
wrangler r2 object put my-bucket/file.txt --file=./local.txt --content-type=text/plain
wrangler r2 object get my-bucket/file.txt --file=./download.txt
wrangler r2 object delete my-bucket/file.txt
wrangler r2 object list my-bucket --prefix=photos/ --delimiter=/
```
