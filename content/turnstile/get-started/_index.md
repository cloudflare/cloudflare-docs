---
title: Get started
pcx_content_type: get-started
weight: 2
layout: single
---

# Get started

This guide will get you started on setting up the Turnstile widget. 

If you are currently using a CAPTCHA service, you can copy and paste our script wherever you have deployed the existing script today. 
 
## Get a sitekey and secret key

To start using the Turnstile widget, you will need to obtain a sitekey and a secret key. The sitekey and secret key are always associated with one widget and cannot be reused for other widgets.

The sitekey is public and used to invoke the Turnstile widget on your site.

The sitekey and secret key are generated upon the creation of a widget, allowing communication between your site and Cloudflare to verify responses for a solved challenge from Turnstile. Make sure you keep the secret key safe for security reasons.

### New sites

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/turnstile) and select your account.
2. Go to **Turnstile**.
3. Select **Add a site** and fill out the form.
4. Copy your sitekey and secret key.

### Existing sites

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/turnstile) and select your account.
2. Go to **Turnstile**.
3. In the widget overview, select **Settings**.
4. Copy your sitekey and secret key.

## Add the Turnstile widget to your site

To add the Turnstile widget:

1. Insert the Turnstile script snippet in your HTML's `<head>` element:

<div>

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```
</div>


2. [Render the client-side integration](/turnstile/get-started/client-side-rendering/)

    * [Explicit rendering](/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget)
    * [Implicit rendering](/turnstile/get-started/client-side-rendering/#implicitly-render-the-turnstile-widget)

## Validate the server-side response

After you have installed the Turnstile widget on your site, you must configure your server to validate the Turnstile response.
Refer to [Server-side validation](/turnstile/get-started/server-side-validation/).

{{<Aside type= "note">}}
Rendering the client-side integration & validating the server-side response are both necessary to allow Turnstile to function properly.
{{</Aside>}}