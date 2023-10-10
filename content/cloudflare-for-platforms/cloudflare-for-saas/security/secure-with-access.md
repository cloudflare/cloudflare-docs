---
title: Secure with Cloudflare Access
pcx_content_type: how-to
weight: 4
meta:
  title: Secure with Cloudflare Access | Cloudflare for SaaS
---

# Secure custom hostnames with Cloudflare Access

Cloudflare Access provides visibility and control over who has access to your [custom hostnames](/cloudflare-for-platforms/cloudflare-for-saas/domain-support/). You can allow or block users based on identity, device posture, and other [Access rules](/cloudflare-one/policies/access/).

## Prerequisites

- A custom hostname in a Standard, Apex Proxy or BYOIP configuration. For setup instructions, refer to [Configuring Cloudflare for SaaS](/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/).
- A Cloudflare Zero Trust plan in the same Cloudflare account as your custom hostname. Learn more about [getting started with Zero Trust](/cloudflare-one/setup/).

## Setup

1. In [Zero Trust](https://one.dash.cloudflare.com/), create an Access [self-hosted application](/cloudflare-one/applications/configure-apps/self-hosted-apps/). Access applications can only be configured for custom hostnames owned within the same account. Access applications cannot be configured in the SaaS provider's account at this time.
2. In the **Domain** field, enter the custom hostname (for example, `mycustomhostname.com`). The custom hostname will not appear in the dropdown and must be manually entered.
3. Follow the remaining self-hosted application creation steps to publish the application.
