---
title: O365 User Managed quarantine and Administrative quarantine
pcx_content_type: tutorial
weight: 3
meta:
    title: Use Case 4 - Deliver Spam and Spoof messages to the User Managed quarantine, and Malicious messages to the Administrative quarantine (requires administrator release)
---

# Use case 4: Deliver emails to the User Managed quarantine and Administrative quarantine

In this tutorial you will learn to deliver `Spam` and `Spoof` messages to the User Managed quarantine, and `Malicious` messages to the Administrative Quarantine (requires administrator release).

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