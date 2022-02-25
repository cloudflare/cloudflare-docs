---
pcx-content-type: reference
type: overview
title: CSP HTTP header format
weight: 3
layout: list
---

# CSP HTTP header format

The format of the Content Security Policy (CSP) report-only HTTP header added by Page Shield is the following:

```txt
content-security-policy-report-only: script-src 'none'; report-uri https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report?<QUERY_STRING>
```

If you [configured the reporting endpoint](/page-shield/use-dashboard/configure-reporting-endpoint/) to use the same hostname, the HTTP header will have the following format:

```txt
content-security-policy-report-only: script-src 'none'; report-uri <YOUR_HOSTNAME>/cdn-cgi/script_monitor/report?<QUERY_STRING>
```

## Related resources

*   [Mozilla Developer Network's (MDN) documentation on Content-Security-Policy-Report-Only](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)
