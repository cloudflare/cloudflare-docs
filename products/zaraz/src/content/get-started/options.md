---
order: 6
pcx-content-type: reference
title: Options
---

# Zaraz options

Configure Zaraz's general options for a website from its [main dashboard](https://dash.cloudflare.com/?to=/:account/:zone/zaraz).

## Data layer compatibility mode

Cloudflare Zaraz offers backwards compatibility with the `dataLayer` function found in tag management software, used to track events and other parameters. You can toggle this option off if you do not need it. Refer to [Data layer compatibility mode](/datalayer-compatibility) for more information.

## Single Page Application support

When you toggle Single Page Application support off, the `pageview` trigger will only work when loading a new web page. When enabled, Zaraz's `pageview` trigger will work every time the URL changes on a single page application. This is also known as virtual page views.