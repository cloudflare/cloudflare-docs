---
pcx_content_type: concept
title: User logs
weight: 1
---

# User logs

User logs show a list of all users who have authenticated to Cloudflare Zero Trust. For each user who has logged in, you can view their enrolled devices, login history, seat usage, and identity used for policy enforcement.

## View user logs

In [Zero Trust](https://one.dash.cloudflare.com/), go to **My Team** > **Users**. This page lists all users who have registered the WARP client or authenticated to a Cloudflare Access application. You can select a user's name to view detailed logs, [revoke their session](/cloudflare-one/identity/users/session-management/#revoke-user-sessions), or [remove their seat](/cloudflare-one/identity/users/seat-management/).

### Available logs

- **User Registry identity**: Select the user's name to view their last seen identity. This identity is refreshed when the user re-authenticates WARP, logs into an Access application, or has their IdP group membership updated via {{<glossary-tooltip term_id="SCIM" link="/cloudflare-one/identity/users/scim/">}}SCIM provisioning{{</glossary-tooltip>}}. To track how the user's identity has changed over time, go to the **Audit logs** tab.
- **Session identities**: The user's active sessions, the identity used to authenticate each session, and when each session will [expire](/cloudflare-one/identity/users/session-management/).
- **Devices**: Devices registered to the user via WARP.
- **Recent activities**: The user's five most recent Access login attempts. For more details, refer to your [authentication audit logs](/cloudflare-one/insights/logs/audit-logs/#authentication-audit-logs).
