---
pcx_content_type: reference
title: Traceroute test
weight: 2
---

# Traceroute test

{{<details header="Feature availability">}}

| [WARP modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| -- | -- |
| <ul> <li> Gateway with WARP </li> <li> Secure Web Gateway without DNS Filtering </li> </ul>| All plans  |

| System   | Availability | Minimum WARP version |
| ---------| -------------| ---------------------|
| Windows  | ✅           | 2023.5.587           |
| macOS    | ✅           | 2023.5.589           |
| Linux    | ❌           |                      |
| iOS      | ✅           | 1.0      |
| Android  | ✅           | 1.0      |
| ChromeOS | ✅           | 1.0      |

{{</details>}}

A traceroute test measures the network path of an IP packet from an end-user device to a server. You can use the test results to troubleshoot network issues. For example, increased latency may indicate a problem with connectivity along the network path.

## Create a test

To set up a traceroute test for an application:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DEX** > **Tests**.
2. Select **Add a Test**.
3. Fill in the following fields:
    - **Name**: Enter any name for the test.
    - **Target**: Enter the IP address of the server you want to test (for example, `192.0.2.0`). You can test either a public-facing endpoint or a private endpoint you have connected to Cloudflare.
    - **Test type**: Select _Traceroute_.
    - **Test frequency**: Specify how often the test will run. Input a minute value between 5 and 60.

The test will now run on all devices connected to your Zero Trust organization via the WARP client.

Next, [view the results](/cloudflare-one/insights/dex/tests/view-results/) of your test.

## Test results

A traceroute test measures the following data:

| Data | Description |
| ----------- | ----------- |
| Round trip time | Time between sending out a packet and receiving a response from the target. |
| Number of hops | Number of routers encountered between the device and the target. |
| Packet loss | Percentage of IP packets that failed to receive a response. |
| Availability | Percentage of tests where at least one packet reached the destination. |
