---
title: Log fields
pcx_content_type: navigation
weight: 51
---

# Log fields

The datasets below describe the fields available by log category. The list of fields is also accessible directly from the API:
`https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/datasets/<DATASET>/fields` for zone-scoped datasets or `https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/logpush/datasets/<DATASET>/fields` for account-scoped datasets, where the **dataset** argument indicates the log category (such as `http_requests`, `spectrum_events`, `firewall_events`, `nel_reports`, or `dns_logs`).

Zone-scoped HTTP requests are available in both Logpush and Logpull, except for [custom fields](/logs/reference/custom-fields/), which are only available in Logpush. All other datasets are only available through Logpush.

Unless otherwise noted, fields are available in both Logpush v1 (Logpush prior to mid-2020) and Logpush v2 (all Logpush jobs after mid-2020).

For log field **ClientIPClass**, Cloudflare recommends using [Bot Tags](/bots/concepts/cloudflare-bot-tags/) to classify IPs.

## Datasets
- [Zone-scoped datasets](/logs/reference/log-fields/zone/)
- [Account-scoped datasets](/logs/reference/log-fields/account/)

For more information on logs available in Cloudflare Zero Trust, refer to [Zero Trust logs](/cloudflare-one/insights/logs/).
