---
title: Available configurations
pcx_content_type: reference
weight: 2
---

# Available configurations

When you use Version Management, you can edit various configurations, such as [WAF custom rules](/waf/custom-rules/) and [Cache](/cache/).

Generally, you are allowed to edit all zone-level configurations except for the following:

- [DNS](/dns/)
- [Spectrum](/spectrum/)
- Traffic ([Load Balancing](/load-balancing/), [Waiting Rooms](/waiting-room/), Health Checks, and more)
- [Zero Trust](/cloudflare-one/) and Access policies
- [SSL certificates](/ssl/edge-certificates/) (though you can test these with a separate [staging certificates](/ssl/edge-certificates/staging-environment/) feature)

{{<Aside type="note">}}

For the most up-to-date list of these configurations, start [editing configurations within a version](/version-management/how-to/versions/#change-configurations-in-a-version) in the Cloudflare dashboard.

{{</Aside>}}

## Limitations

{{<render file="_product-limitations.md">}}