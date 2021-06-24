---
title: Log fields
order: 50
pcx-content-type: navigation
---

# Log fields

The data sets below describe the fields available by log category. The list of fields is also accessible directly from the API:
`https://api.cloudflare.com/client/v4/zones/<zone_id>/logpush/datasets/<dataset>/fields`, where the `dataset` argument indicates the log category (such as `http_requests`, `spectrum_events`, or `firewall_events`).

Unless otherwise noted, fields are available in both Logpush v1 (Logpush prior to mid-2020) and Logpush v2 (all Logpush jobs after mid-2020).

<DirectoryListing path="/reference/log-fields"/>
