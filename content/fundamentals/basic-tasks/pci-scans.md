---
pcx_content_type: how-to
title: Scan for PCI compliance
meta:
  title: Scan for PCI compliance
---

# Scan server for PCI compliance

{{<Aside type="note">}}
Cloudflare is PCI certified as a Data Processor. Refer to [PCI compliance and Cloudflare SSL/TLS](/ssl/reference/compliance-and-vulnerabilities/) and
[PCI DSS at Cloudflare (PDF)](https://cf-assets.www.cloudflare.com/slt3lc6tev37/2ZT8AvN9cm7k4CMK0GyZqq/d972fa21275bcf9142e0eb2e8b44e43a/BDES-1265_Privacy_Compliance_Whitepapers_PCI_V2.pdf) for more information.
{{</Aside>}}

PCI scanners are tools used to identify security weaknesses. When a business undergoes a compliance audit, PCI scan results are used for compliance verification.

## Initiate a scan

1. Identify which server your scan should target. Are you scanning against your origin server, where your applications are hosted, or at a proxy server sitting in front of your origin, such as Cloudflare?

2. On your scanner tool, enter a public URL or an IP address. If you enter a public website URL, the scanner will resolve the hostname and scan the resulting the IP address. To scan your origin server, be sure to enter your origin server's IP address or a hostname that resolves to the origin server's IP, not a proxy server.

3. Start the scan and analyze the results.

4. (Optional) Run another scan for a different origin server.

### Open ports versus blocked traffic

There is a difference between open ports and blocked traffic. Due to the nature of how Cloudflare’s anycast network works, ports other than 80 and 443 are always open so that Cloudflare can serve traffic for other customers on these ports. However, customers can easily block all unwanted traffic to these ports by using Cloudflare [WAF Managed Rules](/fundamentals/reference/network-ports/#how-to-block-traffic-on-additional-ports) or [custom rules](/waf/custom-rules/). The PCI scan will show the ports being open, but the traffic would not reach your origin server. This is an often misunderstood concern.

## Additional resources

You can find all our public compliance resources in the following pages:
- [Certifications and compliance resources](https://www.cloudflare.com/trust-hub/compliance-resources/)
- [Compliance documentation](/fundamentals/reference/policies-compliances/compliance-docs/)

If you have a Pro, Business, or Enterprise plan, you can access Compliance documents in the Cloudflare dashboard by selecting your account where you are a Super Administrator and then navigating to **Support** > **Compliance Documents**.
