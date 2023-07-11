---
_build:
  publishResources: false
  render: never
  list: never
---

When you add a new site to Cloudflare, Cloudflare automatically scans for common records and adds them to the DNS zone. The records show up under the respective zone **DNS** > **Records** page. 

{{<Aside type="note">}}
The DNS records quick scan is not automatically invoked in the following cases:

- If you choose Enterprise plan and, instead of the **Quick Scan**, choose to upload a DNS zone file or add records manually.
- If you add a zone via the [API](/api/operations/zones-post).

The quick scan is a best effort attempt based on predefined criteria. Learn more about how it works and some known limitations in this [reference page](/dns/zone-setups/reference/dns-quick-scan/).

You can manually invoke the quick scan via API with the [Scan DNS Records endpoint](/api/operations/dns-records-for-a-zone-scan-dns-records).

{{</Aside>}}