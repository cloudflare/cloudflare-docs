---
_build:
  publishResources: false
  render: never
  list: never
---

### 1. Configure connector for delivery to Area 1 (if required)

If your email architecture does not include an outbound gateway, you can skip this step and [proceed to the next one](#2-configure-journal-rule).

On the other hand, if your email architecture requires outbound messages to traverse your email gateway, you may want to consider configuring a connector to send the journal messages directly to Area 1.

1. Log in to the [Exchange admin center](https://admin.exchange.microsoft.com), and go to **Mail flow** > **Connectors**.

    ![Go to the connectors area](/email-security/static/bcc-setup/journaling/step1-connector.png)

2. Select **Add a connector**. 

3. Configure the new connector as follows:
    * **Connection From**: Office 365
    * **Connection to**: Partner Organization

    ![Configure the connector](/email-security/static/bcc-setup/journaling/step3-configure-connector.png)

4. Select **Next**.

5. Configure the connector as follows:
    * **Name**: `Deliver journal directly to Area 1`
    * **Description**: `Deliver journal directly to Area 1`
    * **Turn it on**: Enabled.

    ![Name the connector and give it a description](/email-security/static/bcc-setup/journaling/step5-name-connector.png)

6. Select **Next**.

7. Configure the **Use of connector** setting as follows:
    * Select **Only when email messages are sent to these domains**.
    * In the text field, enter `journaling.mxrecord.io`, and select **+** to add the domain.

    ![Configure use of connector](/email-security/static/bcc-setup/journaling/step7-use-of-connector.png)

8. Select **Next**.

9. Configure the **Routing** setting as follows:
    * Select **Route email through these smart hosts**.
    * In the text field, enter the following smarthosts. Select the **+** button after each host to add it to the configuration:
        * `mailstream-east.mxrecord.io`
        * `mailstream-west.mxrecord.io`
    * If there is a requirement to enforce traffic through the EU region, use the following smarthost instead:
        * `mailstream-eu1.mxrecord.io`

    ![Configure the routing setting](/email-security/static/bcc-setup/journaling/step9-routing.png)

10. Select **Next**.

11. In **Security restrictions**, you need to preserve the default TLS configuration. Review the following settings:
    * Make sure the **Always use Transport Layer Security (TLS) to secure the connection (recommended)** checkbox is selected.
    * In **Connect only if the recipients email server certificate matches this criteria** select **Issued by a trusted certificate authority (CA)**.

    ![Configure security restrictions](/email-security/static/bcc-setup/journaling/step11-security.png)

12. Select **Next**.

13. You need to validate the connector by using your tenant’s specific journaling address. To find this address, go to the [Area 1 dashboard](https://horizon.area1security.com/support/service-addresses) > **Support** > **Service Addresses page**. 

    ![Validade the connector](/email-security/static/bcc-setup/journaling/step13-validate-email.png)

14. Add the address and select **Validate**.

15. Once the validation completes, you should receive a **Succeeded** status for all the tasks. Select **Next**.

    ![Validation success if all goes well](/email-security/static/bcc-setup/journaling/step15-validation-success.png)

16. Review the configuration and select **Create connector**.

    ![Review your connector](/email-security/static/bcc-setup/journaling/step16-review-connector.png)

Your connector is now active. You can find it in **Exchange admin center** > **Mail flow** > **Connectors**.

![Connector active](/email-security/static/bcc-setup/journaling/connector-active.png)

### 2. Configure journal rule

1. Log in to the [Microsoft Purview compliance portal](https://compliance.microsoft.com/homepage).

2. Navigate to **Purview compliance portal** > **Data lifecycle management** > **Exchange (legacy)**.

3. Select **Settings** (the gear icon).

4. In **Send undeliverable journal reports to** enter the email address of a valid user account. Note that you cannot use a team or group address.

    ![Configure undeliverable emails](/email-security/static/bcc-setup/journaling/step4-undeliverable.png)

5. Select **Save**. 

6. Still in the Exchange (legacy) screen, select **Journal Rules**.

    ![Select journal rules](/email-security/static/bcc-setup/journaling/step6-journal-rules.png)


7. Select **New rule** to configure a journaling rule, and configure it as follows:

    * **Send journal reports to**: This address is specific to each customer tenant, and can be found in your [Area 1 dashboard](https://horizon.area1security.com/support/service-addresses). If you are located in the EU or GDPR applies to your organization, ensure you are using a connector with the smarthost set to `mailstream-eu1.mxrecord.io`. Refer to step 9 of [Configure connector for delivery to Area 1](#1-configure-connector-for-delivery-to-area-1-if-required) for more information.
    * **Journal Rule Name**: `Journal Messages to CloudflareArea 1`
    * **Journal messages sent or received from**: Everyone
        * If you wish to restrict this rule to specific users or groups select **A specific user or group**, and select the list of users/groups from the window that opens. Refer to [Create a distribution group](https://learn.microsoft.com/en-us/microsoft-365/admin/setup/create-distribution-lists?view=o365-worldwide#create-a-distribution-group-list) to learn how to create groups.
    * **Type of message to journal**: External messages only

    ![Configure the journal rule](/email-security/static/bcc-setup/journaling/step7-define-journal-rules.png)

8. Select **Next**.

9. Verify the information is correct, and select **Submit** > **Done**. 

    ![Verify the journal rule information](/email-security/static/bcc-setup/journaling/step9-verify-journal-rules.png)

Once saved, the rule is automatically active. However, it may take a few minutes for the configuration to propagate and start pushing messages to Cloudflare Area 1. After it propagates, you can access the Cloudflare Area 1 dashboard to check the number of messages processed. This number will grow as journaled messages are sent to Cloudflare Area 1 from your Exchange server.