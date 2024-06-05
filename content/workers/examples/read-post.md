---
type: example
summary: Serve an HTML form, then read POST requests. Use also to read JSON or
  POST data from an incoming request.
tags:
  - JSON
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: configuration
title: Read POST
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    /**
     * rawHtmlResponse returns HTML inputted directly
     * into the worker script
     * @param {string} html
     */
    function rawHtmlResponse(html) {
      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }

    /**
     * readRequestBody reads in the incoming request body
     * Use await readRequestBody(..) in an async function to get the string
     * @param {Request} request the incoming request to read from
     */
    async function readRequestBody(request) {
      const contentType = request.headers.get("content-type");
      if (contentType.includes("application/json")) {
        return JSON.stringify(await request.json());
      } else if (contentType.includes("application/text")) {
        return request.text();
      } else if (contentType.includes("text/html")) {
        return request.text();
      } else if (contentType.includes("form")) {
        const formData = await request.formData();
        const body = {};
        for (const entry of formData.entries()) {
          body[entry[0]] = entry[1];
        }
        return JSON.stringify(body);
      } else {
        // Perhaps some other type of data was submitted in the form
        // like an image, or some other binary data.
        return "a file";
      }
    }

    const { url } = request;
    if (url.includes("form")) {
      return rawHtmlResponse(someForm);
    }
    if (request.method === "POST") {
      const reqBody = await readRequestBody(request);
      const retBody = `The request body sent in was ${reqBody}`;
      return new Response(retBody);
    } else if (request.method === "GET") {
      return new Response("The request was a GET");
    }
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    /**
     * rawHtmlResponse returns HTML inputted directly
     * into the worker script
     * @param {string} html
     */
    function rawHtmlResponse(html) {
      return new Response(html, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }

    /**
     * readRequestBody reads in the incoming request body
     * Use await readRequestBody(..) in an async function to get the string
     * @param {Request} request the incoming request to read from
     */
    async function readRequestBody(request: Request) {
      const contentType = request.headers.get("content-type");
      if (contentType.includes("application/json")) {
        return JSON.stringify(await request.json());
      } else if (contentType.includes("application/text")) {
        return request.text();
      } else if (contentType.includes("text/html")) {
        return request.text();
      } else if (contentType.includes("form")) {
        const formData = await request.formData();
        const body = {};
        for (const entry of formData.entries()) {
          body[entry[0]] = entry[1];
        }
        return JSON.stringify(body);
      } else {
        // Perhaps some other type of data was submitted in the form
        // like an image, or some other binary data.
        return "a file";
      }
    }

    const { url } = request;
    if (url.includes("form")) {
      return rawHtmlResponse(someForm);
    }
    if (request.method === "POST") {
      const reqBody = await readRequestBody(request);
      const retBody = `The request body sent in was ${reqBody}`;
      return new Response(retBody);
    } else if (request.method === "GET") {
      return new Response("The request was a GET");
    }
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py

from js import Object, Response, Headers, JSON

async def read_request_body(request):
    headers = request.headers
    content_type = headers["content-type"] or ""

    if "application/json" in content_type:
        return JSON.stringify(await request.json())
    if "form" in content_type:
        form = await request.formData()
        data = Object.fromEntries(form.entries())
        return JSON.stringify(data)
    return await request.text()

async def on_fetch(request):
    def raw_html_response(html):
        headers = Headers.new({"content-type": "text/html;charset=UTF-8"}.items())
        return Response.new(html, headers=headers)

    if "form" in request.url:
        return raw_html_response("")

    if "POST" in request.method:
        req_body = await read_request_body(request)
        ret_body = f"The request body sent in was {req_body}"
        return Response.new(ret_body)

    return Response.new("The request was not POST")
```

{{</tab>}}
{{</tabs>}}
