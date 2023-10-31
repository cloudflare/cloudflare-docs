---
_build:
  publishResources: false
  render: never
  list: never
---

#### Record types

By default, Cloudflare only supports proxied `A`, `AAAA`, and `CNAME` records. You cannot proxy other record types.

If you encounter a `CNAME` record that you cannot proxy — usually associated with another CDN provider — a proxied version of that record will cause connectivity errors. Cloudflare is purposely preventing that record from being proxied to protect you from a misconfiguration.

#### Ports and protocols

By default, Cloudflare only proxies HTTP and HTTPS traffic.

If you need to connect to your origin using a non-HTTP protocol (SSH, FTP, SMTP) or the traffic targets an [unsupported port](/fundamentals/reference/network-ports/) at the origin, either leave your records [unproxied (DNS-only)](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records) or use [Cloudflare Spectrum](/spectrum/).

#### Pending domains

{{<render file="_onboard-warning.md" productFolder="DNS">}}
<br/>

This means that DNS records - even those set to [proxy traffic through Cloudflare](#proxied-records) -- will be [DNS-only](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records) until your zone has been activated and any requests to your DNS records will return your origin server's IP address.

If this warning is still present after 24 hours, refer to our [troubleshooting guide](/dns/zone-setups/troubleshooting/nameservers/).

For enhanced security, we recommend rolling your origin IP addresses at your hosting provider after your zone has been activated. This action prevents your origin IPs from being leaked during onboarding.


{{<Aside type="warning">}}
#### Windows authentication

Because Microsoft Integrated Windows Authentication, NTLM, and Kerberos violate HTTP/1.1 specifications, they are not compatible with proxied DNS records.
{{</Aside>}}