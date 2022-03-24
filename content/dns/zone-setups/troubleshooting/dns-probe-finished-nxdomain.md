---
title: DNS_PROBE_FINISHED_NXDOMAIN
pcx-content-type: reference
weight: 2
meta:
  title: DNS_PROBE_FINISHED_NXDOMAIN - Troubleshooting zone setups
---

# DNS_PROBE_FINISHED_NXDOMAIN

When you experience a `DNS_PROBE_FINISHED_NXDOMAIN` error, you should review your Cloudflare DNS records. 

## Background

`DNS_PROBE_FINISHED` means that the DNS request for a resource timed out and `NXDOMAIN` stands for non-existent domain. Together, these messages mean that the DNS query for a specific resource could not locate an associated domain.

When a domain cannot be resolved, 

  it is an issue with the DNS servers or the domain name is newly registered or not yet registered at all. NXDOMAIN can also take place due to network or DNS server problems. A response other than a valid IP address (e.g., timeout, SERVFAIL, NXDOMAIN or NOERROR) most likely points to the origin as the source of your issue. When this happens, you’ll see “DNS PROBE FINISHED NXDOMAIN” or “ERR_NAME_RESOLUTION_FAILED”

The domain is not pointed to Cloudflare name servers. Contact your domain registrar and ask that they point the domain to your Cloudflare nameservers.

DNS propagation needs some time, wait for recent changes to take effect.

There is no subdomain configured in your DNS settings or the orgin IP address that was specfied in your DNS tab is incorrect.

If example.com does not resolve, that may indicate there is no A record for the naked domain. Go to your DNS tab and create an A record with “@” as name and your origin IP address as the value.

If you are seeing the error and experiencing slow load times, note that Cloudflare does not cache HTML by default. When a request is made to the HTML, Cloudflare will need to forward the request to your origin and respond it back to your visitors. To improve the loading time, you may consider caching the HTML only at Cloudflare. How do I cache static HTML 95? Cloudflare will serve the content to your visitors instead.

Whois is showing Cloudflare nameservers but I am under attack mode is active and/or Cloudflare is paused on your site. Change those settings and re-check.