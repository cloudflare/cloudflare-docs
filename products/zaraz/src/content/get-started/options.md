---
order: 7
pcx-content-type: reference
title: Options
---

# Zaraz options

Configure Zaraz's general options for a website from its [main dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz).

## Data layer compatibility mode

Cloudflare Zaraz offers backwards compatibility with the `dataLayer` function found in tag management software, used to track events and other parameters. You can toggle this option off if you do not need it. Refer to [Data layer compatibility mode](/datalayer-compatibility) for more information.

## Single Page Application support

When you toggle Single Page Application support off, the `pageview` trigger will only work when loading a new web page. When enabled, Zaraz's `pageview` trigger will work every time the URL changes on a single page application. This is also known as virtual page views.

## Auto-inject script

This option automatically injects the script needed for Zaraz to work in your website. It is turned on by default.

If you turn this option off, you will have to proxy a subdomain for your website through Cloudflare, and manually add a JavaScript snippet to your HTML for Zaraz to work:

  1. Create a new subdomain like `newsub.example.com` and proxy it through Cloudflare. Refer to [Enabling the Orange Cloud](https://community.cloudflare.com/t/step-3-enabling-the-orange-cloud/52715) for more information.
  1. Add the following script to your website:

  ```html
  <script src="https://<YOUR_SUBDOMAIN>/cdn-cgi/zaraz/i.js"></script>
  ```