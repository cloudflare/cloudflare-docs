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

In this guide, we will use a simple example of a Custom Managed Component that counts the users visits and logs it in the console:

```javascript
// File: index.js
export default async function (manager) {
  // Add a pageview event
  manager.addEventListener("pageview", event, () => {
    const { client } = event;

    // Get the variable "counter" from the client's cookies and increase by 1
    let counter = parseInt(client.get("counter")) || 0;
    counter += 1;

    // Log the increased number
    client.execute(`console.log('Views: ${counter}')`);

    // Store the increased number for the next visit
    client.set("counter", counter);
  });
}
```

## Prepare a Managed Component

- For vanilla JavaScript, such as in our example, you can skip to the deployment.
- If you are using TypeScript or another compiled version of JavaScript, you need to have the compiled version of your Managed Component ready. Usually, this is done by running `npm run build` or an equivalent.

## Deploy a Managed Component to Cloudflare

1. Open a terminal in your managed component’s root directory.
2. From there, run `npx managed-component-to-cloudflare-worker ./index.js my-new-counter-mc`, which will deploy the Managed Component to a specialised Cloudflare Worker. Change the path to your `index.js` and the name of the component to your liking.
3. Your Managed Component should now be [visible on your account](https://dash.cloudflare.com/redirect?account=/workers-and-pages) as a specialized Cloudflare Worker.

## Configure a Managed Component in Cloudflare

As with regular tools, it is recommended that you [create the triggers](/zaraz/get-started/create-trigger/) you need first, if the Custom Managed Component you are adding needs to start actions different from the default `Pageview` trigger.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Select **Zaraz** > **Tools Configuration** > [**Third-party tools**](https://dash.cloudflare.com/?to=/:account/:zone/zaraz/tools-config/tools/catalog).
3. Select **Add new tool** and choose **Custom MC** from the tools library page. Select **Continue** to confirm your selection.
4. In **Select Custom MC**, choose a Custom Managed Component that you have deployed to your account, such as `my-new-counter-mc`. Select **Continue**.
5. In **Permissions**, select the permissions you want to grant the Custom Managed Component. Select **Continue**.
6. In **Set up**, configure the settings for your new tool. The information you need to enter will depend on the tool you choose. This is also where you use [variables you have previously set up](/zaraz/get-started/create-variables/). Select the `+` sign in the drop-down menu and scroll to **Variables**.
7. Select **Save**.

While your tool is now configured, it needs to have actions defined before it can work. Depending on the tool you chose, Cloudflare Zaraz might automatically create a `Pageview` action. Refer to [Create actions](/zaraz/get-started/create-actions/) to learn how to create additional actions.

Custom Managed Components can be customized with all the settings you expect from the ones you can choose from in the dashboard.

## Unsupported Features

As of now, Custom Managed Components do not support the use of the following features yet:

- Widgets
- Embeds
- Proxy
- Route
- Serve
