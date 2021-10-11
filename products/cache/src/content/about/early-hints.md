---
title: Early Hints (Beta)
pcx-content-type: concept
---

# Early Hints (Beta)

Early Hints takes advantage of “server think time” to asynchronously send instructions to the browser to begin loading resources while the origin server is compiling the full response. By sending these hints to a browser before the full response is prepared, the browser can figure out how to load the webpage faster for the end user.

Formally, Early Hints is a [web standard](https://httpwg.org/specs/rfc8297.html) that defines a new HTTP status code (103 Early Hints) that defines new interactions between a client and server. 103s are served to clients while a 200 OK (or error) response is prepared, which is the “server think time.” You can enable Cloudflare's edge to cache and send 103 Early Hints responses with Link headers from your HTML pages. The response contains hints about which assets will likely be needed to fully render the web page. This "hinting" speeds up page loads and generally reduces user-perceived latency.

For more information about Early Hints, refer to the [Early Hints blog](https://blog.cloudflare.com/early-hints/).

## Sign up for Early Hints Beta

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
1. From the dashboard, click **Speed** > **Optimization**.
1. Under **Optimized Delivery**, click **Join the beta**.

After you sign up, you will be added to a list of beta users, and the feature will be enabled in batches from the list. After admission into the Beta, you can toggle Early Hints on or off from **Optimized Delivery**.

## Generating Early Hints

Early Hints are only generated and cached for URL paths on responses that:

- Return 200, 301, or 302
- Have a `Content-Type: text/html` header
- Have a Link response header specifying links with preconnect or preload `rel` types, such as `Link: </img/preloaded.png>; rel=preload`

## Emitting Early Hints

Cloudflare will asynchronously look up and emit a cached 103 Early Hints response ahead of a main response.

Currently, only certain browser versions will take action to preload or preconnect on receiving Early Hints, such as Google Chrome M94 and higher. Instructions for running WebPageTest to experiment with compatible client browsers can be found in the [blog post](https://blog.cloudflare.com/early-hints/#testing-early-hints-with-web-page-test).

<Aside type="note" >

Early Hints responses are emitted prior to reaching the origin server or Worker. Note that if a page on your zone requires authenticated access, enabling Early Hints can serve a 103 response with previously cached Link headers to an unauthenticated visitor ahead of a 403 Forbidden response from your origin.

</Aside>