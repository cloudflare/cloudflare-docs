---
title: TLS Management
pcx-content-type: reference
weight: 4
meta:
  title: TLS Management — Cloudflare for SaaS
---

# TLS Management — Cloudflare for SaaS

[Mutual TLS (mTLS)](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) adds an extra layer of protection to application connections by validating certificates on the server and the client. When building a SaaS application, you may want to enforce mTLS to protect sensitive endpoints related to payment processing, database updates, and more.

[Minimum TLS Version](/ssl/edge-certificates/additional-options/minimum-tls/) allows you to choose a cryptographic standard per custom hostname. Cloudflare recommends TLS 1.2 to comply with the Payment Card Industry (PCI) Security Standards Council. 

## Enable mTLS

Once you have [added a custom hostname](/cloudflare-for-saas/getting-started/), you can enable mTLS by using Cloudflare Access. Go to the Cloudflare Zero Trust dashboard and [add mTLS authentication](/cloudflare-one/identity/devices/mutual-tls-authentication/) with a few clicks.

{{<Aside type="note">}}

Currently, you cannot add mTLS policies for custom hostnames using [API Shield](/api-shield/security/mtls/).

{{</Aside>}}

## Enable Minimum TLS Version

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and navigate to your account and website.

2. Select **SSL/TLS** > **Custom Hostnames**.

3. Find the hostname to which you want to apply Minimum TLS Version. Select **Edit**.

4. Choose the desired TLS version under **Minimum TLS Version** and click **Save**.

{{<Aside type="note">}}
While TLS 1.3 is the most recent and secure version, it is not supported by some older devices. Refer to Cloudflare's recommendations when [deciding what version to use](/ssl/edge-certificates/additional-options/minimum-tls/#decide-what-version-to-use).
{{</Aside>}}