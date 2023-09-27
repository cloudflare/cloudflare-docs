---
title: Get started
pcx_content_type: get-started
weight: 2
---

# Get started with Health Checks

This guide will get you started with creating and managing configured Health Checks.

## Create a Health Check

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Traffic** > **Health Checks**.
3. Select **Create** and fill out the form, paying special attention to: 
    * The values for **Interval** and **Check regions**, because decreasing the **Interval** and increasing **Check regions** may increase the load on your origin server.
    * **Health change thresholds**, which specify the number of consecutive passed or failed checks before an origin changes status.
4. Select **Save and Deploy**.

## Manage Health Checks

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Traffic** > **Health Checks**.
3. Navigate to your health check and select **Edit**.
4. Edit your Health Check.
5. Select **Save**.

{{<Aside type="note">}}

You can also enable, disable, or delete configured Health Checks.

{{</Aside>}}

{{<Aside type="note">}}

Authenticated origin pull is not supported by Standalone Health Checks.

{{</Aside>}}