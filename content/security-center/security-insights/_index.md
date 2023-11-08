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
| Dangling 'A' Records | A ‘A’ DNS record is pointing to an IPv4 address that you might no longer control. You are at risk of a subdomain takeover. |
| Unproxied 'A' Records | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public internet. |
| Dangling 'AAAA' Records | A ‘AAAA’ DNS record is pointing to an IPv6 address that you might no longer control. You are at risk of a subdomain takeover. |
| Unproxied 'AAAA' Records | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public internet. |
| Overprovisioned Access Policies | We detect that you have an Access policy to allow everyone access to your application. |
| Domains without 'Always Use HTTPS' | HTTP requests to this domain may not redirect to it's HTTPS equivalent. |
| Unproxied CNAME Records | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public internet. |
| Dangling CNAME Records | A ‘CNAME’ DNS record is pointing to a resource that cannot be found. You are at risk of a subdomain takeover. |
| DMARC Record Errors | We detect an incorrect or missing DMARC record. |
| Domains without HSTS | HSTS, HTTP Strict Transport Security, is a header which allows a website to specify and enforce security policy in client web browsers. This policy enforcement protects secure websites from downgrade attacks SSL stripping and cookie hijacking. |
| Users without MFA | We detect that Cloudflare administrative user %{email} has not enabled multifactor authentication. |
| Exposed RDP Servers | We detect an RDP server that is exposed to the public internet. |
| SPF Record Errors | We detect an incorrect or missing SPF record. |
| Domains missing TLS Encryption | We detect that there is no TLS encryption for this domain. |
| Domains supporting older TLS version | This domain supports older versions of the TLS protocol. |
| Unprotected Cloudflare Tunnels | We detect an application that is served by a Cloudflare Tunnel but not protected by a corresponding Access policy. |
| Zones without WAF Managed Rules | We detect that this domain does not have the WAF's Managed Rules enabled. You are at risk from zero-day and other common vulnerabilities. |


For more information on available operations for Security Insights, refer to [Review Security Insights](/security-center/security-insights/review-insights/).
