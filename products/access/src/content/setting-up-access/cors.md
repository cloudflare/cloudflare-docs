---
order: 13
---

# Cross-Origin Resource Sharing (CORS)

Cross-Origin Resource Sharing ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) is a mechanism that uses HTTP headers to grant a web application running on one origin permission to reach selected resources in a different origin. The web application executes a cross-origin HTTP request when it requests a resource that has a different origin from its own, including domain, protocol, or port.

When you protect a site with Cloudflare Access, Cloudflare checks every HTTP request bound for that site to ensure that the request has a valid authentication cookie. This has implications for CORS configurations, including:

* OPTIONS requests are not sent with Cookies from the browser, by design. This cannot be changed. When Cloudflare sees the OPTIONS request being sent to a protected domain, without a cookie, Cloudflare Access blocks the request.
* Any cross-site request that fails to include the Cloudflare Access token will be returned to the login page. The login page itself will not allow cross-site requests.
* Cross-origin requests that do not send OPTIONS requests, but do provide the Cloudflare Access cookie, will require the origin to set its own CORS headers.

To handle CORS headers for the policy protecting the path that requires CORS, navigate to the bottom of the _Create Access Policy_ window and expand the **Advanced settings** section and configure the settings.

![Advanced Settings CORS section](../static/apps/cors-config.png "Create Policy window Advanced Settings CORS Settings")

## CORS Settings

* **Access-Control-Allow-Credentials** allows CORS headers or methods to use the user’s credentials to reach the protected application or path.
* **Access-Control-Max-Age (seconds)** allows you to set a maximum time for caching the results of a CORS request.
* **Access-Control-Allow-Origins** lets you list the fully qualified domain name (FQDN) that makes the CORS request. You can add multiple FQDNs or select **Allow all origins** to permit any FQDN.

* **Access-Control-Allow-Methods** allows you to permit all method types (for example, POST or GET requests).
* **Access-Control-Allow Headers** allow you to permit all HTTP headers or HTTP headers you define that meet the criteria defined in the **Access-Control-Allow-Origins** or **Access-Control-Allow-Methods** sections.

## Frequently asked questions

### Using `curl` to review the configuration

You can use the command-line tool `curl` to review your configuration. To do so, you will need three prerequisites:

1. An OPTIONS request
2. An origin header
3. The Access-Control-Request-Method

The example `curl` command below includes all three.

```bash
curl -I -XOPTIONS  https://app2.site.com \
    -H 'origin: https://app1.almightyzero.com' \
    -H 'access-control-request-method: GET'
```

If configured, Cloudflare will return a response similar to the following example:

```bash
HTTP/2 200
date: Wed, 22 Apr 2020 18:17:44 GMT
set-cookie: __cfduid=d886c3e5dd7b8c4daba5f9f0cd173c3511587579464; expires=Fri, 22-May-20 18:17:44 GMT; path=/; domain=.almightyzero.com; HttpOnly; SameSite=Lax
vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers
access-control-allow-origin: https://app1.almightyzero.com
access-control-allow-methods: GET
access-control-allow-credentials: true
expect-ct: max-age=604800, report-uri="https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct"
server: cloudflare
cf-ray: 588157e55e0882d7-ATL
cf-request-id: 0244b54354000082d7b991f200000001
```

### CORS requests that do not require OPTIONS (Simple Requests)

Cross-origin requests that do not require a specific OPTIONS preflight are common known as [Simple Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). The browser will still require the correct CORS headers, but will not send a preflight OPTIONS request to retrieve them. To make one of these requests, the `CF_authorization` cookie must be included. CORS configurations made in the Cloudflare Access dashboard will not be applied; these CORS headers must come from the origin.

Requests that do not include the cookie will be redirected to the Cloudflare Access login page.

## Troubleshooting

In general, we recommend the following steps when troubleshooting CORS issues:

1. Capture a HAR file with the issue described.
2. Ensure that the application has set `credentials: 'same-origin'` in all fetch or XHR requests.
3. If you are using the [cross-origin setting](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) on script tags, these must be set to "use-credentials".

### CORS on a different domain fails only on the first load

If you have two sites protected by Cloudflare Access, `app1.site.com` and `app2.hostname.com`, requests made between the two will be subject to CORS checks. Users who login to `app1.site.com` will be issued cookies for `app1.site.com` and your Cloudflare Access authentication domain.

When the user's browser requests `app2.hostname.com`, the cookie will not be present for that domain so the request will be sent to the login page. However, the user will have a cookie for their Cloudflare Access session, which will redirect them successfully to `app2.hostname.com` if they are permitted to reach it.

During this entire flow, the browser itself will check CORS headers. As part of that behavior, the browser will make the `Origin` header null once a 302 has occurred. Cloudflare Access honors all redirects, however, the final redirect of a login will be made to the original domain. Since the `Origin` header is still null, unless the configuration allows all origins, the request will now fail due to the browser's CORS issue. A refresh will resolve this for the user.

This can be addressed with the following settings:
* Use the `allow-all-origins` configuration.
* Allow `null` as an allowed origin.

### Safari failures

Safari, in particular Safari 13.1, handles cookies in a unique format. In some cases, this can cause CORS to fail. This will be dependent on Apple releasing a patch for handling cookies. This is known to impact macOS 10.15.4 when running Safari 13.1 (15609.1.20.111.8).

### CORS failing on the same domain

CORS checks do not occur on the same domain. If this error occurs, it is likely the user flow is making a sub-request without the cookie.