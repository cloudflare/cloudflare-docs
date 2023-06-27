---
pcx_content_type: how-to
title: Loading a Custom Managed Component
weight: 15
---

# Load a Custom Managed Component

Zaraz supports loading custom third-party tools using [Managed Components](https://managedcomponents.dev/). These can be Managed Components that you have developed yourself or that were developed by others. Using Custom Managed Components with Zaraz is done by converting them into a Cloudflare Worker running in your account.

If you are new to Managed Components, we recommend you get started with [creating your own Managed Component](https://managedcomponents.dev/getting-started/quickstart) or check out [our demo Managed Component](https://github.com/managed-components/demo).

{{<Aside type="note">}}
Custom Managed Components are only available for accounts on a [Workers Paid plan](/workers/platform/pricing/).
{{</Aside>}}

## Prepare a Managed Component

{{<Aside type="note">}}
If your Managed Component requires any building, transpiling, or bundling, you must complete those steps before you can deploy it. For example, this is required for components written in TypeScript and is usually done by running `npm run build` or an equivalent.
{{</Aside>}}

To get started, you need have a JavaScript file ready for deployment, that exports the default Managed Component function for your Managed Component.

In this guide, we will use a simple example of a Custom Managed Component that counts user visits and logs this data in the console:

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

## Deploy a Managed Component to Cloudflare

1. Open a terminal in your Managed Component’s root directory.
2. From there, run `npx managed-component-to-cloudflare-worker ./index.js my-new-counter-mc`, which will deploy the Managed Component to a specialized Cloudflare Worker. Change the path to your `index.js`. You can also rename the Component if you choose.
3. Your Managed Component should now be [visible on your account](https://dash.cloudflare.com/redirect?account=/workers-and-pages) as a Cloudflare Worker prefixed with `custom-mc`.

## Configure a Managed Component in Cloudflare

{{<Aside type="note">}}
As with regular tools, it is recommended that you [create the triggers](/zaraz/get-started/create-trigger/) you need first, if the Custom Managed Component you are adding needs to start actions using firing triggers different from the default `Pageview` trigger.
{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Select **Zaraz** > **Tools Configuration** > [**Third-party tools**](https://dash.cloudflare.com/?to=/:account/:zone/zaraz/tools-config/tools/catalog).
3. Select **Add new tool** and choose **Custom Managed Component** from the tools library page. Select **Continue** to confirm your selection.
4. In **Select Custom MC**, choose a Custom Managed Component that you have deployed to your account, such as `my-new-counter-mc`. Select **Continue**.
5. In **Permissions**, select the permissions you want to grant the Custom Managed Component. If you run an untrusted Managed Component, pay close attention to what permissions you are granting. Select **Continue**.
6. In **Set up**, configure the settings for your new tool. The information you need to enter will depend on the code of the Managed Component. You can add settings and default fields, as well as use [variables you have previously set up](/zaraz/get-started/create-variables/).
7. Select **Save**.

While your tool is now configured, it does not have any actions associated with it yet. Adding new actions will tell Zaraz when to contact your Managed Component, and what information to send to it. When adding actions, make sure to verify the Action Type you are using. The types `pageview` and `event` are most commonly used, but you can add any action type to match the event listeners your Managed Component is using. Learn how to [create additional actions](/zaraz/get-started/create-actions/).

If your Managed Component listens to `ecommerce` events, toggle **E-commerce tracking** in the Managed Component Settings page.

## Unsupported Features

As of now, Custom Managed Components do not support the use of the following methods yet:

- `manager.registerEmbed`
- `manager.registerWidget`
- `manager.proxy`
- `manager.route`
- `manager.serve`
- `manager.get`
- `manager.set`
- `manager.useCache`
- `manager.invalidateCache`
