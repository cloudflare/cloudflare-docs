---
pcx-content-type: reference
title: Properties reference
layout: list
meta:
  title: Zaraz event and system properties
---

{{<content-column>}}

# Zaraz event and system properties

Cloudflare Zaraz offers event and system properties that you can use when configuring the product. They are helpful to send data to a third-party tool or to create triggers as they have context about a specific user's browser session and the actions they take on the website. Below is a list of event and system properties, how can you access them, and their values:

{{</content-column>}}

## System properties

{{<table-wrap>}}

| Property | Type | Description |
| --- | --- | --- |
| `{{ system.page.query.QUERY_PARAM }}` | String | Returns the value of a URL query parameter. Replace `QUERY_PARAM` with the name of your parameter. |
| `{{ system.page.title }}` | String | Returns the page title. |
| `{{ system.page.url.search }}` | String | Returns search parameters provided, beginning with the leading `?` character. |
| `{{ system.page.url.pathname }}` | String | Returns the path of the URL, including the initial `/`. Does not include the query string or fragment. |
| `{{ system.page.url.port }}` | String | Returns the port number of the URL. |
| `{{ system.page.url.hostname }}` | String | Returns the domain of the URL. |
| `{{ system.page.url.host }}` | String | Returns the domain (that is the hostname) followed by a `:` and the port of the URL (if a port was specified). |
| `{{ system.page.url.password }}` | String | Returns the password specified before the domain name. |
| `{{ system.page.url.username }}` | String | Returns the username specified before the domain name. |
| `{{ system.page.url.protocol }}` | String | Returns the protocol scheme of the URL, including the final `:`. |
| `{{ system.page.url.origin }}` | String | Returns the origin of the URL, that is its scheme, its domain and its port. |
| `{{ system.page.url.href }}` | String | Returns a string containing the entire URL |
| `{{ system.page.url.baseDomain }}` | String | Returns the base domain part of the URL, without any subdomains. |
| `{{ system.page.referrer }}` | String | Returns the page referrer from `document.referrer`. |
| `{{ system.page.encoding }}` | String | Returns the document character encoding from `document.characterSet`. |
| `{{ system.cookies.NAME_OF_COOKIE }}` | Object | Returns cookies obtained from the browser `document`. |
| `{{ system.device.ip }}` | String | Returns the incoming IP address. |
| `{{ system.device.resolution }}` | String | Returns screen resolution for device. |
| `{{ system.device.viewport }}` | String | Returns the visible web page area in user’s device. |
| `{{ system.device.language }}` | String | Returns the language used. |
| `{{ system.device.user-agent.ua }}` | String | Returns the browser’s user agent. |
| `{{ system.device.user-agent.browser.name }}` | String | Returns the browser’s name. |
| `{{ system.device.user-agent.browser.version }}` | String | Returns the browser’s version. |
| `{{ system.device.user-agent.engine.name }}` | String | Returns the type of browser engine (for example, WebKit). |
| `{{ system.device.user-agent.engine.version }}` | String | Returns the version of the browser’s engine. |
| `{{ system.device.user-agent.os.name }}` | String | Returns the operating system. |
| `{{ system.device.user-agent.os.version }}` | String | Returns the version of the operating system. |
| `{{ system.device.user-agent.device }}` | String | Returns the type of device used (for example, iPhone). |
| `{{ system.device.user-agent.cpu }}` | String | Returns the device’s CPU. |
| `{{ system.misc.random }}` | Number | Returns a random number unique to each request. |
| `{{ system.misc.timestamp }}` | Number | Returns Unix time in seconds. |
| `{{ system.misc.timestampMilliseconds }}` | Number | Returns Unix time in milliseconds. |

{{</table-wrap>}}

## Event properties

{{<table-wrap>}}

| Property | Type | Description |
| --- | --- | --- |
| `{{ client.__zarazTrack }}` | String | Returns the name of the event sent using the Track method of the Web API. Refer to [Zaraz Track](/zaraz/web-api/track/) for more information. |
| `{{ client.<KEY_NAME> }}` | String | Returns the value of a `zaraz.track()` `eventProperties` key. The key can either be directly used in `zaraz.track()` or set using `zaraz.set()`. Replace `<KEY_NAME>` with the name of your key. Refer to [Zaraz Track](/zaraz/web-api/track/) for more information. |

{{</table-wrap>}}
