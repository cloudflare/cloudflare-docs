---
title: Require WARP
pcx_content_type: how-to
weight: 10
meta:
  title: Require WARP
---

# Require WARP

{{<Aside type="note">}}

This device posture attribute will check for all versions of WARP, including the consumer version.

{{</Aside>}}

Cloudflare Zero Trust enables you to restrict access to your applications to devices running the Cloudflare WARP client. This allows you to flexibly ensure that a user's traffic is secure and encrypted before allowing access to a resource protected behind Cloudflare Zero Trust.

## Prerequisites

- {{<render file="posture/_prereqs-warp-is-deployed.md" withParameters="[WARP client checks](/cloudflare-one/identity/devices/warp-client-checks/)">}}

## 1. Enable the WARP check

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. Ensure that **Proxy** is enabled.
3. Next, go to **Settings** > **WARP Client**.
4. Scroll down to **WARP client checks** and select **Add new**.
5. Select **WARP**.

You are now ready to start requiring WARP for your Access applications.

## 2. Add the check to an Access policy

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Access** > **Applications**.

2. Locate the application for which you want to require WARP.

3. Select **Edit**.

4. To have an existing policy require WARP, select **Edit** for that specific policy. Then, add an **Include** or **Require** rule which uses the _WARP_ selector.

5. Select **Save rule**.

Before granting access to the application, your policy will now check that the device is running the WARP client.
