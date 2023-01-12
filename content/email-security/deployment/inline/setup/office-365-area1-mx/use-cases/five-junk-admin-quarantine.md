---
title: 5 - Junk email folder and administrative quarantine
pcx_content_type: tutorial
weight: 5
meta:
    title: Use case 5 - Deliver Suspicious and Bulk messages to the User’s junk email Folder, and Malicious, Spam, and Spoof messages to the administrative quarantine (requires administrator release)
---


# Use case 5: Deliver emails to the user's junk email folder and administrative quarantine

In this tutorial you will learn to deliver `Suspicious` and `Bulk` messages to the user’s junk email folder, and `Malicious`, `Spam`, and `Spoof` messages to the Administrative Quarantine (requires administrator release).

## Configure domains

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email configuration** > **Domains & Routing** > **Domains**.
4. Make sure each domain you are onboarding has been added.
5. For each domain you are configuring, select **...** > **Edit**, and set the following options:
    - **Domain** - `<YOUR_DOMAIN>`
    - **Configured as** - `MX Records`
    - **Forwarding to** - This should match the expected MX for each domain in your [Office 365 account](https://admin.microsoft.com/#/Domains/)
    - **IP Restrictions** - Leave this field empty
    - **Outbound TLS** - `Forward all messages over TLS`
    - **Quarantine Policy** - Do not check any dispositions

## Configure anti-spam policies

To configure anti-spam policies:
1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Policies**, select **Anti-spam**.
5. Select the **Anti-spam inbound policy (Default)** text (not the checkbox).
6. In **Actions**, scroll down and select **Edit actions**.

    <div class="large-img">

    ![Go to Actions and find Edit actions](/email-security/static/inline-setup/o365-area1-mx/use-cases/step6-edit-actions.png)

    </div>

7. Set the following conditions and actions (you might need to scroll up or down to find them):
    - **Spam**: _Move messages to Junk Email folder_
    - **High confidence spam**: _Quarantine message_
        - **Select quarantine policy**: _AdminOnlyAccessPolicy_
    - **Phishing**: _Quarantine message_
        - **Select quarantine policy**: _AdminOnlyAccessPolicy_
     - **High confidence phishing**: _Quarantine message_
        - **Select quarantine policy**: _AdminOnlyAccessPolicy_
    - **Retain spam in quarantine for this many days**: Default is 15 days. Cloudflare Area 1 recommends 15-30 days.

    <div class="large-img">

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step7-adminonly-case5.png)

    </div>

8. Select **Save**.

## Create transport rules

To create transport rules:
1. Open the new [Exchange admin center](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** > **Rules**.
3. Select **Add a Rule** > **Create a new rule**.
4. Set the following rule conditions:
    - **Name**: `Area 1 Deliver to Junk Email folder`
    - **Apply this rule if**: _The message headers_ > _includes any of these words_
        - **Enter text**: `X-Area1Security-Disposition` > **Save**
        - **Enter words**: `SUSPICIOUS`, `BULK` > **Add** > **Save**
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - _Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step4-rules.png)

5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** > **Done**.
8. Select the rule **Area 1 Deliver to Junk Email folder** you have just created, and **Enable**.
9. Select **Add a Rule** > **Create a new rule**.
10. Set the following rule conditions:
    - **Name**: `Area 1 Admin Managed Host Quarantine`
    - **Apply this rule if**: _The message headers_ > _includes any of these words_
        - **Enter text**: `X-Area1Security-Disposition` > **Save**
        - **Enter words**: `MALICIOUS`, `SPAM`, `SPOOF` > **Add** > **Save**
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following**: _Redirect the message to_ > _hosted quarantine_

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step10-hosted-quarantine-case5.png)

11. Select **Next**.
12. You can use the default values on this screen. Select **Next**.
13. Review your settings and select **Finish** > **Done**.
14. Select the rule **Area 1 Admin Managed Host Quarantine** you have just created, and select **Enable**.