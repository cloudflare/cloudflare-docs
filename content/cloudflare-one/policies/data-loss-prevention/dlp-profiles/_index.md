---
pcx_content_type: how-to
title: Configure a DLP profile
weight: 3
---

# Configure a DLP profile

A DLP profile is a collection of regular expressions (also known as detection entries) that define the data patterns you want to detect. Cloudflare DLP provides predefined profiles for common detections, or you can build custom DLP profiles specific to your data, organization, and risk tolerance.

## Configure a predefined profile

{{<render file="data-loss-prevention/_predefined-profile.md">}}

You can now use this profile in a [DLP policy](/cloudflare-one/policies/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy) or [CASB integration](/cloudflare-one/applications/scan-apps/casb-dlp/).

## Build a custom profile

{{<render file="data-loss-prevention/_custom-profile.md">}}

You can now use this profile in a [DLP policy](/cloudflare-one/policies/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy) or [CASB integration](/cloudflare-one/applications/scan-apps/casb-dlp/).
