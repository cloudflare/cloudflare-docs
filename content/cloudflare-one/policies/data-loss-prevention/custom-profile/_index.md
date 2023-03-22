---
pcx_content_type: how-to
title: Build a custom profile
weight: 3
layout: single
---

# Build a custom profile

With Cloudflare DLP, you can build custom DLP profiles specific to your data, organization, and risk tolerance.

You can add both custom and existing detection entries to a custom DLP profile. Existing entries include [predefined profiles](/cloudflare-one/policies/data-loss-prevention/predefined-profiles/) and [integration profiles](/cloudflare-one/policies/data-loss-prevention/integration-profiles/).

## Create a custom profile

To define a custom profile:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **DLP Profiles**.
2. Select **Create Profile**.
3. Enter a name and optional description for the profile.
4. Add custom or existing detection entries.

   {{<render file="_dlp-entries.md">}}

5. (Optional) Configure [**Advanced settings**](/cloudflare-one/policies/data-loss-prevention/custom-profile/advanced-settings/) for the profile.
6. Select **Save profile**.

Next, [create a DLP policy](/cloudflare-one/policies/data-loss-prevention/setup/#2-create-a-dlp-policy) to log or block HTTP requests that match this profile.
