---
_build:
  publishResources: false
  render: never
  list: never
---

When you add a new domain to Cloudflare, Cloudflare automatically scans for common records and adds them to your account's **DNS** > **Records** page. 

{{<Aside type="note">}}
Cloudflare skips the scan in the following cases:

- If you choose Enterprise plan and, instead of the **Quick Scan**, choose to upload a DNS file or add records manually.
- If you add a zone via the [API operation](https://developers.cloudflare.com/api/operations/zones-post).

{{</Aside>}}