---
order: 3
pcx-content-type: reference
---

# dataLayer compatibility mode

Cloudflare Zaraz offers backwards compatibility with the `dataLayer` function found in tag management software, used to track events and other parameters. This way you can keep your current implementation and Cloudflare Zaraz will automatically collect your events.

In this case, you will keep using the `dataLayer.push` function to send data from the client-side to Zaraz:

```js
dataLayer.push({ 'event': 'eventName', 'property1': 'value' })
```

When building a trigger, the only required field is `event`, which will be used as the name of the event you are tracking. The following example shows how to track a purchase event — note that the parameters inside the object depend on what you want to track:

```js
dataLayer.push({
  'event': 'purchase',
  'price': '24',
  'currency': 'USD',
  'transactionID': '12345678'
})
```

Cloudflare Zaraz then translates the `dataLayer.push()` call to a `zaraz.track()` call. So, `dataLayer.push({event: "purchase", price: "24", "currency": "USD"})` is equivalent to `zaraz.track("purchase", {"price": "24", "currency": "USD"})`.

To track a `dataLayer.push` function, create a trigger with `zaraz.track()`. The following example triggers a `dataLayer.push()` function with a `purchase` event:

```txt
{{ client.__zarazTrack }}` Contains `purchase`
```

We do not recommend using `dataLayer`. However, as many websites employ it, Cloudflare has this automatic translation layer that converts it to `zaraz.track()`.