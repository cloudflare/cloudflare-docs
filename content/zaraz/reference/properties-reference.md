---
pcx_content_type: reference
title: Properties reference
---

# Properties reference

Cloudflare Zaraz offers properties that you can use when configuring the product. They are helpful to send data to a third-party tool or to create triggers as they have context about a specific user's browser session and the actions they take on the website. Below is a list of the properties you can access from the Cloudflare dashboard and their values.

## Web API

{{<table-wrap>}}

Property               | Description
---------------------- | -----------
_Track Name_           | Returns the name of the event sent using the Track method of the Web API. Refer to the [Track method](/zaraz/web-api/track/) for more information.
_Track Property name:_ | Returns the value of a `zaraz.track()` `eventProperties` key. The key can either be directly used in `zaraz.track()` or set using `zaraz.set()`. Set the name of your key here. Refer to the [Set method](/zaraz/web-api/set/) for more information.

{{</table-wrap>}}

## Page Properties

{{<table-wrap>}}

Property                  | Description
------------------------- | -----------
_Page character encoding_ | Returns the document character encoding from `document.characterSet`.
_Page referrer_           | Returns the page referrer from `document.referrer`.
_Page title_              | Returns the page title.
_Query param name:_       | Returns the value of a URL query parameter. When you choose this variable, you need to set the name of your parameter.
_URL_                     | Returns a string containing the entire URL.
_URL base domain_         | Returns the base domain part of the URL, without any subdomains.
_URL host_                | Returns the domain (that is, the hostname) followed by a `:` and the port of the URL (if a port was specified).
_URL hostname_            | Returns the domain of the URL.
_URL origin_              | Returns the origin of the URL — that is, its scheme, domain, and port.
_URL password_            | Returns the password specified before the domain name.
_URL pathname_            | Returns the path of the URL, including the initial `/`. Does not include the query string or fragment.
_URL port_                | Returns the port number of the URL.
_URL protocol scheme_     | Returns the protocol scheme of the URL, including the final `:`.
_URL query parameters_    | Returns query parameters provided, beginning with the leading `?` character.
_URL username_            | Returns the username specified before the domain name.

{{</table-wrap>}}

## Cookies

{{<table-wrap>}}

Property       | Description
-------------- | ----------
_Cookie name:_ | Returns cookies obtained from the browser `document`.

{{</table-wrap>}}

## Device properties

{{<table-wrap>}}

Property                   | Description
-------------------------- | -----------
_Browser engine_           | Returns the type of browser engine (for example, `WebKit`).
_Browser engine version_   | Returns the version of the browser’s engine.
_Browser name_             | Returns the browser’s name.
_Browser version_          | Returns the browser’s version.
_Device CPU_               | Returns the device’s CPU.
_Device IP address_        | Returns the incoming IP address.
_Device language_          | Returns the language used.
_Device screen resolution_ | Returns the screen resolution of the device.
_Device type_              | Returns the type of device used (for example, `iPhone`).
_Device viewport_          | Returns the visible web page area in user’s device.
_Operating system name_    | Returns the operating system.
_Operating system version_ | Returns the version of the operating system.
_User-agent string_	       | Returns the browser’s user agent.

{{</table-wrap>}}

## Device location

{{<table-wrap>}}

Property 		| Description
--------------- | -----------
_City_ 			| Returns the city of the incoming request. For example, `Lisbon`.
_Continent_ 	| Returns the continent of the incoming request. For example, `EU`
_Country_ code	| Returns the country code of the incoming request. For example, `PT`.
_EU_ country 	| Returns a `1` if the country of the incoming request is in the European Union, and a `0` if it is not.
_Region_ 		| Returns the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) name for the first level region associated with the IP address of the incoming request. For example, `Lisbon`.
_Region_ code 	| Returns the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) region code associated with the IP address of the incoming request. For example, `11`.
_Timezone_ 		| Returns the timezone of the incoming request. For example, `Europe/Lisbon`.

{{</table-wrap>}}

## Miscellaneous

{{<table-wrap>}}

Property                   | Description
-------------------------- | -----------
_Random number_            | Returns a random number unique to each request.
_Timestamp (milliseconds)_ | Returns the Unix time in milliseconds.
_Timestamp (seconds)_      | Returns the Unix time in seconds.

{{</table-wrap>}}