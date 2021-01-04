---
order: 0
---

# Troubleshooting and FAQ

This section addresses the most common issues you may come across when setting up or using Cloudflare for Teams.

<ButtonGroup>
  <Button type="primary" href="/faq/access/">Access</Button>
  <Button type="primary" href="/faq/gateway/">Gateway</Button>
  <Button type="primary" href="/faq/warp/">WARP client</Button>
  <Button type="primary" href="/faq/tunnel/">Argo Tunnel</Button>
</ButtonGroup>

## Access help

* **[Authentication](#authentication)**
* **[Application errors](#application-errors)**
* **[Rules and policies](#rules-and-policies)**
* **[General](#general)**
* **[Seat usage](#seat-usage)**
* **[CORS](#cors)**

### Authentication

* **How does Cloudflare Access evaluate tokens?**

    Cloudflare Access assigns JWTs (JSON web tokens) during authentication and looks for them in 1 of 2 places: a cookie in the browser or a custom authentication header.

    The cookie name is `CF_Authorization`. The header value is `cf-access-jwt-assertion`.

* **Does Access support multi-factor authentication?**

    Access will enforce the multi-factor authentication (MFA) settings of the identity provider configured. Access does not have an independent or out-of-band MFA feature.

    Access is subjected to the MFA policies set in your identity provider. For example, users attempting to log in to an Access protected app might login through Okta. Okta would enforce an MFA check before sending the valid authentication confirmation back to Cloudflare Access.

### Application errors

* **I get an error saying `No ‘Access-Control-Allow-Origin’ header is present on the requested resource.**

    Cloudflare Access requires that the `credentials: 'same-origin` parameter be added to JavaScript when using the Fetch API (to include cookies). AJAX requests fail without this parameter present.

* **Does the application behind Access need to use HTTPS?**

    Yes. Cloudflare Access only secures applications that use HTTPS.

* **Can Access enforce rules on a specific, nonstandard, port?**

    No. Cloudflare Access cannot enforce a rule that would contain a port appended to the URL.

    However, you can use Cloudflare Argo Tunnel to point traffic to nonstandard ports. For example, if Jira is available at port 8443 on your origin, you can proxy traffic to that port via with Argo Tunnel.

## Rules and policies

* **What is the order of policy enforcement?**

    Access policies trigger in order based on their position in the policy table in the UI. The exception is Bypass policies, which Access evaluates first.

    For Allow and Deny policies, Access enforces the decision starting at the top of your list and continues down the list. You can modify the order by dragging and dropping individual policies in the UI.

* **Can I use Access to secure applications with a second-level subdomain URL?**

    Yes. Ensure that your SSL certificates cover the first- and second-level subdomain. Most certificates only cover the first-level subdomain and not the second. This is true for most Cloudflare certificates. To cover a second-level subdomain with a CF certificate, select the _Custom Host names_ option for Dedicated SSL.

    Wildcard-based policies in Cloudflare Access only cover the level where they are applied. Add the wildcard policy to the left-most subdomain to be covered.

* **Can multiple paths be protected with a single policy?**

    By default, Cloudflare Access includes an implicit wildcard at the end of each path. For example, a rule protecting `jira.team.com` will automatically protect `jira.team.com/tick-1`. However, wildcards cannot be included within a path.

## General

* **Can I customize my domain by adding a logo from an HTTP URL?**

    No. The image is served from an HTTPS endpoint. For example, `http://www.example.com/upload/logo.png` does not work. However, `https://www.example.com/upload/logo.png` does.

* **What browsers are supported?**

    These browsers are supported:

    * Internet Explorer® 11
    * Edge® (current release, last release)
    * Firefox® (current release, last release)
    * Chrome® (current release, last release)
    * Safari® (current release, last release)

## Seat usage

* **How are active seats measured?**

    Cloudflare Access counts any unique user who authenticated in a calendar month as an active user. This resets at the beginning of each calendar month.

## CORS

## Using `curl` to review the configuration

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

### Troubleshooting

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