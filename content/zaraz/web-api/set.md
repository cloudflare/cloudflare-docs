---
pcx_content_type: reference
title: Set
weight: 2
meta:
  title: zaraz.set
---

# Set

You can use `zaraz.set()` anywhere inside the `<body>` tag of a page:

```js
zaraz.set(key, value, [options])
```

Set is useful if you want to make a variable available in all your events without manually setting it every time you are using `zaraz.track()`. For the purpose of this example, assume users in your system have a unique identifier that you want to send to your tools. You might have many `zaraz.track()` calls all sharing this one parameter:

```js
zaraz.track("form completed", {userId: "ABC-123"})
```

```js
zaraz.track("button clicked", {userId: "ABC-123", value: 200})
```

```js
zaraz.track("cart viewed", {items: 3, userId: "ABC-123"})
```

Here, all the events are collecting the `userId` key, and the code for setting that key repeats itself. With `zaraz.set()` you can avoid repetition by setting the key once when the page loads. Zaraz will then attach this key to all future `zaraz.track()` calls. 

Using the above data as the example, if you use `zaraz.set("userId", "ABC-123")` once, before the `zaraz.track()` calls, you can remove the `userId` key from all `zaraz.track()` calls.

Another example:

```js
zaraz.set('product_name', 't-shirt', {scope: 'page'})
```

Keys that are sent using `zaraz.set()` can be used inside tool actions exactly like keys in the `eventProperties` of `zaraz.track()`. So, the above `product` key is accessible through the Cloudflare dashboard with the variable _Track Property name:_, and setting its name as `product_name`. Zaraz will then replace it with `t-shirt`.

![Example of how to create a variable with the Set method, tracking t-shirts](/zaraz/static/set.png)

The `[options]` argument is an optional object and can include a `scope` property that has a string value. This property determines the lifetime of this key, meaning for how long Zaraz should keep attaching it to `zaraz.track()` calls. Allowed values are:

* `page`: To set the key for the context of the current page only.
* `session`: To make the key last the whole session.
* `persist`: To save the key across sessions. This is the default mode and uses `localStorage` to save the value.

In the previous example, `{scope: 'page'}` makes the `product_name` property available to all `zaraz.track()` calls in the current page, but will not affect calls after visitors navigate to other pages.

To unset a variable, set it to `undefined`. The variable will then be removed from all scopes it was included in, and will not be automatically sent with future `zaraz.track` calls. For example:

```js
zaraz.set('product_name', undefined)
```
