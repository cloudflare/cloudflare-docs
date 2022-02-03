---
order: 0
pcx-content-type: how-to
---

import ImportScanInfo from "../../_partials/_import-scan-info.md"

# Manage DNS records

<ImportScanInfo/>

If you want more control over which DNS records are imported and how, use the [bulk imports](../import-and-export#import-records).

<Aside type="note">

If your domain is added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

</Aside>

## Create DNS records

### Using the dashboard

To create a DNS record in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.
1. Go to **DNS**.
1. Click **Add record**.
1. Choose a record [**Type**](/manage-dns-records/reference/dns-record-types).
1. Complete the required fields. 
1. Click **Save**.

### Using the API

To create records with the API, use a [POST request](https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record).

---

## Edit DNS records


### Using the dashboard

To edit DNS records in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.
1. Go to **DNS**.
1. On a specific record, click **Edit**.
1. Make any necessary changes.
1. Click **Save**.

### Using the API

To update part of a record with the API, use a [PATCH request](https://api.cloudflare.com/#dns-records-for-a-zone-patch-dns-record). If you want to overwrite the entire existing record, use a [PUT request](https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record).

---

## Delete DNS records

### Using the dashboard

To delete DNS records in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.
1. Go to **DNS**.
1. On a specific record, click **Edit**.
1. Click **Delete**.
1. Click **Delete** again to confirm.

### Using the API

To delete records with the API, use a [DELETE request](https://api.cloudflare.com/#dns-records-for-a-zone-delete-dns-record).