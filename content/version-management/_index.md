---
title: Overview
type: overview
pcx_content_type: overview
weight: 1
---

# Cloudflare Version Management

Cloudflare Version Management allows you to safely test, deploy, and roll back changes to your zone configuration settings.

## Benefits

By using Version Management, you can:

- Create independent versions to make changes with no risk of impacting live traffic.
- Safely deploy changes to staging environments ahead of deploy to production.
- Quickly roll back deployed changes when issues occur.

## Availability

{{<feature-table id="account.version_management">}}

For access, [enable](/version-management/how-to/enable/) Zone Versioning in the Cloudflare dashboard.

{{<Aside type="warning" header="Warning">}}

{{<render file="_product-limitations.md">}}

{{</Aside>}}

## Requirements

To use Version Management, the following must all be true:

- Your zone is on an Enterprise plan.
- Your zone is in an [active](/dns/zone-setups/reference/domain-status/) state.
- Your zone uses [WAF managed rules](https://support.cloudflare.com/hc/articles/5995821690637).
- Your zone has migrated to use [Custom Rules](/waf/reference/migration-guides/firewall-rules-to-custom-rules/) instead of Firewall Rules.
- Your account uses the [new WAF](https://blog.cloudflare.com/new-cloudflare-waf/) (if not, contact your account team).
- Your user account must have an API Key provisioned (if not, [view your API Key](/fundamentals/api/get-started/keys/#view-your-global-api-key)).
- You must use the dashboard to manage versioning.