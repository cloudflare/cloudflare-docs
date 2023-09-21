---
title: Security reports (beta)
pcx_content_type: concept
weight: 6
meta:
  title: Application security reports
---

{{<heading-pill style="beta">}} Application security reports {{</heading-pill>}}

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

A Cloudflare user must have one of the following [roles](/fundamentals/setup/manage-members/roles/) to download application security reports:

* Super Administrator
* Administrator

## Number of mitigated requests

As of the April 2023 report, the number of mitigated requests in each report is a sum of the following requests:

* Blocked requests
* Challenged requests that were not solved or bypassed (that is, not issued again because the visitor had previously passed a similar challenge)
