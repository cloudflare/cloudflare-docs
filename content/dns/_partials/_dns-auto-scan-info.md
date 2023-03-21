---
_build:
  publishResources: false
  render: never
  list: never
---

When you add a new site to Cloudflare, Cloudflare automatically scans for common records and adds them to the DNS zone. The records show up under the respective zone **DNS** > **Records** page. 

{{<Aside type="note">}}
The automatic DNS records scan is not invoked in the following cases:

- If you choose Enterprise plan and, instead of the **Quick Scan**, choose to upload a DNS zone file or add records manually.
- If you add a zone via the [API](https://developers.cloudflare.com/api/operations/zones-post).

You can manually invoke the scan via API with the [Scan DNS Records endpoint](https://developers.cloudflare.com/api/operations/dns-records-for-a-zone-scan-dns-records).

{{</Aside>}}