# R2 Gotchas & Troubleshooting

## List Truncation

```typescript
// ❌ WRONG: Don't compare object count when using include
while (listed.objects.length < options.limit) { ... }

// ✅ CORRECT: Always use truncated property
while (listed.truncated) {
  const next = await env.MY_BUCKET.list({ cursor: listed.cursor });
  // ...
}
```

**Reason:** `include` with metadata may return fewer objects per page to fit metadata.

## ETag Format

```typescript
// ❌ WRONG: Using etag (unquoted) in headers
headers.set('etag', object.etag); // Missing quotes

// ✅ CORRECT: Use httpEtag (quoted)
headers.set('etag', object.httpEtag);
```

## Checksum Limits

Only ONE checksum algorithm allowed per PUT:

```typescript
// ❌ WRONG: Multiple checksums
await env.MY_BUCKET.put(key, data, { md5: hash1, sha256: hash2 }); // Error

// ✅ CORRECT: Pick one
await env.MY_BUCKET.put(key, data, { sha256: hash });
```

## Multipart Requirements

- All parts must be uniform size (except last part)
- Part numbers start at 1 (not 0)
- Uncompleted uploads auto-abort after 7 days
- `resumeMultipartUpload` doesn't validate uploadId existence

## Conditional Operations

```typescript
// Precondition failure returns object WITHOUT body
const object = await env.MY_BUCKET.get(key, {
  onlyIf: { etagMatches: '"wrong"' }
});

// Check for body, not just null
if (!object) return new Response('Not found', { status: 404 });
if (!object.body) return new Response(null, { status: 304 }); // Precondition failed
```

## Key Validation

```typescript
// ❌ DANGEROUS: Path traversal
const key = url.pathname.slice(1); // Could be ../../../etc/passwd
await env.MY_BUCKET.get(key);

// ✅ SAFE: Validate keys
if (!key || key.includes('..') || key.startsWith('/')) {
  return new Response('Invalid key', { status: 400 });
}
```

## Storage Class Pitfalls

- InfrequentAccess: 30-day minimum billing (even if deleted early)
- Can't transition IA → Standard via lifecycle (use S3 CopyObject)
- Retrieval fees apply for IA reads

## Limits

| Limit | Value |
|-------|-------|
| Object size | 5 TB |
| Multipart part count | 10,000 |
| Batch delete | 1,000 keys |
| List limit | 1,000 per request |
| Key size | 1024 bytes |
| Custom metadata | 2 KB per object |

## Common Errors

**"oldString not found"**: Object key doesn't exist  
**List compatibility_date**: Set `compatibility_date >= 2022-08-04` or enable `r2_list_honor_include` flag  
**Multipart part size**: Ensure uniform size except final part
