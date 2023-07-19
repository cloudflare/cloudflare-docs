---
pcx_content_type: how-to
title: Traceroute test
weight: 2
---

# Run a traceroute test

A traceroute test measures the network path of an IP packet from an end-user device to a server. You can use the [test results](/cloudflare-one/insights/dex/tests/view-results/#traceroute) to troubleshoot network issues. For example, increased latency may indicate a problem with connectivity along the network path.

## Create a test

To set up a traceroute test for an application:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DEX** > **Tests**.
2. Select **Add a Test**.
3. Fill in the following fields:
    - **Name**: Enter any name for the test.
    - **Target**: Enter the IP address of the server you want to test (for example, `192.0.2.0`). You can test either a public-facing endpoint or a private endpoint you have connected to Cloudflare.
    - **Test type**: Select _Traceroute_.
    - **Test frequency**: Specify how often the test will run. Input a minute value between 5 and 60.

The test will now run on all [supported devices](#supported-devices) connected to your Zero Trust organization.

Next, [view the results](/cloudflare-one/insights/dex/tests/view-results/) of your test.

### Supported devices

To run a traceroute test, the device must be connected to Zero Trust via the WARP client. Refer to the table below for client version requirements.

| System | Minimum WARP version |
| -------| ---------|
| macOS  | 2023.5.589   |
| Windows | 2023.5.587|
| Linux | Not supported |
| iOS | 6.22 |
| ChromeOS | 6.28 |
| Android | 6.28 |
