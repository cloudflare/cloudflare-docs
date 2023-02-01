---
type: example
summary: Send Additional Cache Tags using Workers
tags:
  - Caching
  - Cache Tags
pcx_content_type: configuration
title: Cache Tags using Workers
weight: 1001
layout: example
---

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request) {
    const requestUrl = new URL(request.url);
    const params = requestUrl.searchParams;
    const tags =
      params && params.has('tags') ? params.get('tags').split(',') : [];
    const url =
      params && params.has('uri') ? JSON.parse(params.get('uri')) : '';
    if (!url) {
      const errorObject = {
        error: 'URL cannot be empty',
      };
      return new Response(JSON.stringify(errorObject), { status: 400 });
    }
    const init = {
      cf: {
        cacheTags: tags,
      },
    };
    return fetch(url, init)
      .then((result) => {
        const cacheStatus = result.headers.get('cf-cache-status');
        const lastModified = result.headers.get('last-modified');
        const response = {
          cache: cacheStatus,
          lastModified: lastModified,
        };
        return new Response(JSON.stringify(response), {
          status: result.status,
        });
      })
      .catch((err) => {
        const errorObject = {
          error: err.message,
        };
        return new Response(JSON.stringify(errorObject), { status: 500 });
      });
  },
};

```
{{</tab>}}
{{<tab label="js/sw">}}
```js
addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});


async function handleRequest(request) {
  const requestUrl = new URL(request.url);
  const params = requestUrl.searchParams;
  const tags = params && params.has('tags') 
    ? params.get('tags').split(',')
    : [];
  
  const url = params && params.has('uri')
    ? JSON.parse(params.get('uri'))
    : '';
  
  if (!url) {
    const errorObject = {
      error: "URL cannot be empty"
    }
    return new Response(JSON.stringify(errorObject), { status: 400 })
  }

  
  const init = {
    cf: {
      cacheTags: tags
    }
  }
    
  return fetch(url, init)
    .then((result) => {
      const cacheStatus = result.headers.get('cf-cache-status');
      const lastModified = result.headers.get('last-modified');

      const response = {
        cache: cacheStatus,
        lastModified: lastModified
      };
      return new Response(JSON.stringify(response), { status: result.status })
    })
    .catch((err) => {
      const errorObject = {
        error: err.message
      };

      return new Response(JSON.stringify(errorObject), { status: 500 })
    });
}
```
{{</tab>}}
{{</tabs>}}
