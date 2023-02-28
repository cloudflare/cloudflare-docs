---
title: SIEM integration
pcx_content_type: tutorial
weight: 3
---

# SIEM integration

With a bit of configuration, you can also bring Area 1 data into your Security Information and Event Management (SIEM) tools to view message-level information outside of the dashboard and create your own custom reports.

## Connect a SIEM tool

The following steps are required to connect your SIEM tool.

### 1. Set up your SIEM tool

For help setting up the proper configuration in your SIEM tool, refer to the following guides:

{{<directory-listing showDescriptions=true >}}

### 2. Create a webhook

To [create a webhook](/email-security/email-configuration/domains-and-routing/alert-webhooks/) in Area 1 and send data into a SIEM tool:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Alert Webhooks**.
4. Select **New Webhook**.
5. For **App Type**, select **SIEM**.
6. Choose **Splunk** or **Sumologic**.
7. Enter the **Auth Code** and **Target**.
8. Select **Publish Webhook**.