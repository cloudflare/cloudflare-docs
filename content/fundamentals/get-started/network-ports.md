---
pcx-content-type: concept
title: Network ports
---

# Network ports

Learn which network ports Cloudflare proxies by default and how to enable Cloudflare's proxy for additional ports.

## Network ports compatible with Cloudflare's proxy

By default, Cloudflare proxies traffic destined for the HTTP/HTTPS ports listed below.

<details>
<summary>HTTP ports supported by Cloudflare</summary>
<div>

*   80
*   8080
*   8880
*   2052
*   2082
*   2086
*   2095

</div>
</details>

<details>
<summary>HTTPS ports supported by Cloudflare</summary>
<div>

*   443
*   2053
*   2083
*   2087
*   2096
*   8443

</div>
</details>

<details>
<summary>Caching is disabled for the following ports</summary>
<div>

*   2052
*   2053
*   2082
*   2083
*   2086
*   2087
*   2095
*   2096
*   8880
*   8443

</div>
</details>

## How to enable Cloudflare's proxy for additional ports

If traffic for your domain is destined for a different port than listed above, either:

*   Add the subdomain as a [gray-clouded record](/dns/manage-dns-records/reference/proxied-dns-records) via your Cloudflare DNS app, or
*   Enable [Cloudflare Spectrum](/spectrum/get-started).

Block traffic on ports other than 80 and 443 in Cloudflare paid plans by doing one of the following:

*   If you are using [Cloudflare Firewall](https://support.cloudflare.com/hc/en-us/articles/200172016), enable rule ID 100015: "Anomaly:Port - Non Standard Port (not 80 or 443)".
*   If you are using the new [Cloudflare Web Application Firewall (WAF)](/waf/), create a [Custom Firewall rule](/waf/custom-rules/custom-firewall) for this purpose (rule ID 100015 was deprecated in the new WAF). For example, you could use a rule configuration similar to the following:
    *   Expression: `not (cf.edge.server_port in {80 443})`
    *   Action: *Block*

Ports 80 and 443 are the only ports compatible with:

*   HTTP/HTTPS traffic within China data centers for domains that have the **China Network** enabled, and
*   Proxying of [Cloudflare Apps](https://www.cloudflare.com/apps/developer/docs/getting-started)
*   [Cloudflare Caching](https://support.cloudflare.com/hc/en-us/articles/360021806811)

<Aside type="note">

[Cloudflare Access](/cloudflare-one/) does not support port numbers in URLs. Port numbers are stripped from requests for URLs protected through Cloudflare Access.

</Aside>

## Related resources

*   [Managing DNS records at Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151)
