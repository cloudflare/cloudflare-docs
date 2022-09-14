---
_build:
  publishResources: false
  render: never
  list: never
---

To validate a certificate on a wildcard custom hostname, Cloudflare will now require two [TXT DCV tokens](/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/#txt-record) - one for the apex and one for the wildcard - to be placed at your customer’s authoritative DNS provider in order for the wildcard certificate to issue or renew. This is because - in contrast to DigiCert - Let’s Encrypt and Google Trust Services follow the [ACME Protocol](https://datatracker.ietf.org/doc/html/rfc8555), which requires one DCV token to be placed for every hostname on the certificate.

If your hostname is using another validation method, you will need to [update](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname) the `"method"` field in the SSL object to be `"txt"`.

These tokens can be fetched through the [GET custom hostnames endpoint](https://api.cloudflare.com/#custom-hostname-for-a-zone-list-custom-hostnames) when the certificates are in a “pending validation” state during custom hostname creation or during certificate renewals. You can also fetch them through the dashboard.

For example, here are two tokens highlighted in the API response. These will need to be placed under the `"_acme-challenge"` DNS label. These tokens are different than the hostname validation tokens.

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
    "wildcard": false,
    "certificate_authority": "lets_encrypt"
    },
    "status": "active",
    "created_at": "2021-09-23T19:42:02.877815Z"
}
]
}
```