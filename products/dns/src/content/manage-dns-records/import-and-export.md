---
order: 1
pcx-content-type: how-to
---

# Import and export records

## Import records

When you add a new domain to Cloudflare, Cloudflare automatically scans for common records and adds them to your account's **DNS** page. This scan is not guaranteed to find all existing DNS records, so make sure that all DNS records are added in the Cloudflare **DNS** page before changing your nameservers to Cloudflare nameservers.

If you want more control over which records are imported and how, use the bulk import functionality.

### Format your zone file
    
Create a [BIND zone file](https://en.wikipedia.org/wiki/Zone_file) for your domain. If you need help, use a [third-party tool](https://pgl.yoyo.org/as/bind-zone-file-creator.php).

Make sure to remove all comments from your import file that start with a semicolon (;).

### Import zone file to Cloudflare

#### Using the dashboard

To import a zone file using the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
1. Go to **DNS**.
1. Click **Advanced**.
1. For **Import DNS records**, select your [formatted file](#format-your-file).
1. If you do not want [applicable records](/reference/proxied-dns-records) proxied, unselect **Proxy imported DNS records**.

#### Using the API

To import records using the API, send a [POST request](https://api.cloudflare.com/#dns-records-for-a-zone-import-dns-records) with a properly [formatted file](#format-your-file).

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
