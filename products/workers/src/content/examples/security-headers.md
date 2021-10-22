---
order: 1000
type: example
summary: Set common security headers (X-XSS-Protection, X-Frame-Options, X-Content-Type-Options, Permissions-Policy, Referrer-Policy, Strict-Transport-Security, Content-Security-Policy).
tags:
  - Security
  - Middleware
pcx-content-type: configuration
---

# Set security headers

<ContentColumn>
  <p>{props.frontmatter.summary}</p>
</ContentColumn>

```js
const DEFAULT_SECURITY_HEADERS = {
  // Secure your application with Content-Security-Policy headers.
  // Enabling these headers will permit content from a trusted domain and all its subdomains.
  // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
  // "Content-Security-Policy": "default-src 'self' example.com *.example.com",
  // You can also set Strict-Transport-Security headers.
  // These are not automatically set because your website might get added to Chrome's HSTS preload list.
  // "Strict-Transport-Security" : "max-age=63072000; includeSubDomains; preload",
  // X-XSS-Protection header prevents a page from loading if an XSS attack is detected.
  // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
  // "X-XSS-Protection": "0; mode=block",
  // X-Frame-Options header prevents click-jacking attacks.
  // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  // "X-Frame-Options": "DENY",
  // X-Content-Type-Options header prevents MIME-sniffing.
  // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  // "X-Content-Type-Options": "nosniff",
  // "Referrer-Policy": "strict-origin-when-cross-origin",
  // "Cross-Origin-Embedder-Policy": 'require-corp; report-to="default";',
  // "Cross-Origin-Opener-Policy": 'same-site; report-to="default";',
  // "Cross-Origin-Resource-Policy": "same-site",
};
const BLOCKED_HEADERS = ["Public-Key-Pins", "X-Powered-By", "X-AspNet-Version"];
export default {
  async fetch(req) {
    let response = await fetch(req);
    // NOTE: Makes `headers` mutable!
    let headers = new Headers(response.headers);
    let ctype = headers.get("Content-Type");
    // This sets the headers for HTML responses:
    if (ctype != null && !ctype.includes("text/html")) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers,
      });
    }
    let tlsVersion = req.cf.tlsVersion;
    if (tlsVersion != "TLSv1.2" && tlsVersion != "TLSv1.3") {
      return new Response("You need to use TLS version 1.2 or higher.", {
        status: 400,
      });
    }
    for (let name in DEFAULT_SECURITY_HEADERS) {
      headers.set(name, DEFAULT_SECURITY_HEADERS[name]);
    }
    BLOCKED_HEADERS.forEach((name) => {
      headers.delete(name);
    });
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
    });
  },
};
```
