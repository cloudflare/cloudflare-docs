---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168876-Email-undeliverable-when-using-Cloudflare
title: Email undeliverable when using Cloudflare
---

# Email undeliverable when using Cloudflare



## Troubleshooting tips

{{<Aside type="note">}}
Consult with your mail administrator or mail provider to ensure you have
valid DNS record content.
{{</Aside>}}

If you are following the _best practices for MX records on Cloudflare_ mentioned below and still have issues sending or receiving mail, follow these troubleshooting steps:

### Are DNS records missing?

Contact your mail administrator to confirm the DNS records for your domain are correct. Refer to our guide on [managing DNS records in Cloudflare](/dns/manage-dns-records/how-to/create-dns-records) if you need assistance to add or edit DNS records.

{{<Aside type="note">}}
Cloudflare support is unable to modify DNS records within your account.
{{</Aside>}}

### Do you have CNAME Flattening enabled?

When set to [Flatten all CNAMEs](/dns/cname-flattening/set-up-cname-flattening/) in your Cloudflare DNS settings, queries to all CNAME records will flatten to an A record; no CNAME records will be returned.

Also, if CNAME records are not returned by the queried nameserver (sometimes nameservers will return TXT records), this may result in nothing being returned when **_Flatten all CNAMEs_** is enabled. Changing to _**Flatten at the root**_ should fix any issues with your CNAME records not being returned.

### Is Cloudflare Spectrum enabled on your account?

Cloudflare does not proxy traffic on port 25 (SMTP) unless [Cloudflare Spectrum](/spectrum/reference/configuration-options#smtp) is enabled and configured to proxy email traffic across Cloudflare. If you do not have Spectrum enabled, then no email traffic (SMTP) will actually pass through Cloudflare, and we will simply resolve the DNS. This also means that any DNS record used to send email traffic must be grey-clouded to bypass the Cloudflare network. Check [Identifying subdomains compatible with Cloudflare's proxy](/dns/manage-dns-records/reference/proxied-dns-records) for more details.

### Contact your mail provider for assistance.

If your email does not work shortly after editing DNS records, contact your mail administrator or mail provider for further assistance in troubleshooting so that data about the issue can be provided to Cloudflare support.

___

## Best practices for MX records on Cloudflare

Follow these guidelines to ensure successful delivery of your mail traffic:

-   Use separate IP addresses for mail traffic and HTTP/HTTPS traffic. Cloudflare recommends using non-contiguous IPs from different IP ranges.
-   Since mail traffic cannot be proxied through Cloudflare by default, you will expose your origin web server’s IP address. Information on your origin IP address would allow attackers to bypass Cloudflare security features and attack your web server directly.

{{<Aside type="info">}}
When you set up mail records in Cloudflare, you may notice a new
dc-\#\#\#\#\# subdomain record in your zone. Refer to [Why do I have a
dc-\#\#\#\#\#\#\#\#\#
subdomain?](https://support.cloudflare.com/hc/articles/360020296512) for
further details.
{{</Aside>}}
