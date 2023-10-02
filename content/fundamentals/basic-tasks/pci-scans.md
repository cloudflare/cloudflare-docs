---
pcx_content_type: how-to
title: Scan for PCI compliance
meta:
  title: Scan for PCI compliance
---

{{<Aside>}}
Cloudflare is PCI certified as a Data Processor. See [PCI compliance and Cloudflare SSL/TLS – Cloudflare Help Center](https://developers.cloudflare.com/support/ssl-tls/edge-certificates-ssl-tls-configuration/pci-compliance-and-cloudflare-ssltls/) and 
[BDES-1265_Privacy_Compliance_Whitepapers_PCI_V2.pdf](https://cf-assets.www.cloudflare.com/slt3lc6tev37/2ZT8AvN9cm7k4CMK0GyZqq/d972fa21275bcf9142e0eb2e8b44e43a/BDES-1265_Privacy_Compliance_Whitepapers_PCI_V2.pdf) for more information.
{{</Aside>}}

# Scan server for PCI compliance

PCI scanners are tools used to identify security weaknesses. When a business undergoes a compliance audit, PCI scan results are used for compliance verification.

## Initiate a scan

Start by identifying which server your scan should target. Are you scanning against your origin server, where your applications are hosted, or at a proxy server sitting in front of your origin, such as Cloudflare?

## Open ports versus blocked traffic

There is a difference between open ports and blocked traffic. Due to the nature of how Cloudflare’s Anycast network works, ports other than 80 and 443 are always open so that Cloudflare can serve traffic for other customers on these ports. However, customers can easily block all unwanted traffic to these ports by using Cloudflare [WAF Managed Rules](https://developers.cloudflare.com/fundamentals/get-started/reference/network-ports/#how-to-block-traffic-on-additional-ports) or [custom rules](/waf/custom-rules/). The PCI scan will show the ports being open, but the traffic would not reach your origin server. This is an often misunderstood concern.

By entering a public website URL, the scanner will resolve the hostname and scan the resulting the IP address. If your intention is to scan your origin server, be sure to enter your origins IP or a hostname that resolves to the origin IP, not a proxy server.

## Additional resources

You can find all our public compliance resources here: [Certifications and Compliance Resources](https://www.cloudflare.com/trust-hub/compliance-resources/) and [Access Compliance Documentation](https://support.cloudflare.com/hc/en-us/articles/4412661740941-Access-Compliance-Documentation).

If you have a Pro,  Business or Enterprise plan,  you can access Compliance documents in the Cloudflare Dashboard by selecting your account where you are a Super Administrator and then navigating to **Support** > **Compliance Documents**.