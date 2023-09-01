---
pcx_content_type: troubleshooting
title: Bot Management skips
weight: 0
---

# Bot Management does not score a request

There are instances in which Bot Management does not run and certain fields, such as the [JA3 field](/bots/concepts/ja3-fingerprint/), are not populated because it has been determined that running Bot Management would not be necessary.

## Common reasons for Bot Management to not score a request

### Requests to internal endpoints

Requests such as `/cdn-cgi/` are handled individually and will never receive a Bot Management score. Email Obfuscation, Web Analytics, Trace Requests, Challenge Pages, and JavaScript Detections do not receive bot scores. Refer to the table below for some examples of internal endpoints.

| Route |
| --- |
| `/cdn-cgi/rum` |
| `/cdn-cgi/script_monitor/report` |
| `/cdn-cgi/trace` |
| `/cdn-cgi/challenge-platform/…` |
| `/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js` |

### Same zone edgeworker and Grey Cloud sub-requests

Same zone edgeworker subrequests will not receive a bot score or have JavaScript injected.

### Purge requests

All HTTP purge requests will not receive a bot score.

### Early hints cache requests

Early hints cache requests will not receive a bot score.