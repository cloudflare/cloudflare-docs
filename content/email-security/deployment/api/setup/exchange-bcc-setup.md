---
title: Exchange BCC setup
pcx_content_type: integration-guide
weight: 2
meta:
    title: Setup phishing risk assessment for Microsoft Exchange with Cloud Email Security (formerly Area 1)
updated: 2022-10-11
---

# Microsoft Exchange BCC setup with Cloud Email Security (formerly Area 1)

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

For customers using Microsoft Exchange, setting up Cloud Email Security via BCC is quick and easy. You need to configure an inbound rule to send emails to Cloud Email Security via BCC for processing and detection of potential {{<glossary-tooltip term_id="phishing">}}phishing{{</glossary-tooltip>}} attacks. The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Microsoft Exchange with Cloud Email Security.](/images/email-security/deployment/api-setup/exchange/exchange-bcc-flow.png)

## Configure Inbound Rule

1. Access Exchange's **Management Console**, and go to **Organization Configuration** > **Hub Transport**.

    ![Access Hub transport](/images/email-security/deployment/api-setup/exchange/step1.png)

2. On the **Actions** pane, select **New Transport Rule**.

3. Give the transport rule a name and a description and select **Next**.

    ![Give transport rule a name and description](/images/email-security/deployment/api-setup/exchange/step3.png)

4. In the **Condition** configuration panel, select the option **from users that are inside or outside the organization** option. In the dropdown that opens, select **Outside the organization**.

    ![Select scope of transport rule](/images/email-security/deployment/api-setup/exchange/step4.png)

5. Still in the same **Condition** configuration panel, add a second condition to the transport rule. Select **sent to users that are inside or outside the organization, or partners**. Keep the default value of **Inside the organization**.

    ![Select where to send emails](/images/email-security/deployment/api-setup/exchange/step5.png)

6. Select **Next**.

7. In the **Action** configuration panel, select **Blind carbon copy (Bcc) the message to addresses**. Edit the **addresses** variable to add the addresses you want to copy as BCC.

    ![Select BCC and edit email addresses](/images/email-security/deployment/api-setup/exchange/step7.png)

8. In **Specify Recipient**, select the **down arrow** next to the **Add** button > **External E-Mail Address**.

    ![Select external e-mail address](/images/email-security/deployment/api-setup/exchange/step8.png)

9. Enter the BCC address provided by Area 1. This address is specific to your account.

    ![Enter the BCC address provided by Area 1](/images/email-security/deployment/api-setup/exchange/step9.png)

10. Select **OK** > **OK** to return to the main configuration page of the transport rule.

11. At the main configuration page of the transport rule, select **Next** to continue to the Exception configuration panel.

12. You do not need to configure an exception rule. Select **Next**.

    ![You do not need to configure an exception rule](/images/email-security/deployment/api-setup/exchange/step12.png)

13. In **Create Rule**, select the **New** button.

    ![Select the new button](/images/email-security/deployment/api-setup/exchange/step13.png)

14. Select **Finish** to close the transport rule configuration panel. This will return you to the Exchange Management Console.

    ![Select finish](/images/email-security/deployment/api-setup/exchange/step14.png)

{{<Aside type="note">}}
If you have multiple rules, you may need to change the order of the BCC rule and move it to the right location in your rule sequence. This is needed so you can send BCC messages to Cloud Email Security. Usually, the Cloud Email Security BCC rule will be at the top of the ruleset. The configured conditions of the Cloud Email Security BCC rule will only trigger for inbound messages.
{{</Aside>}}

## Email processing and reports

In BCC mode, all emails are put through automated phishing detections by Cloud Email Security. Emails that trigger phishing detections are logged for reporting via product portal, email and Slack. Emails that do not trigger any detections are deleted.