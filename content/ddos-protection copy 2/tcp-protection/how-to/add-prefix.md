---
title: Add a prefix
pcx_content_type: how-to
weight: 2
---

# Add a prefix

## Before you start

Cloudflare recommends that you switch any Advanced TCP Protection rules currently in mitigation mode to monitoring mode before adding a new prefix to Advanced TCP Protection. Refer to [Rule settings](/ddos-protection/tcp-protection/rule-settings/#mode) for more information on execution modes.

---

To add a [prefix](/ddos-protection/tcp-protection/concepts/#prefixes) to Advanced TCP Protection:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.

2. Go to Account Home > **L3/4 DDoS** > **Advanced TCP Protection**.

3. Under **General settings** > **Prefixes**, select **Edit**.

4. Expand the **Add existing prefix** section and select **Add** next to the prefix you wish to add.<br>
Alternatively, enter a prefix and (optionally) a description in **Prefix** and **Description**, respectively, and select **Add**.

{{<Aside type="note" header="Note">}}

The **Add existing prefix** list will not display leased prefixes, but you can add them manually in the Cloudflare dashboard or [using the API](/ddos-protection/tcp-protection/api/). You cannot add [delegated prefixes](/byoip/about/prefix-delegations/) to Advanced TCP Protection.

{{</Aside>}}