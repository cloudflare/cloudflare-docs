---
title: Sumo Logic
pcx_content_type: tutorial
meta:
    description: Sumo Logic integration guide
---

# Sumo Logic integration guide

When Area 1 detects a phishing email, the metadata of the detection can be sent directly into your instance of Sumo Logic. This document outlines the steps required to integrate Area 1 with Sumo Logic.

![A diagram outlining what happens when Area 1 detects a phishing email and sends it to Sumo Logic.](/email-security/static/siem-integration/sumo-logic/opening-sumo-logic.png)

## 1. Configure the Sumologic Collector

1. Log in to [Sumo Logic](https://service.sumologic.com/ui/) with an administrator account.

2. Go to **Manage Data** > **Collection** to open the collector configuration pane.

3. Select **Add Collector**.

    ![Add collector.](/email-security/static/siem-integration/sumo-logic/step3-collector.png)

4. In **Select Collector Type**, select **Hosted Collector**.

    ![Select Hosted Collector.](/email-security/static/siem-integration/sumo-logic/step4-hosted.png)

5. In **Add Hosted Collector**, enter the following settings:
    - **Name**: `Area 1 Collector`
    - **Description**: `Area 1 Security Collectors`
    - **Category**: Anti-Phishing

    ![Enter the settings above to configure your collector.](/email-security/static/siem-integration/sumo-logic/step5-hosted-collector.png)

6. Select **Save** > **OK** to confirm the addition of the new Collector.

7. In **Cloud APIs**, select **HTTP Logs and Metrics** to start the configuration of the data source.

    ![Select HTTP Logs and Metrics.](/email-security/static/siem-integration/sumo-logic/step7-http-logs.png)

8. Enter a descriptive **Name** and **Description**, and select **Save**.

    ![Enter a name and description.](/email-security/static/siem-integration/sumo-logic/step8-name.png)

9. The system will present you a dialog box with the HTTP endpoint. Save it, as this will be required to configure Area 1 later.

    ![Take note of the endpoint to use it later.](/email-security/static/siem-integration/sumo-logic/step9-endpoint.png)

## 2. Configure Area 1

The next step is to configure Area 1 to push the Email Detection Events to the Sumologic HTTP Collector.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Email Configuration** > **Alert Webhooks**, and select **New Webhook**.
3. In the Add Webhooks page, enter the following settings: 
    - **App type**: Select **SIEM** > **Splunk**. In **Auth code**, enter `Sumologic`.
    - **Target**: Enter the HTTP endpoint you saved in the previous section.
    - For the dispositions (`Malicious`, `Suspicious`, `Spoof`, `Spam`, `Bulk`) choose which (if any) you want to send to the webhook.
4. Select **Publish Webhook**.

Your Sumo Logic integration will now show up in the All Webhooks panel.

![Your Sumo Logic webhook will display in the All Webhooks panel.](/email-security/static/siem-integration/sumo-logic/all-webhooks.png)

It will take about ten minutes for the configuration to fully propagate through the infrastructure of Cloudflare Area 1, and for events to start to appear in your searches. Once the configuration is propagated, events will start to appear in your instance of Sumo Logic. 

To view logs, hover your mouse over the Area 1 Collector, and select **Open in Log Search**.

![View logs in Sumo Logic.](/email-security/static/siem-integration/sumo-logic/open-log.png)

Once events start to flow, select **New** > **Log search** to search for the detection events with your search criteria (for example, `_collector="Area 1 Collector"`).

![Search for events.](/email-security/static/siem-integration/sumo-logic/search-events.png)