---
title: Add a prefix
pcx_content_type: how-to
weight: 2
meta:
  title: Add a prefix to Advanced TCP Protection
---

# Add a prefix

To add a [prefix](/ddos-protection/tcp-protection/concepts/#prefixes) to Advanced TCP Protection:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.

2. Go to Account Home > **L3/4 DDoS** > **Advanced TCP Protection**.

3. Under **General settings** > **Prefixes**, select **Edit**.

4. Expand the **Add existing prefix** section and select **Add** next to the prefix you wish to add.<br>
Alternatively, enter a prefix and (optionally) a description in **Prefix** and **Description**, respectively, and select **Add**.

{{<Aside type="note" header="Note">}}

The **Add existing prefix** list will not display leased prefixes, but you can add them manually in the Cloudflare dashboard or [using the API](/ddos-protection/tcp-protection/api/). You cannot add [delegated prefixes](/byoip/concepts/prefix-delegations/) to Advanced TCP Protection.

{{</Aside>}}