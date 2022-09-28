---
title: Client-side Rendering
pcx_content_type: get-started
weight: 4
layout: single
---

# Client-side Render

Initializing and customizing the Turnstile widget on your webpage can be done via **implicit** or **explicit** rendering. 

## Implicitly render the Turnstile widget

The HTML is scanned for elements that have a `cf-turnstile` class name:


<div>

```html

<div class="cf-turnstile" data-sitekey="yourSitekey" data-callback="javascriptCallback"></div>

```
</div>

Once a challenge has been solved, a token is passed to the success callback. This token must be validated against our siteverify endpoint. A token can only be validated once and cannot be redeemed twice. 

{{<Aside type="note">}}

Once a token has been issued, it can be validated within the next 300 seconds. After 300 seconds, the token is no longer valid and another challenge needs to be solved.

{{</Aside>}}

To configure the challenge, see [Configurations](/turnstile/get-started/client-side-rendering/#configurations) containing data attributes and render parameters.

See the [demo](https://demo.turnstile.workers.dev/) and its [source code](https://github.com/cloudflare/turnstile-demo-workers/blob/main/src/implicit.html).

### Protect Forms

Turnstile is often used to protect forms on websites such as login forms, contact forms, and more. After inserting the JavaScript script tag, customers can embed `<div class="cf-turnstile"></div>` into their site to protect their forms.

For example:
<div>

```html

<form action="/login" method="POST">
   <input type="text" placeholder="username"/>
   <input type="password" placeholder="password"/>
   <div class="cf-turnstile" data-sitekey="yourSitekey"></div> 
   <button type="submit" value="Submit">Log in</button>
</form>

```

</div>

An invisible input with the name `cf-turnstile-response` is added and will be sent to the server with the other fields.

### Disable implicit rendering 

Implicit rendering can be disabled by customers by replacing the script from 

`https://challenges.cloudflare.com/turnstile/v0/api.js`

to

`https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`

When this option is used, HTML elements with the `cf-turnstile` class will not show a challenge. The `turnstile.render` function must be invoked using the following steps.

## Explicitly render the Turnstile widget

1. Insert the JavaScript tag:

<div>

```html

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload= onloadTurnstileCallback" async defer></script>

```
</div>

2. Once the script is embedded, you will have access to a global function with multiple callback options you can customize. To allow this function to work properly, an HTML element with the ID "example-container" must exist. <br> The challenge can be invoked explicitly with the following JavaScript snippet:

<div>

```javascript

window.onloadTurnstileCallback = function () {
   const turnstileOptions = {
            sitekey: 'yourSiteKey',
            callback: function(token) {
               console.log(`Challenge Success ${token}`);
            }
   };
   turnstile.render('#example-container', turnstileOptions); 
}

```
</div>

Turnstile can be programmatically loaded by invoking the `turnstile.render()` function in the global window object. 

The `turnstile.render: function (container: string | HTMLElement, params: RenderParameters)` render takes an argument to a HTML widget.

If the invocation is successful, the function returns a `widgetId`. If the invocation is unsuccessful, the function returns undefined.

See the [demo](https://demo.turnstile.workers.dev/explicit) and its [source code](https://github.com/cloudflare/turnstile-demo-workers/blob/main/src/explicit.html).

## Access a widget's state

In addition to the `render()` function, Turnstile supports obtaining the widget's response from a widgetId via the `turnstile.getResponse(widgetId: string)` function.

## Reset a widget

If a given widget has expired or needs to be reloaded, the `turnstile.reset(widgetId: string)` function can be used.

## Configurations

| JavaScript Render Parameters | Data Attribute | Description |
| --- | --- | --- |
| sitekey | `data-sitekey` | Every widget has a sitekey. This sitekey is associated with the corresponding widget configuration and is created upon the widget creation. |
| action | `data-action` | A customer value that can be used to differentiate widgets under the same sitekey in analytics and which is returned upon validation. |
| cData | `data-cdata` | A customer payload that can be used to attach data of the customer with the challenge throughout its issuance and which is returned upon validation. |
| callback | `data-callback` | A JavaScript callback that is invoked upon success of the challenge. The callback is passed a token that can be validated. |
| expired-callback | `data-expired-callback` | A JavaScript callback that is invoked upon the expiration of the challenge. |
| error-callback | `data-error-callback` | A JavaScript callback that is invoked upon the occurrence of a network error. |
| theme | `data-theme` | `light`, `dark`, `auto`. <br><br>The default is `auto`, which respects the user-preference. This can be forced to light or dark by setting the theme accordingly. |
| tabindex | `data-tabindex` | The default value is 0 (tabindex of iframe for accessibility). |