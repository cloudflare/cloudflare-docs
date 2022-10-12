---
title: Office 365 journaling setup
pcx_content_type: tutorial
weight: 3
meta:
    title: Setup phishing risk assessment for Office 365 with Area 1
---

# Microsoft Office 365 journaling setup with Area 1

For customers using Microsoft Office 365, setting up a phishing risk assessment with Area 1 and a journaling setup is quick and easy. The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Office 365 with Area 1.](/email-security/static/office365-journalling-flow.png)

## 1. Configure connector for delivery to Area 1 (if required)

If your email architecture does not include an outbound gateway, you can skip this step and proceed to step two.

On the other hand, if your email architecture requires outbound messages to traverse your email gateway, you may want to consider configuring a connector to send the journal messages directly to Area 1.

1. From the Exchange admin center, go to **mail flow** > **connectors**. 

2. Select the **+** button to configure a new connector and open **Select your mail flow scenario**.

3. In the **From** dropdown menu, select *Office 365*.

4. In the **To** drowndown menu, select *Partner Organization*.

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

9. You need to preserve the default TLS configuration. Review the following settings:
    * Make sure the **Always use Transport Layer Security (TLS) to secure the connection (recommended)** checkbox is selected.
    * In **Connect only if the recipients email server certificate matches this criteria** select **Issued by a trusted certificate authority (CA)**.

    Select **Next**.

10. Review your new connector configuration and select **Next**.

11. To validate the new connector, select the `+` button and enter `address@journaling.mxrecord.io`. Select **Validade**.

12. After the validation completes, you should see a **Succeeded** message on all taks. Select **Save** to save your new connector.

Your new connector is now active and showing in **Exchange admin center** > **mail flow**.

## 2. Configure journal rule

1. From the Exchange admin center, select **compliance management** > **journal rules**.

2. You need to configure an **undeliverable journal reports** address to be able to continue. If you do not have one, select **Select address**. Specify a mailbox that will receive any delivery bounces.

3. Select the `+` button to configure a journaling rule as follows:
    * **Send journal reports to**: This address is provided by Area 1.
    * **Name**: `Journal Messages to Area 1`.
    * **If the message is sent to or received from**: Select _Apply to all messages_ from the dropdown. If you want to apply this rule only to some messages, select _A specific user or group_ and choose from the list of users or groups.
    * **Journal the following messages**: Select _External messages only_ from the dropdown.

4. Select **Save** to save the journaling and acknowledge the warning indicating that the rule will only apply to future messages. 

Your journal rule is now configured and active. It may take a few minutes for the configuration to propagate and start to push messages to Area 1. After it propagates, access the Area 1 portal. The number of messages processed will grow as journaled messages are sent to Area 1.

## Create a distribution group in Office 365

1. Go to the Microsoft 365 admin center.

2. Navigate to **Home** > **Users** > **Active Groups**.

3. Select **Add a group**. 

4. In **Choose a group type**, select **Distribution**.

5. Select **Next**.

6. Enter a name for your group.

7. Select **Next** > **Create Group**.

8. In the Microsoft 365 admin center main page, go to **Groups** > **Active groups**, and find the group you have just created.

9. Select it to add the users you want to have in that distribution group.