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

    ![Go to Actions and find Edit actions](/email-security/static/deployment/inline-setup/o365-area1-mx/use-cases/step6-edit-actions.png)

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

    ![Select the spam actions in the above step](/email-security/static/deployment/inline-setup/o365-area1-mx/use-cases/step7-quarantine-message-case4.png)

    </div>

8. Select **Save**.

## Create transport rules

{{<render file="_o365-use-case-transport-rules.md" withParameters="`Area 1 User Quarantine Message`;;`SPAM`, `SPOOF`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _5_;;step4-rules-case4.png;;`Area 1 User Quarantine Message Admin Release`;;`MALICIOUS`;;_Modify the message properties_ > _Set the Spam Confidence Level (SCL)_ > _9_;;step10-admin-release-case4.png">}}