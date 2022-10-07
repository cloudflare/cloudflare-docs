---
title: Office 365 journaling setup
pcx_content_type: tutorial
weight: 3
meta:
    title: Setup phishing risk assessment for Office 365 with Area 1
---

# Microsoft Office 365 journaling setup with Area 1

For customers using Microsoft Office 365, setting up a phishing risk assessment with Area 1 and a journaling setup is quick and easy. You need to:

* Configure conector for delivery to Area 1 (if required)
* Configure Journal Rule

The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Office 365 with Area 1.](/email-security/static/office365-journalling-flow.png)

## 1. Configure connector for delivery to Area 1 (if required)

If your email architecture does not include an outbound gateway, you can skip this step and proceed to step two.

On the other hand, if your email architecture requires outbound messages to traverse your email gateway, you may want to consider configuring a connector to send the journal messages directly to Area 1.

1. From the Exchange admin center, go to **mail flow** > **connectors**. 

2. Select the **+** button to configure a new connector and open **Select your mail flow scenario**.

3. In the **From** dropdown menu, select _Office 365_.

4. In the **To** drowndown menu, select _Partner Organization_.

5. Select **Next**.

6. Configure the **New connector** as follows:
    1. **Name**: `Deliver journal directly to Area 1`.
    2. **Description**: `Deliver journal directly to Area 1`.
    3. Select the **Turn it on** checkbox.
    4. Select the **Retain internal Exchange email headers (recommended)** checkbox.
    5. Select **Next**.

7. Configure the **When do you want to use this connector?** as follows:
    1. Select **Only when email messages are sent to these domains**.
    2. Select the **+** button and input `journaling.mxrecord.io` in the configuration pop-up.
    3. Select **Next**.

8. In **How do you want to route email messages?**, select the **+** button to add the following smarthosts:
    * `mailstream-east.mxrecord.io`
    * `mailstream-west.mxrecord.io`

    If you need to enforce traffic through the EU region, use the following smarthosts instead:
    * `mailstream-eu1.mxrecord.io`

    Select **Next**.

9. To preserve the default TLS configuration, make sure the following settings are enabled:
    * The **Always use Transport Layer Security (TLS) to secure the connection (recommended)** checkbox should be selected.
    * In **Connect only if the recipients email server certificate matches this criteria** select **Issued by a trusted certificate authority (CA)**.
