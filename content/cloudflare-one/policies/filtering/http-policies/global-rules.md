---
pcx_content_type: reference
title: Global rules
weight: 3
---

# Global rules

Cloudflare Zero Trust applies a set of **global rules** to all accounts.

{{<table-wrap>}}

| Criteria         | Value                                                        | Action    | Description                                                                                                                                    |
| ---------------- | ------------------------------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Hostname         | `*.cloudflareclient.com`                                     | bypass    | Ensures users cannot accidentally block themselves from making account changes.                                                                |
| Hostname         | `*.assets.browser.run`                                       | bypass    | Required for [Remote Browser Isolation (RBI)](/cloudflare-one/policies/browser-isolation/) access.                                             |
| Hostname         | `*.edge.browser.run` and `*.cloudflarebrowser.com`           | bypass    | Required for RBI access.                                                                                                                       |
| Hostname         | `*.edge.browser.run` and `*.cloudflarebrowser.com`           | isolate   | Required for RBI access.                                                                                                                       |
| Request Header   | `Accept: text/html`                                          | noisolate | Browsers issue an `Accept:` HTTP header that begins with `text/html`. This rule ensures only browsers will be isolated.                        |
| Hostname         | `help.teams.cloudflare.com`                                  | allow     | Used by the WARP client to check if Gateway is on by inspecting the certificate and checking if it is properly installed on the client device. |
| Hostname         | `*.cloudflare-gateway.com`                                   | bypass    | Ensures requests to the `cloudflare-gateway.com` DNS endpoint will not be inspected.                                                           |
| Hostname         | `*.cloudflarestatus.com`                                     | bypass    | Bypasses `cloudflarestatus.com` so users can reach the status page in case of a Gateway outage.                                                |
| Hostname         | `*.nel.cloudflare.com`                                       | bypass    | Bypasses `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature.                                                          |
| Hostname         | `api.cloudflare.com`                                         | bypass    | Bypasses Cloudflare's API endpoint.                                                                                                            |
| Hostname         | `dash.teams.cloudflare.com`                                  | bypass    | Prevents users from being locked out of the Zero Trust dashboard.                                                                              |
| Hostname         | `*.dash.cloudflare.com`                                      | bypass    | Bypasses the Cloudflare dashboard and subdomains.                                                                                              |
| Application      | Online Certificate Status Protocol                           | bypass    | Enables OCSP stapling.                                                                                                                         |
| Hostname         | `*.cloudflareaccess.com`                                     | allow     | Allows L7 security for Cloudflare Access applications.                                                                                         |
| Hostname         | `blocked.teams.cloudflare.com`                               | bypass    | Prevents an infinite loop on the Gateway block page.                                                                                           |
| Hostname         | `*.nel.cloudflare.com`                                       | allow     | Allows L4 access to SNI domains for WARP registration.                                                                                         |
| Hostname         | `*.cloudflareclient.com`                                     | allow     | Allows L4 access for clients.                                                                                                                  |
| Hostname         | `*.cloudflare-gateway.com`                                   | allow     | Allows L4 access for the Gateway proxy with PAC files.                                                                                         |
| Hostname         |                                                              | allow     | Allows L4 access for Zero Trust applications.                                                                                                  |
| Hostname         | `*.cloudflareaccess.com`                                     | allow     | Allows L4 access for Cloudflare Access applications.                                                                                           |
| Content Category | Child Abuse                                                  | block     | Blocks child abuse materials.                                                                                                                  |
| Hostname         | `developers.cloudflare.com` and `help.cloudflarebrowser.com` | noisolate | Prevents isolation of Cloudflare developer docs and help pages to help users troubleshoot configuration issues.                                |
| Hostname         | `speed.cloudflare.com`                                       | noscan    | Allows files transferred by the Cloudflare speed test.                                                                                         |

{{</table-wrap>}}
