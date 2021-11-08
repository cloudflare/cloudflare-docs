---
order: 1
pcx-content-type: how-to
---

# Import and export records

## Import records

When you add a new domain to Cloudflare, Cloudflare automatically scans for common records and adds them to your account's **DNS** page.

If you want more control over which records are imported and how, use the bulk import functionality.

The number of imported records per domain depends on your plan:

- **Free**: 200 records
- **Pro** and **Business**: 3500 records
- **Enterprise**: 3500 records, but can request a limit increase

### Format your file:
    
Create a [BIND zone file](https://help.dyn.com/how-to-format-a-zone-file/) for your domain. If you need help, use a [third-party tool](https://pgl.yoyo.org/as/bind-zone-file-creator.php).

Make sure to remove all comments from your import file that start with a semicolon (;).

### Import records to Cloudflare

#### Using the dashboard

To import records using the dashboard:

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
1. Update the options in **Include records from:**.
1. Click **Export**.

### Using the API

To export records using the API, send a [GET request](https://api.cloudflare.com/#dns-records-for-a-zone-export-dns-records).