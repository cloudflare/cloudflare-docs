---
order: 2
pcx-content-type: reference
---

# Events API

Cloudflare Zaraz allows you to track the actions your users are taking on your website and other events that might happen in real-time. 

Common user actions you will probably be interested in tracking are Successful Signups, CTA clicks, and Purchases, among others. Common examples for other types of events are tracking the impressions of specific elements on a page, or loading a specific widget.

To start tracking events, add the Events API JavaScript code to your website. The following is an example for tracking purchases:

```js
zaraz.track(“purchase”, { value: “200”, currency: “USD”})
```

Only the first parameter is required. This parameter should be a string specifying the name of the event you want to track. The second parameter is an optional free-form object that can be used to send an additional set of key-value properties. For example, if the `event` you are tracking is "purchase", this object can include `price`, `currency`, `transaction_id`, or `tax`. You choose what you want to track.

After using the Events API in your website to track an action:

1. Create a [trigger that matches your `zaraz.track` call](/get-started/create-trigger)
1. Add an [event that uses the trigger](/get-started/send-events)