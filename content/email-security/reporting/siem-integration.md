---
title: SIEM integration
pcx_content_type: tutorial
weight: 4
---

# SIEM integration

With a bit of configuration, you can also bring Area 1 data into your SIEM tools to view message-level information outside of the dashboard and create your own custom reports.

## Connect a SIEM tool

### Step 1 - Set up your SIEM tool

For help setting up the proper configuration in your SIEM tool, refer to the following guides:

- [Splunk Integration Guide](/email-security/static/Deployment_and_Configuration_Guide_for_Splunk_Cloud_HTTP_Event_Collector.pdf)
- [Sumologic Integration Guide](/email-security/static/Deployment_and_Configuration_Guide_for_Sumologic_Collector.pdf)

### Step 2 - Create a webhook

To [create a webhook](/email-security/email-configuration/domains-and-routing/alert-webhooks/) in Area 1 and send data into a SIEM tool:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Alert Webhooks**.
4. Click **New Webhook**.
5. For **App Type**, select **SIEM**.
6. Choose **Splunk** or **Sumologic**.
7. Enter the **Auth Code** and **Target**.
8. Click **Publish Webhook**.
