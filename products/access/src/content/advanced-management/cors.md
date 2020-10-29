---
order: 3
---

# CORS

([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) is a mechanism that uses HTTP headers to grant a web application running on one origin permission to reach selected resources in a different origin. The web application executes a cross-origin HTTP request when it requests a resource that has a different origin from its own, including domain, protocol, or port.

When you protect a site with Cloudflare Access, Cloudflare checks every HTTP request bound for that site to ensure that the request has a valid authentication cookie.

This has implications for CORS configurations, including:

* OPTIONS requests are not sent with cookies from the browser, by design. This cannot be changed. When Cloudflare sees the OPTIONS request being sent to a protected domain, without a cookie, Cloudflare Access blocks the request.
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

If you are experiencing issues with Access and CORS, see our [Troubleshooting and FAQ](/faq) page.