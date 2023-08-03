---
title: Alert Webhooks
pcx_content_type: concept
weight: 2
---

# Alert Webhooks

Alert Webhooks allow you to connect external services to Area 1, including:

- Slack
- Email addresses
- [SIEM](/email-security/reporting/siem-integration/)
- Microsoft Teams

## Create an alert webhook

To create an alert webhook in Area 1:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Alert Webhooks**.
4. Select **New Webhook**.
5. Select an **App Type**.
7. Enter the **Target**.
8. Select **Publish Webhook**.

## Webhook examples

### Crowdstrike Falcon LogScale

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Alert Webhooks**.
4. Select **New Webhook**.
5. In an **App Type**, select **SIEM**.
6. Choose _Crowdstrike_ from the dropdown, and paste your ingest token into the **Auth Code** section
7. In Target, paste following URL: `https://cloud.community.humio.com/api/v1/ingest/hec/raw`
8. Select **Publish Webhook**.
