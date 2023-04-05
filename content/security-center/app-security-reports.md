---
title: Security reports
pcx_content_type: concept
weight: 5
meta:
  title: Application security reports
---

{{<beta>}} Application security reports {{</beta>}}

{{<Aside type="note">}}
Currently, this feature is only available to Enterprise customers.
{{</Aside>}}

Application security reports provide visibility into requests blocked or challenged by the Cloudflare Application Security suite of products.

These reports allow you to get insights and analyze trends for all the zones in your account on a monthly basis, covering the mitigation actions performed by all Cloudflare layer 7 (application layer) security products. Each report includes an overview section and a per-product breakdown.

Cloudflare automatically generates a report every month, usually within the first five days of the month.

To dive deeper into the mitigations performed by Cloudflare security products, use the [Security Analytics](/waf/security-analytics/) dashboard.

## Download a report

To download a monthly application security report:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Security Center** > **Security Reports**.
3. For a given month and year, select **Download** to download the report for that particular month.

---

## Required roles

A Cloudflare user must have one of the following [roles](/fundamentals/account-and-billing/members/roles/) to download application security reports:

* Super Administrator
* Administrator
