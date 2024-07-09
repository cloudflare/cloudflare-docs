---
pcx_content_type: concept
source: https://support.cloudflare.com/hc/en-us/articles/200168236-Configuring-IP-geolocation
title: IP geolocation
---

# IP geolocation

IP geolocation adds the [`CF-IPCountry` header](/fundamentals/reference/http-request-headers/#cf-ipcountry) to all requests to your origin server.

Cloudflare automatically updates its IP geolocation database using MaxMind and other data sources, typically twice a week.

## Availability

{{<feature-table id="network.ip_geolocation">}}

## Add IP geolocation information

The recommended procedure to enable IP geolocation information is to [enable the **Add visitor location headers** Managed Transform](/rules/transform/managed-transforms/reference/#add-visitor-location-headers). This Managed Transform adds HTTP request headers with location information for the visitor's IP address, such as city, country, continent, longitude, and latitude.

If you only want the request header for the visitor's country, you can enable **IP Geolocation**.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To enable **IP Geolocation** in the dashboard:

1.  Log in to your [Cloudflare account](https://dash.cloudflare.com) and go to a specific domain.
2.  Go to **Network**.
3.  For **IP Geolocation**, switch the toggle to **On**.

{{</tab>}}
{{<tab label="api" no-code="true">}}

To enable **IP Geolocation** with the API, send a [`PATCH`](/api/operations/zone-settings-edit-single-setting) request with `ip_geolocation` as the setting name in the URI path, and the `value` parameter set to `"on"`.

{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

In order to use this data, you will need to then retrieve it from the [`CF-IPCountry` header](/fundamentals/reference/http-request-headers/#cf-ipcountry).

{{</Aside>}}

___

## Report an incorrect IP location

If you find an incorrect IP location, consider the following:

- If the IP is part of the [current Cloudflare IP ranges](https://www.cloudflare.com/ips/), report to `geoip@cloudflare.com`.
- If the IP is **not** listed within the [current Cloudflare IP ranges](https://www.cloudflare.com/ips/), [report to MaxMind](https://www.maxmind.com/en/geoip-data-correction-request).