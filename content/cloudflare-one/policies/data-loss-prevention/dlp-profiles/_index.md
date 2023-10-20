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

   {{<details header="Add a custom entry">}}

   1. Select **Add custom entry** and give it a name.
   2. In **Value**, enter a regular expression (or regex) that defines the text pattern you want to detect. For example, `test\d\d` will detect the word `test` followed by two digits.

      - Regexes are written in Rust. We recommend validating your regex with [Rustexp](https://rustexp.lpil.uk/).
      - Detected text patterns are limited to 1024 bytes in length.
      - Regexes with `+` are not supported as they are prone to exceeding the length limit. For example `a+` can detect an infinite number of a's. We recommend using `a{min,max}` instead, such as `a{1,1024}`.

   3. To save the detection entry, select **Done**.

   {{</details>}}

   {{<details header="Add existing entries">}}

   Existing entries include [predefined detection entries](predefined-profiles/) and [DLP datasets](/cloudflare-one/policies/data-loss-prevention/datasets/).

   1. Select **Add existing entries**.
   2. Choose which entries you want to add, then select **Confirm**.
   3. To save the detection entry, select **Done**.

   {{</details>}}

5. (Optional) Configure [**Advanced settings**](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/advanced-settings/) for the profile.
6. Select **Save profile**.

You can now use this profile in a [DLP policy](/cloudflare-one/policies/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy) or [CASB integration](/cloudflare-one/applications/scan-apps/casb-dlp/).
