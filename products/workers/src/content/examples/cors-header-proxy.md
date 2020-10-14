---
order: 1000
type: example
summary: Add the necessary CORS headers to a third party API response.
tags:
  - Originless
  - Security
  - API
---

# CORS header proxy

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
// We support the GET, POST, HEAD, and OPTIONS methods from any origin,
// and allow any header on requests. These headers must be present
// on all responses to all CORS preflight requests. In practice, this means
// all responses to OPTIONS requests.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
}

// The URL for the remote third party API you want to fetch from
// but does not implement CORS
const API_URL = "https://examples.cloudflareworkers.com/demos/demoapi"

// The endpoint you want the CORS reverse proxy to be on
const PROXY_ENDPOINT = "/corsproxy/"

// The rest of this snippet for the demo page
async function rawHtmlResponse(html) {
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  })
}

const DEMO_PAGE = `
  <!DOCTYPE html>
  <html>
  <body>
    <h1>API GET without CORS Proxy</h1>
    <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful">Shows TypeError: Failed to fetch since CORS is misconfigured</a>
    <p id="noproxy-status"/>
    <code id="noproxy">Waiting</code>
    <h1>API GET with CORS Proxy</h1>
    <p id="proxy-status"/>
    <code id="proxy">Waiting</code>
    <h1>API POST with CORS Proxy + Preflight</h1>
    <p id="proxypreflight-status"/>
    <code id="proxypreflight">Waiting</code>
    <script>
    let reqs = {};
    reqs.noproxy = async () => {
      let response = await fetch("${API_URL}")
      return await response.json()
    }
    reqs.proxy = async () => {
      let response = await fetch(window.location.origin + "${PROXY_ENDPOINT}?apiurl=${API_URL}")
      return await response.json()
    }
    reqs.proxypreflight = async () => {
      const reqBody = {
        msg: "Hello world!"
      }
      let response = await fetch(window.location.origin + "${PROXY_ENDPOINT}?apiurl=${API_URL}", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody),
      })
      return await response.json()
    }
    (async () => {
      for (const [reqName, req] of Object.entries(reqs)) {
        try {
          let data = await req()
          document.getElementById(reqName).innerHTML = JSON.stringify(data)
        } catch (e) {
          document.getElementById(reqName).innerHTML = e
        }
      }
    })()
    </script>
  </body>
  </html>`

async function handleRequest(request) {
  const url = new URL(request.url)
  let apiUrl = url.searchParams.get("apiurl")

  if (apiUrl == null) {
    apiUrl = API_URL
  }

  // Rewrite request to point to API url. This also makes the request mutable
  // so we can add the correct Origin header to make the API server think
  // that this request isn't cross-site.
  request = new Request(apiUrl, request)
  request.headers.set("Origin", new URL(apiUrl).origin)
  let response = await fetch(request)

  // Recreate the response so we can modify the headers
  response = new Response(response.body, response)

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", url.origin)

  // Append to/Add Vary header so browser will cache response correctly
  response.headers.append("Vary", "Origin")

  return response
}

function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ){
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
    // Allow all future content Request headers to go back to browser
    // such as Authorization (Bearer) or X-Client-Name-Version
      "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers"),
    }

    return new Response(null, {
      headers: respHeaders,
    })
  }
  else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    })
  }
}

addEventListener("fetch", event => {
  const request = event.request
  const url = new URL(request.url)
  if(url.pathname.startsWith(PROXY_ENDPOINT)){
    if (request.method === "OPTIONS") {
      // Handle CORS preflight requests
      event.respondWith(handleOptions(request))
    }
    else if(
      request.method === "GET" ||
      request.method === "HEAD" ||
      request.method === "POST"
    ){
      // Handle requests to the API server
      event.respondWith(handleRequest(request))
    }
    else {
      event.respondWith(
        new Response(null, {
          status: 405,
          statusText: "Method Not Allowed",
        }),
      )
    }
  }
  else {
    // Serve demo page
    event.respondWith(rawHtmlResponse(DEMO_PAGE))
  }
})
```
