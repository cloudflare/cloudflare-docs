---
pcx_content_type: how-to
title: HTTP test
weight: 1
---

# Run an HTTP test

An HTTP test sends a `GET` request from an end-user device to a specific web application. You can use the [response metrics](/cloudflare-one/insights/dex/tests/view-results/#http-get) to troubleshoot connectivity issues. For example, you can check whether the application is inaccessible for all users in your organization, or only certain ones.

## Create a test

To set up an HTTP test for an application:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DEX** > **Tests**.
2. Select **Add a Test**.
3. Fill in the following fields:
    - **Name**: Enter any name for the test.
    - **Target**: Enter the URL of the website or application that you want to test (for example, `https://jira.site.com`). Both public and private hostnames are supported. If testing a private hostname, ensure that the domain is on your [local domain fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) list.
    - **Test type**: Select _HTTP Get_.
    - **Test frequency**: Specify how often the test will run. Input a minute value between 5 and 60.

The test will now run on all [supported devices](#supported-devices) connected to your Zero Trust organization.

Next, [view the results](/cloudflare-one/insights/dex/tests/view-results/) of your test.

### Supported devices

To run an HTTP test, the device must be connected to Zero Trust via the WARP client. Refer to the table below for client version requirements.

| System | Minimum WARP version |
| -------| ---------|
| macOS  | 2023.3.382   |
| Windows | 2023.3.381 |
| Linux | 2023.3.398 |
| iOS | Not supported |
| ChromeOS | 6.28 |
| Android | 6.26 |
