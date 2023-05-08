---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200168236-Configuring-IP-geolocation
title: Configuring IP geolocation
---

# Configuring IP geolocation



## Overview

Cloudflare can include the country code of the visitor's IP address (in [ISO 3166-1 Alpha 2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format) with each request between Cloudflare and the upstream origin web server. This allows site administrators to capture their visitor's IP location in server logging and/or application logic. Besides ISO country codes, Cloudflare uses the following special country codes:

-   `XX` - Used for clients without country code data.
-   `T1` - Used for clients using the Tor network.

The country code value is passed along in the **CF-IPCountry** request header to the origin web server. This header is not visible to visitors in the site's HTTP response.

Cloudflare includes country code information for both IPv4 and IPv6 addresses. Currently, the IPv4 information is more robust, but we expect the IPv6 data to improve rapidly.

___

## Add IP geolocation information

The recommended procedure to enable IP geolocation information is to [enable the **Add visitor location headers** Managed Transform](/rules/transform/managed-transforms/reference/). This Managed Transform adds HTTP request headers with location information for the visitor's IP address, such as city, country, continent, longitude, and latitude.

Besides using the Managed Transform, you can also enable the **IP Geolocation** feature in the [Cloudflare dashboard](https://dash.cloudflare.com/) (**Network** app), which will only add a request header for the visitor's country.

___

## Capturing IP geolocation data in server logs

Visitor traffic geolocation information can be captured in origin server logging. Below are two very common web server implementations and how a site administrator could configure custom logging for the country of their visitors. If you are using a Managed Transform to add geolocation information to requests, you can follow the same strategy for logging other geolocation values, like city or continent.

### Apache


```
LogFormat %{cf-ipcountry}i cloudflare_custom
```
_More about_ [_Apache LogFormat_](https://httpd.apache.org/docs/2.4/logs.html)

### NGINX


```
log_format cloudflare_custom '"$http_cf_ipcountry"';
```
_More about_ [_NGINX log\_format_](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/)

{{<Aside type="note">}}
The above configuration examples will **only** capture the CF-IPCountry
information. Alternatively, server administrators often append the log
variable cf-ipcountry to their existing log configuration with other
Cloudflare headers like cf-ray, cf-connecting-ip, and cf-visitor.
{{</Aside>}}

___

## Capturing IP geolocation data in application logic

Web applications can also capture and use IP geolocation information in their logic. This is useful to direct visitors based on their country or provide defaults such as language and currency. Below are common language examples of how to capture this header into a variable for later use.

### PHP

```php
$country_code = $_SERVER["HTTP_CF_IPCOUNTRY"];
```
### Python Flask

```python
country_code = request.headers.get('cf-ipcountry')
```
_Note that you'll need to import python flask request module_

### NodeJS

```js
const country_code = headers['cf-ipcountry'];
```

_Note that you'll need to require http/https and instantiate the createServer() method_

### C# (.NET)

```cs
string country_code = HttpContext.Current.Request.Headers.Get("cf-ipcountry");
```

### Perl

```perl
$country_code = $ENV{"HTTP_CF_IPCOUNTRY"};
```

___

## Troubleshooting

**How to report a wrong IP location?**

Cloudflare uses [Maxmind](https://www.maxmind.com/) as a geolocation database. Cloudflare updates its GeoIP database weekly.

You can use the [Maxmind tool](https://www.maxmind.com/en/geoip2-precision-demo) and make sure that Maxmind shows the correct **Country Code**. If the data is incorrect:

-   Please submit correction requests through Maxmind [here](https://support.maxmind.com/hc/en-us/articles/4408252036123-GeoIP-Corrections).
-   [Contact Cloudflare Support](https://support.cloudflare.com/hc/en-us/articles/200172476-Contacting-Cloudflare-Support) if Maxmind is showing the correct country code, but **CF-IPCountry** request header is incorrect.

___

## Related resources

-   [HTTP request headers](/fundamentals/get-started/reference/http-request-headers/)
-   [Managed Transforms](/rules/transform/managed-transforms/)
-   [Apache Log Files Format](https://httpd.apache.org/docs/2.4/logs.html)
-   [Configuring NGINX Logging](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/)
-   [NodeJS Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
