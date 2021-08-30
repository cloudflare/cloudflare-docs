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
    /*
    Secure your application with Content-Security-Policy headers.
    Enabling these headers will permit content from a trusted domain and all its subdomains.
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    "Content-Security-Policy": "default-src 'self' example.com *.example.com",
    */
    /*
    You can also set Strict-Transport-Security headers. 
    These are not automatically set because your website might get added to Chrome's HSTS preload list.
    Here's the code if you want to apply it:
    "Strict-Transport-Security" : "max-age=63072000; includeSubDomains; preload",
    */
    /*
    Permissions-Policy header provides the ability to allow or deny the use of browser features, such as opting out of FLoC - which you can use below:
    "Permissions-Policy": "interest-cohort=()",
    */
    /*
    X-XSS-Protection header prevents a page from loading if an XSS attack is detected. 
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
    */
    "X-XSS-Protection": "0; mode=block",
    /*
    X-Frame-Options header prevents click-jacking attacks. 
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
    */
    "X-Frame-Options": "DENY",
    /*
    X-Content-Type-Options header prevents MIME-sniffing. 
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
    */
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    'Cross-Origin-Embedder-Policy': 'require-corp; report-to="default";',
    'Cross-Origin-Opener-Policy': 'same-site; report-to="default";',
    "Cross-Origin-Resource-Policy": "same-site",
}
const BLOCKED_HEADERS = [
    "Public-Key-Pins",
    "X-Powered-By",
    "X-AspNet-Version",
]
addEventListener('fetch', event => {
    event.respondWith(addHeaders(event.request))
})
async function addHeaders(req) {
    let response = await fetch(req)
    let newHeaders = new Headers(response.headers)

    const tlsVersion = req.cf.tlsVersion
    // This sets the headers for HTML responses: 
    if (newHeaders.has("Content-Type") && !newHeaders.get("Content-Type").includes("text/html")) {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        })
    }

    Object.keys(DEFAULT_SECURITY_HEADERS).map(function (name) {
        newHeaders.set(name, DEFAULT_SECURITY_HEADERS[name]);
    })

    BLOCKED_HEADERS.forEach(function (name) {
        newHeaders.delete(name)
    })

    if (tlsVersion != "TLSv1.2" && tlsVersion != "TLSv1.3") {
        return new Response("You need to use TLS version 1.2 or higher.", { status: 400 })
    } else {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        })
    }
}
```
