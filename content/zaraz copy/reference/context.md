---
pcx_content_type: reference
title: Zaraz Context
weight: 10
---

# Zaraz Context

The Zaraz Context is a versatile object that provides a set of configurable properties for Zaraz, a web analytics tool for tracking user behavior on websites. These properties can be accessed and utilized across various components, including [Worker Variables](/zaraz/advanced/worker-variables/) and [JSONata expressions](/zaraz/advanced/using-jsonata/).

System properties, which are automatically collected by Zaraz, provide insights into the user's environment and device, while Client properties, obtained through [Zaraz Web API](/zaraz/web-api/) calls like zaraz.track(), offer additional information on user behavior and actions.

## System properties

{{<table-wrap>}}

| Property | Type | Description |
| --- | --- | --- |
| `system.page.query` | Object | Key-Value object containing all query parameters in the current URL. |
| `system.page.title` | String | Current page title. |
| `system.page.url` | URL | [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) Object containing information about the current URL |
| `system.page.referrer` | String | Current page referrer from `document.referrer`. |
| `system.page.encoding` | String | Current page character encoding from `document.characterSet`. |
| `system.cookies` | Object | Key-Value object containg all present cookies. |
| `system.device.ip` | String | Visitor incoming IP address. |
| `system.device.resolution` | String | Screen resolution for device. |
| `system.device.viewport` | String | Visible web page area in user’s device. |
| `system.device.language` | String | Language used in user's device. |
| `system.device.user-agent.ua` | Object | Browser user agent. |
| `system.device.user-agent.browser.name` | String | Browser name. |
| `system.device.user-agent.browser.version` | String | Browser version. |
| `system.device.user-agent.engine.name` | String | Type of browser engine (for example, WebKit). |
| `system.device.user-agent.engine.version` | String | Version of the browser engine. |
| `system.device.user-agent.os.name` | String | Operating system. |
| `system.device.user-agent.os.version` | String | Version of the operating system. |
| `system.device.user-agent.device` | String | Type of device used (for example, iPhone). |
| `system.device.user-agent.cpu` | String | Device’s CPU. |
| `system.misc.random` | Number | Random number unique to each request. |
| `system.misc.timestamp` | Number | Unix time in seconds. |
| `system.misc.timestampMilliseconds` | Number | Unix time in milliseconds. |

{{</table-wrap>}}

## Event properties

{{<table-wrap>}}

| Property | Type | Description |
| --- | --- | --- |
| `client.__zarazTrack` | String | Returns the name of the event sent using the Track method of the Web API. Refer to [Zaraz Track](/zaraz/web-api/track/) for more information. |
| `client.<KEY_NAME>` | String | Returns the value of a `zaraz.track()` `eventProperties` key. The key can either be directly used in `zaraz.track()` or set using `zaraz.set()`. Replace `<KEY_NAME>` with the name of your key. Refer to [Zaraz Track](/zaraz/web-api/track/) for more information. |

{{</table-wrap>}}
