---
_build:
  publishResources: false
  render: never
  list: never
---

*   **Type**: The protocol to use for health checks
    *   *Non-enterprise customers*: Choose **HTTP**, **HTTPS**, or **TCP**.
    *   *Enterprise customers*: Choose **HTTP**, **HTTPS**, **TCP**, **UDP ICMP**, **ICMP Ping**, or **SMTP**.
*   **Path**: The endpoint path to run health checks against
*   **Port**: The destination port for health checks