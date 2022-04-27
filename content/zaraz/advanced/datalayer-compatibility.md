---
pcx-content-type: reference
title: Data layer compatibility mode
weight: 0
---

# Data layer compatibility mode

Cloudflare Zaraz offers backwards compatibility with the `dataLayer` function found in tag management software, used to track events and other parameters. This way you can keep your current implementation and Cloudflare Zaraz will automatically collect your events.

To keep the Zaraz script as small and fast as possible, the data layer compatibility mode is disabled by default. To enable it:
1. Go to [**Zaraz**](https://dash.cloudflare.com/?to=/:account/:zone/zaraz) > **Settings**. 
2. Enable the **Data layer compatibility mode** toggle. Refer to [Zaraz settings](/zaraz/reference/settings/) for more information.

## Using the data layer with Zaraz

After enabling the compatibility mode, Zaraz will automatically translate your `dataLayer.push` calls to `zaraz.track`, so you can keep using the `dataLayer.push` function to send events from the browser to Zaraz.

{{<Aside type="note" header="Note">}}Zaraz does not support automatic ecommerce mapping through the `dataLayer` compatibility mode. If you need to track ecommerce events, refer to the [Ecommerce API](/zaraz/web-api/ecommerce/).{{</Aside>}}

Events will only be sent to Zaraz if your pushed object includes an `event` key. The `event`key is used as the name for the Zaraz event. Other keys will become part of the `eventProperties` object. The following example shows how a purchase event will be sent using the data layer to Zaraz — note that the parameters inside the object depend on what you want to track:

```js
dataLayer.push({
  event: 'purchase',
  price: '24',
  currency: 'USD',
  transactionID: '12345678',
});
```

Cloudflare Zaraz then translates the `dataLayer.push()` call to a `zaraz.track()` call. So, `dataLayer.push({event: "purchase", price: "24", "currency": "USD"})` is equivalent to `zaraz.track("purchase", {"price": "24", "currency": "USD"})`.

Because Zaraz converts the `dataLayer.push` call to `zaraz.track`, creating a trigger based on `dataLayer.push` calls is the same as creating triggers for `zaraz.track`. As an example, the trigger below would match the above `dataLayer.push` call because it matches the event name (`{{ client.__zarazTrack }}`) with `purchase`.

{{<table-wrap>}}

| Rule type    | Variable name               | Match operation | Match string |
| ------------ | --------------------------- | --------------- | ------------ |
| _Match rule_ | `{{ client.__zarazTrack }}` | _Equals_        | `purchase`   |

{{</table-wrap>}}

We do not recommend using `dataLayer`. However, as many websites employ it, Cloudflare Zaras has this automatic translation layer that converts it to `zaraz.track()`.