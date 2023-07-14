---
title: 1 - Junk email and Area 1 Admin Quarantine
pcx_content_type: tutorial
weight: 1
meta:
    title: Junk email and Area 1 Admin Quarantine - Office 365
updated: 2023-01-12
---

# Deliver emails to the junk email folder in Office 365 and Admin Quarantine in Area 1

In this tutorial, you will learn how to deliver emails to the Office 365 junk email folder and the Admin Quarantine in Area 1.

## Configure domains

{{<render file="_o365-use-case-configure-domain.md" withParameters="Check the `MALICIOUS`, `SPAM`, and `SPOOF` dispositions.">}}

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

    ![Set the rules in the above step](/email-security/static/flexible-partial-images/o365-area1-mx/step4-rules.png)

5. Select **Next**.
6. You can use the default values on this screen. Select **Next**.
7. Review your settings and select **Finish** > **Done**.
8. Select the rule `Area 1 Deliver to Junk Email folder` you have just created, and select **Enable**.