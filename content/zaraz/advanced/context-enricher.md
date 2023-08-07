---
pcx_content_type: how-to
title: Context Enricher
weight: 10
---

# Context Enricher

The Zaraz Context Enricher is a tool to modify or enrich [the context](/zaraz/reference/context/) that is being used across Zaraz using a Cloudflare Worker. The Context Enricher allows you access to the client and system variables.

{{<Aside type="note">}}
The Context Enricher is only available for accounts on a [Workers Paid plan](/workers/platform/pricing/).
{{</Aside>}}

## Creating a Worker

To use a Context Enricher, you first need to create a new Cloudflare Worker. You can do this through the Cloudflare dashboard or by using [Wrangler](/workers/get-started/guide/).

To create a new Worker in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Workers & Pages** and select **Create application**.
3. Give a name to your Worker and select **Deploy**.
4. Select **Edit code**.

You have now created a basic Worker that responds with "Hello world." To make this worker functional when using it as a Context Enricher, you need to change the code to return the context back:

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

See below for more complete examples of different use cases. To see the documentation for the Zaraz Context object, click [here](/zaraz/reference/context/).

## Configuring your Context Enricher

Now that your Worker is published, you can select it in your Zaraz settings:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Zaraz** > **Settings**.
3. Select your Context Enricher Worker.
4. Save your settings.

Your Context Enricher will now run on all Zaraz requests in that given zone.

## Example Worker Variables

### Adding arbitrary information using an API

You can use the Context Enricher to add information to your context. For example, you could use an API to get the current weather for the user's location and add it to the context.

```js
function getWeatherForLocation({ client, system }) {
  // Get the location from the context.
  const { country, city } = system.device.location;
  const WEATHER_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

  // Get the weather from an API.
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${WEATHER_API_KEY}`
  ).then((response) => response.json());

  // Add the weather to the context.
  system.device.weather = weather;

  return { client, system };
}

export default {
  async fetch(request, env, ctx) {
    const { system, client } = await request.json();

    // Add the weather to the context.
    const newContext = getWeatherForLocation({ system, client });

    // Return as JSON
    return new Response(JSON.stringify(newContext));
  },
};
```

### Masking sensitive information, such as emails

Let's assume we want to redact sensitive information, such as emails. For this, we're going to replace all occurrences of email addresses throughout the context. Please keep in mind that this is only an example and might not fit all edge or use cases.

For the sake of simplicity of this example, we're going to replace all strings that contain an `@` symbol:

```js
function redactEmailAddressesFromObject(context) {
  // Loop through all keys of the object.
  for (const key in context) {
    // Check if the value is a string.
    if (typeof context[key] === "string") {
      // Check if the string contains an @ symbol.
      if (context[key].includes("@")) {
        // Replace the string with a redacted version.
        context[key] = "REDACTED@example.com";
      }
    } else if (typeof context[key] === "object") {
      // Recursively call this function to redact the object.
      context[key] = redactEmailAddressesFromObject(context[key]);
    }
  }

  return context;
}

export default {
  async fetch(request, env, ctx) {
    const { system, client } = await request.json();

    // Redact email addresses from the context.
    const newContext = redactEmailAddressesFromObject({ system, client });

    // Return as JSON
    return new Response(JSON.stringify(newContext));
  },
};
```
