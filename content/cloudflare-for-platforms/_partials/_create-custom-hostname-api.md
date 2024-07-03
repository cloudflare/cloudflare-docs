---
_build:
  publishResources: false
  render: never
  list: never
---

1. To create a custom hostname using the API, use the [Create Custom Hostname](/api/operations/custom-hostname-for-a-zone-create-custom-hostname) endpoint.

    * You can leave the `certificate_authority` parameter empty to set it to "default CA". With this option, Cloudflare checks the CAA records before requesting the certificates, which helps ensure the certificates can be issued from the CA.

2. For the newly created custom hostname, the `POST` response may not return the DCV validation token `validation_records`.  It is recommended to make a second [`GET` command](/api/operations/custom-hostname-for-a-zone-list-custom-hostnames) (with a delay) to retrieve these details.

The response contains the complete definition of the new custom hostname.