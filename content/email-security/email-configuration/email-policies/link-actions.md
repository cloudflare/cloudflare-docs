---
title: Link Actions
pcx_content_type: concept
weight: 2
---

# Link Actions

Set up how Area 1 should handle URL links in this section of the dashboard.

## Disposition Actions

Disposition Actions lets you create actions for emails with specific [dispositions](/email-security/reference/dispositions-and-attributes/). You can choose between `No Action` and `URL Defang`.

`URL Defang` rewrites every URL in an email of the selected type, so that they are not selectable. With this option enabled, `https://www.example.com` will become `https[:]//www[.]example[.]com`.

To update or create a new disposition action:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Link Actions**.
4. In **Disposition Actions** select **Edit**.
5. For each disposition (`MALICIOUS`, `SPAM`, `BULK`, etc.), choose the action you want to perform.

## Remote Browser Isolation

Remote browser isolation (RBI) opens a browser tab where all page contents are fetched and rendered on a remote server. When this feature is enabled, any malware that might be present in a web page or email link is isolated at the server level and will not infect and compromise the client network at the endpoint.

When you enable Area 1 RBI, any suspect hyperlinks are rewritten in order to be opened in a remote browser isolation environment. Suspect hyperlinks are system-determined, and triggered by a dynamic isolation list maintained by Cloudflare’s security team.

### Previous disposition actions

When you enable Remote Browser Isolation (RBI), Cloudflare no longer takes into account [URL actions](#disposition-actions) based on the [email’s dispositions](/email-security/reference/dispositions-and-attributes/). URL actions are, rather, based on attributes of the link themselves. 

RBI link rewriting applies to all email dispositions. If you have URL actions set for other dispositions, you will see a warning when enabling RBI. This indicates that RBI rewriting will apply globally.
### Enable Remote Browser Isolation

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Link Actions**.
4. Scroll to **Remote Browser Isolation** and enable it.


## URL Rewrite Ignore Patterns

Use this option to ignore rewrites on URLs matching specific patterns. This feature allows you to ensure that internal corporate services never have links rewritten for them.


1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Link Actions**.
4. Scroll to **URL Rewrite Ignore Patterns**.
5. Add a new URL pattern to **URL pattern** and select **+ Add Pattern**.