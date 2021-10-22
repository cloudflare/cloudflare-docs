---
order: 1000
type: example
summary: Serve an HTML form, then read POST requests. Use also to read JSON or POST data from an incoming request.
tags:
  - JSON
  - Originless
pcx-content-type: configuration
---

# Read POST

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// The HTML page containing an example form
const HTML = `
  <!DOCTYPE html>
  <html>
    <body>
    <h1>Hello World</h1>
    <p>This is all generated using a Worker</p>
    <form action="/demos/requests" method="post">
      <div>
        <label for="say">What  do you want to say?</label>
        <input name="say" id="say" value="Hi">
      </div>
      <div>
        <label for="to">To who?</label>
        <input name="to" id="to" value="Mom">
      </div>
      <div>
        <button>Send my greetings</button>
      </div>
    </form>
    </body>
  </html>
`;
/**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(..) in an async function to get the string
 */
async function readRequestBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return JSON.stringify(await request.json());
  }
  if (contentType.includes("application/text")) {
    return request.text();
  }
  if (contentType.includes("text/html")) {
    return request.text();
  }
  if (contentType.includes("form")) {
    const formData = await request.formData();
    const body = Object.fromEntries(formData);
    return JSON.stringify(body);
  }
  // Perhaps some other type of data was submitted in the form
  // like an image, or some other binary data.
  return "a file";
}
/**
 * rawHtmlResponse returns HTML inputted directly
 * into the worker script
 */
function rawHtmlResponse(html) {
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}
async function handleRequest(request) {
  const reqBody = await readRequestBody(request);
  return new Response(`The request body sent in was ${reqBody}`);
}
export default {
  async fetch(request) {
    if (request.url.includes("form")) {
      return rawHtmlResponse(HTML);
    }
    if (request.method === "POST") {
      return handleRequest(request);
    }
    return new Response("Method Not Allowed", { status: 405 });
  },
};
```
