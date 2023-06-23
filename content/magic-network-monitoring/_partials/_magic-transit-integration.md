---
_build:
  publishResources: false
  render: never
  list: never
---

[Magic Transit On Demand](/magic-transit/on-demand/) customers can use Magic Network Monitoring to analyze their network traffic and detect DDoS attacks while Magic Transit is disabled. If an attack is detected, customers can automatically or manually enable Magic Transit to mitigate DDoS attacks. 

Customers can create Magic Network Monitoring rules which will monitor specific IP prefixes for DDoS attacks. When a DDoS attack is detected, Cloudflare  will notify you by email, [webhook](/fundamentals/notifications/create-notifications/configure-webhooks/), or [PagerDuty](/fundamentals/notifications/create-notifications/create-pagerduty/) with information about the attack. Then, you can choose to automatically activate IP advertisement and enable Magic Transit to protect the targeted IP prefixes from DDoS attacks. This feature is referred to as auto-advertisement, and you can enable it for individual Magic Network Monitoring rules via the dashboard or API.

After Magic Transit is activated and your traffic is flowing through Cloudflare, malicious DDoS traffic will be blocked, and your origin servers will only receive clean network traffic via IPSec or GRE tunnels.

## Enable Magic Network Monitoring notifications

To enable Magic Network Monitoring attack detection notifications, refer to [Notifications](/magic-network-monitoring/notifications/).

## Activate auto-advertisement

### Dashboard

To activate IP advertisement via the Cloudflare dashboard, refer to [Configure dynamic advertisement](/byoip/how-to/configure-dynamic-advertisement/#configure-dynamic-advertisement-via-the-dashboard).

### API

To activate IP advertisement via the API, refer to the [IP Address Management Dynamic Advertisement API](https://developers.cloudflare.com/api/operations/ip-address-management-dynamic-advertisement-properties).

### Magic Network Monitoring Rules

To create Magic Network Monitoring rules with auto advertisement, refer to [Enable per-prefix thresholds with prefix auto advertisement](/magic-transit/how-to/auto-advertise-prefixes/).