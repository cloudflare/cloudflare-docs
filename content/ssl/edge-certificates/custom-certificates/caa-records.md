---
pcx_content_type: how-to
title: Add CAA records
weight: 7
---

# Add CAA records

{{<render file="_caa-records-definition.md">}}

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

If you have [AMP Real URL](https://support.cloudflare.com/hc/articles/360029367652) enabled, Cloudflare automatically adds CAA records for each our CA providers when necessary.

If Cloudflare has automatically added CAA records on your behalf, these records will not appear in the Cloudflare dashboard. However, if you run a command line query using `dig`, you can see any existing CAA records, including those added by Cloudflare (replacing `example.com` with your own domain on Cloudflare):

```bash
➜  ~ dig example.com caa +short
0 issue "digicert.com; cansignhttpexchanges=yes"
0 issuewild "digicert.com; cansignhttpexchanges=yes"
0 issue "comodoca.com"
0 issue "letsencrypt.org"
0 issue "pki.goog; cansignhttpexchanges=yes"
0 issuewild "comodoca.com"
0 issuewild "letsencrypt.org"
0 issuewild "pki.goog; cansignhttpexchanges=yes"
```

## Create CAA records

Create a CAA record for each Certificate Authority (CA) that you plan to use for your domain.

To add a CAA record:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Navigate to **DNS**.
3.  Click **Add record**.
4.  For **Type**, select **CAA**.
5.  For **Name**, type your domain.
6.  Choose a **Tag**, which specifies the behavior associated with the record.
7.  For **CA domain name**, enter the CA name.
8.  Click **Save**.
9.  Repeat for each CA associated with your domain.

Once you have finished creating all the records, you can review them in the list of records appearing under the DNS Records panel.

To create these records via the API, use this [POST endpoint](https://api.cloudflare.com/#dns-records-for-a-zone-create-dns-record).
