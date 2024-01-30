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

## Global timeouts

To set a global reauthentication event, similar to a global timeout on a traditional VPN, we recommend setting all of your Gateway Network Allow policies to the same baseline WARP session duration (typically between 3-7 days). This will ensure that whenever your user tries to access any application on the private network within that window, they will be forced to reauthenticate with your identity provider when they have not logged in for your chosen number of days.

If a specific application requires a more stringent reauthentication timeline, users accessing that application will not have to complete the baseline reauthentication event because they are already in compliance with the baseline policy.

{{<Aside type="note">}}
A global timeout does not necessarily fit all customer needs. With the increased interrogation of traffic offered by ZTNA compared to traditional remote access, many customers choose not to use a global reauthentication event and instead only use reauthentication for specific applications.
{{</Aside>}}

### Common mistake

When configuring a global WARP session duration, a common mistake is to build a single policy that covers your entire private network range. An example would be an Allow policy that requires reauthentication every 7 days for all users with traffic to a destination IP in `10.0.0.0/8`. This type of global policy creates a suboptimal user experience because the user may receive the reauth notification at any time, not only when going to a specific application. If they miss the one-time notification, they are blocked from the entire internal network (including private DNS) and may not know that they need to manually go into their WARP client settings to reauthenticate.
