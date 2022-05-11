---
pcx-content-type: configuration
title: Demo Worker
---

# Example Worker

We've provided an example Worker that exposes an R2 bucket to the Internet and demonstrates its functionality for storing and retrieving objects.

```js
interface Env {
  BUCKET: R2Bucket
}

function parseRange(encoded: string | null): undefined | { offset: number, length: number } {
  if (encoded === null) {
    return
  }

  const parts = encoded.split('-')
  if (parts.length !== 2) {
    throw new Error('Not supported to skip specifying the beginning/ending byte at this time')
  }

  return {
    offset: Number(parts[0]),
    length: Number(parts[1]) + 1 - Number(parts[0]),
  }
}

function objectNotFound(objectName: string): Response {
  return new Response(`<html><body>R2 object "<b>${objectName}</b>" not found</body></html>`, {
    status: 404,
    headers: {
      'content-type': 'text/html; charset=UTF-8'
    }
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const objectName = url.pathname.slice(1)

    console.log(`${request.method} object ${objectName}: ${request.url}`)

    if (request.method === 'GET' || request.method === 'HEAD') {
      if (objectName === '') {
        if (request.method == 'HEAD') {
          return new Response(undefined, { status: 400 })
        }

        const options: R2ListOptions = {
          prefix: url.searchParams.get('prefix') ?? undefined,
          delimiter: url.searchParams.get('delimiter') ?? undefined,
          cursor: url.searchParams.get('cursor') ?? undefined,
          include: ['customMetadata', 'httpMetadata'],
        }
        console.log(JSON.stringify(options))

        const listing = await env.BUCKET.list(options)
        return new Response(JSON.stringify(listing), {headers: {
          'content-type': 'application/json; charset=UTF-8',
        }})
      }

      if (request.method === 'GET') {
        const object = await env.BUCKET.get(objectName, {
          range: parseRange(request.headers.get('range')),
          onlyIf: request.headers,
        })

        if (object === null) {
          return objectNotFound(objectName)
        }

        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        return new Response(object.body, {
          headers,
        })
      }

      const object = await env.BUCKET.head(objectName, {
        onlyIf: request.headers,
      })

      if (object === null) {
        return objectNotFound(objectName)
      }

      const headers = new Headers()
      object.writeHttpMetadata(headers)
      headers.set('etag', object.httpEtag)
      return new Response(null, {
        headers,
      })
    }
    if (request.method === 'PUT' || request.method == 'POST') {
      const object = await env.BUCKET.put(objectName, request.body, {
        httpMetadata: request.headers,
      })
      return new Response(null, {
        headers: {
          'etag': object.httpEtag,
        }
      })
    }
    if (request.method === 'DELETE') {
      await env.BUCKET.delete(url.pathname.slice(1))
      return new Response()
    }

    return new Response(`Unsupported method`, {
      status: 400
    })
  }
}
```

