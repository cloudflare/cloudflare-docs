---
pcx_content_type: how-to
title: Worker Variables
weight: 10
---

# Worker Variables

Zaraz Worker Variables are a powerful type of variable that you can configure and then use in your actions and triggers. Unlike string and secret variables, Worker Variables are dynamic. This means you can use a Cloudflare Worker to determine the value of the variable, allowing you to use them for countless purposes. For example:

1. A Worker Variable that calculates the sum of all products in the cart
2. A Worker Variable that takes a cookie, makes a request to your backend, and returns the User ID
3. A Worker Variable that hashes a value before sending it to a third-party vendor

{{<Aside type="note">}}
Worker Variables are only available for accounts on a [Workers Paid plan](/workers/platform/pricing/).
{{</Aside>}}

## Creating a Worker

To use a Worker Variable, you first need to create a new Cloudflare Worker. You can do this through the Cloudflare dashboard or by using [Wrangler](/workers/get-started/guide/).

To create a new worker in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Workers** and select **Create a Service**.
2. Give a name to your service and choose the **HTTP Handler** as your starter template.
3. Click **Create Service**, and then **Quick Edit**.

You have now created a basic Worker that responds with "Hello world." If you use this Worker as a Variable, your Variable will always output "Hello world." The response body coming from your Worker will be the value of your Worker Variable. To make this Worker useful, you will usually want to use information coming from Zaraz, which is known as the Zaraz Context.

Zaraz forwards the Zaraz Context object to your Worker as a JSON payload with a POST request. You can access any property like this:

```js
const { system, client } = await request.json()

/* System parameters */
system.page.url.href // URL of the current page
system.page.query.gclid // Value of the gclid query parameter
system.device.resolution // Device screen resolution
system.device.language // Browser preferred language

/* Zaraz Track values */
client.value // value from `zaraz.track("foo", {value: "bar"})`
client.products[0].name // name of the first product in an ecommerce call
```

See below for more complete examples of different use cases. To see the documentation for the Zaraz Context object, click [here](/zaraz/reference/context/).

## Configuring a Worker Variable

Once your Worker is published, configuring a Worker Variable is easy.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Go to **Zaraz** > **Tools configuration** > **Variables**.
3. Click **Create variable**.
4. Give your variable a name, choose **Worker** as the Variable type, and select your newly created Worker.
5. Save your variable.

## Using your Worker Variable

Now that your Worker Variable is configured, you can use it in your actions and triggers.

To use your Worker Variable:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Zaraz** > **Tools configuration** > **Tools**.
2. Click **Edit** next to a tool that you have already configured.
3. Select an action or add a new one.
4. Click on the plus sign at the right of the text fields.
5. Select your Worker Variable from the list.

## Example Worker Variables


### Calculates the sum of all products in the cart

Assuming we are sending a list of products in a cart, like this:
```js
zaraz.ecommerce("Cart Viewed", {
  products: [
    { name: "shirt", price: "50" },
    { name: "jacket", price: "20" },
    { name: "hat", price: "30" },
  ],
});
```

Calculating the sum can be done like this:

```js
export default {
  async fetch(request, env) {
    // Parse the Zaraz Context object
    const { system, client } = await request.json();

    // Get an array of all prices
    const productsPrices = client.products.map((p) => p.price);

    // Calculate the sum
    const sum = productsPrices.reduce((partialSum, a) => partialSum + a, 0);

    return new Response(sum);
  },
};
```


### Match a cookie with a user in your backend

Zaraz exposes all cookies automatically under the `system.cookies` object, so they are always available. Accesing the cookie and using it to query your backend could look like this:

```js
export default {
  async fetch(request, env) {
    // Parse the Zaraz Context object
    const { system, client } = await request.json();

    // Get the value of the cookie "login-cookie"
    const cookieValue = system.cookies["login-cookie"];

    const userId = await fetch("https://example.com/api/getUserIdFromCookie", {
      method: POST,
      body: cookieValue,
    });

    return new Response(userId);
  },
};
```


### Hash a value before sending it to a third-party vendor

Assuming you're sending a value that your want to hash, for example, an email address:

```js
zaraz.track("user_logged_in", { email: "user@example.com" });
```

You can access this property and hash it like this:

```js
async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

export default {
  async fetch(request, env) {
    // Parse the Zaraz Context object
    const { system, client } = await request.json();

    const { email } = client;

    return new Response(await digestMessage(text));
  },
};
```
