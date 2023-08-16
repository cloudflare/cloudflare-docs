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

- Stopped collecting data in the old Layer 3 data source
- Updated Layer 3
[timeseries](https://developers.cloudflare.com/api/operations/radar-get-attacks-layer3-timeseries-by-bytes) endpoint
to start using the new Layer 3 data source by default, fetching the old data source now requires sending the parameter
`metric=bytes_old`

## 2023-01-23

- IPv6 calculation started using only dual-stacked requests as denominator, instead of all requests.

## 2023-01-11

- Added new Layer 3 data source and related endpoints
- Updated Layer 3
[timeseries](https://developers.cloudflare.com/api/operations/radar-get-attacks-layer3-timeseries-by-bytes) endpoint
to support fetching both current and new data sources. For retro-compatibility
reasons, fetching the new data source requires sending the parameter `metric=bytes` else the current data
source will be returned
- Deprecated old Layer 3 endpoints
[TimeseriesGroups](https://developers.cloudflare.com/api/operations/radar-get-attacks-layer3-timeseries-groups) and
[Summary](https://developers.cloudflare.com/api/operations/radar-get-attacks-layer3-summary).
Users should upgrade to newer endpoints