---
pcx-content-type: reference
type: overview
title: CSP HTTP header format
weight: 3
layout: list
---

# CSP HTTP header format

The format of the Content Security Policy (CSP) report-only HTTP header added by Page Shield is the following:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">content-security-policy-report-only: script-src 'none'; report-uri https://csp-reporting.cloudflare.com/cdn-cgi/script_monitor/report?&ltQUERY_STRING&gt</span></div></span></span></span></code></pre>{{</raw>}}

If you [configured the reporting endpoint](/page-shield/use-dashboard/configure-reporting-endpoint/) to use the same hostname, the HTTP header will have the following format:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">content-security-policy-report-only: script-src 'none'; report-uri &ltYOUR_HOSTNAME&gt/cdn-cgi/script_monitor/report?&ltQUERY_STRING&gt</span></div></span></span></span></code></pre>{{</raw>}}

## Related resources

- [Mozilla Developer Network's (MDN) documentation on Content-Security-Policy-Report-Only](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)
