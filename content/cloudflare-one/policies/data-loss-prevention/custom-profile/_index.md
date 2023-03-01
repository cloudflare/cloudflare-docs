---
pcx_content_type: how-to
title: Build a custom profile
weight: 3
layout: single
---

# Build a custom profile

With Cloudflare DLP, you can build custom DLP profiles specific to your data, organization, and risk tolerance.

## Create a custom entry

To define a custom profile:

1. In the [Zero Trust dashboard](https://one.dash.cloudflare.com/), go to **Gateway** > **DLP Profiles**.
2. Select **Create Profile**.
3. Enter a name and optional description for the profile.
4. Select **Add custom entry** and give it a name.
5. In **Value**, enter a regular expression (or regex) that defines the text pattern you want to detect. For example, `test\d\d` will detect the word `test` followed by 2 digits.

   - Regexes are written in Rust. We recommend validating your regex with [Rustexp](https://rustexp.lpil.uk/).
   - Detected text patterns are limited to 1024 bytes in length.
   - Regexes with `+` are not supported as they are prone to exceeding the length limit. For example `a+` can detect an infinite number of a's. We recommend using `a{min,max}` instead, such as `a{1,1024}`.

6. Select **Done** to save the detection entry.
7. (Optional) Configure [**Advanced settings**](/cloudflare-one/policies/data-loss-prevention/custom-profile/advanced-settings/) for the profile.
8. Select **Save profile**.

Next, [create a DLP policy](/cloudflare-one/policies/data-loss-prevention/setup/#2-create-a-dlp-policy) to log or block HTTP requests that match this profile.

## Use preexisting entries

To use predefined profile entries:

1. In the [Zero Trust dashboard](https://one.dash.cloudflare.com/), go to **Gateway** > **DLP Profiles**.
2. Select **Create Profile**.
3. Enter a name and optional description for the profile.
4. Select **Add existing entries**. Choose which entries to want to add, then select **Confirm**.
5. Select **Done** to save the detection entry.
6. (Optional) Configure [**Advanced settings**](/cloudflare-one/policies/data-loss-prevention/custom-profile/advanced-settings/) for the profile.
7. Select **Save profile**.
