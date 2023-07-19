---
_build:
  publishResources: false
  render: never
  list: never
---

You can access these tokens using the API with the [`GET` custom hostnames endpoint](/api/operations/custom-hostname-for-a-zone-list-custom-hostnames).

For example, here are two tokens highlighted in the API response for a **wildcard** custom hostname.

```json
---
header: Response
highlight: [11,12,13,14,15,16,17,18,19,20,21,22]
---
{
  "result": [
    {
      "id": "<HOSTNAME_ID>",
      "hostname": "<HOSTNAME>",
      "ssl": {
        "id": "<CERTIFICATE_ID>",
        "type": "dv",
        "method": "txt",
        "status": "pending_validation",
        "validation_records": [
          {
            "status": "pending",
            "txt_name": "_acme-challenge.<HOSTNAME>",
            "txt_value": "gESljTB8fBT1mIuoEASU0qcK-oTd46baarnU_ZGjJIY"
          },
          {
            "status": "pending",
            "txt_name": "_acme-challenge.<HOSTNAME>",
            "txt_value": "Pd8ViwX8KuA78kLbQHGmdEh4tQSpHBRxiNuJOYStEC0"
          }
        ],
        "settings": {
          "min_tls_version": "1.0"
        },
        "bundle_method": "ubiquitous",
        "wildcard": true,
        "certificate_authority": "google"
      },
      "status": "pending",
      "ownership_verification": {
        "type": "txt",
        "name": "_cf-custom-hostname.<HOSTNAME>",
        "value": "ac4a9a9d-5469-44cb-9d76-cea7541c9ff8"
      },
      "ownership_verification_http": {
        "http_url": "http://<HOSTNAME>/.well-known/cf-custom-hostname-challenge/fabdf93c-a4ce-4075-9f3f-c553a5f93bed",
        "http_body": "ac4a9a9d-5469-44cb-9d76-cea7541c9ff8"
      },
      "created_at": "2022-10-06T19:35:33.143257Z"
    }
  ]
}
```