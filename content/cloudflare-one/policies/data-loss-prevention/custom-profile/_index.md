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

{{<render file="_dlp-entries.md">}}

5. (Optional) Configure [**Advanced settings**](/cloudflare-one/policies/data-loss-prevention/custom-profile/advanced-settings/) for the profile.
6. Select **Save profile**.

Next, [create a DLP policy](/cloudflare-one/policies/data-loss-prevention/setup/#2-create-a-dlp-policy) to log or block HTTP requests that match this profile.
