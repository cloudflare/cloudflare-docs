---
title: Exchange BCC setup
pcx_content_type: tutorial
weight: 2
meta:
    title: Setup phishing risk assessment for Microsoft Exchange with Area 1
---

# Microsoft Exchange BCC setup with Area 1

For customers using Microsoft Exchange, setting up a phishing risk assessment with Area 1 via a BCC setup is quick and easy. You need to configure an inbound rule to send emails to Area 1 via BCC for processing and detection of potential phishing attacks. The following email flow shows how this works:

![Email flow when setting up a phishing assessment risk for Microsoft Exchange with Area 1.](/email-security/static/bcc-setup/exchange/exchange-bcc-flow.png)

## Configure Inbound Rule

1. Access Exchange's **Management Console**, and go to **Organization Configuration** > **Hub Transport**.

    ![Access Hub transport](/email-security/static/bcc-setup/exchange/step1.png)

2. On the **Actions** pane, select **New Transport Rule**.

3. Give the transport rule a name and a description and select **Next**.

    ![Give transport rule a name and description](/email-security/static/bcc-setup/exchange/step3.png)

4. In the **Condition** configuration panel, select the option **from users that are inside or outside the organization** option. In the dropdown that opens, select **Outside the organization**.

    ![Select scope of transport rule](/email-security/static/bcc-setup/exchange/step4.png)

5. Still in the same **Condition** configuration panel, add a second condition to the transport rule. Select **sent to users that are inside or outside the organization, or partners**. Keep the default value of **Inside the organization**.

    ![Select where to send emails](/email-security/static/bcc-setup/exchange/step5.png)

6. Select **Next**.

7. In the **Action** configuration panel, select **Blind carbon copy (Bcc) the message to addresses**. Edit the **addresses** variable to add the addresses you want to copy as BCC.

    ![Select BCC and edit email addresses](/email-security/static/bcc-setup/exchange/step7.png)

8. In **Specify Recipient**, select the **down arrow** next to the **Add** button > **External E-Mail Address**.

    ![Select external e-mail address](/email-security/static/bcc-setup/exchange/step8.png)

9. Enter the BCC address provided by Area 1. This address is specific to your account.

    ![Enter the BCC address provided by Area 1](/email-security/static/bcc-setup/exchange/step9.png)

10. Select **OK** > **OK** to return to the main configuration page of the transport rule.

11. At the main configuration page of the transport rule, select **Next** to continue to the Exception configuration panel.

12. You do not need to configure an exception rule. Select **Next**.

    ![You do not need to configure an exception rule](/email-security/static/bcc-setup/exchange/step12.png)

13. In **Create Rule**, select the **New** button.

    ![Select the new button](/email-security/static/bcc-setup/exchange/step13.png)

14. Select **Finish** to close the transport rule configuration panel. This will return you to the Exchange Management Console.

    ![Select finish](/email-security/static/bcc-setup/exchange/step14.png)

{{<Aside type="note">}}
If you have multiple rules, you may need to change the order of the BCC rule and move it to the right location in your rule sequence. This is needed so you can send BCC messages to Area 1. Usually, the Area 1 BCC rule will be at the top of the ruleset. The configured conditions of the Area 1 BCC rule will only trigger for inbound messages.
{{</Aside>}}

## Email processing and reports

In BCC mode, all emails are put through automated phishing detections by Area 1. Emails that trigger phishing detections are logged for reporting via product portal, email and Slack. Emails that do not trigger any detections are deleted.