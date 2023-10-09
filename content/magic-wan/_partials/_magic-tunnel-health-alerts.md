---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName
---

# Configure Magic Tunnel health alerts

$1 customers can configure Magic Tunnel health alerts to receive email, webhook, and PagerDuty notifications when the percentage of successful health checks for a Magic Tunnel drops below the selected [service-level objective (SLO)](https://en.wikipedia.org/wiki/Service-level_objective).

Magic Tunnel health alerts will monitor the health check success rate of each Magic Tunnel included in the alert that has actively transferred traffic over the past six hours. Customers can define an SLO threshold for the percentage of health checks that must be successful for each Magic Tunnel. If the number of successful health checks for the Magic Tunnel(s) included in the alert drops below the SLO threshold, then an alert will fire.

## Alert data

If a Magic Tunnel health alert is fired, customers can expect the following data in the email, webhook, and PagerDuty notification:

- Cloudflare account name
- Cloudflare account ID
- Alert type
- Tunnel name
- Tunnel ID
- Tunnel status
- Alert SLO
- Timestamp

## API configuration

At this time, Magic Tunnel health alerts can only be configured via API. Customers cannot currently configure the alerts via the Cloudflare dashboard. This functionality will be released in the near future. An example of the API configuration for Magic tunnel health alerts is provided below:

```js
curl https://api.cloudflare.com/client/v4/accounts/IDENTIFIER/alerting/v3/policies \
--header 'Authorization: Bearer undefined' \
--header 'Content-Type: application/json' \
--data '{
    "name": "<NAME_OF_MAGIC_TUNNEL_HEALTH_ALERT>",
    "alert_type": "magic_tunnel_health_check_event",
    "description": "<DESCRIPTION_OF_MAGIC_TUNNEL_HEALTH_ALERT>",
    "enabled": true,
    "filters": {
        "slo": [ "99.0" ],
        "tunnel_name": [ "Name(s) of the tunnels monitored in the alert" ]
    },
    "mechanisms": {
        "email": [ { "id": "test@example.com" } ],
        "pagerduty": [ { "id": "<PAGERDUTY_ID>" } ],
        "webhooks": [ { "id": "<WEBHOOKS_ID>" } ]
    }
}'
```

## Recommended SLO thresholds

Currently, there are three SLO threshold values that are supported by the API. The SLO threshold for Magic Tunnel health alerts can be defined as the percentage of health checks that must be successful for each of the Magic Tunnel(s) included in the alert:

Alert Sensitivity Level | Recommended SLO threshold
--- | ---
High | 99.0
Medium | 98.0
Low | 97.0