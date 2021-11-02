---
order: 1000
type: example
summary: Send debugging information in an errored response to a logging service.
tags:
  - Debugging
  - Logging
pcx-content-type: configuration
---

# Debugging logs

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// Service configured to receive logs
const LOG_URL = "https://log-service.example.com/";
function postLog(data) {
  return fetch(LOG_URL, {
    method: "POST",
    body: data,
  });
}
async function handleRequest(request, ctx) {
  let response;
  try {
    response = await fetch(request);
    if (!response.ok) {
      // Ensure the string is small enough to be a header
      const body = (await response.text()).trim().substring(0, 10);
      throw new Error(
        `Bad response at origin. Status: ${response.status} Body: ${body}`
      );
    }
  } catch (err) {
    err = err;
    // Without ctx.waitUntil(), our fetch() to our logging service may
    // or may not complete.
    ctx.waitUntil(postLog(err.toString()));
    const stack = JSON.stringify(err.stack) || err;
    // Copy the response and initialize body to the stack trace
    response = new Response(stack, response);
    // Shove our rewritten URL into a header to find out what it was.
    response.headers.set("X-Debug-stack", stack);
    response.headers.set("X-Debug-err", err);
  }
  return response;
}
export default {
  fetch(request, ctx) {
    ctx.passThroughOnException();
    return handleRequest(request, ctx);
  },
};
```
