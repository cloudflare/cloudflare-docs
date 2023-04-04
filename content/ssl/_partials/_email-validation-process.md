---
_build:
  publishResources: false
  render: never
  list: never
---

The addresses listed in this field will receive an email from `support@certvalidate.cloudflare.com`. They should either select **Review Certificate Request** or the `https://certvalidate.cloudflare.com` hyperlink.

![Example of the Certificate Validation Email](/ssl/static/certvalidate-email.png)

As soon as the domain owner has followed the link in this email and selected **Approve** on the validation page, the certificate will move through the [various statuses](/ssl/reference/certificate-statuses/) until it becomes **Active**.
