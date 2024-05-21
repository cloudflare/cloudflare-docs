---
pcx_content_type: reference
title: HTTP test
weight: 1
---

# HTTP test

{{<details header="Feature availability">}}

| [WARP modes](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) | [Zero Trust plans](https://www.cloudflare.com/teams-pricing/) |
| -- | -- |
| <ul> <li> Gateway with WARP </li> <li> Secure Web Gateway without DNS Filtering </li> </ul>| All plans  |

| System   | Availability | Minimum WARP version |
| ---------| -------------| ---------------------|
| Windows  | ✅           | 2023.3.381           |
| macOS    | ✅           | 2023.3.381           |
| Linux    | ✅           | 2023.3.398           |
| iOS      | ❌           |           |
| Android  | ✅           | 1.0      |
| ChromeOS | ✅           | 1.0      |

{{</details>}}

An HTTP test sends a `GET` request from an end-user device to a specific web application. You can use the response metrics to troubleshoot connectivity issues. For example, you can check whether the application is inaccessible for all users in your organization, or only certain ones.

## Create a test

To set up an HTTP test for an application:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DEX** > **Tests**.
2. Select **Add a Test**.
3. Fill in the following fields:
    - **Name**: Enter any name for the test.
    - **Target**: Enter the URL of the website or application that you want to test (for example, `https://jira.site.com`). Both public and private hostnames are supported. If testing a private hostname, ensure that the domain is on your [local domain fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) list.
    - **Source device profiles**: (Optional) Select the [WARP device profiles](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) that you want to run the test on. If no profiles are selected, the test will run on all supported devices connected to your Zero Trust organization.
    - **Test type**: Select _HTTP Get_.
    - **Test frequency**: Specify how often the test will run. Input a minute value between 5 and 60.
4. Select **Add test**.

Next, [view the results](/cloudflare-one/insights/dex/tests/view-results/) of your test.

## Test results

An HTTP test measures the following data:

| Data | Description |
| ----------- | ----------- |
| Resource fetch time | Total time of all steps of the request, measured from [`startTime` to `responseEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing). |
| Server response time | Round-trip time for the device to receive a response from the target. |
| DNS response time | Round-trip time for the DNS query to resolve. |
| HTTP status codes | [Status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) returned by the target. |