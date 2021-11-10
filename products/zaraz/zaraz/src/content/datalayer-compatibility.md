---
pcx-content-type: reference
---

# dataLayer Compatibility Mode

Zaraz offers backwards compatibility with the `dataLayer` function from tag management software like GTM/Tealium, used to track events and other parameters. This way you can keep your current implementation and Zaraz will automatically collect your events.

In this case, you will keep using the `dataLayer.push` function to send data from the client-side to Zaraz:

```js
dataLayer.push({ event: eventName, property1: value })
```

`event` is the only required field, and it will be used as the name of the event you are tracking. For example, if you wish to track a purchase event, this is how the code will look like:

```js
dataLayer.push({
  event: 'purchase',
  price: '24',
  currency: 'USD',
  transactionID: '12345678',
})
```

To use the dataLayer Compatibility Mode, go to Settings and make sure the **Activate dataLayer Compatibility Mode** switch is on.