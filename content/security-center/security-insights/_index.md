---
pcx_content_type: concept
title: Security Insights
weight: 4
---

# Security Insights

Security Insights provides you with a list of insights, covering different areas of your Cloudflare environment, such as: Cloudflare account settings, DNS record configurations, SSL/TLS certificates configurations, Cloudflare Access configurations and Cloudflare WAF configurations.

The currently available Security Insights are listed below:

| Insight Name | Description | 
| ------------ | ----------- |
| [Dangling 'A' Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | A ‘A’ DNS record is pointing to an IPv4 address that you might no longer control. You are at risk of a subdomain takeover. |
| [Unproxied 'A' Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public internet. |
| [Dangling 'AAAA' Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | A ‘AAAA’ DNS record is pointing to an IPv6 address that you might no longer control. You are at risk of a subdomain takeover. |
| [Unproxied 'AAAA' Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public internet. |
| Overprovisioned Access Policies | We detect that you have an Access policy to allow everyone access to your application. |
| [Domains without 'Always Use HTTPS'](/ssl/edge-certificates/additional-options/always-use-https/#always-use-https) | HTTP requests to this domain may not redirect to it's HTTPS equivalent. |
| [Unproxied CNAME Records](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records) | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public internet. |
| [Dangling CNAME Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | A ‘CNAME’ DNS record is pointing to a resource that cannot be found. You are at risk of a subdomain takeover. |
| [DMARC Record Errors](/dns/manage-dns-records/reference/dns-record-types/#dmarc) | We detect an incorrect or missing DMARC record. |
| [Domains without HSTS](/ssl/edge-certificates/additional-options/http-strict-transport-security/) | HSTS, HTTP Strict Transport Security, is a header which allows a website to specify and enforce security policy in client web browsers. This policy enforcement protects secure websites from downgrade attacks SSL stripping and cookie hijacking. |
| [Users without MFA](/fundamentals/setup/account/account-security/2fa/) | We detect that Cloudflare administrative user %{email} has not enabled multifactor authentication. |
| Exposed RDP Servers | We detect an RDP server that is exposed to the public internet. |
| [SPF Record Errors](/dns/manage-dns-records/reference/dns-record-types/#spf) | We detect an incorrect or missing SPF record. |
| [Domains missing TLS Encryption](/ssl/get-started/) | We detect that there is no TLS encryption for this domain. |
| [Domains supporting older TLS version](/ssl/reference/protocols/) | This domain supports older versions of the TLS protocol. |
| [Unprotected Cloudflare Tunnels](/cloudflare-one/applications/configure-apps/self-hosted-apps/#4-connect-your-origin-to-cloudflare) | We detect an application that is served by a Cloudflare Tunnel but not protected by a corresponding Access policy. |
| [Zones without WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) | We detect that this domain does not have the WAF's Managed Rules enabled. You are at risk from zero-day and other common vulnerabilities. |


For more information on available operations for Security Insights, refer to [Review Security Insights](/security-center/security-insights/review-insights/).
