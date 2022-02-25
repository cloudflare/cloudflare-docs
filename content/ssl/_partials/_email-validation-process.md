---
_build:
  publishResources: false
  render: never
  list: never
---

The addresses listed in this field will receive an email from `support@certvalidate.cloudflare.com`. They should either click **Review Certificate Request** or the `https://certvalidate.cloudflare.com` hyperlink.

![Certificate Validation Email](/ssl/static/certvalidate-email.png)

As soon as the domain owner has clicked the link in this email and clicked **Approve** on the validation page, the certificate will move through the [various statuses](/ssl/ssl-tls/certificate-statuses/) until it becomes **Active**.
