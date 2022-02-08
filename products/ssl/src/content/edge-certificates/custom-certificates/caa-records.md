---
order: 6
pcx-content-type: how-to
---

import CAADefinition from "../../_partials/_caa-records-definition.md"

# Add CAA records

<CAADefinition/>

For additional security, set up [Certificate Transparency Monitoring](/edge-certificates/additional-options/certificate-transparency-monitoring) as well.

<Aside type="note" header="Note">

For more technical details about CAA records, refer to the [introductory blog post](https://blog.cloudflare.com/caa-of-the-wild/).

</Aside>

## Who should create CAA records?

You should [create CAA records](#create-caa-records) for your domain in Cloudflare if each of the following is true:

- You uploaded your own custom origin server certificate (not provisioned by Cloudflare).
- That certificate was issued by a CA (not self-signed).
- Your domain is on a full setup (not a [CNAME setup](https://support.cloudflare.com/hc/articles/360020348832)).

## Who does not need to create CAA records?

You **do not** need to create CAA records in Cloudflare if your domain falls into one of the following categories:

- You have [Universal SSL](/edge-certificates/universal-ssl) or [AMP Real URL](https://support.cloudflare.com/hc/articles/360029367652) enabled (Cloudflare automatically adds CAA records for each our CA providers).
- Your custom origin server certificate is self-signed.
- You are using a [CNAME setup](https://support.cloudflare.com/hc/articles/360020348832) (CAA records should be added to your authoritative DNS provider).

If Cloudflare has automatically added CAA records on your behalf, these records will not appear in the Cloudflare dashboard. However, if you run a command line query using `dig`, you can see any existing CAA records, including those added by Cloudflare.

## Create CAA records

Create a CAA record for each Certificate Authority (CA) that you plan to use for your domain.

To add a CAA record:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
1. Navigate to **DNS**.
1. Click **Add record**.
1. For **Type**, select **CAA**.
1. For **Name**, type your domain.
1. Choose a **Tag**, which specifies the behavior associated with the record.
1. For **CA domain name**, enter the CA name.
1. Click **Save**.
1. Repeat for each CA associated with your domain.
    
Once you have finished creating all the records, you can review them in the list of records appearing under the DNS Records panel.

To create these records via the API, use this [POST endpoint](https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record).
