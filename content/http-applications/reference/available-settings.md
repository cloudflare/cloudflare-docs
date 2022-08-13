---
title: Available settings
pcx_content_type: reference
weight: 2
---

# Available settings

When you use HTTP applications, you can edit various configuration settings, including Page Rules, Firewall Rules, Cache settings, and more.

Generally, you are allowed to edit all of the zone-level configurations except for the following:

- DNS
- Traffic (Load Balancing, Waiting Rooms, Health Checks, and more)
- Zero Trust and Access policies
- SSL certifications (though you can test these with a separate [staging certificates](/ssl/edge-certificates/staging-environment/) feature)

{{<Aside type="note">}}

For the most up to date list of these settings, start [editing a version](/http-applications/how-to/manage-applications-and-versions/#edit-a-version) in the Cloudflare dashboard.

{{</Aside>}}
