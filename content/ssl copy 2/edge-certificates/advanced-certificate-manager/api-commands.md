---
pcx_content_type: reference
title: API commands
weight: 5
---

# API commands

Use the following API commands to manage advanced certificates. If you are using our API for the first time, review our [API documentation](/fundamentals/api/).

{{<table-wrap>}}

| Command | Method | Endpoint | Additional notes |
| ------- | ------ | -------- | ---------------- |
| [Order advanced certificate](/api/operations/certificate-packs-order-advanced-certificate-manager-certificate-pack) | `POST` | `zones/<<ZONE_ID>>/ssl/certificate_packs/order` |
| [Restart certificate validation](/api/operations/certificate-packs-restart-validation-for-advanced-certificate-manager-certificate-pack) | `PATCH` | `zones/<<ZONE_ID>>/ssl/certificate_packs/<<ID>>` |
| [Delete certificate pack](/api/operations/certificate-packs-delete-advanced-certificate-manager-certificate-pack) | `DELETE` | `zones/<<ZONE_ID>>/ssl/certificate_packs/<<ID>>` |
| [List certificate packs in a zone](/api/operations/certificate-packs-list-certificate-packs) | `GET` | `zones/<<ZONE_ID>>/ssl/certificate_packs?status=all` | This API call returns all certificate packs for a domain (Universal, Custom, and Advanced). |
| [List Cipher Suite settings](/api/operations/zone-settings-get-ciphers-setting) | `GET` | `zones/<<ZONE_ID>>/settings/ciphers` |
| [Change Cipher Suite settings](/api/operations/zone-settings-change-ciphers-setting) | `PATCH` | `zones/<<ZONE_ID>>/settings/ciphers` | To restore default settings, send a blank array in the `value` parameter. |

{{</table-wrap>}}