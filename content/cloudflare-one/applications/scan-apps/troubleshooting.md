---
pcx_content_type: troubleshooting
title: Troubleshooting CASB integrations
weight: 3
layout: single
---

# Troubleshooting CASB integrations

Cloudflare CASB detects when integrations are broken. This may be in the form of broken permissions or updates.

Broken or outdate integrations appear in **CASB** > **Integrations** or **CASB** > **Findings** highlighted in red and with a status of Broken.

## Repair an unhealthy integration

{{<tabs labels="Integrations | Findings">}}
{{<tab label="integrations" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Integrations**.
2. Choose your integration with the Broken status.
3. Select **Reauthorize**.
4. You will be directed to your SaaS app for authentication.

{{</tab>}}

{{<tab label="findings" no-code="true">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Findings**.
2. Choose the finding highlighted in red. It will redirect you to the broken integration.
3. Select **Reauthorize**.
4. You will be directed to your SaaS app for authentication.

{{</tab>}}
{{</tabs>}}

## Upgrade an integration

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **CASB** > **Integrations**.
2. Choose your integration with the Broken status.
3. Select **Upgrade integration**.
4. You will be directed to your SaaS app for authentication.
