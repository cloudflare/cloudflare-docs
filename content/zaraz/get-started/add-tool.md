---
pcx_content_type: how-to
title: Add a third-party tool
weight: 1
---

# Add a third-party tool

You can add new third-party tools and load them into your website through the Cloudflare dashboard. If the tool you are adding needs to start actions different from the default `Pageview` trigger, it is recommended that you [create the triggers](/zaraz/get-started/create-trigger/) you need first.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Select **Zaraz** > **Tools Configuration** > **Third-party tools**.
3. Select **Add new tool** and choose a tool from the tools library page. Select **Continue** to confirm your selection.
4. In **Set up**, configure the settings for your new tool. The information you need to enter will depend on the tool you choose. This is also where you use [variables you have previously set up](/zaraz/get-started/create-variables/). Select the `+` sign in the drop-down menu, and scroll to **Variables**.
5. Select **Save**.

While your tool is now configured, it needs to have actions defined before it can work. Depending on the tool you chose, Cloudflare Zaraz might automatically create a `Pageview` action. Refer to [Create actions](/zaraz/get-started/create-actions/) to learn how to create additional actions.