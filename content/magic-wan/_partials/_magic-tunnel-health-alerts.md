---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName1;;productName2
---

# Configure Magic Tunnel health alerts

Magic $1 and Magic $2 customers can configure Magic Tunnel health alerts to receive email, webhook, and / or PagerDuty notifications when the percentage of successful health checks for a Magic Tunnel drops below the selected [service-level objective (SLO)](https://en.wikipedia.org/wiki/Service-level_objective).

Magic Tunnel health alerts will monitor the health check success rate of each Magic Tunnel included in the alert that has actively transferred traffic over the past six hours. Customers can define an SLO threshold for the percentage of health checks that must be successful for each Magic Tunnel. If the number of successful health checks for the Magic Tunnel(s) included in the alert drops below the SLO threshold, then an alert will fire.

## Alert data

If a Magic Tunnel health alert is fired, customers can expect to see the following data in the email, webhook, and / or PagerDuty notification:

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
curl --request POST \
--url https://api.cloudflare.com/client/v4/accounts/IDENTIFIER/alerting/v3/policies \
--header 'Authorization: Bearer undefined' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Name of the Magic tunnel health alert",
    "alert_type": "magic_tunnel_health_check_event",
    "description": "Description of the Magic tunnel health alert",
    "enabled": true,
    "filters": {
        "slo": [ "99.0" ],
        "tunnel_name": [ "Name(s) of the tunnels monitored in the alert" ]
    },
    "mechanisms": {
        "email": [ { "id": "test@example.com" } ],
        "pagerduty": [ { "id": "e8133a15-00a4-4d69-aec1-32f70c51f6e5" } ],
        "webhooks": [ { "id": "14cc1190-5d2b-4b98-a696-c424cb2ad05f" } ]
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