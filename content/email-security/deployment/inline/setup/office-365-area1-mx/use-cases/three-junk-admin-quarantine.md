---
title: 3 - Junk email and administrative quarantine
pcx_content_type: tutorial
weight: 3
meta:
    title: Junk email and administrative quarantine - Office 365
---

# Deliver emails to the junk email folder and administrative quarantine

In this tutorial, you will learn how to deliver `Suspicious` and `Bulk` messages to the users’s junk email folder, and `Malicious`, `Spam` and `Spoof` messages to the administrative quarantine (this requires an administrator to release the emails).

## Configure domains

{{<render file="_o365-use-case-configure-domain.md" withParameters="Do not check any dispositions.">}}

## Create quarantine policies

{{<render file="_o365-use-case-1-3-create-quarantine-policy.md">}}

## Configure quarantine notifications

{{<render file="_o365-use-case-configure-quarantine-notifications.md">}}

## Configure anti-spam policies

{{<render file="_o365-use-cases-antispam.md" withParameters="_UserNotifyAdminRelease_;;_UserNotifyAdminRelease_;;_UserNotifyAdminRelease_;;step7-spam.png">}}

## Create transport rules

To create the transport rules that will send emails with certain dispositions to Area 1:

1. Open the new [Exchange admin center](https://admin.exchange.microsoft.com/#/homepage).
2. Go to **Mail flow** > **Rules**.
3. Select **Add a Rule** > **Create a new rule**.
4. Set the following rule conditions:
    - **Name**: `Area 1 Deliver to Junk Email folder`.
    - **Apply this rule if**: _The message headers_ > _includes any of these words_.
        - **Enter text**: `X-Area1Security-Disposition` > **Save**.
        - **Enter words**: `SUSPICIOUS`, `BULK` > **Add** > **Save**.
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - _Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_.

    ![Select the rules in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step4-rules.png)

5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** > **Done**.
8. Select the rule **Area 1 Deliver to Junk Email folder** you have just created, and **Enable**.
9. Select **Add a Rule** > **Create a new rule**.
10. Set the following rule conditions:
    - **Name**: `Area 1 User Quarantine Message`.
    - **Apply this rule if**: _The message headers_ > _includes any of these words_.
        - **Enter text**: `X-Area1Security-Disposition` > **Save**.
        - **Enter words**: `MALICIOUS`, `SPAM`, `SPOOF` > **Add** > **Save**.
    - **Apply this rule if**:Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following** - _Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _9_.

    ![Select the rules in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step10-user-quarantine.png)

11. Select **Next**.
12. You can use the default values on this screen. Select **Next**.
13. Review your settings and select **Finish** > **Done**.
14. Select the rule **Area 1 User Quarantine Message** you have just created, and select **Enable**.