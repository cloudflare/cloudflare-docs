---
order: 1
pcx-content-type: how-to
---

import ImportScanInfo from "../../_partials/_import-scan-info.md"

# Import and export records

<ImportScanInfo/>

If you want more control over which DNS records are imported and how, use the bulk import functionality.

## Import records

### Format your zone file
    
Create a [BIND zone file](https://en.wikipedia.org/wiki/Zone_file) for your domain. If you need help, use a [third-party tool](https://pgl.yoyo.org/as/bind-zone-file-creator.php).

Make sure to remove all comments from your import file that start with a semicolon (;).

### Import zone file to Cloudflare

#### Using the dashboard

To import a zone file using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
1. Go to **DNS**.
1. Click **Advanced**.
1. For **Import DNS records**, select your [formatted file](#format-your-zone-file).
1. If you do not want [applicable records](/manage-dns-records/reference/proxied-dns-records) proxied, unselect **Proxy imported DNS records**.

#### Using the API

To import records using the API, send a [POST request](https://api.cloudflare.com/#dns-records-for-a-zone-import-dns-records) with a properly [formatted file](#format-your-zone-file).

## Export records

You can also bulk export records from Cloudflare.

### Using the dashboard

To export records using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
1. Go to **DNS**.
1. Click **Advanced**.
1. Click **Export**.

### Using the API

To export records using the API, send a [GET request](https://api.cloudflare.com/#dns-records-for-a-zone-export-dns-records).
