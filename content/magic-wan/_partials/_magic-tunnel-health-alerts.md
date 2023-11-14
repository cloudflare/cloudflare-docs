---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productName;;workflow
---

# Configure Magic Tunnel health alerts

$1 customers can configure Magic Tunnel health alerts to receive email, webhook, and PagerDuty notifications when the percentage of successful {{<glossary-tooltip term_id="health-check">}}health checks{{</glossary-tooltip>}} for a Magic Tunnel drops below the selected [service-level objective (SLO)](https://en.wikipedia.org/wiki/Service-level_objective).

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

## Set up Magic Tunnel health alerts

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

$2

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account.
2. Select **Notifications** > **Add**.
3. Select **Magic Transit** > **Magic Tunnel Health Check Alert** > **Select** to add a notification.
4. Enter a name and description for the notification.
5. Add webhooks or an email address for the person who should receive the notification, and select **Next**.
6. Choose the tunnels you want to receive alerts for.
7. Select the **Alert Sensitivity Level** threshold. It is predefined for _Medium_, but you can choose between _High_, _Medium_, and _Low_.
8. Select **Create** when you are done.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
An example of the API configuration for Magic Tunnel health alerts is provided below:

```bash
curl https://api.cloudflare.com/client/v4/accounts/{account_id}/alerting/v3/policies \
--header 'Authorization: Bearer <API_TOKEN>' \
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

Refer to the [API documentation](/api/operations/notification-policies-list-notification-policies) for more details.
 
{{</tab>}}
{{</tabs>}}

## Recommended SLO thresholds

Currently, there are three SLO threshold values that are supported by the API. The SLO threshold for Magic Tunnel health alerts can be defined as the percentage of health checks that must be successful for each of the Magic Tunnel(s) included in the alert:

Alert Sensitivity Level | Recommended SLO threshold
--- | ---
High | 99.0
Medium | 98.0
Low | 97.0