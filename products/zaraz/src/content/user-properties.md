---
order: 4
pcx-content-type: reference
---

# Accessing User Properties 

Cloudflare Zaraz offers system properties that you can use when configuring the dashboard. They are helpful to send data to a third-party tool or to create triggers as they have context about a specific user's browser session and the actions they take on the website. Here is a full list of the System properties, how can you access them, and their values:

<TableWrap>

Property | Type | Description
---------|------| ------------
`system.page.query`| `object` | URL Query params from the ‘document.location’
`system.page.title`| `string` | Page title
`system.page.url`| `string` | Full URL from the ‘document.location’
`system.page.referrer`| `string` | Page referrer from ‘document.referrer’
`system.page.encoding`| `string` | Document character encoding from ‘document.characterSet’
`system.cookies.NAME_OF_COOKIE`| `object` | Cookies obtained from the browser `document`.
`system.device.ip`| `string` | Incoming IP address.
`system.device.resolution`| `string` | Screen resolution for device.
`system.device.viewport`| `string` | Visible webpage area in user’s device.
`system.device.language`| `string` | Language used.
`system.device.user-agent.ua`| `string` | Browser’s user agent.
`system.device.user-agent.browser.name`| `string` | Browser’s name.
`system.device.user-agent.browser.version`| `string` | Browser’s version.
`system.device.user-agent.engine.name`| `string` | Type of browser engine (for example, WebKit). 
`system.device.user-agent.engine.version`| `string` | Version of the browser’s engine
`system.device.user-agent.os.name`| `string` | Returns the operating system.
`system.device.user-agent.os.version`| `string` | Returns the version of the operating system.
`system.device.user-agent.device`| `string` | Type of device used (for example, iPhone).
`system.device.user-agent.cpu`| `string` | Returns the device’s CPU.
`system.misc.random`| `number` | A random number unique to each request.
`system.misc.timestamp`| `number` | Unix time in milliseconds.
`client.__zarazTrack`| `string` | Name of the event sent using the Events API. See [Events API](/events-api) for more information.

</TableWrap>