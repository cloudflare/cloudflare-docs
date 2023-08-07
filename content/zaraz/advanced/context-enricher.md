---
pcx_content_type: how-to
title: Context Enricher
weight: 10
---

# Context Enricher

The Zaraz Context Enricher is a powerful tool to modify or enrich [the context](/zaraz/reference/context/) that is being used across Zaraz using a Cloudflare Worker. The Context Enricher allows you access to the client and system variables.

{{<Aside type="note">}}
The Context Enricher is only available for accounts on a [Workers Paid plan](/workers/platform/pricing/).
{{</Aside>}}

## Creating a Worker

To use a Worker Variable, you first need to create a new Cloudflare Worker. You can do this through the Cloudflare dashboard or by using [Wrangler](/workers/get-started/guide/).

To create a new Worker in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** and select **Create application**.
3. Give a name to your Worker and select **Deploy**.
4. Select **Edit code**.

You have now created a basic Worker that responds with "Hello world." To make this worker functional when using it as a Context Enricher, you need to change the code to something like this:

```js
export default {
  async fetch(request, env, ctx) {
    const { system, client } = await request.json();

    // Here goes your modification to the system or client objects.
    /*
      For example, to change the country to "Pirate's Island", use:
      system.device.location.country = 'Pirate\'s Island';
    */

    return new Response(JSON.stringify({ system, client }));
  },
};
```

To see the documentation for the Zaraz Context object, click [here](/zaraz/reference/context/).

## Configuring your Context Enricher

Now that your Worker is published, you can select it in your Zaraz settings:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Zaraz** > **Settings**.
3. Select your Context Enrichment Worker.
4. Save your settings.

Your Context Enricher will now run on all Zaraz requests on that given zone.
