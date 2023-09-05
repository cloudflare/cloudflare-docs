---
pcx_content_type: how-to
title: Manage DNS records
weight: 1
---

# Manage DNS records

{{<render file="_dns-scan-intro.md">}} <br />

{{<render file="_dns-scan-note.md">}}

{{<render file="_dns-scan-procedure.md">}}

If you want more control over which DNS records are imported and how, [import a zone file](/dns/manage-dns-records/how-to/import-and-export/#import-records).

{{<Aside type="note">}}

If your domain is added to Cloudflare by a hosting partner, manage your DNS records via the hosting partner.

{{</Aside>}}

## Create DNS records

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To create a DNS record in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.
2.  Go to **DNS** > **Records**.
3.  Click **Add record**.
4.  Choose a record [**Type**](/dns/manage-dns-records/reference/dns-record-types/).
5.  Complete the required fields, which vary per record. Particularly important fields (for some records) include:
    - **Proxy status**: For `A`, `AAAA`, and `CNAME` records, decide whether hostname traffic is [proxied through Cloudflare](/dns/manage-dns-records/reference/proxied-dns-records/).
    - **TTL**: Short for [*Time to Live*](/dns/manage-dns-records/reference/ttl/), this field controls how long each record is valid and — as a result — how long it takes for record updates to reach your end users.
    - **Comment** and **Tag**: [Record attributes](/dns/manage-dns-records/reference/record-attributes/) meant for your reference.

6.  Click **Save**.

{{</tab>}}

{{<tab label="api" no-code="true">}}

To create records with the API, use a [POST request](/api/operations/dns-records-for-a-zone-create-dns-record).

For specific API examples, refer to [DNS record types](/dns/manage-dns-records/reference/dns-record-types/).

{{<render file="_api-field-definitions.md">}}

{{</tab>}}
{{</tabs>}}

---

## Edit DNS records

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To edit DNS records in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.
2.  Go to **DNS** > **Records**.
3.  On a specific record, click **Edit**.
4.  Make any necessary changes.
5.  Click **Save**.

{{</tab>}}

{{<tab label="api" no-code="true">}}

To update part of a record with the API, use a [PATCH request](/api/operations/dns-records-for-a-zone-patch-dns-record). If you want to overwrite the entire existing record, use a [PUT request](/api/operations/dns-records-for-a-zone-update-dns-record).

{{</tab>}}
{{</tabs>}}

---

## Delete DNS records

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To delete DNS records in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select an account and domain.
2.  Go to **DNS** > **Records**.
3.  On a specific record, click **Edit**.
4.  Click **Delete**.
5.  Click **Delete** again to confirm.

{{</tab>}}

{{<tab label="api" no-code="true">}}

To delete records with the API, use a [DELETE request](/api/operations/dns-records-for-a-zone-delete-dns-record).

{{</tab>}}
{{</tabs>}}