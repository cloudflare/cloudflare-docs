---
title: Get started
pcx_content_type: get-started
weight: 1
---

# Get Started

You can configure the Customer Metadata Boundary and change the region where your logs and analytics are stored via [API](https://developers.cloudflare.com/api/operations/get-accounts-account_identifier-logs-control-cmb-config).

Currently, the Metadata Boundary can only be enabled by Cloudflare for an entire account . If you only want the Metadata Boundary applied to some zones but not other zones in the same account, you will have to move those zones to a new account.

## API examples

These are some examples of API requests. 

<details>
<summary>Get current regions</summary>
<div>

Here is an example request using cURL to get current regions (if any):

```json
curl -s -D "/dev/stderr" https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logs/control/cmb/config -X GET \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <KEY>" \
| jq '.'
```

</div>
</details>

<details>
<summary>Setting regions</summary>
<div>

Here is an example request using cURL to set regions:

```json
curl -s -D "/dev/stderr" https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logs/control/cmb/config -X POST -d '
{
    "regions": "eu"
}
' \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <KEY>" \
| jq '.'

```

This will overwrite any previous regions.
Change will be in effect after several minutes.

</div>
</details>

<details>
<summary>Delete regions</summary>
<div>

Here is an example request using cURL to delete regions:

```json
curl -s -D "/dev/stderr" https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logs/control/cmb/config -X DELETE \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <KEY>" \
| jq '.'
```

</div>
</details>