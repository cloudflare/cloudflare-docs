---
title: Available settings
pcx_content_type: reference
weight: 2
---

# Available settings

When you use Version Management, you can edit various configuration settings, such as Page Rules, [Firewall Rules](/waf/), and [Cache settings](/cache/).

Generally, you are allowed to edit all zone-level configurations except for the following:

- [DNS](/dns/)
- [Spectrum](/spectrum/)
- Traffic ([Load Balancing](/load-balancing/), [Waiting Rooms](/waiting-room/), Health Checks, and more)
- [Zero Trust](/cloudflare-one/) and Access policies
- [SSL certificates](/ssl/edge-certificates/) (though you can test these with a separate [staging certificates](/ssl/edge-certificates/staging-environment/) feature)

{{<Aside type="note">}}

For the most up-to-date list of these settings, start [editing settings within a version](/version-management/how-to/versions/#change-settings-in-a-version) in the Cloudflare dashboard.

{{</Aside>}}

## Limitations

{{<render file="_product-limitations.md">}}