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
  <Button type="primary" href="/faq/browser-isolation/">Browser Isolation</Button>  
  <Button type="primary" href="/faq/self-diagnostics/">Self diagnostics</Button> 
</ButtonGroup>

## Access help

* **[Authentication](#authentication)**
* **[Application errors](#application-errors)**
* **[Rules and policies](#rules-and-policies)**
* **[General](#general)**
* **[Seat usage](#seat-usage)**

### Authentication

* **How does Cloudflare Access evaluate tokens?**

    Cloudflare Access assigns JWTs (JSON web tokens) during authentication and looks for them in 1 of 2 places: a cookie in the browser or a custom authentication header.

    The cookie name is `CF_Authorization`. The header name is `cf-access-token`.

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

    [Zero Trust policies](/policies/zero-trust) trigger in order based on their position in the policy table in the UI. The exception is Bypass policies, which Access evaluates first.

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