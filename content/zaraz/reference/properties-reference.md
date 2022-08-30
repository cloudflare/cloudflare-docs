---
pcx_content_type: reference
title: Properties reference
# layout: table
meta:
  title: Zaraz event and system properties
---

# Zaraz event and system properties

Cloudflare Zaraz offers properties that you can use when configuring the product. They are helpful to send data to a third-party tool or to create triggers as they have context about a specific user's browser session and the actions they take on the website. Below is a list of properties, how can you access them, and their values:

## Web API

{{<table-wrap>}}

Property | Type | Description
--- | --- | ---
_Track Name_ | String | Returns the name of the event sent using the Track method of the Web API. Refer to [Zaraz Track](/zaraz/web-api/track/) for more information.
_Track Property: name:_ |String | Returns the value of a `zaraz.track()` `eventProperties` key. The key can either be directly used in `zaraz.track()` or set using `zaraz.set()`. Set the name of your key here. Refer to [Zaraz Track](/zaraz/web-api/track/) for more information.

{{</table-wrap>}}

## Page Properties

{{<table-wrap>}}

Property | Type | Description
--- | --- | ---
_Page character encoding_ | String | Returns the document character encoding from `document.characterSet`.
_Page referrer_ | String | Returns the page referrer from `document.referrer`.
_Page title_ | String | Returns the page title.
_Query param: name:_ | String | Returns the value of a URL query parameter. When you choose this variable, you need to set the name of your parameter.
_URL_ | String | Returns a string containing the entire URL.
_URL base domain_ | String | Returns the base domain part of the URL, without any subdomains.
_URL host_ | String | Returns the domain (that is the hostname) followed by a `:` and the port of the URL (if a port was specified).
_URL hostname_ | String | Returns the domain of the URL.
_URL origin_ | String | Returns the origin of the URL, that is its scheme, its domain and its port.
_URL password_ | String | Returns the password specified before the domain name.
_ULR pathname_ | String | Returns the path of the URL, including the initial `/`. Does not include the query string or fragment.
_URL port_ | String | Returns the port number of the URL.
_URL protocol scheme_ | String | Returns the protocol scheme of the URL, including the final `:`.
_URL query parameters_ | String | Returns search parameters provided, beginning with the leading `?` character.
_URL username_ | String | Returns the username specified before the domain name.

{{</table-wrap>}}

## Cookies

{{<table-wrap>}}

Property | Type | Description
--- | --- | ---
_Cookie: name:_ | Object | Returns cookies obtained from the browser `document`.

{{</table-wrap>}}

## Device properties

{{<table-wrap>}}

Property | Type | Description
--- | --- | ---
_Browser engine_ | String | Returns the type of browser engine (for example, WebKit).
_Browser engine version_ | String | Returns the version of the browser’s engine.
_Browser name_ | String | Returns the browser’s name.
_Browser version_ | String | Returns the browser’s version.
_Device CPU_ | String | Returns the device’s CPU.
_Device IP address_ | String | Returns the incoming IP address.
_Device language_ | String | Returns the language used.
_Device screen resolution_ | String | Returns screen resolution for device.
_Device type_ | String | Returns the type of device used (for example, iPhone).
_Device viewport_ | String | Returns the visible web page area in user’s device.
_Operating system name_ | String | Returns the operating system.
_Operating system version_ | String | Returns the version of the operating system.
_User-agent string_	| String | Returns the browser’s user agent.

{{</table-wrap>}}

## Miscellaneous

{{<table-wrap>}}

Property | Type | Description
--- | --- | ---
_Random number_ | Number | Returns a random number unique to each request.
_Timestamp (milliseconds)_ | Number | Returns Unix time in milliseconds.
_Timestamp (seconds)_ | Number | Returns Unix time in seconds.

{{</table-wrap>}}