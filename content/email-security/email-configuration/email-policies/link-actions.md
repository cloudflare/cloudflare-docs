---
title: Link actions
pcx_content_type: concept
weight: 2
---

# Link actions

## Disposition actions

Create actions for emails with specific [dispositions](/email-security/reference/dispositions-and-attributes/). `URL defang` means that every URL in an email of the selected type will be rewritten so that the user cannot follow the link. For example, `https://www.example.com` will become `https[:]//www[.]example[.]com`.

To update or create a new disposition action:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Link Actions**.
4. In **Disposition Actions** select **Edit**.
5. For each disposition, such as `MALICIOUS`, `SPAM`, and `BULK`, choose the action you want to perform.

## Email Link Isolation

Email Link Isolation rewrites links that could be exploited, alerts users when there is uncertainty around the website they are visiting, and protects against malware and vulnerabilities through [Cloudflare Browser Isolation](/cloudflare-one/policies/browser-isolation/).

When you enable Email Link Isolation, the service rewrites links in emails and opens them in a browser tab where all page contents are fetched and rendered on a remote server. When this feature is enabled, any malware that might be present in a web page or email link is isolated at the server level, and will not infect and compromise the client network at the endpoint.

Suspicious hyperlinks are system-determined, and triggered by a dynamic isolation list maintained by Cloudflare’s security team.

### Previous disposition actions

When you enable Email Link Isolation, Cloudflare no longer takes into account [URL actions](#disposition-actions) based on the [email’s dispositions](/email-security/reference/dispositions-and-attributes/). URL actions are, rather, based on attributes of the link. 

Link rewriting applies to all email dispositions. If you have link actions set for dispositions, you will see a warning when enabling Email Link Isolation. This indicates that Email Link Isolation's rewriting will apply globally.

### Enable Email Link Isolation

To enable Email Link Isolation you must have an [inline deployment](/email-security/deployment/inline/) for your Area 1 setup. Email Link Isolation is not available if Area 1 is deployed through [journaling or BCC](/email-security/deployment/api/setup/) setups.

Email Link Isolation can only be used when there are no other security applications doing URL rewrites. Double link rewrites are not supported.

To enable Email Link Isolation:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Link Actions**.
4. Scroll to **Email Link Isolation** and enable it.

Email Link Isolation is now enabled. 

{{<Aside type="note">}}
Email Link Isolation does not have advanced configuration options. If you need more fine-grained control over what users can do in an isolated browser session, you must have a Cloudflare Zero Trust account and make your changes on [Browser Isolation](/cloudflare-one/policies/browser-isolation/).
{{</Aside>}}

## URL rewrite ignore patterns

Use this option to ignore rewrites on URLs matching specific patterns. This feature allows you to ensure that internal corporate services never have links rewritten for them.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Link Actions**.
4. Scroll to **URL Rewrite Ignore Patterns**.
5. Add a new URL pattern to **URL pattern** and select **Add Pattern**.