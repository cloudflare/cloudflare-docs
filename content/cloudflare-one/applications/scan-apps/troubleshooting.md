---
pcx_content_type: troubleshooting
title: Troubleshoot integrations
weight: 3
---

# Troubleshoot CASB integrations

Cloudflare CASB detects when integrations are unhealthy or outdated.

Common integration issues include changes to SaaS app configurations, user access, or permission scope. Integrations may need to be updated to support new features or permissions.

## Identify unhealthy or outdated integrations

To identify unhealthy CASB integrations, go to **CASB** > **Integrations** or **CASB** > **Findings**. If an integration is unhealthy, CASB will highlight it in red and set its status to **Broken**. If an integration is outdated, CASB will highlight it in blue and set its status to **Upgrade**.

## Repair an unhealthy integration

You can repair unhealthy CASB integrations through your list of integrations or findings.

{{<tabs labels="Integrations | Findings">}}
{{<tab label="integrations" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Integrations**.
2. Choose your unhealthy integration.
3. Select **Reauthorize**.
4. In your SaaS app, reauthorize your account.

{{</tab>}}

{{<tab label="findings" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Findings**.
2. Choose the finding highlighted in red. CASB will redirect you to the unhealthy integration.
3. Select **Reauthorize**.
4. In your SaaS app, reauthorize your account.

{{</tab>}}
{{</tabs>}}

## Upgrade an integration

Upgrading an outdated integration will allow the integration to access new features and permissions.

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Integrations**.
2. Choose your outdated integration.
3. Select **Upgrade integration**.
4. In your SaaS app, upgrade your app and reauthorize your account.
