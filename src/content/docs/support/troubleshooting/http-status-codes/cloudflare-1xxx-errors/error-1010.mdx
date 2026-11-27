---
pcx_content_type: troubleshooting
title: Error 1010
source: null
description: Troubleshoot Cloudflare 1010 error code.
products:
  - support
---

## Error 1010: The owner of this website has banned your access based on your browser's signature

This error indicates that access to the website is denied based on your browser's signature.

### Common causes

- A website owner blocked your request based on your client's web browser.
- The request was sent to a `*.pages.dev` or `*.workers.dev` hostname, or to a custom domain of a Pages project, with a `User-Agent` header that Browser Integrity Check treats as a non-browser client (for example, the default Python `urllib` user agent). Refer to [Requests to Pages projects or workers.dev](#requests-to-pages-projects-or-workersdev).

### Resolution

Notify the website owner of the blocking. If you cannot determine how to contact the website owner, lookup contact information for the domain via the [Whois database](https://lookup.icann.org/). Site owners can [turn off Browser Integrity Check](/waf/tools/browser-integrity-check/#disable-browser-integrity-check) in the Security **Settings** page. This does not apply to `pages.dev` and `workers.dev` hostnames, or to custom domains of Pages projects. Refer to [Requests to Pages projects or workers.dev](#requests-to-pages-projects-or-workersdev).

:::note
Cloudflare support cannot override a customer's security settings. Browser Integrity Check on `pages.dev` and `workers.dev` cannot be turned off, either by the site owner or by Cloudflare support.
:::

### Requests to Pages projects or workers.dev

On a Cloudflare-managed zone, Browser Integrity Check also checks requests to `*.pages.dev` and `*.workers.dev` hostnames, and to custom domains of Pages projects. This happens even if you have turned off Browser Integrity Check, or skipped it with a custom rule or configuration rule, in your own zone. These blocks are not recorded in your zone's Security Events or in your Worker logs. In Security Events, you may only see your own skip rule match.

**Resolution:**

- Configure your client to send a descriptive `User-Agent` header that identifies your application (for example, `my-app/1.0`) instead of the library default. The client does not need to send a browser user agent.
- **Workers:** Serve the Worker on a [Custom Domain](/workers/configuration/routing/custom-domains/) or [route](/workers/configuration/routing/routes/) in your zone instead of `workers.dev`. Then turn off or skip Browser Integrity Check for the affected paths with a [configuration rule](/rules/configuration-rules/) or [custom rule](/waf/custom-rules/skip/). Refer to [workers.dev](/workers/configuration/routing/workers-dev/).
- **Pages:** Refer to [Pages known issues](/pages/platform/known-issues/).
