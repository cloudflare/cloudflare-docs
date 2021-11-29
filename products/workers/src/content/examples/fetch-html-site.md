---
order: 3
type: example
summary: Send a request to a remote server, read HTML from the response, and serve that HTML extended to support pathnames of links clicked on the initial HTML response page.
tags:
  - Originless
pcx-content-type: configuration
---

# Fetch HTML Site

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response;
  const contentType = headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json());
  }
  else if (contentType.includes("application/text")) {
    return response.text();
  }
  else if (contentType.includes("text/html")) {
    return response.text();
  }
  else {
    return response.text();
  }
}

async function handleRequest(request) {
  const hostname = "https://bbc.co.uk";
  const pnnews = "/news";
  const urlnews = hostname.concat(pnnews);
  const url = new URL(request.url);
  const urlpn = url.pathname;
  const htmlHeader = {
    headers: {
      "content-type": "text/html;charset=UTF-8"
    }
  }
  if(urlpn == "/") {
    const response = await fetch(urlnews, htmlHeader);
    const results = await gatherResponse(response);
    if (response === null || results === null) {
      return new Response("Fetch failure; website not found", {status: 404});
    } else {
      return new Response(results, htmlHeader);
    }
  } else {
    const urlfull = hostname.concat(urlpn);
    const response = await fetch(urlfull, htmlHeader);
    const results = await gatherResponse(response);
    if (response === null || results === null) {
      return new Response("Fetch failure; website not found", {status: 404});
    } else {
      return new Response(results, htmlHeader);
    }
  }
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})
```
