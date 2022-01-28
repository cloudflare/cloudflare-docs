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

This option automatically injects the script needed for Zaraz to work on your website. It is turned on by default.

If you turn this option off, Zaraz will stop automatically injecting its script on your domain. If you still want Zaraz functionality, you will need to add the Zaraz script manually.

To load Zaraz manually, you need to include the Zaraz script in your HTML, immediately before the `</head>` tag closes. The path to your script would be `/cdn-cgi/zaraz/i.js` on your domain. Your script tag should look like this:

```html
<script src="/cdn-cgi/zaraz/i.js"></script>
```

With this script, your page HTML should be similar to the following:

```html

<html>
<head>
…
<script src="/cdn-cgi/zaraz/i.js"></script>
</head>
<body>
…
</body>
</html>
```