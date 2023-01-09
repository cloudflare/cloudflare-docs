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
