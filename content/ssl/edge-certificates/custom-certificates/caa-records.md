---
pcx_content_type: how-to
title: Add CAA records
weight: 7
---

# Add CAA records

{{<render file="_caa-records-definition.md">}}
<br/>

For additional security, set up [Certificate Transparency Monitoring](/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/) as well.

{{<Aside type="note" header="Note">}}

For more technical details about CAA records, refer to the [introductory blog post](https://blog.cloudflare.com/caa-of-the-wild/).

{{</Aside>}}

## Who should create CAA records?

You should [create CAA records](#create-caa-records) in Cloudflare if each of the following is true:

- You uploaded your own custom origin server certificate (not provisioned by Cloudflare).
- That certificate was issued by a CA (not self-signed).
- Your domain is on a full setup (not a [CNAME setup](/dns/zone-setups/partial-setup)).

## CAA records added by Cloudflare

{{<render file="_caa-records-added-by-cf.md">}}

## Create CAA records

Create a CAA record for each Certificate Authority (CA) that you plan to use for your domain.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To add a CAA record in the dashboard, 

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Go to **DNS** > **Records**.
3.  Select **Add record**.
4.  For **Type**, select **CAA**.
5.  For **Name**, type your domain.
6.  Choose a **Tag**, which specifies the behavior associated with the record.
7.  For **CA domain name**, enter the CA name.
8.  Select **Save**.
9.  Repeat for each CA associated with your domain.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To create a CAA record via the API, use this [POST endpoint](/api/operations/dns-records-for-a-zone-create-dns-record).
 
{{</tab>}}
{{</tabs>}}

Once you have finished creating all the records, you can review them in the list of records appearing under the DNS Records panel.