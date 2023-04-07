---
_build:
  publishResources: false
  render: never
  list: never
---

You can access these tokens using the API with the [`GET` request](/api/operations/certificate-packs-get-certificate-pack) and including `status=pending_validation` as a request parameter.

For example, here are two tokens highlighted in the API response for a wildcard certificate.

```json
---
header: Response
highlight: [13,14,15,16,17,18,19,20,21,22,23,24]
---
{
  "result": [
    {
      "id": "<CERTIFICATE_ID>",
      "type": "advanced",
      "hosts": ["*.<DOMAIN>.com", "<DOMAIN>.com"],
      "primary_certificate": "0",
      "status": "pending_validation",
      "certificates": [],
      "created_on": "2022-10-12T21:46:21.979150Z",
      "validity_days": 90,
      "validation_method": "txt",
      "validation_records": [
        {
          "status": "pending",
          "txt_name": "_acme-challenge.best3.com",
          "txt_value": "lXLOcN6cPv0nproViNcUHcahD9TrIPlNgdwesj0pYpk"
        },
        {
          "status": "pending",
          "txt_name": "_acme-challenge.best3.com",
          "txt_value": "O0o8VgJu_OGu-T30_cvT-4xO5ZX1_2WsVNUrpUKE6ns"
        }
      ],
      "certificate_authority": "google"
    }
  ]
}
```
