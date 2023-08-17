---
pcx_content_type: changelog
title: Changelog
meta:
  description: Review recent changes to Cloudflare Radar.
rss: file
weight: 7
---

# Changelog

## 2023-08-14

- Added Regional Internet Registry (see field `source` in response)
  to [get asn by id](https://developers.cloudflare.com/api/operations/radar-get-entities-asn-by-id)
  and [get asn by ip](https://developers.cloudflare.com/api/operations/radar-get-entities-asn-by-ip) endpoints.
- Stopped collecting data in the old Layer 3 data source.
- Updated Layer 3
  [timeseries](https://developers.cloudflare.com/api/operations/radar-get-attacks-layer3-timeseries-by-bytes) endpoint
  to start using the new Layer 3 data source by default, fetching the old data source now requires sending the parameter
  `metric=bytes_old`.

## 2023-07-31

- Updated HTTP `timeseries` endpoints urls
  to `timeseries_groups` ([example](https://developers.cloudflare.com/api/operations/radar-get-http-timeseries-group-by-browser-families))
  due to consistency. Old timeseries endpoints are still available, but will soon be removed.

## 2023-07-20

- Added [urlscanner endpoints](https://developers.cloudflare.com/api/operations/urlscanner-search-scans), read
  more [here](https://developers.cloudflare.com/radar/investigate/url-scanner/).

## 2023-06-20

- Added [quality endpoints](https://developers.cloudflare.com/api/operations/radar-get-quality-index-summary).

## 2023-06-07

- Added BGP [stats](https://developers.cloudflare.com/api/operations/radar-get-bgp-routes-stats),
  [pfx2as](https://developers.cloudflare.com/api/operations/radar-get-bgp-pfx2as)
  and [moas](https://developers.cloudflare.com/api/operations/radar-get-bgp-pfx2as-moas) endpoints.

## 2023-05-10

- Added `IOS` as an option for the OS parameter in all HTTP
  endpoints ([example](https://developers.cloudflare.com/api/operations/radar-get-http-summary-by-bot-class)).

## 2023-03-20

- Added [AS112 endpoints](https://developers.cloudflare.com/api/operations/radar-get-dns-as112-timeseries-by-dnssec).
- Added [email endpoints](https://developers.cloudflare.com/api/operations/radar-get-email-security-summary-by-arc).

## 2023-01-23

- IPv6 percentage started to be calculated as (IPv6 requests / requests for dual-stacked content), where as before it
  was calculated as (IPv6 requests / IPv4+IPv6 requests).

## 2023-01-11

- Added new Layer 3 data source and related endpoints.
- Updated Layer 3
  [timeseries](https://developers.cloudflare.com/api/operations/radar-get-attacks-layer3-timeseries-by-bytes) endpoint
  to support fetching both current and new data sources. For retro-compatibility
  reasons, fetching the new data source requires sending the parameter `metric=bytes` else the current data
  source will be returned.
- Deprecated old Layer 3 endpoints
  [TimeseriesGroups](https://developers.cloudflare.com/api/operations/radar-get-attacks-layer3-timeseries-groups) and
  [Summary](https://developers.cloudflare.com/api/operations/radar-get-attacks-layer3-summary).
  Users should upgrade to newer endpoints.