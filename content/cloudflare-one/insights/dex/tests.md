---
pcx_content_type: reference
title: Tests
weight: 2
---

# Tests

With Digital Experience Monitoring, you can test if your devices can connect to a public-facing endpoint through the WARP client. This tool allows you to monitor availability for a given application and investigate performance issues reported by your end users.

## Prerequisites

Admins must have the [Cloudflare Zero Trust PII role](/cloudflare-one/cloudflare-teams-roles-permissions/#cloudflare-zero-trust-pii) to view test results.

## Create a test

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **DEX** > **Tests**.
2. Select **Add a Test**.
3. Fill in the following fields:
    - **Name**: Enter any name for the test.
    - **Target**: Enter the URL of the website or application that you want to test (for example, `https://jira.site.com`).
    - **Test type**: Refer to [test types](#test-types) for descriptions of the available tests.
    - **Test frequency**: How often the test will run. Input a minute value between 5 and 60.

The test will now run on all devices connected to your Zero Trust organization.

## View test results

To view an overview of all enrolled devices, go to **DEX** > **Monitoring**. The **Tests** tab will show test results for all devices in your organization.

To view analytics on a per-device level, go to **My Team** > **Devices**. The **Tests** tab will show test results for the selected device.

### Data retention

Test results are stored for the following amount of time:

| Zero Trust plan | Duration   |
| --------------- | ---------- |
| **Free**        | 24 hours   |
| **Standard**    | 30 days    |
| **Enterprise**  | 30 days    |

## Test types

### HTTP Get

An HTTP test sends a `GET` request from an end-user device to a public-facing endpoint. You can use the response metrics to troubleshoot connectivity issues for a specific application. For example, you can check whether connections are failing for all users in your organization, or only certain ones.

| Test result | Description |
| ----------- | ----------- |
| Resource fetch time | Difference between the start and end time of the test. Calculated by adding the server response time + DNS response time. |
| Server response time | Round-trip time for the device to receive a response from the target. |
| DNS response time | Round-trip time for the DNS query to resolve. |
| HTTP status codes | [Status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) returned by the target.|
