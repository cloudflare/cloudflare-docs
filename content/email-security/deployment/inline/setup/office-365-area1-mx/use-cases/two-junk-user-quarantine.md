---
title: 2 - Junk email and user managed quarantine
pcx_content_type: tutorial
weight: 2
meta:
    title: Use case 2 - Deliver Suspicious and Bulk messages to the user’s junk folder, and Spam and Spoof messages to user managed quarantine
---

# Use case 2: Deliver emails to junk email folder and user managed quarantine

In this tutorial, you will learn how to deliver `Suspicious` and `Bulk` messages to the user’s junk folder, and `Spam` and `Spoof` messages to the user managed quarantine.

## Configure domains

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Navigate to **Email configuration** > **Domains & Routing** > **Domains**.
4. Make sure each domain you are onboarding has been added.
5. For each domain you are configuring select **...** > **Edit**, and set the following options:
    - **Domain** - `<YOUR_DOMAIN>`
    - **Configured as** - `MX Records`
    - **Forwarding to** - This should match the expected MX for each domain in your [O365 account](https://admin.microsoft.com/#/Domains/)
    - **IP Restrictions** - Leave this field empty
    - **Outbound TLS** - `Forward all messages over TLS`
    - **Quarantine Policy** - Only `Malicious` should be checked

## Create quarantine policies

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Rules**, select **Quarantine policies**.
5. Select **Add custom policy**.
6. Set the **Policy name** to `UserNotifyUserRelease`.
7. Select **Next**.
8. In **Recipient message access**, select **Set specific access (Advanced)**, and then:
    - In **Select release action preference**: Choose _Allow recipients to release a message from quarantine_
    - In **Select additional actions recipients can take on quarantined messages**: Select the **Delete** and **Preview** checkboxes

    ![Configure the Recipient message access as stated in step 8 above](/email-security/static/inline-setup/o365-area1-mx/use-cases/step8-allow-message-release.png)

9. Select **Next**.
10. In **Quarantine notification**, select **Enable**.
11. Select **Next**.
12. Review your settings and select **Submit**.
13. Select **Done**.
14. Select **Add custom policy**.
15. Set the **Policy name** to `UserNotifyAdminRelease`.
16. Select **Next**.
17. In **Recipient message access**, select **Set specific access (Advanced)**, and then:
    - In **Select release action preference**: From the drop-down menu, choose _Allow recipients to request a message to be released from quarantine_.
    - In **Select additional actions recipients can take on quarantined messages**: Select the **Delete** and **Preview** checkboxes.

    ![Configure the Recipient message access as stated in the step above](/email-security/static/inline-setup/o365-area1-mx/use-cases/step8-request-message-release.png)

18. Select **Next**.
19. In **Quarantine notification**, select **Enable**.
20. Select **Next**.
21. Review your settings and select **Submit**.
22. Select **Done**.

{{<render file="_configure-quarantine-notifications.md">}}

## Configure anti-spam policies

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Policies**, select **Anti-spam**.
5. Select the **Anti-spam inbound policy (Default)** text (not the checkbox).
6. In the **Actions** section, scroll down and select **Edit actions**.

    <div class="large-img">

    ![Go to Actions and find Edit actions](/email-security/static/inline-setup/o365-area1-mx/use-cases/step6-edit-actions.png)

    </div>

7. Set the following conditions and actions (you might need to scroll up or down to find them):
    - **Spam**: _Move messages to Junk Email folder_
    - **High confidence spam**: _Quarantine message_
        - **Select quarantine policy**: _ UserNotifyUserRelease_
     - **Phishing**: _Quarantine message_
        - **Select quarantine policy**: _UserNotifyAdminRelease_
    - **High confidence phishing**: _Quarantine message_
        - **Select quarantine policy**: _UserNotifyAdminRelease_
    - **Retain spam in quarantine for this many days**: Default is 15 days. Cloudflare Area 1 recommends 15-30 days.

    <div class="large-img">

    ![Set spam conditions](/email-security/static/inline-setup/o365-area1-mx/use-cases/case2-step7-spam.png)

    </div>

8. Select **Save**.

## Create transport rules

1. Open the new [Exchange admin center](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** > **Rules**.
3. Select **Add a Rule** > **Create a new rule**.
4. Set the following rule conditions:
    - **Name**: `Area 1 Deliver to Junk Email folder`
    - **Apply this rule if**: _The message headers_ > _includes any of these words_
        - **Enter text**: `X-Area1Security-Disposition` > **Save**
        - **Enter words**: `SUSPICIOUS`, `BULK` > **Add** > **Save**
    - Under **Apply this rule if**, select **+** to add a second condition.
    - Under **And** select _The sender_ > _IP address is in any of these ranges or exactly matches_. Then, enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - _Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_

    ![Set the rules in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step4-rules.png)

5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** > **Done**.
8. Select the rule **Area 1 Deliver to Junk Email folder** you have just created, and **Enable**.
9. Select **Add a Rule** > **Create a new rule**.
10. Set the following rule conditions:
    - **Name**: `Area 1 User Quarantine Message`
    - **Apply this rule if**: _The message headers_ > _includes any of these words_
        - **Enter text**: `X-Area1Security-Disposition` > **Save**
        - **Enter words**: `SPAM, SPOOF` > **Add** > **Save**
    - Under **Apply this rule if**, select **+** to add a second condition.
    - Under **And** select _The sender_ > _IP address is in any of these ranges or exactly matches_. Then, enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - _Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _9_

    ![Set the rules in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step10-user-quarantine.png)

11. Select **Next**.
12. You can use the default values on this screen. Select **Next**.
13. Review your settings and select **Finish** > **Done**.
14. Select the rule **Area 1 User Quarantine Message** you have just created, and **Enable**.