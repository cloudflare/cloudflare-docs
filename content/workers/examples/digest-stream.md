---
type: example
summary: Generate an ETag from a ReadableStream via DigestStream.
tags:
  - WebCrypto
pcx-content-type: configuration
title: ETag Generation with DigestStream
weight: 1001
layout: example
---

```ts
interface Env {
  KV: KVNamespace;
}

const onFetch: ExportedHandlerFetchHandler<Env> = async (request, env) => {
  const encoder = new TextEncoder();

  const etagStream = new crypto.DigestStream('SHA-1');
  const { readable, writable } = new TransformStream();

  const etagWriter = etagStream.getWriter();
  const resultWriter = writable.getWriter();

  /**
   * We're not awaiting this because we'll start streaming into
   * the writable side of the transform stream after.
   */
  env.KV.put('result', readable);

  /**
   * `processStream` would be some utility function that reads
   * a ReadableStream, decoding each chunk and passing the data
   * to the callback.
   */
  await processStream(request.body, (data: string) => {
    // ... do whatever with the data here

    const encoded = encoder.encode(data);

    etagWriter.write(encoded);
    resultWriter.write(encoded);
  }

  await Promise.all([etagWriter.close(), resultWriter.close()]);

  const etagBuffer = await etagStream.digest;

  const etag = Array.from(new Uint8Array(etagBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  await env.KV.put('etag', etag);

  return new Response('done');
}

const worker: ExportedHandler<Env> = {
	fetch: onFetch,
};

export default worker;
```
