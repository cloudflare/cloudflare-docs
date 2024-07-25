---
type: example
summary: Return a response based on the incoming request's URL, HTTP method,
  User Agent, IP address, ASN or device type.
tags:
  - Middleware
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Conditional response
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    const BLOCKED_HOSTNAMES = ["nope.mywebsite.com", "bye.website.com"];
    // Return a new Response based on a URL's hostname
    const url = new URL(request.url);
    if (BLOCKED_HOSTNAMES.includes(url.hostname)) {
      return new Response("Blocked Host", { status: 403 });
    }
    // Block paths ending in .doc or .xml based on the URL's file extension
    const forbiddenExtRegExp = new RegExp(/\.(doc|xml)$/);
    if (forbiddenExtRegExp.test(url.pathname)) {
      return new Response("Blocked Extension", { status: 403 });
    }
    // On HTTP method
    if (request.method === "POST") {
      return new Response("Response for POST");
    }
    // On User Agent
    const userAgent = request.headers.get("User-Agent") || "";
    if (userAgent.includes("bot")) {
      return new Response("Block User Agent containing bot", { status: 403 });
    }
    // On Client's IP address
    const clientIP = request.headers.get("CF-Connecting-IP");
    if (clientIP === "1.2.3.4") {
      return new Response("Block the IP 1.2.3.4", { status: 403 });
    }
    // On ASN
    if (request.cf && request.cf.asn == 64512) {
      return new Response("Block the ASN 64512 response");
    }
    // On Device Type
    // Requires Enterprise "CF-Device-Type Header" zone setting or
    // Page Rule with "Cache By Device Type" setting applied.
    const device = request.headers.get("CF-Device-Type");
    if (device === "mobile") {
      return Response.redirect("https://mobile.example.com");
    }
    console.error(
      "Getting Client's IP address, device type, and ASN are not supported in playground. Must test on a live worker"
    );
    return fetch(request);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    const BLOCKED_HOSTNAMES = ["nope.mywebsite.com", "bye.website.com"];
    // Return a new Response based on a URL's hostname
    const url = new URL(request.url);
    if (BLOCKED_HOSTNAMES.includes(url.hostname)) {
      return new Response("Blocked Host", { status: 403 });
    }
    // Block paths ending in .doc or .xml based on the URL's file extension
    const forbiddenExtRegExp = new RegExp(/\.(doc|xml)$/);
    if (forbiddenExtRegExp.test(url.pathname)) {
      return new Response("Blocked Extension", { status: 403 });
    }
    // On HTTP method
    if (request.method === "POST") {
      return new Response("Response for POST");
    }
    // On User Agent
    const userAgent = request.headers.get("User-Agent") || "";
    if (userAgent.includes("bot")) {
      return new Response("Block User Agent containing bot", { status: 403 });
    }
    // On Client's IP address
    const clientIP = request.headers.get("CF-Connecting-IP");
    if (clientIP === "1.2.3.4") {
      return new Response("Block the IP 1.2.3.4", { status: 403 });
    }
    // On ASN
    if (request.cf && request.cf.asn == 64512) {
      return new Response("Block the ASN 64512 response");
    }
    // On Device Type
    // Requires Enterprise "CF-Device-Type Header" zone setting or
    // Page Rule with "Cache By Device Type" setting applied.
    const device = request.headers.get("CF-Device-Type");
    if (device === "mobile") {
      return Response.redirect("https://mobile.example.com");
    }
    console.error(
      "Getting Client's IP address, device type, and ASN are not supported in playground. Must test on a live worker"
    );
    return fetch(request);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
import re
from js import Response, URL, fetch

async def on_fetch(request):
    blocked_hostnames = ["nope.mywebsite.com", "bye.website.com"]
    url = URL.new(request.url)

    # Block on hostname
    if url.hostname in blocked_hostnames:
        return Response.new("Blocked Host", status=403)

    # On paths ending in .doc or .xml
    if re.search(r'\.(doc|xml)$', url.pathname):
        return Response.new("Blocked Extension", status=403)

    # On HTTP method
    if "POST" in request.method:
        return Response.new("Response for POST")

    # On User Agent
    user_agent = request.headers["User-Agent"] or ""
    if "bot" in user_agent:
        return Response.new("Block User Agent containing bot", status=403)

    # On Client's IP address
    client_ip = request.headers["CF-Connecting-IP"]
    if client_ip == "1.2.3.4":
        return Response.new("Block the IP 1.2.3.4", status=403)

    # On ASN
    if request.cf and request.cf.asn == 64512:
        return Response.new("Block the ASN 64512 response")

    # On Device Type
    # Requires Enterprise "CF-Device-Type Header" zone setting or
    # Page Rule with "Cache By Device Type" setting applied.
    device = request.headers["CF-Device-Type"]
    if device == "mobile":
        return Response.redirect("https://mobile.example.com")

    return fetch(request)
```

{{</tab>}}
{{</tabs>}}
