---
title: Changelog
pcx_content_type: changelog
weight: 7
meta:
  title: Changelog for beacon.min.js
rss: file
---

# Changelog for `beacon.min.js`

Cloudflare occasionally updates the `beacon.min.js` file to improve Web Analytics functionality. The table below includes a log of what changed in the `beacon.min.js` file and when.


| <div style="width:150px">Date of change</div> | Description |
| -------------- | ----------- |
| 2023-07-25     | Fixed ETag format in the response header.
| 2023-07-13     | Fixed the issue that was causing an illegal invocation error.
| 2023-04-19     | Reports additional LCP diagnostic information using web-vitals library's attribution build.
| 2023-04-06     | Updated webpack configuration to output code in ECMAScript 3 (ES3) format.
| 2023-03-23     | Updated Google's web-vitals library (version 3.1.1) and removed experimental `server-timing` header.
| 2022-10-17     | Updated to report new metrics such as time to first byte (TTFB), interaction to next paint (INP), and first contentful paint (FCP). Additionally, it reports `navigator.webdriver`, `server-timing` header (experimental), and protocol info (`nextHopProtocol`). |
| 2021-12-14     | Improved site filtering. |
| 2021-11-16     | When using the automatic installation feature of the JavaScript Beacon (available only to customers proxied through Cloudflare - also known as orange-clouded customers), [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) is now enabled by default. SRI is a security feature that enables browsers to verify that resources they fetch are delivered without unexpected manipulation. |
| 2021-09-01     | Improved to report debugging information for Core Web Vitals. |
| 2021-05-28     | `startsWith` function replaced with `indexOf` function, which prevents rendering if multiple beacon scripts are loaded. |
| 2021-05-12     | Reporting endpoint changed from `/cdn-cgi/beacon/performance` to `/cdn-cgi/rum` (for Browser Insights only). |
