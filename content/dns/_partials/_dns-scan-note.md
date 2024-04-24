---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="note">}}
The [DNS records quick scan](/dns/zone-setups/reference/dns-quick-scan/) is not automatically invoked in the following cases:

- If you choose Enterprise plan and, instead of the **Quick Scan**, choose to upload a DNS zone file or add records manually.
- If you add a zone via the [API](/api/operations/zones-post).

You can manually invoke the quick scan via API with the [Scan DNS Records endpoint](/api/operations/dns-records-for-a-zone-scan-dns-records).

Note that the quick scan is a best effort attempt based on a predefined list of commonly used record names and types. You can read more about this in the [reference page](/dns/zone-setups/reference/dns-quick-scan/).

{{</Aside>}}