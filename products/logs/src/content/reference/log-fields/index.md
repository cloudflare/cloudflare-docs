---
title: Log fields
order: 50
pcx-content-type: navigation
---

# Log fields

The data sets below describe the fields available by log category. The list of fields is also accessible directly from the API:
`https://api.cloudflare.com/client/v4/zones/<zone_id>/logpush/datasets/<dataset>/fields` for zone-scoped data sets or `https://api.cloudflare.com/client/v4/accounts/<account_id>/logpush/datasets/<dataset>/fields` for account-scoped data sets, where the `dataset` argument indicates the log category (such as `http_requests`, `spectrum_events`, `firewall_events`, `nel_reports`, or `dns_logs`).

Zone-scoped HTTP requests are available in both Logpush and Logpull. All other data sets are only available through Logpush.

Unless otherwise noted, fields are available in both Logpush v1 (Logpush prior to mid-2020) and Logpush v2 (all Logpush jobs after mid-2020).

## Zone-scoped data sets

<DirectoryListing path="/reference/log-fields/zone"/>

## Account-scoped data sets

<DirectoryListing path="/reference/log-fields/account"/>

For more information on logs available in Cloudflare for Teams, refer to [Teams logs](https://developers.cloudflare.com/cloudflare-one/analytics/logs).