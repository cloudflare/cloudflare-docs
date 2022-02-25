---
order: 4
pcx-content-type: reference
---

# Zaraz Set

`zaraz.set()` allows you to define your own variables. The variables you define will be automatically included with your `zaraz.track()` calls or triggers. To start using your own variables, add `zaraz.set(key, value, [options])` to the `<body>` element of your website. The `[options]` argument is optional.

The following is an example for a new `product_name`:

```js
zaraz.set('product_name', 't-shirt')
```

Using `zaraz.set('product_name', 't-shirt')` will make `product_name` included in all `zaraz.track` calls. You can then use `{{ client.product_name }}` in your triggers and events.

The `[options]` argument is an optional object and can include a `scope` property that has a string value. Allowed values are:

*   `page`: to set the value for the context of the current page only.
*   `session`: to make the value last the whole session.
*   `persist`: to save the value across sessions. This is the default mode and uses `localStorage` to save the value.

Example:

```js
zaraz.set('product_name', 't-shirt', {scope: 'page'})
```

This example makes the `product_name` property available to all `zaraz.track` calls in the current page, but will not affect calls after visitors navigate to other pages. Refer to [Event properties](/reference/properties-reference#event-properties) for more details.
