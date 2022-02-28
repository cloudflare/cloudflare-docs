---
pcx-content-type: reference
title: Common API calls
weight: 10
---

# Common API calls

---

## Certificates

| Endpoint                                                                                                                                 | Notes                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [List custom hostnames](https://api.cloudflare.com/#custom-hostname-for-a-zone-list-custom-hostnames)                                    | Use the `page` parameter to pull additional pages. Add a `hostname` parameter to search for specific hostnames.                         |
| [Create custom hostname](https://api.cloudflare.com/#custom-hostname-for-a-zone-create-custom-hostname)                                  |
| [Custom hostname details](https://api.cloudflare.com/#custom-hostname-for-a-zone-custom-hostname-details)                                |
| [Edit custom hostname](https://api.cloudflare.com/#custom-hostname-for-a-zone-edit-custom-hostname)                                      | When sent with an `ssl` object that matches the existing value, indicates that hostname should restart domain control validation (DCV). |
| [Delete custom hostname](https://api.cloudflare.com/#custom-hostname-for-a-zone-delete-custom-hostname-and-any-issued-ssl-certificates-) | Also deletes any associated SSL/TLS certificates.                                                                                       |

## Fallback origins

Our API includes the following endpoints related to the [fallback origin](/ssl/ssl-for-saas/getting-started/#step-1--create-fallback-origin-and-cname-target):

- [Get fallback origin](https://api.cloudflare.com/#custom-hostname-fallback-origin-for-a-zone-get-fallback-origin-for-custom-hostnames)
- [Update fallback origin](https://api.cloudflare.com/#custom-hostname-fallback-origin-for-a-zone-update-fallback-origin-for-custom-hostnames)
- [Delete fallback origin](https://api.cloudflare.com/#custom-hostname-fallback-origin-for-a-zone-delete-fallback-origin-for-custom-hostnames)
