---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168876-Email-undeliverable-when-using-Cloudflare
title: Email issues
meta:
    title: Troubleshooting email issues
---

# Troubleshooting email issues

If you have issues sending or receiving mail, follow these troubleshooting steps.

## Are your records correct?

Consult with your mail administrator or mail provider to ensure you have valid DNS record content.

## Are DNS records missing?

Contact your mail administrator to confirm the DNS records for your domain are correct. Refer to our guide on [managing DNS records in Cloudflare](/dns/manage-dns-records/how-to/create-dns-records) if you need assistance to add or edit DNS records.

## Do you have CNAME Flattening enabled?

When set to [Flatten all CNAMEs](/dns/cname-flattening/set-up-cname-flattening/) in your Cloudflare DNS settings, queries to all `CNAME` records will flatten to an `A` record; no `CNAME` records will be returned.

Also, if `CNAME` records are not returned by the queried nameserver (sometimes nameservers will return TXT records), this may result in nothing being returned when **_Flatten all CNAMEs_** is enabled. Changing to _**Flatten at the root**_ should fix any issues with your CNAME records not being returned.

## Is Cloudflare Spectrum enabled on your account?

Cloudflare does not proxy traffic on port 25 (SMTP) unless [Cloudflare Spectrum](/spectrum/reference/configuration-options#smtp) is enabled and configured to proxy email traffic across Cloudflare. If you do not have Spectrum enabled, then no email traffic (SMTP) will actually pass through Cloudflare, and we will simply resolve the DNS. This also means that any DNS record used to send email traffic must be DNS-only to bypass the Cloudflare network. Check [Identifying subdomains compatible with Cloudflare's proxy](/dns/manage-dns-records/reference/proxied-dns-records) for more details.

## Contact your mail provider for assistance

If your email does not work shortly after editing DNS records, contact your mail administrator or mail provider for further assistance in troubleshooting so that data about the issue can be provided to Cloudflare support.

___

## Best practices for MX records on Cloudflare

{{<render file="_email-record-origin-ip.md" productFolder="learning-paths">}}