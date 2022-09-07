---
pcx_content_type: get-started
title: Get started
weight: 2
layout: single
---

# Get started

This guide is meant for customers to get started on setting up the Turnstile widget. 

If you are currently using a CAPTCHA service, you can simply copy and paste our script wherever you have deployed the existing script today. 
 
## Sitekey and secret key
To start using the Turnstile widget, you will need to obtain a sitekey and a secret key. 

The sitekey is public and used to invoke the Turnstile widget on your site. 

The secret key is generated upon the creation of a widget, allowing communication between your site and Cloudflare to verify responses for a solved challenge from Turnstile. The secret key should be kept safe and only known to the customer for security purposes.

{{<Aside type="note">}}

Check with your account team to ensure that Challenges are enabled for your account. 

{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. *Step to get to landing page*
3. Select **Add a site** and fill out the form.
4. Copy your Site Key and Secret Key.


## Add the Turnstile widget to your site

To add the Turnstile widget:

1. Render the client-side integration

    * [Explicit rendering](/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget)
    * [Implicit rendering](/turnstile/get-started/client-side-rendering/#implicitly-render-the-turnstile-widget)

2. [Validate the server-side response](/turnstile/get-started/server-side-validation/)
