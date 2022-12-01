---
title: Free
pcx_content_type: get-started
weight: 1
meta:
  title: Get started with Bot Fight Mode
---

# Get started with Bot Fight Mode

Bot Fight Mode is a simple, free product that helps detect and mitigate bot traffic on your domain. When enabled, the product:

- Identifies traffic matching patterns of known bots
- Issues computationally expensive challenges in response to these bots
- Notifies [Bandwidth Alliance](https://cloudflare.com/bandwidth-alliance/) partners (if applicable) to disable bots

## Enable Bot Fight Mode

To start using Bot Fight Mode:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **Bots**.
3. For **Bot Fight Mode**, select **On**.

## Disable Bot Fight Mode

If you find that **Bot Fight Mode** is causing problems with your application traffic, you may want to disable it.

To disable Bot Fight Mode:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **Bots**.
3. For **Bot Fight Mode**, select **Off**.

## Visibility

You can see bot-related actions by going to **Security** > **Events**. Any requests challenged by this product will be labeled **Bot Fight Mode** in the **Service** field. This allows you to observe, analyze, and follow trends in your bot traffic over time.
