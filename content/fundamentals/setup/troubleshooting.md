---
pcx_content_type: troubleshooting
title: Troubleshooting
weight: 30
meta:
  title: Troubleshooting | Set up Cloudflare
---

# Troubleshooting setup issues

When you [set up Cloudflare](/fundamentals/setup/), you may experience the following issues or error messages.

## Error messages

- [`ERR_TOO_MANY_REDIRECTS`](/ssl/troubleshooting/too-many-redirects/)
- [`525` or `526` errors](/ssl/troubleshooting/too-many-redirects/)
- [Cannot add DNS records with the same name](/dns/manage-dns-records/troubleshooting/records-with-same-name/)
- [`ERR_SSL_VERSION_OR_CIPHER_MISMATCH` or `SSL_ERROR_NO_CYPHER_OVERLAP`](/ssl/troubleshooting/version-cipher-mismatch/)
- [`DNS_PROBE_FINISHED_NXDOMAIN`](/dns/troubleshooting/dns-probe-finished-nxdomain/)
- [Record exposing origin server IP address](/dns/manage-dns-records/troubleshooting/exposed-ip-address/)
- [Mixed content errors](/ssl/troubleshooting/mixed-content-errors/)
- [SSL errors in appear in my browser](/ssl/troubleshooting/general-ssl-errors/)

## Behavior

- [Why are Cloudflare's IPs in my origin web server logs?](/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/)
- [Is Cloudflare attacking me?](#is-cloudflare-attacking-me)
- [Cannot add domain to Cloudflare](/dns/zone-setups/troubleshooting/cannot-add-domain/)
- [My domain’s email stopped working](/dns/troubleshooting/email-issues/)
- [Why is my site served over HTTP instead of HTTPS?](/ssl/edge-certificates/encrypt-visitor-traffic/)
- [SSL is not working for my second-level subdomain, such as `dev.www.example.com`](/ssl/troubleshooting/general-ssl-errors/#only-some-of-your-subdomains-return-ssl-errors)
- [Why was my domain deleted from Cloudflare?](/dns/zone-setups/troubleshooting/domain-deleted/)

## Cloudflare

- [Gather information to troubleshoot site issues](/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/)
- [Contact Cloudflare support](/support/contacting-cloudflare-support/)
- [Login and account issues](/fundamentals/account-and-billing/account-security/login-and-account-issues/)

## General resources

- [DNS FAQ](/dns/troubleshooting/faq/)
- [SSL/TLS FAQ](/ssl/troubleshooting/faq/)

## Is Cloudflare attacking me?

There are two common scenarios where Cloudflare is falsely perceived to attack your site:

- Unless you [restore the original visitor IP addresses](/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/), Cloudflare IP addresses appear in your server logs for all proxied requests.
- The attacker is spoofing Cloudflare's IPs. Cloudflare only [sends traffic to your origin web server over a few specific ports](/fundamentals/reference/network-ports/) unless you use [Cloudflare Spectrum](/spectrum/).

Ideally, because Cloudflare is a reverse proxy, your hosting provider observes attack traffic connecting from [Cloudflare IP addresses](https://www.cloudflare.com/ips/). In contrast, if you notice connections from IP addresses that do not belong to Cloudflare, the attack is direct to your origin web server. Cloudflare cannot stop attacks directly to your origin IP address because the traffic bypasses Cloudflare’s network.

{{<Aside type="note">}}
If an attacker is directly targeting your origin web server, refer to [Respond to DDoS attacks](/ddos-protection/best-practices/respond-to-ddos-attacks/).
{{</Aside>}}