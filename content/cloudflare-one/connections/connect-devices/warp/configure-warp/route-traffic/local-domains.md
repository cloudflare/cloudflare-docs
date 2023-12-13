---
pcx_content_type: how-to
title: Local Domain Fallback
weight: 2
---

# Configure Local Domain Fallback

{{<render file="warp/_local-domains-description.md" productFolder="cloudflare-one">}}

## View local domains

To view the domains subject to Local Domain Fallback:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.

2. Under **Device settings**, locate the [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) you would like to view or modify and select **Configure**.

3. Scroll down to **Local Domain Fallback** and select **Manage**.

On this page, you will see a list of domains excluded from Gateway. You can [add](#add-a-domain) or [remove](#delete-a-domain) domains from the list at any time.

{{<Aside type="warning">}}

Local Domain Fallback configuration only impacts where DNS requests get resolved, not the flow of traffic destined to those domains. If you want to prevent traffic from being sent to a specific domain or IP address, you must add those domains or IPs to your [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) configuration.

{{</Aside>}}

## Add a domain

{{<render file="warp/_add-local-domain.md" productFolder="cloudflare-one">}}

## Delete a domain

1. Go to [**Local Domain Fallback**](#view-local-domains).

2. Find the domain in the list and select **Delete**.

The domain will no longer be excluded from Gateway DNS policies, effective immediately.
