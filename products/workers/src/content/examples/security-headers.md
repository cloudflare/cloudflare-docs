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
    "Content-Security-Policy": "default-src 'none'; script-src 'unsafe-inline' 'report-sample' 'self'; style-src 'report-sample' 'self' https://fonts.googleapis.com; object-src 'none'; base-uri 'self'; connect-src 'self'; font-src 'self' https://fonts.gstatic.com; frame-src 'self'; img-src 'self'; manifest-src 'self'; media-src 'self'; worker-src 'none'; form-action 'none'; frame-ancestors 'none'; require-trusted-types-for 'script';",
    */
    /*
    You can also set Strict-Transport-Security headers. 
    These are not automatically set because your website might get added to Chrome's HSTS preload list.
    If you want to submit your website to be HSTS preloaded.
    @see https://hstspreload.org
    Here's the code if you want to apply it:
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    */
    /*
    Permissions-Policy header provides the ability to allow or deny the use of browser features, such as opting out of FLoC - which you can use below:
    "Permissions-Policy": "interest-cohort=()",
    */
    /*
    X-XSS-Protection header prevents a page from loading if an XSS attack is detected. 
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
    */
    "X-XSS-Protection": "1; mode=block",
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
    "Permissions-Policy": "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
    'Cross-Origin-Embedder-Policy': 'require-corp; report-to="default";',
    'Cross-Origin-Opener-Policy': 'same-site; report-to="default";',
    "Cross-Origin-Resource-Policy": "same-site",
    "Cache-Control": "no-cache, no-store, must-revalidate, private",
    "Set-Cookie": "__Host-ID=123; Secure; HttpOnly; SameSite=strict; Path=/",
    /*
    Feature-Policy will be renamed into Permissions-Policy and will be deprectated.
    Using both will give a warning and the Permissions-Policy will be used instead.
    @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
    //"Feature-Policy": "camera 'none'; fullscreen 'self'; geolocation 'none'; microphone 'none';",
    */
    "X-Permitted-Cross-Domain-Policies": "none",
    /* SRI/Subresource Integrity can be implemented at the html level.
    @see https://infosec.mozilla.org/guidelines/web_security#subresource-integrity
    HPKP isn't something you should do when using the Dedicated & Universal SSL on Cloudflare.
    @see https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-transparency-monitoring#:~:text=Cloudflare%20does%20not%20offer%20or%20support%20HPKP%20and%20advises%20against%20using%20it%20with%20Dedicated%20%26%20Universal%20SSL.
    */
}

const BLOCKED_HEADERS = [
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

    Object.keys(DEFAULT_SECURITY_HEADERS).map(function(name, index) {
        newHeaders.set(name, DEFAULT_SECURITY_HEADERS[name]);
    })

    BLOCKED_HEADERS.forEach(function(name){
        newHeaders.delete(name)
    })

    if (tlsVersion != "TLSv1.2" && tlsVersion != "TLSv1.3") {
        return new Response("You need to use TLS version 1.2 or higher.", { status: 400 })
    }
    else {
        return new Response(response.body , {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        })
    }
}
```
