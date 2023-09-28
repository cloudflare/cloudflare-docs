---
pcx_content_type: how-to
title: PCI Scans
meta:
  title: PCI Scans
---

# Overview 

PCI scanners are tools used to identify security weaknesses. When a business undergoes a compliance audit, the output of a PCI scan is used to help prove compliance. 

## Initiating a scan

It's important to know which server your scan is targetting. Is it your origin server, where your applications are hosted, or is it a proxy server sitting in front of your origin (for example, Cloudflare)? This can be easily determined. 

When initiating the scan, if you enter a public website URL, the scanner will target the IP address that DNS resolves to. However, if you enter an IP address directly, you will already known exactly which server is being scanned. See [link](/link) for details about how to query DNS.

## Open ports versus blocked traffic

As stated in the overview, if you scan against the public website URL, DNS will resolve the hostname and if the resulting IP resolves to Cloudflare, the scan will evaluate Cloudflare, not your origin server.

A common issue customers encounter while reviewing the results of a PCI scan for a website being proxied through Cloudflare is that the results will show open ports, which gives the impression of existing security vulnerabilities. However, this is an expected output when running a scan against Cloudflare proxied properties. 

There is a difference between open ports and blocked traffic. Due to the nature of how Cloudflare’s Anycast network works, ports other than 80 and 443 are always open so that Cloudflare can serve traffic for other customers on these ports. However, customers can easily block all unwanted traffic to these ports by using the Cloudflare WAF managed rules or the new Cloudflare Firewall Rules(). The PCI scan will show the ports being open, but the traffic will not reach your origin server. 

## Additional resources

More information in: [​​How to block traffic on additional ports](https://developers.cloudflare.com/fundamentals/get-started/reference/network-ports/#how-to-block-traffic-on-additional-ports)

On an additional note: Cloudflare is PCI certified as a Data Processor. Our customers may consult the related documenation at:

[PCI compliance and Cloudflare SSL/TLS – Cloudflare Help Center](https://developers.cloudflare.com/support/ssl-tls/edge-certificates-ssl-tls-configuration/pci-compliance-and-cloudflare-ssltls/)
[BDES-1265_Privacy_Compliance_Whitepapers_PCI_V2.pdf](https://cf-assets.www.cloudflare.com/slt3lc6tev37/2ZT8AvN9cm7k4CMK0GyZqq/d972fa21275bcf9142e0eb2e8b44e43a/BDES-1265_Privacy_Compliance_Whitepapers_PCI_V2.pdf)

You can also find all our public compliance resources here: 
[Certifications and Compliance Resources](https://www.cloudflare.com/trust-hub/compliance-resources/)

If you have a Pro,  Business or Enterprise plan,  you can access Compliance documents in the Cloudflare Dashboard by selecting your account where you are a Super Administrator and then navigating to **Support** > **Compliance Documents**.

For more details on how to access and download the Compliance documents, please review the following article: [Access Compliance Documentation](https://support.cloudflare.com/hc/en-us/articles/4412661740941-Access-Compliance-Documentation).