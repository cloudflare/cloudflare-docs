---
title: Change log
order: 6
pcx-content-type: changelog
---

# Change log for `beacon.min.js`

Cloudflare occasionally updates the `beacon.min.js` file to improve Web Analytics functionality. The table below includes a log of what changed in the `beacon.min.js` file and when.

<TableWrap>

| Date of change | Description |
| ---------------|------------- |
| 2021-12-14     | Improved site filtering. |
| 2021-11-16     | When using the automatic installation feature of the JavaScript Beacon (available only to customers proxied through Cloudflare - also known as orange-clouded customers), [Subresource Integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) is now enabled by default. SRI is a security feature that enables browsers to verify that resources they fetch are delivered without unexpected manipulation. |
| 2021-09-01     | Improved to report debugging information for Core Web Vitals. |
| 2021-05-28     | `startsWith` function replaced with `indexOf` function, which prevents rendering if multiple beacon scripts are loaded. |
| 2021-05-12     | Reporting endpoint changed from `/cdn-cgi/beacon/performance` to `/cdn-cgi/rum` (for Browser Insights only). |

</TableWrap>