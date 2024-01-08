---
title: Session timeouts
pcx_content_type: overview
weight: 4
layout: learning-unit
---

Most legacy VPNs have a global timeout setting that requires end users to log in every X hours or resets VPN profiles at a certain frequency. By doing continuous identity evaluation, a Zero Trust security model eliminates the need for most of the user-interrupting workflows triggered by session timeouts. However, there can still be valid reasons to want users to reauthenticate, either on a recurring basis or to access specific, highly-sensitive or regulated internal services.

To enforce WARP client reauthentication, you can configure WARP session timeouts on a per-application basis in your Gateway network policies. {{<render file="warp/_warp-sessions-intro.md" productFolder="cloudflare-one">}}

## Configure WARP session timeout

{{<render file="warp/_warp-sessions-gateway.md" productFolder="cloudflare-one">}}

## Best practices

To set a global reauth event, we recommend setting all of your Gateway Network Allow policies to the same baseline WARP session duration (typically between 3-7 days). This will ensure that whenever your user tries to access any system on the private network within that window, they will be forced to reauthenticate with your identity provider when they have not logged in for X days.

If a specific application requires a more stringent reauthentication timeline, users accessing that application will not have to complete the baseline reauthentication event because they are already in compliance with the baseline policy.
