---
pcx-content-type: how-to
title: Add a third-party tool
weight: 3
---

# Add a third-party tool

You can add new third-party tools and load them into your website through the Cloudflare dashboard. If the tool you are adding needs to start actions different from the default `Pageview` trigger, it is recommended that you [create the triggers](/zaraz/get-started/create-trigger/) you need first.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
2. Click **Zaraz**.
3. From **Third-party tools**, click **Add new tool**.
4. Choose a tool from the tools library page and click **Continue** to confirm your selection.
5. In **Set up**, configure the settings for your new tool. The information you need to enter will depend on the tool you choose.
6. Click **Save**.

While your tool is now configured, it needs to have actions defined before it can work. Depending on the tool you chose, Cloudflare Zaraz might automatically create a `Pageview` action. Refer to [Create actions](/zaraz/get-started/create-actions/) to learn how to create additional actions.

<div class="full-img">

![An example of what adding a tool looks like in Zaraz dahsboard](/zaraz/static/tool-settings.png)

</div>