---
pcx-content-type: how-to
title: Add a third-party tool
weight: 3
---

# Add a third-party tool

You can add new third-party tools and load them into your website through the Cloudflare dashboard. If your tool needs more than a simple `Pageview` event to trigger it, [create the trigger](/zaraz/get-started/create-trigger/) you need first.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.

2.  Click **Zaraz**.

3.  From **Third-party tools**, click **Add new tool**.

4.  Choose a tool from the tools library page and click **Continue** to confirm your selection.

5.  In **Set up**, configure the settings for your new tool. The information you need to enter will depend on the tool you choose.

6.  (Optional) Click **Add field** to add extra fields to your tool. Refer to [Custom fields](/zaraz/get-started/custom-fields/) for more information.

7.  Click **Save**.

Your tool is now configured. Depending on the tool you chose, Cloudflare Zaraz might automatically create a `Pageview` event. Refer to [Send events to a third-party tool](/zaraz/get-started/send-events/) to learn more.

On this page you can configure the tool's **Settings**, add extra events by clicking **Create event**, and edit events by clicking on them.

<div class="full-img">

![An example of what adding a tool looks like in Zaraz dahsboard](/zaraz/static/tool-settings.png)

</div>
