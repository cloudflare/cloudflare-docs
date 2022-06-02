---
pcx-content-type: reference
title: Settings
meta:
  title: Zaraz settings
---

# Zaraz settings

To configure Zaraz's general settings, click [**Zaraz**](https://dash.cloudflare.com/?to=/:account/:zone/zaraz) > **Settings**.

## Web API

### Debug Key

The debug key is used to enable Debug Mode. Refer to [Debug mode](/zaraz/web-api/debug-mode/) for more information.

### E-commerce tracking

Toggle this option on to enable the Zaraz E-commerce API. Refer to [Ecommerce](/zaraz/web-api/ecommerce/) for more information.

## Compatibility

### Data layer compatibility mode

Cloudflare Zaraz offers backwards compatibility with the `dataLayer` function found in tag management software, used to track events and other parameters. You can toggle this option off if you do not need it. Refer to [Data layer compatibility mode](/zaraz/advanced/datalayer-compatibility/) for more information.

### Single Page Application support

When you toggle Single Page Application support off, the `pageview` trigger will only work when loading a new web page. When enabled, Zaraz's `pageview` trigger will work every time the URL changes on a single page application. This is also known as virtual page views.

## Injection

### Auto-inject script

This option automatically injects the script needed for Zaraz to work on your website. It is turned on by default.

If you turn this option off, Zaraz will stop automatically injecting its script on your domain. If you still want Zaraz functionality, you will need to add the Zaraz script manually. Refer to [Load Zaraz manually](/zaraz/advanced/load-zaraz-manually/) for more information.

### Iframe injection

When toggled on, the Zaraz script will also be injected into `iframe` elements.

## Endpoints

Specify custom URLs for Zaraz's scripts. You need to use a valid pathname:

```txt
/<PATHNAME>/<FILE.JS>>
```

This is an example of a custom pathname to host Zaraz's initialization script:

```txt
/my-server/my-scripts/start.js
```