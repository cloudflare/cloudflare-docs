---
pcx_content_type: get-started
title: Client-side Rendering
weight: 3
layout: single
---

# Client-side Rendering

Initializing and customizing the Turnstile widget on your webpage can be done via **explicit** or **implicit** rendering. 

## Explicitly render the Turnstile widget

1. Insert the JavaScript:
```json
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

2. Once the script is embedded, you will have access to a global function with multiple callback options you can customize. The challenge can be invoked explicitly via the JavaScript:

<div>

```bash

window.onloadChlApiCallback = function () {
   const turnstileOptions = {
            siteKey: ‘yourSiteKey’,
            mode: managed’,
            callback: function(token) {
               console.log(`Challenge Success ${token}`);
            }
   };
   cf_challenge_api.render(‘#container’, turnstileOptions); 
}

```
</div>

Turnstile can be programmatically loaded by invoking the **`turnstile.render()`** function in the global window object. 

The **`turnstile.render: function (container: string | HTMLElement, params: RenderParameters)`** render takes an argument to a HTML widget.

If the invocation is successful, the function returns a widgetId. If the invocation is unsuccessful, the function returns undefined.


## Implicitly render the Turnstile widget

The HTML is scanned for elements that have a `cf-turnstile` class name:


<div>

```bash

<div id=”container” class=”cf-turnstile” data-sitekey=”yourSiteKey” data-mode=”managed” data-callback=”javascriptCallback”></div>

```
</div>


Once a challenge has been solved, a token is passed to a success callback. This token can be used with our siteverify endpoint to validate a challenge response. A token can only be validated once and cannot be redeemed twice. 

{{<Aside type="note">}}

Once a token has been issued, it can be validated within the next 300 seconds. After 300 seconds, the token is no longer valid and another challenge needs to be solved.

{{</Aside>}}

The validation can be done on the server side or ven on the edge. For example, using a simple Workers fetch:

<div>

```bash

async function handleRequest() {
//... receive token
let formData = new FormData();
formData.append('secret', 'verysecret');
formData.append('response', 'receivedToken');
 
await fetch("https://challenges.cloudflare.com/turnstoile/v0/siteverify",
    {
        body: formData,
        method: "post"
    });
...
}

```
</div>


To configure the challenge, see [Configurations](/turnstile/get-started/client-side-rendering/#configurations) containing data attributes and render parameters.

## Accessing a widget's state

In addition to the **`render()`** function, Turnstile supports obtaining the widget's response from a widgetId via the **`turnstile.getResponse(widgetId: string)`** function.

## Resetting a widget

If a given widget has expired or needs to be reloaded, the **`turnstile.reset(widgetId: string)`** function can be used.

## Configurations

| JavaScript Render Parameters | Data Attribute | Description |
| --- | --- | --- |
| siteKey | `data-sitekey` | Every widget has a sitekey. This sitekey is associated with the corresponding widget configuration and is created upon the widget creation. |
| action | `data-action` | A customer value that can be used to differentiate widgets under the same sitekey in analytics and which is returned upon validation. |
| cData | `data-cData` | A customer payload that can be used to attach data of the customer with the challenge throughout its issuance and which is returned upon validation. |
| callback | `data-callback` | a JavaScript callback that is invoked upon success of the challenge. The callback is passed a token that can be validated. |
| error-callback | `data-error-callback` | a JavaScript callback that is invoked upon the expiration of the challenge. |
| theme | `data-theme` | The default is `auto`, which uses the user-preference. This can be forced to light or dark by setting the theme accordingly. |
| tabindex | `data-tabindex` | number (tabindex of iframe for accessibility). |