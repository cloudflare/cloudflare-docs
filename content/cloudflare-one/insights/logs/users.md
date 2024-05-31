---
pcx_content_type: concept
title: User logs
weight: 1
---

# User logs

User logs show a list of all users who have authenticated to Cloudflare Zero Trust. For each user who has logged in, you can view the identity used for policy enforcement, enrolled devices, login history, and seat usage.

## View user logs

In [Zero Trust](https://one.dash.cloudflare.com/), go to **My Team** > **Users**. This page lists all users who have registered the WARP client or authenticated to a Cloudflare Access application. You can select a user's name to view detailed logs, [revoke their session](/cloudflare-one/identity/users/session-management/#revoke-user-sessions), or [remove their seat](/cloudflare-one/identity/users/seat-management/).

### Available logs

- **User Registry identity**: Select the user's name to view their most recent user identity. Gateway will use this identity when evaluating [firewall, egress, and resolver policies](/cloudflare-one/policies/gateway/). This identity is refreshed when the user re-authenticates WARP, logs into an Access application, or has their IdP group membership updated via [SCIM provisioning](/cloudflare-one/identity/users/scim/). To track how the user's identity has changed over time, go to the **Audit logs** tab.
- **Session identities**: The user's identity when they authenticated to a specific Access application. Learn more about [Access session management](/cloudflare-one/identity/users/session-management/).
- **Devices**: Devices registered to the user via WARP.
- **Recent activities**: Login events from the past 30(?) days.
