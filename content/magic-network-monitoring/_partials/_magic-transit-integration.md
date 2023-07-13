---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: productNamePath
---

[Magic Transit On Demand](/magic-transit/on-demand/) customers can use $1 to analyze their network traffic and detect DDoS attacks while Magic Transit is disabled. If an attack is detected, customers can automatically or manually enable Magic Transit to mitigate DDoS attacks. 

Customers can create Magic Network Monitoring rules which will monitor specific IP prefixes for DDoS attacks. When a DDoS attack is detected, Cloudflare  will notify you by email, [webhook](/fundamentals/notifications/create-notifications/configure-webhooks/), or [PagerDuty](/fundamentals/notifications/create-notifications/create-pagerduty/) with information about the attack. Then, you can choose to [automatically activate IP advertisement](#activate-auto-advertisement) and enable Magic Transit to protect the targeted IP prefixes from DDoS attacks. This feature is referred to as auto-advertisement, and you can enable it for individual Magic Network Monitoring rules via the dashboard or API.

After Magic Transit is activated and your traffic is flowing through Cloudflare, malicious DDoS traffic will be blocked, and your origin servers will only receive clean network traffic via IPSec or GRE tunnels.

Refer to [Rules](/magic-network-monitoring/rules) to learn more about monitoring traffic volume and enabling per-prefix thresholds.