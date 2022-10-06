---
_build:
  publishResources: false
  render: never
  list: never
---

You can access these tokens using the API with the [`GET` custom hostnames endpoint](https://api.cloudflare.com/#custom-hostname-for-a-zone-list-custom-hostnames).

For example, here are two tokens highlighted in the API response for a **wildcard** custom hostname.

```json
---
header: Response
highlight: [11,12,13,14,15,16,17,18]
---
{
"result": [
{
    "id": "xxxx",
    "hostname": "example.com",
    "ssl": {
    "id": "xxxx",
    "type": "dv",
    "method": "txt",
    "status": "pending_validation",
    "txt_name": "_acme-challenge.example.com",
    "txt_value": "09pBM4ygXti9LSvoJsqg5zdZglHs8MjfqLsJSGTkh5w",
    "validation_records": [
        {
            "status": "pending",
            "txt_name": "_acme-challenge.example.com",
            "txt_value": "09pBM4ygXti9LSvoJsqg5zdZglHs8MjfqLsJSGTkh5w"
        }
    ],
    "settings": {
        "min_tls_version": "1.3"
    },
    "bundle_method": "ubiquitous",
    "wildcard": true,
    "certificate_authority": "lets_encrypt"
    },
    "status": "active",
    "created_at": "2021-09-23T19:42:02.877815Z"
}
]
}
```