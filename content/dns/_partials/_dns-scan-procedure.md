---
_build:
  publishResources: false
  render: never
  list: never
---

Since this scan is not guaranteed to find all existing DNS records, you need to review your records, paying special attention to the following record types:

- [Root domain records (`example.com`)](/dns/manage-dns-records/how-to/create-root-domain/)
- [Subdomain records (`www.example.com` or `blog.example.com`)](/dns/manage-dns-records/how-to/create-subdomain/)
- [Email records](/dns/manage-dns-records/how-to/email-records/)

{{<Aside type="note">}}If you activate your domain on Cloudflare *without* setting up the correct DNS records for your domain and subdomain, your visitors may experience [DNS_PROBE_FINISHED_NXDOMAIN](/dns/zone-setups/troubleshooting/dns-probe-finished-nxdomain/) errors.
{{</Aside>}}