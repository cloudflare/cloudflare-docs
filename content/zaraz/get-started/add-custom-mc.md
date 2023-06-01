---
pcx_content_type: how-to
title: Add a Custom Managed Component
weight: 1
---

# Add a Custom Managed Component

You can add Custom Managed Components that you have deployed to your account. If you are new to Managed Components, [get started with creating your own Managed Component](https://managedcomponents.dev/getting-started/quickstart) or [check out our demo Managed Component](https://github.com/managed-components/demo).

{{<Aside type="note">}}
Custom Managed Components are only available for accounts on a [Workers Paid plan](/workers/platform/pricing/).
{{</Aside>}}

As with regular tools, it is recommended that you [create the triggers](/zaraz/get-started/create-trigger/) you need first, if the Custom Managed Component you are adding needs to start actions different from the default `Pageview` trigger.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Select **Zaraz** > **Tools Configuration** > **Third-party tools**.
3. Select **Add new tool** and choose **Custom MC** from the tools library page. Select **Continue** to confirm your selection.
4. In **Select Custom MC**, choose a Custom Managed Component that you have deployed to your account. Select **Continue**.
5. In **Permissions**, select the permissions you want to grant the Custom Managed Component. Select **Continue**.
6. In **Set up**, configure the settings for your new tool. The information you need to enter will depend on the tool you choose. This is also where you use [variables you have previously set up](/zaraz/get-started/create-variables/). Select the `+` sign in the drop-down menu, and scroll to **Variables**.
7. Select **Save**.

While your tool is now configured, it needs to have actions defined before it can work. Depending on the tool you chose, Cloudflare Zaraz might automatically create a `Pageview` action. Refer to [Create actions](/zaraz/get-started/create-actions/) to learn how to create additional actions.
