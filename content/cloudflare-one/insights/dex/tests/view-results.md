---
pcx_content_type: reference
title: Test results
weight: 3
---

# Test results

You can use the results of a DEX test to monitor availability and performance for a specific application.

## View test results

### Prerequisites

- At least one test has been created under **DEX** > **Tests**.
- Admins must have at least the [Cloudflare Zero Trust Reporting role](/cloudflare-one/cloudflare-teams-roles-permissions/#zero-trust-roles).

### View results for all devices

To view an overview of test results for all devices:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DEX** > **Monitoring**.
2. Select the **Tests** tab.
3. Under **Application tests**, select a test to view detailed results.

### View results for an individual device

To view analytics on a per-device level:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **My Team** > **Devices**.
2. Select the device you want to view, and then select **View details**.
3. Select the **Tests** tab.
4. Select a test to view detailed results.

## Explanation of the fields

### HTTP GET

| Data | Description |
| ----------- | ----------- |
| Resource fetch time | Difference between the start and end time of the test. Calculated by adding the server response time + DNS response time. |
| Server response time | Round-trip time for the device to receive a response from the target. |
| DNS response time | Round-trip time for the DNS query to resolve. |
| HTTP status codes | [Status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) returned by the target. |

### Traceroute

| Data | Description |
| ----------- | ----------- |
| Round trip time | Time between sending out a packet and receiving a response from the target. |
| Number of hops | Number of routers encountered between the device and the target. |
| Packet loss | Percentage of IP packets that failed to receive a response. |
| Availability | Percentage of tests where at least one packet reached the destination. |

## Data retention

Test results are stored for the following amount of time:

| Zero Trust plan | Duration   |
| --------------- | ---------- |
| **Free**        | 24 hours   |
| **Standard**    | 15 days    |
| **Enterprise**  | 15 days    |
