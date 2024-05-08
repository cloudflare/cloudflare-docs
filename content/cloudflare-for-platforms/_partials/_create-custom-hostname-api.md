---
_build:
  publishResources: false
  render: never
  list: never
---

To create a custom hostname using the API, use a [POST command](/api/operations/custom-hostname-for-a-zone-create-custom-hostname) on the `/zone/:zone_id/custom_hostnames` endpoint.

For the newly created custom hostname, the POST response may not return the DCV validation token `validation_records`  It is recommended to make a second [GET command](/api/operations/custom-hostname-for-a-zone-list-custom-hostnames) (with a delay) to retrieve these details.

The response contains the complete definition of the new custom hostname.
