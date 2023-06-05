---
title: Access for SaaS
pcx_content_type: how-to
weight: 4
---

# Secure custom hostnames with Cloudflare Access

Cloudflare Access provides visibility and control over who has access to your [custom hostnames](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/). You can allow or block users based on identity, device posture, and other [Access rules](/cloudflare-one/policies/access/).

## Prerequisites

- A custom hostname in a Standard, Apex Proxy or BYOIP configuration. For setup instructions, refer to [Configuring Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).
- A Cloudflare Zero Trust plan in the same Cloudflare account as your custom hostname. Learn more about [getting started with Zero Trust](/cloudflare-one/setup/).

## Setup

1. Create an Access [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/).
2. In the **Domain** field, enter the custom hostname (for example, `mycustomhostname.com`). The custom hostname will not appear in the dropdown and must be manually entered.
3. Follow the remaining self-hosted application creation steps to publish the application.
