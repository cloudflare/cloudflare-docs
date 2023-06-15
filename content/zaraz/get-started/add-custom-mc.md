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

{{<Aside type="note">}}
If you don’t have a Managed Component yet, you can get started using `npm init managed-component` in any repository, or by visiting [managedcomponents.dev](https://managedcomponents.dev).
{{</Aside>}}

## Prepare a Managed Component

- If you are using TypeScript, you need to have a compiled version of your Managed Component ready. Usually, this is done by running `npm run build`.
- For vanilla JavaScript, you can skip to the deployment.

## Deploy a Managed Component to Cloudflare

1. Open a terminal in your managed component’s root directory.
2. From there, run `npx managed-component-to-cloudflare-worker dist/index.js your-managed-component`, which will ask you a few questions and deploy the Managed Component to a specialised Cloudflare Worker. Change the path to your `index.js` and the name of the component to your liking.
3. Your Managed Component should now be visible on your account as a specialized Cloudflare Worker.

## Configure a Managed Component in Cloudflare

As with regular tools, it is recommended that you [create the triggers](/zaraz/get-started/create-trigger/) you need first, if the Custom Managed Component you are adding needs to start actions different from the default `Pageview` trigger.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Select **Zaraz** > **Tools Configuration** > **Third-party tools**.
3. Select **Add new tool** and choose **Custom MC** from the tools library page. Select **Continue** to confirm your selection.
4. In **Select Custom MC**, choose a Custom Managed Component that you have deployed to your account. Select **Continue**.
5. In **Permissions**, select the permissions you want to grant the Custom Managed Component. Select **Continue**.
6. In **Set up**, configure the settings for your new tool. The information you need to enter will depend on the tool you choose. This is also where you use [variables you have previously set up](/zaraz/get-started/create-variables/). Select the `+` sign in the drop-down menu and scroll to **Variables**.
7. Select **Save**.

While your tool is now configured, it needs to have actions defined before it can work. Depending on the tool you chose, Cloudflare Zaraz might automatically create a `Pageview` action. Refer to [Create actions](/zaraz/get-started/create-actions/) to learn how to create additional actions.

Custom Managed Components can be customized with all the settings you expect from the ones you can choose from in the dashboard.
