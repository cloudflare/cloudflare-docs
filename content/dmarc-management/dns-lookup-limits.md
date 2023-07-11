---
title: DNS lookup limit
weight: 4
pcx_content_type: how-to
meta:
    description: Review number of DNS lookups on your SPF records
---

# DNS lookup limit

The [Sender Policy Framework (SPF)](https://datatracker.ietf.org/doc/rfc4408/) specification has a limit on the number of DNS lookups required to fully resolve an SPF record. According to the specification, SPF must limit the number of DNS lookups to 10 per SPF check. If your SPF records exceed this number, your emails might not reach their destination.

To check if your SPF records are compliant with the SPF specification: 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Email** > **DMARC Management**.
3. In **Email record overview**, select **View records**.
4. Find your SPF record, and select the **three dots next to it** > **Inspect**. 
5. DMARC Management will inspect your records and check for the total number of DNS lookups. If the record exceeds the maximum number of DNS lookups, DMARC Management will warn you about this. You should edit and remove unnecessary records in the DNS page. Refer to [Manage DNS records](/dns/manage-dns-records/how-to/create-dns-records/#delete-dns-records) for more information on how to delete DNS records.