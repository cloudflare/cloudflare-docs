---
_build:
  publishResources: false
  render: never
  list: never
---

For Universal certificates, Cloudflare controls the validity periods and certificate autorities (CAs), making sure that renewal always occur. 

Universal certificates issued by Let’s Encrypt or Google Trust Services have a 90 day validity period. DigiCert is no longer used for newly issued Universal certificates and, for existing ones, the maximum validity period is being adjusted from one year to 90 days.