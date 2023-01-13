---
title: 5 - Junk email folder and administrative quarantine
pcx_content_type: tutorial
weight: 5
meta:
    title: Deliver emails to the junk email folder - Office 365
---

# Deliver emails to the junk email folder and administrative quarantine

In this tutorial, you will learn to deliver `Suspicious` and `Bulk` messages to the user’s junk email folder, and `Malicious`, `Spam`, and `Spoof` messages to the Administrative Quarantine (this requires an administrator to release the emails).

## Configure domains

{{<render file="_o365-use-case-configure-domain.md" withParameters="Do not check any dispositions.">}}

## Configure anti-spam policies

{{<render file="_o365-use-cases-antispam.md" withParameters="_AdminOnlyAccessPolicy_;;_AdminOnlyAccessPolicy_;;_AdminOnlyAccessPolicy_;;step7-adminonly-case5.png">}}

## Create transport rules

To create the transport rules that will send emails with certain dispositions to Area 1:

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
    - **Name**: `Area 1 Admin Managed Host Quarantine`.
    - **Apply this rule if**: _The message headers_ > _includes any of these words_.
        - **Enter text**: `X-Area1Security-Disposition` > **Save**.
        - **Enter words**: `MALICIOUS`, `SPAM`, `SPOOF` > **Add** > **Save**.
    - **Apply this rule if**: Select **+** to add a second condition.
    - **And**: _The sender_ > _IP address is in any of these ranges or exactly matches_ > enter the egress IPs in the [Egress IPs page](/email-security/deployment/inline/reference/egress-ips/).
    - **Do the following**: _Redirect the message to_ > _hosted quarantine_.

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step10-hosted-quarantine-case5.png)

11. Select **Next**.
12. You can use the default values on this screen. Select **Next**.
13. Review your settings and select **Finish** > **Done**.
14. Select the rule **Area 1 Admin Managed Host Quarantine** you have just created, and select **Enable**.