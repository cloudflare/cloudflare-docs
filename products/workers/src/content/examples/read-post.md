---
order: 1000
type: example
summary: Serve an HTML form, then read POST requests. Use also to read JSON or POST data from an incoming request.
tags:
  - HTML
  - JSON
  - Originless
---

# Read POST

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
/**
 * rawHtmlResponse returns HTML inputted directly
 * into the worker script
 * @param {string} html
 */
function rawHtmlResponse(html) {
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  }
  return new Response(html, init)
}

/**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(..) in an async function to get the string
 * @param {Request} request the incoming request to read from
 */
async function readRequestBody(request) {
  const { headers } = request
  const contentType = headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return JSON.stringify(await request.json())
  }
  else if (contentType.includes("application/text")) {
    return await request.text()
  }
  else if (contentType.includes("text/html")) {
    return await request.text()
  }
  else if (contentType.includes("form")) {
    const formData = await request.formData()
    const body = {}
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1]
    }
    return JSON.stringify(body)
  }
  else {
    const myBlob = await request.blob()
    const objectURL = URL.createObjectURL(myBlob)
    return objectURL
  }
}

const someForm = `
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
  `

async function handleRequest(request) {
  const reqBody = await readRequestBody(request)
  const retBody = `The request body sent in was ${reqBody}`
  return new Response(retBody)
}

addEventListener("fetch", event => {
  const { request } = event
  const { url } = request

  if (url.includes("form")) {
    return event.respondWith(rawHtmlResponse(someForm))
  }
  if (request.method === "POST") {
    return event.respondWith(handleRequest(request))
  }
  else if (request.method === "GET") {
    return event.respondWith(new Response(`The request was a GET`))
  }
})
```
