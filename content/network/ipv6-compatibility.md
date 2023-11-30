---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/229666767-Understanding-and-configuring-Cloudflare-s-IPv6-support
title: IPv6 compatibility
---

# IPv6 compatibility

Cloudflare enables IPv6 on all domains without requiring additional configuration or hardware (as long as your host provides IPv6 support).

When both IPv4 and IPv6 connections are available, Cloudflare prefers IPv4.

## Availability

{{<feature-table id="network.ipv6">}}

## Enable IPv6 compatibility

By default, IPv6 compatibility is enabled on your domain and will apply to all domains and subdomains covered by [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/).

{{<Aside type="note">}}

If you have signed up for Cloudflare through a [Cloudflare hosting partner](http://www.cloudflare.com/hosting-partners) or by use [partial setup](/dns/zone-setups/partial-setup/), IPv6 compatibility does not apply to your apex domain.

{{</Aside>}}

## Disable IPv6 compatibility

If your origin web server only understands IPv4 formatted IP addresses, non-Enterprise customers should [enable **Pseudo IPv4**](/network/pseudo-ipv4/).

Alternatively, customers with an Enterprise account can disable Cloudflare's IPv6 compatibility.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To disable **IPv6 Compatibility** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **Network**.
3.  For **IPv6 Compatibility**, switch the toggle to **Off**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To disable **IPv6 Compatibility** with the API, send a [`PATCH`](/api/operations/zone-settings-change-i-pv6-setting) request with the `value` parameter set to `"off"`.

{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

Even when IPv6 is disabled, domains can still receive IPv6 traffic via the Tor network. To completely disable all IPv6 traffic:

-   Disable [**Onion Routing**](/network/onion-routing/).
-   Use a [WAF custom rule](/waf/custom-rules/create-dashboard/) to block `0:0:0:0:0:0:0:0/0` using the filter `ip.src in {::/0}`.

{{</Aside>}}

___

## Troubleshoot an IPv6 network issue

Provide the following information to [Cloudflare Support](/support/contacting-cloudflare-support/) if you experience issues with IPv6 connectivity:

-   A [traceroute](https://support.cloudflare.com/hc/articles/203118044#h_b8cebafd-9243-40e9-9c44-d4b94ccd3a87) that demonstrates the IPv6 connection issues,
-   the [Cloudflare data center serving your request](https://support.cloudflare.com/hc/articles/203118044#h_22b01241-01a5-4bed-a897-6e97cff5c288) when the IPv6 issues occur, and
-   confirmation of whether disabling [IPv6 Compatibility](https://support.cloudflare.com/hc/articles/229666767#h_2fa0b554-3fd2-44a3-9a77-ee116c31b8c3) resolves the issue.


