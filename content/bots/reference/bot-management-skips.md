---
pcx_content_type: troubleshooting
title: Bot Management skips
weight: 0
---

# Bot Management skips

There are instances in which Bot Management does not run and certain fields are not populated because it has been determined that running Bot Management would either be unnecessary or produce misleading results.

## Common reasons for Bot Management to skip

### Internal services

Requests to routes such as `/cdn-cgi/` are handled individually and will never run the Bot Management module. Email obfuscation, web analytics, trace requests, Managed Challenge, and JavaScript Challenge do not receive bot scores. Refer to the table below for examples of internal services.

| Route | Method |
| --- | --- |
| `/cdn-cgi/rum` | `POST` | 
| `/cdn-cgi/script_monitor/report` | `POST` |
| `/cdn-cgi/trace` | `GET` |
| `/cdn-cgi/challenge-platform/…` | `GET` |
| `/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js` | `GET` |

### Same zone edgeworker and Grey Cloud sub-requests

Same zone edgeworker subrequests will not receive a bot score or have JavaScript injected. 

### Purge requests

All `HTTP` Purge requests will not receive a bot score. 

### Early hints cache requests

Early hints cache requests will not receive a bot score. 