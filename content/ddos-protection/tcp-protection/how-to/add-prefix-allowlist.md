---
title: Add an IP or prefix to the allowlist
pcx_content_type: how-to
weight: 4
meta:
  title: Add an IP address/prefix to the Advanced TCP Protection allowlist
---

# Add an IP address or prefix to the allowlist

To add an IP address or prefix to the Advanced TCP Protection [allowlist](/ddos-protection/tcp-protection/concepts/#allowlist):

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **L3/4 DDoS** > **Advanced Protection**.
3. Under **General settings** > **Allowlist**, select **Edit**.
4. Enter a prefix and (optionally) a description in **Prefix** and **Description**, respectively.
5. To exclude the current prefix from the allowlist instead of including it, uncheck the **Enabled** checkbox.
6. Select **Add**.

{{<render file="_allowlist-ip-spoofing.md">}}
