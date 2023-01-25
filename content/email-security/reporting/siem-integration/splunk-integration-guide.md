---
title: Splunk
pcx_content_type: tutorial
meta:
    title: Splunk Cloud integration guide
---

# Splunk Cloud integration guide

When Area 1 detects a phishing email, the metadata of the detection can be sent directly to Splunk. This document outlines the steps required to integrate with Splunk Cloud.

![A diagram outlining what happens when Area 1 detects a phishing email and sends it to Splunk.](/email-security/static/siem-integration/splunk/open-splunk.png)

## 1. Configure Splunk HTTP Event Collector

1. [Log in to Splunk](https://login.splunk.com/) with an administrator account.

2. Go to **Settings** > **Data inputs**.
    ![Go to Data inputs to configure your settings.](/email-security/static/siem-integration/splunk/step2-data-inputs.png)

3. In **Type**, select **HTTP Event Collector** to access this configuration and create a new collector.

4. Select the **New Token** button to start the configuration.

5. Provide a descriptive name for the Area 1 token (for example, `Area 1 Email Detections`), and leave the **Enable indexer acknowledgement** unchecked.

    ![Enter a descriptive name for your new token, but leave Enable indexer acknowledgement checkbox unchecked.](/email-security/static/siem-integration/splunk/step5-token.png)

6. Select **Next** to continue.

7. Configure the Input Settings for the HTTP Event Collector based on your environment.

    ![Configure the Input Settings based on your environment](/email-security/static/siem-integration/splunk/step7-input-settings.png)

8. (Optional) You may also select **Create a new index** to create new settings for Area 1 events, with the **Max Size of Entire Index** and **Retention (days)** that fits your environment. 

    ![Optionally, create a new index for Area 1 events](/email-security/static/siem-integration/splunk/step8-new-index.png)

9. For this example, we created a new `area1_index` index, and added it to the configuration. 

    ![Example of a new index added to the configuration](/email-security/static/siem-integration/splunk/step9-new-index.png)

10. Select **Review** > **Submit** to review your settings and create the collector.

11. Take note of the token value in this next screen. This value is required for the Area 1 configuration in the next step. The token can also be retrieved from the HTTP Event Collector configuration panel, in **Settings** > **Data inputs** > **HTTP Event Collector**.

    ![Example of a new index added to the configuration](/email-security/static/siem-integration/splunk/step11-token-value.png)

## 2. Test your HTTP Event Collector

To test your the HTTP Event Collector, you can manually inject an event into Splunk by using the following cURL command:

```bash
$ curl https://<HOST>:8088/services/collector/event \
-H 'Authorization: Splunk <YOUR_TOKEN>' \
-d '{"sourcetype": "<YOUR_SOURCE_TYPE", "event":"Hello, World!"}'
```

### Request formats

When creating requests to Splunk, the URL and port number change according to the type of Splunk setup:
- **Splunk Cloud Platform free trial**: `<protocol>://http-inputs-<host>.splunkcloud.com:8088/<endpoint>`
- **Splunk Cloud Platform**: `<protocol>://http-inputs-<host>.splunkcloud.com:443/<endpoint>`
- **Splunk Enterprise**: `<protocol>://<host>:8088/<endpoint>`

Refer to the [Splunk documentation](https://docs.splunk.com/Documentation/Splunk/8.2.2/Data/UsetheHTTPEventCollector) for more information. 

 If your instance is on-premise, specify the appropriate hostname and ensure that your firewall allows the configured port through to your instance. The connections will be coming from the following egress IP addresses, if you need them for your access control lists (ACLs):

 ```txt
52.11.209.211
52.89.255.11
52.0.67.109
54.173.50.115
```

{{<Aside type="note">}}Ensure that you have a valid SSL certificate configured on your instance. The certificate cannot be expired and cannot be a self-signed certificate.{{</Aside>}}

If all the requirements are met, you will receive the following response back to the cURL command:

```json
{"text":"Success","code":0}
```

Additionally, you can search your instance of Splunk for the test event with `index` or other search criteria (for example, `index="area1_index"`):

![Example of a new index added to the configuration](/email-security/static/siem-integration/splunk/search-instance.png)


## 3. Configure Area 1

The next step is to configure Area 1 to push the Email Detection Event to the Splunk HTTP Event Collector.

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Select the **Search** bar.
3. Go to **Email Configuration** > **Alert Webhooks**, and select **New Webhook**.
4. In the Add Webhooks page, enter the following settings: 
    1. **App type**: Select **SIEM** > **Splunk**, and enter the auth code you took note of in [step 1](#1-configure-splunk-http-event-collector).
    2. **Target**: Enter the target URI of your Splunk instance. It will typically have the `https://<host>:8088/services/collector` format. Refer to [Request formats](#request-formats) to learn more about how your Splunk subscription affects the URI.
    3. 

