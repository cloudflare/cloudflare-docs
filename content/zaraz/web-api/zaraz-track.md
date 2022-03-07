---
pcx-content-type: reference
title: Zaraz Track
weight: 4
---

# Zaraz Track

`zaraz.track()` allows you to track custom events and actions on your website, that might happen in real time.

Example user actions you might be interested in tracking are successful sign-ups, calls-to-action clicks, or purchases. Common examples for other types of events are tracking the impressions of specific elements on a page, or loading a specific widget.

To start tracking events, use the  `zaraz.track()` function like this:

```js
zaraz.track(eventName, [eventProperties])
```

The `eventName` parameter is a string, and the `eventProperties` parameter is an optional flat object of additional context you can attach to the event using your own keys of choice. For example, tracking a purchase with the value of 200 USD could look like this:

```js
zaraz.track("purchase", {value: 200, currency: "USD"})
```

Note that name of the event (`purchase` in the above example), the names of the keys (`value` and `currency`) and the number of keys are customizable by you. You choose what variables to track and how you want to track these variables. However, picking meaningful names will help you when you configure your triggers, because the trigger configuration has to match the events your website is sending.

After using `zaraz.track()` in your website to track an action:

1. Create a trigger that matches your [`zaraz.track()` call](/zaraz/get-started/create-trigger), with `{{ client.__zarazTrack }}` in your trigger's variable name, and the `eventName` you are tracking in **Match string**. Following the above example, input `purchase` in **Match string**.
2. In every tool you want to use this trigger, add an action with this trigger [configured as a “Firing trigger”](/zaraz/get-started/send-events).
3. Each action that uses this trigger can also access the `eventProperties` you have sent. In the Action fields, you can use `{{ client.<KEY_NAME> }}` to get the value of `<KEY_NAME>`. In the above example, Zaraz will replace `{{ client.currency }}` with `200`.

For more information regarding the properties you can use with `zaraz.track()`, refer to [Event properties](/zaraz/reference/properties-reference/#event-properties).