---
pcx_content_type: reference
title: Global rules
weight: 3
---

# Global rules

Cloudflare Zero Trust applies a set of **global rules** to all accounts.

{{<table-wrap>}}

| Criteria       | Value                          | Action    | Description                                                                                                                                                                                               |
|----------------|--------------------------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Hostname       | `*.cloudflareclient.com`       | bypass    | `engage.cloudflareclient.com` is used by client for registration. This policy ensures that customers cannot accidentally block themselves from making account changes.                                    |
| Hostname       | `*.assets.browser.run`         | bypass    | Do not inspect `assets.browser.run` or `*.assets.browser.run`                                                                                                                                             |
| Hostname       | `*.edge.browser.run`           |           | Anything bound for *edge.browser.run needs to go the isolation browser. But we can not let the users DNI these requests, so we forcefully turn on inspect on these domains                                |
| Hostname       | `*.edge.browser.run`           | isolate   | Anything bound for *edge.browser.run needs to go the isolation browser                                                                                                                                    |
| Request Header | `Accept: text/html`            | noisolate | Browsers issue an `Accept:` header that begins with `text/html`. Do not isolate if we don't see such a header because this is not a browser                                                               |
| Hostname       | `help.teams.cloudflare.com`    | allow     | Zero Trust client will use this to check if Gateway is on by inspecting cert. Also will check if certificate is properly installed on client machine                                                      |
| Hostname       | `*.cloudflare-gateway.com`     | bypass    | Ensure we bypass requests to cloudflare-gateway.com DNS endpoint                                                                                                                                          |
| Hostname       | `*.cloudflarestatus.com`       | bypass    | Bypass `cloudflarestatus.com` so customers can reach the page in case of Gateway outage                                                                                                                   |
| Hostname       | `*.net.cloudflare.com`         | bypass    | Bypass `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature                                                                                                                        |
| Hostname       | `api.cloudflare.com`           | bypass    | Bypass Cloudflare API endpoint                                                                                                                                                                            |
| Hostname       | `dash.teams.cloudflare.com`    | bypass    | Bypass teams dashboard to avoid customers locking themselves out. Only match dash.teams.cloudflare.com specifically to avoid clashing with helps.teams.cloudflare.com Allow rule (used for cert checking) |
| Hostname       | `*.dash.cloudflare.com`        | bypass    | Bypass main dash (need if CF One dash moves to /one). Also bypass subdomains (if One dash moves to one.dash.*)                                                                                            |
| Hostname       | `apps.ids`                     | bypass    | Add OCSP application to global HTTP bypass rules                                                                                                                                                          |
| Hostname       | `*.cloudflareaccess.com`       | allow     | Add Cloudflare Access Allow l7                                                                                                                                                                            |
| Hostname       | `blocked.teams.cloudflare.com` | bypass    | Avoid infinite loop on block page                                                                                                                                                                         |
| Hostname       | `*.nel.cloudflare.com`         | allow     | Allow L4 access to SNI domains necessary for WARP registration                                                                                                                                            |
| Hostname       | `*.cloudflareclient.com`       | allow     | Add global SNI rules                                                                                                                                                                                      |
| Hostname       | `*.cloudflare-gateway.com`     | allow     | Add global SNI rules                                                                                                                                                                                      |
| Hostname       | `?`                            | allow     | Add global SNI rules                                                                                                                                                                                      |
| Hostname       | `*.cloudflareaccess.com`       | allow     | Add global SNI rules                                                                                                                                                                                      |
| Hostname       |                                | block     | Block child abuse on the Gateway Proxy                                                                                                                                                                    |
| Hostname       |                                | noisolate | Do not isolate any help pages or developer docs that RBI redirects to help users troubleshoot configuration or isolation issues.                                                                          |

{{</table-wrap>}}
