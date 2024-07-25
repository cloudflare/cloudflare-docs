---
title: Remote development
weight: 4
pcx_content_type: concept
---

# Develop remotely

D1 supports remote development using the [dashboard playground](/workers/playground/#use-the-playground). The dashboard playground uses a browser version of Visual Studio Code, allowing you to rapidly iterate on your Worker entirely in your browser.

## 1. Bind a D1 database to a Worker

{{<Aside type="note">}}

This guide assumes you have previously created a Worker, and a D1 database.

Users new to D1 and/or Cloudflare Workers should read the [D1 tutorial](/d1/get-started/) to install `wrangler` and deploy their first database.

{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to [**Workers & Pages** > **Overview**](https://dash.cloudflare.com/?to=/:account/workers-and-pages).
3. Select an existing Worker.
4. Select the **Settings** tab.
5. Select the **Variables** sub-tab.
6. Scroll down to the **D1 Database Bindings** heading.
7. Enter a variable name, such as `DB`, and select the D1 database you wish to access from this Worker.
8. Select **Save and deploy**.

## 2. Start a remote development session

1. On the Worker's page on the Cloudflare dashboard, select **Edit Code** at the top of the page.
2. Your Worker now has access to D1.

Use the following Worker script to verify that the Worker has access to the bound D1 database:

```js
export default {
  async fetch(request, env, ctx) {
    const res = await env.DB.prepare("SELECT 1;").all();
    return new Response(JSON.stringify(res, null, 2));
  },
};
```

## Related resources

- Learn [how to debug D1](/d1/observability/debug-d1/).
- Understand how to [access logs](/workers/observability/logging/) generated from your Worker and D1.
