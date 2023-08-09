---
_build:
  publishResources: false
  render: never
  list: never
---

Since this scan is not guaranteed to find all existing DNS records, you need to review your records, paying special attention to the following record types:

- [Zone apex records (`example.com`)](/dns/manage-dns-records/how-to/create-zone-apex/)
- [Subdomain records (`www.example.com` or `blog.example.com`)](/dns/manage-dns-records/how-to/create-subdomain/)
- [Email records](/dns/manage-dns-records/how-to/email-records/)