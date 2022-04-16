---
_build:
  publishResources: false
  render: never
  list: never
---

Once you specify your chosen validation method, you can access the validation values by:

- Going to **SSL/TLS** > **Edge Certificates** in the dashboard and clicking a certificate.
- Getting certificate details [via the API](https://api.cloudflare.com/#certificate-packs-get-certificate-pack), and finding the `validation_method` and `validation_records`.