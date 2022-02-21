---
order: 3
pcx-content-type: reference
---

# Zaraz Track

`zaraz.track()` allows you to track the actions your users are taking on your website, and other events that might happen in real time. 

Common user actions you will probably be interested in tracking are successful sign-ups, call-to-action clicks, and purchases. Common examples for other types of events are tracking the impressions of specific elements on a page, or loading a specific widget.

To start tracking user actions, add the following code to the `<body>` element of your website:

```js
zaraz.track('<USER_ACTION>', {<OPTIONAL_PARAMETERS>})
```

 The following is an example for tracking purchases:

```js
zaraz.track("purchase", {value: "200", currency: "USD"})
```

Only the first parameter is required. This parameter should be a string specifying the name of the event you want to track. The second parameter is an optional free-form object that can be used to send an additional set of key-value properties. For example, if the `event` you are tracking is `purchase`, this object can include `price`, `currency`, `transaction_id`, or `tax`. You choose what you want to track.

After adding `zaraz.track()` to your website to track an action:

1. Create a trigger that matches your [`zaraz.track()` call](/get-started/create-trigger), with `{{ client.__zarazTrack }}` in your trigger's variable name, and the parameter you are tracking in **Match string**. Following the above example, you would input `purchase` in **Match string**.
1. Add an [event that uses that trigger](/get-started/send-events).

If you have optional parameters you want to track, they can be accessed from any of the fields in the event that uses the `{{ client.__zarazTrack }}` trigger. You choose which field makes sense for you to track the information in.

For example, if you were trying to track `USD` purchases, you could add a custom field to an existing Google analytics' event with this string. Refer to [Custom fields](/get-started/custom-fields) to learn how to add one to an event.

The exact place where you add these optional parameters will depend on the tool you want to send the information to. Some tools accept custom fields, some only have preset lists. 

For more information regarding the properties you can use with `zaraz.track()`, refer to [Event properties](/reference/properties-reference#event-properties).