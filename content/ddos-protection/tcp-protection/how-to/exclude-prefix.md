---
title: Exclude a prefix
pcx_content_type: how-to
weight: 6
---

# Exclude a prefix or a prefix subset

To exclude a prefix or a prefix subset from Advanced TCP Protection:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to Account Home > **L3/4 DDoS** > **Advanced TCP Protection**.
3. [Add the prefix](/ddos-protection/tcp-protection/how-to/add-prefix/) you previously onboarded to Magic Transit to Advanced TCP Protection.
4. [Add the prefix](/ddos-protection/tcp-protection/how-to/add-prefix/) (or subset) you wish to exclude as a new, separate prefix in Advanced TCP Protection.
5. For the prefix you added in the previous step, select **Exclude Subset** in the **Enrolled Prefixes** list.

{{<Aside type="note">}}

Prefixes or subsets added as _Excluded_ will not be protected by Advanced TCP Protection.

{{</Aside>}}