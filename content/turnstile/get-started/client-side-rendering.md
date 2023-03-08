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

{{<Aside type= "Note">}}

A form is not protected by having a widget rendered. The corresponding token that is a result of a widget being rendered also needs to be verified using the siteverify API.

{{</Aside>}}

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
<!-- OR and then call turnstile.ready(onloadTurnstileCallback) -->
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js"></script>
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

// if using synchronous loading, will be called once the DOM is ready
turnstile.ready(onloadTurnstileCallback);

```
</div>

Turnstile can be programmatically loaded by invoking the `turnstile.render()` function in the global `window` object. 

The `turnstile.render: function (container: string | HTMLElement, params: RenderParameters)` render takes an argument to a HTML widget.

If the invocation is successful, the function returns a `widgetId (string)`. If the invocation is unsuccessful, the function returns `undefined`.

Check out the [demo](https://demo.turnstile.workers.dev/explicit) and its [source code](https://github.com/cloudflare/turnstile-demo-workers/blob/main/src/explicit.html).

## Access a widget's state

In addition to the `render()` function, Turnstile supports obtaining the widget's response from a `widgetId` via the `turnstile.getResponse(widgetId: string)` function.

## Reset a widget

If a given widget has timed out, expired or needs to be reloaded, you can use the `turnstile.reset(widgetId: string)` function to reset the widget.

## Remove a widget

Once a widget is no longer needed, it can be removed from the page using `turnstile.remove(widgetId: string)`. This will not call any callback and will remove all related DOM elements.

## Configurations

| JavaScript Render Parameters | Data Attribute | Description |
| --- | --- | --- |
| `sitekey` | `data-sitekey` | Every widget has a sitekey. This sitekey is associated with the corresponding widget configuration and is created upon the widget creation. |
| `action` | `data-action` | A customer value that can be used to differentiate widgets under the same sitekey in analytics and which is returned upon validation. This can only contain up to 32 alphanumeric characters including `_` and `-`. |
| `cData` | `data-cdata` | A customer payload that can be used to attach customer data to the challenge throughout its issuance and which is returned upon validation. This can only contain up to 255 alphanumeric characters including `_` and `-`.  |
| `callback` | `data-callback` | A JavaScript callback that is invoked upon success of the challenge. The callback is passed a token that can be validated. |
| `error-callback` | `data-error-callback` | A JavaScript callback that is invoked when there is a network error. |
| `execution` | `data-execution` | Execution controls when to obtain the token of the widget and can be on `render` (default) or on `execute`. Refer to [Execution Modes](/turnstile/get-started/client-side-rendering/#execution-modes) for more information. |
| `expired-callback` | `data-expired-callback` | A JavaScript callback that is invoked when the token expires and does not reset the widget. |
| `theme` | `data-theme` | The widget theme. Can take the following values: `light`, `dark`, `auto`. <br><br>The default is `auto`, which respects the user preference. This can be forced to light or dark by setting the theme accordingly. |
| `language` | `data-language` | Language to display, must be either: `auto` (default) to use the language that the visitor has chosen, or an ISO 639-1 two-letter language code (e.g. `en`) or language and country code (e.g. `en-US`). The following languages are currently supported: `ar-eg`,`de`,`en`,`es`,`fa`,`fr`,`id`,`it`,`ja`,`ko`,`nl`,`pl`,`pt-br`,`ru`,`tr`,`zh-cn` and `zh-tw`.|
| `tabindex` | `data-tabindex` | The tabindex of Turnstile's iframe for accessibility purposes. The default value is `0`. |
| `timeout-callback` | `data-timeout-callback` | A JavaScript callback that is invoked when the challenge expires and resets the widget. |
| `response-field` | `data-response-field` | A boolean that controls if an input element with the response token is created, defaults to `true`. |
| `response-field-name` | `data-response-field-name` | Name of the input element, defaults to `cf-turnstile-response`. |
| `size` | `data-size` | The widget size. Can take the following values: `normal`, `compact`. |
| `retry` | `data-retry` | Controls whether the widget should automatically retry to obtain a token if it did not succeed. The default is `auto`, which will retry automatically. This can be set to `never` to disable retry upon failure. |
| `retry-interval` | `data-retry-interval` | When `retry` is set to `auto`, `retry-interval` controls the time between retry attempts in milliseconds. Value must be a positive integer less than `900000`, defaults to `8000`. |
| `refresh-expired` | `data-refresh-expired` | Automatically refreshes the token when it expires. Can take `auto`, `manual` or `never`, defaults to `auto`. |
| `appearance` | `data-appearance` | Appearance controls when the widget is visible. It can be `always` (default), `execute`, or `interaction-only`. Refer to [Appearance Modes](/turnstile/get-started/client-side-rendering/#appearance-modes) for more information. |

## Widget size

The Turnstile widget can have two different sizes when using the Managed or Non-interactive modes:

| Size | Width | Height |
| --- | --- | --- |
| Normal | 300px | 65px |
| Compact | 130px | 120px |


## Refreshing a Widget

A few seconds before a token expires, the `expired-callback` is invoked.

The `refresh-expired` or `data-refresh-expired` parameter defines the behaviour when the token of a Turnstile widget has expired. 

By default, the parameter is set to `auto`, which will automatically instruct Turnstile to obtain a new token by rerunning the challenge. After the challenge is solved again, the `callback`, if specified, is invoked with the new token.

The visitor can also be instructed to manually obtain a new token by setting the `refresh-expired` parameter to `manual`.

Additionally, specifying `never` will not result in a regeneration of a token, and the application using Turnstile will be responsible for obtaining a novel Turnstile token.


## Execution Modes

By default, Turnstile tokens are obtained for a visitor upon the rendering of a widget (even in invisible mode). However, in some scenarios, an application may want to embed Turnstile, but defer running the challenge until a certain point in time. This is where execution mode can be used to control when a challenge runs and a token is being generated.

There are two options: 
- The challenge runs automatically after calling the `render()` function. 
- The challenge runs after the `render()` function has been called, by invoking the `turnstile.execute(container: string | HTMLElement, jsParams?: RenderParameters)` function separately.
This detaches the appearance and rendering of a widget from its execution.

## Appearance Modes

If a widget is visible, its appearance can be controlled via the `appearance` parameter. 

By default, `appearance` is set to `always` for visible widget types. However, if `appearance` is set to `execute`, the widget will only become visible after the challenge begins. This is helpful in situations where `execute()` is called after `render()`.  If `appearance` is set to `interaction-only`, the widget will become only visible in cases where an interaction is required.