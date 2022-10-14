---
title: Client-side rendering
pcx_content_type: get-started
weight: 4
layout: single
---

# Client-side render

You can initialize and customize the Turnstile widget on your web page via implicit or explicit rendering. 

## Implicitly render the Turnstile widget

The HTML is scanned for elements that have a `cf-turnstile` class name:


<div>

```html
<div class="cf-turnstile" data-sitekey="yourSitekey" data-callback="javascriptCallback"></div>
```
</div>

Once a challenge has been solved, a token is passed to the success callback. This token must be validated against our siteverify endpoint. A token can only be validated once and cannot be consumed twice. 

{{<Aside type="note">}}

Once a token has been issued, it can be validated within the next 300 seconds. After 300 seconds, the token is no longer valid and another challenge needs to be solved.

{{</Aside>}}

To configure the challenge, refer to [Configurations](/turnstile/get-started/client-side-rendering/#configurations) containing data attributes and render parameters.

Check out the [demo](https://demo.turnstile.workers.dev/) and its [source code](https://github.com/cloudflare/turnstile-demo-workers/blob/main/src/implicit.html).

### Protect forms

Turnstile is often used to protect forms on websites such as login forms, contact forms, and more. After inserting the JavaScript script tag, customers can embed `<div class="cf-turnstile"></div>` into their site to protect their forms.

For example:
<div>

```html
---
highlight: [4]
---

<form action="/login" method="POST">
   <input type="text" placeholder="username"/>
   <input type="password" placeholder="password"/>
   <div class="cf-turnstile" data-sitekey="<YOUR_SITE_KEY>"></div> 
   <button type="submit" value="Submit">Log in</button>
</form>

```

</div>

An invisible input with the name `cf-turnstile-response` is added and will be sent to the server with the other fields.

### Disable implicit rendering 

You can disable implicit rendering by replacing the script from:

`https://challenges.cloudflare.com/turnstile/v0/api.js`

To:

`https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`

When using this option, HTML elements with the `cf-turnstile` class will not show a challenge. The `turnstile.render` function must be invoked using the following steps.

## Explicitly render the Turnstile widget

1. Insert the JavaScript tag:

<div>

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback" async defer></script>
```
</div>

2. Once the script is embedded, you will have access to a global function with multiple callback options you can customize. For the following function to work properly, the page must contain an HTML element with ID `example-container`.<br>The challenge can be invoked explicitly with the following JavaScript snippet:

<div>

```javascript

window.onloadTurnstileCallback = function () {
    turnstile.render('#example-container', {
        sitekey: '<YOUR_SITE_KEY>',
        callback: function(token) {
            console.log(`Challenge Success ${token}`);
        },
    });
};

```
</div>

Turnstile can be programmatically loaded by invoking the `turnstile.render()` function in the global `window` object. 

The `turnstile.render: function (container: string | HTMLElement, params: RenderParameters)` render takes an argument to a HTML widget.

If the invocation is successful, the function returns a `widgetId (string)`. If the invocation is unsuccessful, the function returns `undefined`.

Check out the [demo](https://demo.turnstile.workers.dev/explicit) and its [source code](https://github.com/cloudflare/turnstile-demo-workers/blob/main/src/explicit.html).

## Access a widget's state

In addition to the `render()` function, Turnstile supports obtaining the widget's response from a `widgetId` via the `turnstile.getResponse(widgetId: string)` function.

## Reset a widget

If a given widget has expired or needs to be reloaded, you can use the `turnstile.reset(widgetId: string)` function to reset the widget.

## Remove a widget

Once a widget is no longer needed, it can be removed from the page using `turnstile.remove(widgetId: string)`. This will not call any callback and will remove all related DOM elements.

## Configurations

| JavaScript Render Parameters | Data Attribute | Description |
| --- | --- | --- |
| `sitekey` | `data-sitekey` | Every widget has a sitekey. This sitekey is associated with the corresponding widget configuration and is created upon the widget creation. |
| `action` | `data-action` | A customer value that can be used to differentiate widgets under the same sitekey in analytics and which is returned upon validation. This can only contain up to 32 alphanumeric characters including `_` and `-`. |
| `cData` | `data-cdata` | A customer payload that can be used to attach customer data to the challenge throughout its issuance and which is returned upon validation. This can only contain up to 255 alphanumeric characters including `_` and `-`.  |
| `callback` | `data-callback` | A JavaScript callback that is invoked upon success of the challenge. The callback is passed a token that can be validated. |
| `expired-callback` | `data-expired-callback` | A JavaScript callback that is invoked when a challenge expires. |
| `error-callback` | `data-error-callback` | A JavaScript callback that is invoked when there is a network error. |
| `theme` | `data-theme` | The widget theme. Can take the following values: `light`, `dark`, `auto`. <br><br>The default is `auto`, which respects the user preference. This can be forced to light or dark by setting the theme accordingly. |
| `tabindex` | `data-tabindex` | The tabindex of Turnstile's iframe for accessibility purposes. The default value is `0`. |
| `response-field` | `data-response-field` | A boolean that controls if an input element with the response token is created, defaults to `true`. |
| `response-field-name` | `data-response-field-name` | Name of the input element, defaults to `cf-turnstile-response` |
