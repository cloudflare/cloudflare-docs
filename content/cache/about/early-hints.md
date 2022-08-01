---
title: Early Hints
pcx_content_type: concept
---

# Early Hints

Early Hints takes advantage of “server think time” to asynchronously send instructions to the browser to begin loading resources while the origin server is compiling the full response. By sending these hints to a browser before the full response is prepared, the browser can figure out how to load the webpage faster for the end user.

Formally, Early Hints is a [web standard](https://httpwg.org/specs/rfc8297.html) that defines a new HTTP status code (103 Early Hints) that defines new interactions between a client and server. 103s are served to clients while a 200 OK (or error) response is prepared, which is the “server think time.” You can enable Cloudflare's edge to cache and send 103 Early Hints responses with Link headers from your HTML pages. The response contains hints about which assets will likely be needed to fully render the web page. This "hinting" speeds up page loads and generally reduces user-perceived latency.

{{<Aside type="note" header="Note">}}

Early Hints is currently only supported over HTTP/2 and HTTP/3.

{{</Aside>}}

For more information about Early Hints, refer to the [Cloudflare](https://blog.cloudflare.com/early-hints) and [Google Chrome](https://developer.chrome.com/en/blog/early-hints/) blogs.

## Enabling Early Hints

1.  Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
2.  From the dashboard, click **Speed** > **Optimization**.
3.  Under **Optimized Delivery**, enable **Early Hints**.

## Generating Early Hints

Early Hints are only generated and cached:

- For URIs with `.html`, `.htm`, or `.php` file extensions, or no file extension
- On 200, 301, or 302 response return codes
- When the response contains [link headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Link) with preconnect or preload rel types, such as `Link: </img/preloaded.png>; rel=preload`

{{<Aside type="note">}}

Early Hints cache entries are keyed by request URI and ignore query strings.

{{</Aside>}}

## Emitting Early Hints

Cloudflare will asynchronously look up and emit a cached 103 Early Hints response ahead of a main response.

Currently, only certain browser versions will take action to preload or preconnect on receiving Early Hints, such as Google Chrome M94 and higher. Instructions for running WebPageTest to experiment with compatible client browsers can be found in the [blog post](https://blog.cloudflare.com/early-hints/#testing-early-hints-with-web-page-test).

Additionally, keep the following in mind:

- Early Hints responses may be emitted before reaching the origin server or Worker. When Early Hints is enabled and pages on your site require authentication, unauthenticated visitors may receive a 103 response. The 103 response would contain cached Link headers and be sent before a 403 Forbidden response from your origin.
- Early Hints may be emitted less frequently on requests where the content is cacheable. Cloudflare CDN is more likely to retrieve a response header before the asynchronous Early Hints lookup finishes if the response has been cached. Cloudflare will not send a 103 response if the main response header is already available.
- Cloudflare currently disables Early Hints on some User-Agents, for example, select search crawler bots that show incompatibility with 1xx responses.
