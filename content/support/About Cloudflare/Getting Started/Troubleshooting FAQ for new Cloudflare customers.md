---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360027710672-Troubleshooting-FAQ-for-new-Cloudflare-customers
title: Troubleshooting FAQ for new Cloudflare customers
---

# Troubleshooting FAQ for new Cloudflare customers

## Overview

Below are the most common customer questions and issues experienced when getting started with Cloudflare.

## Questions

- [Why are Cloudflare's IPs in my origin web server logs?](https://support.cloudflare.com/hc/articles/200170786)
- [Why is my site served over HTTP instead of HTTPS?](https://support.cloudflare.com/hc/articles/204144518#h_a61bfdef-08dd-40f8-8888-7edd8e40d156)
- [Why is my Cloudflare Universal SSL certificate not active?](/ssl/troubleshooting/general-ssl-errors/#your-cloudflare-universal-ssl-certificate-is-not-active)

### Is Cloudflare attacking me?

There are two common scenarios where Cloudflare is falsely perceived to attack your site:

- Unless you [restore the original visitor IP addresses](/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/), Cloudflare IP addresses appear in your server logs for all proxied requests.
- The attacker is spoofing Cloudflare's IPs. Cloudflare only [sends traffic to your origin web server over a few specific ports](/fundamentals/get-started/reference/network-ports/) unless you use [Cloudflare Spectrum](/spectrum/).

Ideally, because Cloudflare is a reverse proxy, your hosting provider observes attack traffic connecting from [Cloudflare IP addresses](https://www.cloudflare.com/ips/). In contrast, if you notice connections from IP addresses that do not belong to Cloudflare, the attack is direct to your origin web server. Cloudflare cannot stop attacks directly to your origin IP address because the traffic bypasses Cloudflare’s network.

{{<Aside type="note">}}
If an attacker is directly targeting your origin web server, refer to [Respond to DDoS attacks](/ddos-protection/best-practices/respond-to-ddos-attacks/).
{{</Aside>}}

## Issues

- [SSL errors in appear in my browser](/ssl/troubleshooting/general-ssl-errors/)
- [I'm noticing 525 or 526 errors or redirect loops](/ssl/troubleshooting/too-many-redirects/)
- [SSL isn't working for my second-level subdomain (i.e. dev.www.example.com)](/ssl/troubleshooting/general-ssl-errors/#only-some-of-your-subdomains-return-ssl-errors)
- [Why is my site content not properly rendering? Why am I receiving mixed content errors?](/ssl/troubleshooting/mixed-content-errors/)
- [My domain’s email stopped working](/dns/troubleshooting/email-issues/)
- [Why was my domain deleted from Cloudflare?](/dns/zone-setups/troubleshooting/domain-deleted/)

## Related resources

- [SSL FAQ](/support/ssl-tls/faq-and-reference/ssl-faq/)
- [DNS FAQ](/dns/troubleshooting/faq/)
- [Understanding the Cloudflare dashboard](https://support.cloudflare.com/hc/articles/205075117)
- [Gathering information to troubleshoot site issues](https://support.cloudflare.com/hc/articles/203118044)
- [Contacting Cloudflare support](https://support.cloudflare.com/hc/articles/200172476)
