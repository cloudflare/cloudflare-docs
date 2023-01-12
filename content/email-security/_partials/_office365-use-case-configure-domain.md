---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: quarantinePolicy
---

You first need to configure the domains you are onboarding on the Area 1 dashboard. To configure your domains:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email configuration** > **Domains & Routing** > **Domains**.
4. Make sure each domain you are onboarding has been added.
5. For each domain you are configuring, select **...** > **Edit**, and set the following options:
    - **Domain** - `<YOUR_DOMAIN>`.
    - **Configured as** - `MX Records`.
    - **Forwarding to** - This should match the expected MX record for each domain in your [Office 365 account](https://admin.microsoft.com/#/Domains/).
    - **IP Restrictions** - Leave this field empty.
    - **Outbound TLS** - `Forward all messages over TLS`.
    - **Quarantine Policy** - $1