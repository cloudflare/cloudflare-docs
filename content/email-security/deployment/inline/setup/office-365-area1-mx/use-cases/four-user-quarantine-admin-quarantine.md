---
title: 4 - User managed quarantine and administrative quarantine
pcx_content_type: tutorial
weight: 4
meta:
    title: User managed quarantine and administrative quarantine - Office 365
---

# Deliver emails to the user managed quarantine and administrative quarantine

In this tutorial, you will learn to deliver `Spam` and `Spoof` messages to the user managed quarantine, and `Malicious` messages to the administrative quarantine (this requires an administrator to release the emails).

## Configure domains

{{<render file="_o365-use-case-configure-domain.md" withParameters="Do not check any dispositions.">}}

## Create quarantine policies

{{<render file="_o365-use-case-2-4-create-quarantine-policy.md">}}

## Configure quarantine notifications

{{<render file="_o365-use-case-configure-quarantine-notifications.md">}}

## Configure anti-spam policies

To configure anti-spam policies:

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
    - **Spam**: _Quarantine message_.
        - **Select quarantine policy**: _UserNotifyUserRelease_.
    - **High confidence spam**: _Quarantine message_.
        - **Select quarantine policy**: _UserNotifyAdminRelease_.
    - **Phishing**: _Quarantine message_.
        - **Select quarantine policy**: _UserNotifyAdminRelease_.
    - **High confidence phishing**: _Quarantine message_.
        - **Select quarantine policy**: _UserNotifyAdminRelease_.
    - **Retain spam in quarantine for this many days**: Default is 15 days. Cloudflare Area 1 recommends 15-30 days.

    <div class="large-img">

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step7-quarantine-message-case4.png)

    </div>

8. Select **Save**.

## Create transport rules

To create the transport rules that will send emails with certain dispositions to Area 1:

1. Open the new [Exchange admin center](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** > **Rules**.
3. Select **Add a Rule** > **Create a new rule**.
4. Set the following rule conditions:
    - **Name**: `Area 1 User Quarantine Message`.
    - **Apply this rule if**: _The message headers_ > _includes any of these words_.
        - **Enter text**: `X-Area1Security-Disposition` > **Save**.
        - **Enter words**: `SPAM`, `SPOOF` > **Add** > **Save**.
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - _Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_.

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step4-rules-case4.png)

5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** > **Done**.
8. Select the rule **Area 1 User Quarantine Message** you have just created, and select **Enable**.
9. Select **Add a Rule** > **Create a new rule**.
10. Set the following rule conditions:
    - **Name**: `Area 1 User Quarantine Message Admin Release`.
    - **Apply this rule if**: _The message headers_ > _includes any of these words_.
        - **Enter text**: `X-Area1Security-Disposition` > **Save**.
        - **Enter words**: `MALICIOUS` > **Add** > **Save**.
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - _Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _9_.

    ![Select the rules in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step10-admin-release-case4.png)

11. Select **Next**.
12. You can use the default values on this screen. Select **Next**.
13. Review your settings and select **Finish** > **Done**.
14. Select the rule **Area 1 User Quarantine Message Admin Release** you have just created, and select **Enable**.