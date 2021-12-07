---
order: 4
pcx-content-type: reference
type: overview
---

<ContentColumn>

# Accessing User Properties 

Cloudflare Zaraz offers system properties that you can use when configuring the dashboard. They are helpful to send data to a third-party tool or to create triggers as they have context about a specific user's browser session and the actions they take on the website. Here is a full list of the System properties, how can you access them, and their values:

</ContentColumn>

<TableWrap>

Property | Type | Description
---------|------| ------------
`system.page.query`| `object` | Returns URL query params from the `document.location`.
`system.page.title`| `string` | Returns the page title.
`system.page.url`| `string` | Returns the full URL from the `document.location`.
`system.page.referrer`| `string` | Returns the page referrer from `document.referrer`.
`system.page.encoding`| `string` | Returns the document character encoding from `document.characterSet`.
`system.cookies.NAME_OF_COOKIE`| `object` | Returns cookies obtained from the browser `document`.
`system.device.ip`| `string` | Returns the incoming IP address.
`system.device.resolution`| `string` | Returns screen resolution for device.
`system.device.viewport`| `string` | Returns the visible web page area in user’s device.
`system.device.language`| `string` | Returns the language used.
`system.device.user-agent.ua`| `string` | Returns the browser’s user agent.
`system.device.user-agent.browser.name`| `string` | Returns the browser’s name.
`system.device.user-agent.browser.version`| `string` | Returns the browser’s version.
`system.device.user-agent.engine.name`| `string` | Returns the type of browser engine (for example, WebKit). 
`system.device.user-agent.engine.version`| `string` | Returns the version of the browser’s engine.
`system.device.user-agent.os.name`| `string` | Returns the operating system.
`system.device.user-agent.os.version`| `string` | Returns the version of the operating system.
`system.device.user-agent.device`| `string` | Returns the type of device used (for example, iPhone).
`system.device.user-agent.cpu`| `string` | Returns the device’s CPU.
`system.misc.random`| `number` | Returns a random number unique to each request.
`system.misc.timestamp`| `number` | Returns Unix time in milliseconds.
`client.__zarazTrack`| `string` | Returns the name of the event sent using the Events API. Refer to [Events API](/events-api) for more information.

</TableWrap>