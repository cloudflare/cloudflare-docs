---
title: Manage active sessions
pcx_content_type: how-to
weight: 4
---

# Manage active sessions

In the Cloudflare dashboard, you can view a list of active sessions associated with your email address.

Each time your email is used to log in to your Cloudflare account, a session begins. The Cloudflare dashboard provides session information including if the device is currently viewing the dashboard, the IP address, location, device type, browser type, and last active login.

If you notice any suspicious activity, you can also revoke any active sessions.

{{<Aside type="note">}}

By default, the session timeout for the [Cloudflare dashboard](https://dash.cloudflare.com) is 24 hours.

Some customers can also enforce single-sign on (SSO) by [adding a Dashboard SSO application](/cloudflare-one/applications/configure-apps/dash-sso-apps/).

{{</Aside>}}

## View active sessions

To view the active sessions associated with your email address:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **My Profile** > **Sessions**.

## Revoke active sessions

{{<render file="_revoke-active-sessions.md">}}
