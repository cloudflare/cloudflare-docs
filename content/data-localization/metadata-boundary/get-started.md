---
title: Get started
pcx_content_type: get-started
weight: 1
---

# Get Started

You can configure the Metadata Boundary to select the region where your logs and analytics are stored via API or dashboard.

Currently, this can only be applied at the account-level. If you only want the Metadata Boundary to be applied on a portion of zones beneath the same account, you will have to [move the rest of zones to a new account](/fundamentals/get-started/basic-tasks/manage-domains/move-domain/).

## Configure Customer Metadata Boundary in the dashboard

To configure Customer Metadata Boundary in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Manage Account** > **Configurations**.
3. In **Customer Metadata Boundary**, select the region you want to use.

## Configure Customer Metadata Boundary via API

You can also configure Customer Metadata Boundary via API. These are some examples of API requests.

<details>
<summary>Get current regions</summary>
<div>

Here is an example request using cURL to get current regions (if any):

```bash
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

```bash
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

```bash
curl -s -D "/dev/stderr" https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logs/control/cmb/config -X DELETE \
-H "X-Auth-Email: <EMAIL>" \
-H "X-Auth-Key: <KEY>" \
| jq '.'
```

</div>
</details>
  
## View or change settings

To view or change your Customer Metadata Boundary setting:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2.  Go to **Manage Account** > **Configurations** > **Preferences**.
3.  Locate the **Customer Metadata Boundary** section.
