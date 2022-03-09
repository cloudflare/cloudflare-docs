---
pcx-content-type: concept
title: CORS
weight: 4
---

# CORS

Cross-Origin Resource Sharing ([CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)) is a mechanism that uses HTTP headers to grant a web application running on one origin permission to reach selected resources in a different origin. The web application executes a cross-origin HTTP request when it requests a resource that has a different origin from its own, including domain, protocol, or port.

When you protect a site with Cloudflare Access, Cloudflare checks every HTTP request bound for that site to ensure that the request has a valid authentication cookie.

This has implications for CORS configurations, including:

- OPTIONS requests are not sent with cookies from the browser, by design. This cannot be changed. When Cloudflare sees the OPTIONS request being sent to a protected domain, without a cookie, Cloudflare Access blocks the request.
- Any cross-site request that fails to include the Cloudflare Access token will be returned to the login page. The login page itself will not allow cross-site requests.
- Cross-origin requests that do not send OPTIONS requests, but do provide the Cloudflare Access cookie, will require the origin to set its own CORS headers.

To handle CORS headers for the policy protecting the path that requires CORS, navigate to the bottom of the _Create Access Policy_ window and expand the **Advanced settings** section and configure the settings.

## Access and CORS

{{<Aside type="Warning" header="Important">}}

- Safari, in particular Safari 13.1, handles cookies in a unique format. In some cases, this can cause CORS to fail. This will be dependent on Apple releasing a patch for handling cookies. This is known to impact macOS 10.15.4 when running Safari 13.1 (15609.1.20.111.8).

- Do not troubleshoot CORS in Incognito mode, as this will cause disruptions with Access due to `CF-Authorization` being blocked as a third-party cookie on cross origin requests"

{{</Aside>}}

If you have two sites protected by Cloudflare Access, `app1.site.com` and `app2.hostname.com`, requests made between the two will be subject to CORS checks. Users who login to `app1.site.com` will be issued cookies for `app1.site.com` and your Cloudflare Access [team domain](/cloudflare-one/glossary/#team-domain).

When the user's browser requests `app2.hostname.com`, the cookie will not be present for that domain so the request will be sent to the login page. However, the user will have a cookie for their Cloudflare Access session, which will redirect them successfully to `app2.hostname.com` if they are permitted to reach it.

During this entire flow, the browser itself will check CORS headers. As part of that behavior, the browser will make the `Origin` header null once a 302 has occurred. Cloudflare Access honors all redirects, however, the final redirect of a login will be made to the original domain. Since the `Origin` header is still null, unless the configuration allows all origins, the request will now fail due to the browser's CORS issue. A refresh will resolve this for the user.

This can be addressed with the following settings:

- Use the `allow-all-origins` configuration.
- Allow `null` as an allowed origin.

## List of CORS settings

- **Access-Control-Allow-Credentials** allows CORS headers or methods to use the user’s credentials to reach the protected application or path.

- **Access-Control-Max-Age (seconds)** allows you to set a maximum time for caching the results of a CORS request.

- **Access-Control-Allow-Origins** lets you list the fully qualified domain name (FQDN) that makes the CORS request. You can add multiple FQDNs or select **Allow all origins** to permit any FQDN.

- **Access-Control-Allow-Methods** allows you to permit all method types (for example, POST or GET requests).

- **Access-Control-Allow Headers** allow you to permit all HTTP headers or HTTP headers you define that meet the criteria defined in the **Access-Control-Allow-Origins** or **Access-Control-Allow-Methods** sections.

### CORS requests that do not require OPTIONS (Simple Requests)

Cross-origin requests that do not require a specific OPTIONS preflight are commonly known as [Simple Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). The browser will still require the correct CORS headers, but will not send a preflight OPTIONS request to retrieve them. To make one of these requests, the `CF_authorization` cookie must be included. CORS configurations made in the Cloudflare Access dashboard will not be applied; these CORS headers must come from the origin.

Requests that do not include the cookie will be redirected to the Cloudflare Access login page.

## Using `curl` to review the configuration

You can use the command-line tool `curl` to review your configuration. To do so, you will need three prerequisites:

1.  An OPTIONS request
1.  An origin header
1.  The Access-Control-Request-Method

The example `curl` command below includes all three.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -I -XOPTIONS  https://app2.site.com </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">'origin: https://app1.almightyzero.com'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    -H </span><span class="CodeBlock--token-string">'access-control-request-method: GET'</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

If configured, Cloudflare will return a response similar to the following example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">HTTP/2 </span><span class="CodeBlock--token-number">200</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">date: Wed, </span><span class="CodeBlock--token-number">22</span><span class="CodeBlock--token-plain"> Apr </span><span class="CodeBlock--token-number">2020</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">18</span><span class="CodeBlock--token-plain">:17:44 GMT</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">set-cookie: </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">__cfduid</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain">d886c3e5dd7b8c4daba5f9f0cd173c3511587579464</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">expires</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain">Fri, </span><span class="CodeBlock--token-number">22</span><span class="CodeBlock--token-plain">-May-20 </span><span class="CodeBlock--token-number">18</span><span class="CodeBlock--token-plain">:17:44 GMT</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">path</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain">/</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">domain</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain">.almightyzero.com</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> HttpOnly</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">SameSite</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain">Lax</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">access-control-allow-origin: https://app1.almightyzero.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">access-control-allow-methods: GET</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">access-control-allow-credentials: </span><span class="CodeBlock--token-boolean">true</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">expect-ct: max-age</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-number">604800</span><span class="CodeBlock--token-plain">, report-uri</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-string">&quot;https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">server: cloudflare</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cf-ray: 588157e55e0882d7-ATL</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cf-request-id: 0244b54354000082d7b991f200000001</span></div></span></span></span></code></pre>{{</raw>}}

## Troubleshooting

In general, we recommend the following steps when troubleshooting CORS issues:

1.  Capture a HAR file with the issue described, as well as the JS console log output recorded simultaneously. This is because the HAR file alone will not give full visibility on the reason behind cross-origin issues.
1.  Ensure that the application has set `credentials: 'same-origin'` in all fetch or XHR requests.
1.  If you are using the [cross-origin setting](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin) on script tags, these must be set to "use-credentials".

{{<Aside type="Warning" header="CORS is failing on the same domain">}}
CORS checks do not occur on the same domain. If this error occurs, it is likely the user flow is making a sub-request without the cookie.
{{</Aside>}}
