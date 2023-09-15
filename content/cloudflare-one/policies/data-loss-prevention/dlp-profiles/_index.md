---
pcx_content_type: how-to
title: Configure a DLP profile
weight: 3
layout: single
---

# Configure a DLP profile

A DLP profile is a collection of regular expressions (also known as detection entries) that define the data patterns you want to detect. Cloudflare DLP provides predefined profiles for common detections, or you can build custom DLP profiles specific to your data, organization, and risk tolerance.

## Configure a predefined profile

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP Profiles**.
2. Choose a [predefined profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/predefined-profiles/) and select **Configure**.
3. Enable one or more **Detection entries** according to your preferences. The DLP Profile matches using the OR logical operator — if multiple entries are enabled, your data needs to match only one of the entries.
4. Select **Save profile**.

You can now use this profile in a [DLP policy](/cloudflare-one/policies/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy) or [CASB integration](/cloudflare-one/applications/scan-apps/casb-dlp/).

## Build a custom profile

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DLP** > **DLP Profiles**.
2. Select **Create profile**.
3. Enter a name and optional description for the profile.
4. Add custom or existing detection entries.

   {{<render file="_dlp-entries.md">}}

5. (Optional) Configure [**Advanced settings**](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/advanced-settings/) for the profile.
6. Select **Save profile**.

You can now use this profile in a [DLP policy](/cloudflare-one/policies/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy) or [CASB integration](/cloudflare-one/applications/scan-apps/casb-dlp/).
