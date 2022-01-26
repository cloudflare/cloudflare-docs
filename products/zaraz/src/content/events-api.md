---
order: 2
pcx-content-type: reference
---

# Events API

Cloudflare Zaraz has an Events API that lets you customize Zaraz to your needs. To get started, add the Events API JavaScript code to the `<body>` element of your website.

## Zaraz Track

`zaraz.track` allows you to track the actions your users are taking on your website, and other events that might happen in real time. 

Common user actions you will probably be interested in tracking are successful sign-ups, calls-to-action clicks, and purchases. Common examples for other types of events are tracking the impressions of specific elements on a page, or loading a specific widget.

To start tracking events, add `zaraz.track` to your website. The following is an example for tracking purchases:

```js
zaraz.track("purchase", {value: "200", currency: "USD"})
```

Only the first parameter is required. This parameter should be a string specifying the name of the event you want to track. The second parameter is an optional free-form object that can be used to send an additional set of key-value properties. For example, if the `event` you are tracking is "purchase", this object can include `price`, `currency`, `transaction_id`, or `tax`. You choose what you want to track.

After using `zaraz.track` in your website to track an action:

1. Create a [trigger that matches your `zaraz.track` call](/get-started/create-trigger).
1. Add an [event that uses that trigger](/get-started/send-events).

For more information regarding the properties you can use with `zaraz.track`, refer to [Event properties](/properties-reference#event-properties).

## Zaraz Set

`zaraz.set` allows you to define your own variables. The variables you define will be automatically included with your `zaraz.track` calls or behavioral triggers. To start using your own variables, add `zaraz.set(key, value, [options])` to your website. The `[options]` argument is optional. 

The following is an example for a new `product_name`:

```js
zaraz.set('product_name', 't-shirt')
```

Using `zaraz.set('product_name', 't-shirt')` will make `product_name` included in all `zaraz.track` calls. You can then use `{{ client.product_name }}` in your triggers and events. 

The `[options]` argument is an optional object and can include a `scope` property that has a string value:

Allowed values are:

* `page`: to set the value for the context of the current page only.
* `session`: to make the value last the whole session.
* `persist`: to save the value across sessions. This is the default mode and uses `localStorage` to save the value.

Example: 

```js
zaraz.set('product_name', 't-shirt', {scope: 'page'})
```

This example makes the `product_name` property available to all `zaraz.track` calls in the current page, but will not affect calls after visitors navigate to other pages. Refer to [Event properties](/properties-reference#event-properties) for more details.
