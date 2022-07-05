---
pcx-content-type: how-to
title: Import and export records
weight: 2
---

# Import and export records

{{<render file="_import-scan-info.md">}}

\
If you want more control over which DNS records are imported and how, use the bulk import functionality.

## Import records

### Format your zone file

Create a [BIND zone file](https://en.wikipedia.org/wiki/Zone_file) for your domain. If you need help, use a [third-party tool](https://pgl.yoyo.org/as/bind-zone-file-creator.php).

Make sure to remove all comments from your import file that start with a semicolon (;).

If you are using certain record types — for example, `CNAME`, `DNAME`, `MX`, `NS`, `PTR`, or `SRV` records — make sure that the **content** of those records contains fully qualified domain names (which end in a trailing period like `example.com.`). For more details, refer to [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035#section-5.1) or this [post on Stack Exchange](https://superuser.com/questions/348282/fqdn-format-in-bind-zone#348284).

### Import zone file to Cloudflare

#### Using the dashboard

To import a zone file using the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **DNS**.
3.  Click **Advanced**.
4.  For **Import DNS records**, select your [formatted file](#format-your-zone-file).
5.  If you do not want [applicable records](/dns/manage-dns-records/reference/proxied-dns-records/) proxied, unselect **Proxy imported DNS records**.

#### Using the API

To import records using the API, send a [POST request](https://api.cloudflare.com/#dns-records-for-a-zone-import-dns-records) with a properly [formatted file](#format-your-zone-file).

## Export records

You can also bulk export records from Cloudflare.

### Using the dashboard

To export records using the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **DNS**.
3.  Click **Advanced**.
4.  Click **Export**.

### Using the API

To export records using the API, send a [GET request](https://api.cloudflare.com/#dns-records-for-a-zone-export-dns-records).
