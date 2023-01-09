---
title: 5 - Junk Email folder and Administrative quarantine
pcx_content_type: tutorial
weight: 5
meta:
    title: Use case 5 - Deliver Suspicious and Bulk messages to the User’s Junk Email Folder, Deliver Malicious, Spam, and Spoof messages to the Administrative Quarantine (requires administrator release)
---


# Use case 5: Deliver emails to the user’s junk email folder, and the Administrative Quarantine (requires administrator release)

In this tutorial you will learn to deliver `Suspicious` and `Bulk` messages to the user’s junk email folder, and `Malicious`, `Spam`, and `Spoof` messages to the Administrative Quarantine (requires administrator release).

## Configure Domains

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
    - **Quarantine Policy** - Do not check any dispositions

## Configure anti-spam policies

1. Open the [Microsoft 365 Defender console](https://security.microsoft.com/)
2. Go to **Email & collaboration** > **Policies & rules**.
3. Select **Threat policies**.
4. Under **Policies**, select **Anti-spam**.
5. Select the **Anti-spam inbound policy (Default)** text (not the checkbox).
6. In the **Actions** section, scroll down and select **Edit actions**.

    <div class="medium-img">

    ![Go to Actions and find Edit actions](/email-security/static/inline-setup/o365-area1-mx/use-cases/step6-edit-actions.png)

    </div>

7. Set the following conditions and actions (you might need to scroll up or down to see them):
    - **Spam**: _Move messages to Junk Email folder_
    - **High confidence spam**: _Quarantine message_
        - **Select quarantine policy**: _AdminOnlyAccessPolicy_
    - **Phishing**: _Quarantine message_
        - **Select quarantine policy**: _AdminOnlyAccessPolicy_
     - **High confidence phishing**: _Quarantine message_
        - **Select quarantine policy**: _AdminOnlyAccessPolicy_
    - **Retain spam in quarantine for this many days**: Default is 15 days. Cloudflare Area 1 recommends 15-30 days.

    <div class="medium-img">

    ![Select the spam actions in the above step](/email-security/static/inline-setup/o365-area1-mx/use-cases/step7-adminonly-case5.png)

    </div>

8. Select **Save**.