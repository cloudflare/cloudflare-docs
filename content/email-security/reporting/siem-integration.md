---
title: SIEM integration
pcx-content-type: tutorial
weight: 4
---

# SIEM integration

With a bit of configuration, you can also bring Area 1 data into your SIEM tools to view message-level information outside of the dashboard and create your own custom reports.

## Connect a SIEM tool

### Step 1 - Set up your SIEM tool

For help setting up the proper configuration in your SIEM tool, refer to the following guides:

- [Splunk Integration Guide](#link-needed)
- [Sumologic Integration Guide](#link-needed)

### Step 2 - Create a webhook

To create a webhook in Area 1 and send data into a SIEM tool:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Alert Webhooks**.
4. Click **New Webhook**.
5. For **App Type**, select **SIEM**.
6. Choose **Splunk** or **Sumologic**.
7. Enter the **Auth Code** and **Target**.
8. Click **Publish Webhook**.