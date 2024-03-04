---
pcx_content_type: concept
title: Security Insights
weight: 4
layout: wide
---

# Security Insights

Security Insights provides you with a list of insights, covering different areas of your Cloudflare environment, such as: Cloudflare account settings, DNS record configurations, SSL/TLS certificates configurations, Cloudflare Access configurations and Cloudflare WAF configurations.

Listed below are the specific insights currently available:

| Insight Name | Description | 
| ------------ | ----------- |
| [CASB integration status](/cloudflare-one/applications/scan-apps/troubleshooting/) | We detect unhealthy CASB integrations. | 
| [Dangling 'A' Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | A `A` DNS record is pointing to an IPv4 address that you might no longer control. You are at risk of a subdomain takeover. |
| [Dangling 'AAAA' Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | A `AAAA` DNS record is pointing to an IPv6 address that you might no longer control. You are at risk of a subdomain takeover. |
| [Dangling CNAME Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | A `CNAME` DNS record is pointing to a resource that cannot be found. You are at risk of a subdomain takeover. |
| [DMARC Record Errors](/dns/manage-dns-records/reference/dns-record-types/#dmarc) | We detect an incorrect or missing `DMARC` record. |
| [Domains missing TLS Encryption](/ssl/get-started/) | We detect that there is no TLS encryption for this domain. |
| [Domains supporting older TLS version](/ssl/reference/protocols/) | This domain supports older versions of the TLS protocol. |
| [Domains without 'Always Use HTTPS'](/ssl/edge-certificates/additional-options/always-use-https/#always-use-https) | HTTP requests to this domain may not redirect to its HTTPS equivalent. |
| [Domains without HSTS](/ssl/edge-certificates/additional-options/http-strict-transport-security/) | HTTP Strict Transport Security (`HSTS`), is a header which allows a website to specify and enforce security policy in client web browsers. This policy enforcement protects secure websites from downgrade attacks SSL stripping and cookie hijacking. |
| [Exposed RDP Servers](/cloudflare-one/connections/connect-networks/use-cases/rdp/) | We detect an RDP server that is exposed to the public Internet. |
| [Get notified of malicious client-side scripts](/page-shield/detection/configure-alerts/) | We detect that Page Shield alerts are not configured. You will not receive notifications when we detect potential malicious scripts executing in your client-side environment. |
| [Managed Rules not deployed](/waf/managed-rules/reference/cloudflare-managed-ruleset/) | No managed rules deployed on a WAF protected domain. | 
| [Migrate to new Managed Rules](/waf/reference/migration-guides/waf-managed-rules-migration/) | Migration to new Managed Rules system required for optimal protection. | 
| [New API endpoints detected](/api-shield/security/api-discovery/) | API Discovery detects new API endpoints in your zone's traffic. | 
| [New CASB integrations found](/cloudflare-one/applications/scan-apps/casb-integrations/) | New CASB integrations have been found. | 
| [Overprovisioned Access Policies](/cloudflare-one/policies/access/) | We detect an Access policy to allow everyone access to your application. |
| [Page Shield not enabled](/page-shield/get-started/) | Page Shield helps meet PCI DSS v4.0 compliance regarding requirement 6.4.3. | 
| [SPF Record Errors](/dns/manage-dns-records/reference/dns-record-types/#spf) | We detect an incorrect or missing `SPF` record. |
| [Unassigned Access seats](/cloudflare-one/) | We detect a Zero Trust subscription that is not configured yet. | 
| [Unprotected Cloudflare Tunnels](/cloudflare-one/applications/configure-apps/self-hosted-apps/#4-connect-your-origin-to-cloudflare) | We detect an application that is served by a Cloudflare Tunnel but not protected by a corresponding Access policy. |
| [Unproxied `A` Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public Internet. |
| [Unproxied `AAAA` Records](/dns/manage-dns-records/reference/dns-record-types/#a-and-aaaa) | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public Internet. |
| [Unproxied `CNAME` Records](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records) | This DNS record is not proxied by Cloudflare. Cloudflare can not protect this origin because it is exposed to the public Internet. |
| [Users without MFA](/fundamentals/setup/account/account-security/2fa/) | We detect that a Cloudflare administrative user has not enabled multifactor authentication. |
| [Zones without WAF Managed Rules](/waf/managed-rules/) | We detect that this domain does not have the WAF's Managed Rules enabled. You are at risk from zero-day and other common vulnerabilities. |

For more information on available operations for Security Insights, refer to [Review Security Insights](/security-center/security-insights/review-insights/).