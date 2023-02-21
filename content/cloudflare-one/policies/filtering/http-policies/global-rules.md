---
pcx_content_type: reference
title: Global rules
weight: 3
---

# Global rules

Cloudflare Zero Trust applies a set of **global rules** to all accounts.

{{<table-wrap>}}

| Criteria       | Value                                                        | Action    | Description                                                                                                                                                                                 |
| -------------- | ------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hostname       | `*.cloudflareclient.com`                                     | bypass    | `engage.cloudflareclient.com` is used by client for registration. This policy ensures that users cannot accidentally block themselves from making account changes.                          |
| Hostname       | `*.assets.browser.run`                                       | bypass    | This domain is required for remote browser isolation access.                                                                                                                                |
| Hostname       | `*.edge.browser.run`                                         | bypass    | Anything bound for \*edge.browser.run must go to the isolation browser.                                                                                                                     |
| Hostname       | `*.edge.browser.run`                                         | isolate   | Anything bound for \*edge.browser.run must go to the isolation browser.                                                                                                                     |
| Request Header | `Accept: text/html`                                          | noisolate | Browsers issue an `Accept:` header that begins with `text/html`. We do not isolate if we do not see this header because this is not a browser.                                              |
| Hostname       | `help.teams.cloudflare.com`                                  | allow     | The Zero Trust client will use this to check if Gateway is on by inspecting the certificate. This will also check if the certificate is properly installed on the client machine.           |
| Hostname       | `*.cloudflare-gateway.com`                                   | bypass    | This rule bypasses requests to the `cloudflare-gateway.com` DNS endpoint.                                                                                                                   |
| Hostname       | `*.cloudflarestatus.com`                                     | bypass    | Bypasses `cloudflarestatus.com` so users can reach the page in case of a Gateway outage.                                                                                                    |
| Hostname       | `*.net.cloudflare.com`                                       | bypass    | Bypasses `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature.                                                                                                       |
| Hostname       | `api.cloudflare.com`                                         | bypass    | Bypasses Cloudflare's API endpoint.                                                                                                                                                         |
| Hostname       | `dash.teams.cloudflare.com`                                  | bypass    | Bypasses Zero Trust dashboard to avoid users locking themselves out. This rule only matches `dash.teams.cloudflare.com` to avoid clashing with the `helps.teams.cloudflare.com` Allow rule. |
| Hostname       | `*.dash.cloudflare.com`                                      | bypass    | Bypasses the main Cloudflare dashboard and subdomains.                                                                                                                                      |
| Hostname       |                                                              | bypass    | Bypasses this hostname to support the OCSP application.                                                                                                                                     |
| Hostname       | `*.cloudflareaccess.com`                                     | allow     | Allows L7 security for Cloudflare Access applications.                                                                                                                                      |
| Hostname       | `blocked.teams.cloudflare.com`                               | bypass    | Avoids an infinite loop on the block page.                                                                                                                                                  |
| Hostname       | `*.nel.cloudflare.com`                                       | allow     | Allows L4 access for Network Error Logging.                                                                                                                                                 |
| Hostname       | `*.cloudflareclient.com`                                     | allow     | Allows L4 access for clients.                                                                                                                                                               |
| Hostname       | `*.cloudflare-gateway.com`                                   | allow     | Allows L4 access for Gateway Proxy PAC DNS.                                                                                                                                                 |
| Hostname       |                                                              | allow     | Allows L4 access for Zero Trust applications.                                                                                                                                               |
| Hostname       | `*.cloudflareaccess.com`                                     | allow     | Allows L4 access for Cloudflare Access applications.                                                                                                                                        |
| Hostname       |                                                              | block     | Blocks child abuse materials on the Gateway Proxy.                                                                                                                                          |
| Hostname       | `developers.cloudflare.com` and `help.cloudflarebrowser.com` | noisolate | Prevents isolation of Cloudflare help pages or developer docs that RBI redirects to help users troubleshoot configuration or isolation issues.                                              |
| Hostname       | `speed.cloudflare.com`                                       | noscan    | Largest files transmitted in speed test are too large to A/V scan, causing speedtest to be blocked.                                                                                         |

{{</table-wrap>}}
