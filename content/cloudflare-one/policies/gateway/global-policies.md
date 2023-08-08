---
pcx_content_type: reference
title: Global policies
layout: single
weight: 6
---

# Global policies

Cloudflare Zero Trust applies a set of global policies to all accounts.

## DNS policies

| Criteria | Value                                                                                                                                                                                             | Action | Description                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------- |
| Hostname | `*.nel.cloudflare.com`                                                                                                                                                                            | allow  | Allows SNI domains for WARP registration. |
| Hostname | `*.cloudflareclient.com`                                                                                                                                                                          | allow  | Allows Zero Trust client.                 |
| Hostname | `*.cloudflare-gateway.com`                                                                                                                                                                        | allow  | Allows Gateway proxy with PAC files.      |
| Hostname | `dash.teams.cloudflare.com`, `help.teams.cloudflare.com`, `blocked.teams.cloudflare.com`, `api.cloudflare.com`, `cloudflarestatus.com`, `www.cloudflarestatus.com`, and `one.dash.cloudflare.com` | allow  | Allows Cloudflare Zero Trust services.    |
| Hostname | `*.cloudflareaccess.com`                                                                                                                                                                          | allow  | Allows Cloudflare Access applications.    |

## Network proxy policies

| Criteria         | Value                       | Action | Description                                                                                                                                    |
| ---------------- | --------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Hostname         | `*.cloudflareaccess.com`    | allow  | Allows Cloudflare Access applications.                                                                                                         |
| Hostname         | `help.teams.cloudflare.com` | allow  | Used by the WARP client to check if Gateway is on by inspecting the certificate and checking if it is properly installed on the client device. |
| Content Category | Child Abuse                 | block  | Blocks child abuse materials.                                                                                                                  |

## HTTP inspection policies

| Criteria       | Value                                                        | Action    | Description                                                                                                     |
| -------------- | ------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------- |
| Hostname       | `*.cloudflareclient.com`                                     | bypass    | Ensures users cannot accidentally block themselves from making account changes.                                 |
| Hostname       | `*.cloudflarestatus.com`                                     | bypass    | Bypasses `cloudflarestatus.com` so users can reach the status page in case of a Gateway outage.                 |
| Hostname       | `*.cloudflare-gateway.com`                                   | bypass    | Ensures requests to the `cloudflare-gateway.com` DNS endpoint will not be inspected.                            |
| Hostname       | `*.nel.cloudflare.com`                                       | bypass    | Bypasses `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature.                           |
| Hostname       | `api.cloudflare.com`                                         | bypass    | Bypasses Cloudflare's API endpoint.                                                                             |
| Hostname       | `dash.teams.cloudflare.com`                                  | bypass    | Prevents users from being locked out of the Zero Trust dashboard.                                               |
| Hostname       | `*.dash.cloudflare.com`                                      | bypass    | Bypasses the Cloudflare dashboard and subdomains.                                                               |
| Hostname       | `blocked.teams.cloudflare.com`                               | bypass    | Prevents an infinite loop on the Gateway block page.                                                            |
| Hostname       | `developers.cloudflare.com` and `help.cloudflarebrowser.com` | noisolate | Prevents isolation of Cloudflare developer docs and help pages to help users troubleshoot configuration issues. |
| Hostname       | `*.assets.browser.run`                                       | bypass    | Required for [Remote Browser Isolation (RBI)](/cloudflare-one/policies/browser-isolation/).                     |
| Hostname       | `*.edge.browser.run` and `*.cloudflarebrowser.com`           | bypass    | Required for RBI.                                                                                               |
| Hostname       | `*.edge.browser.run` and `*.cloudflarebrowser.com`           | isolate   | Required for RBI.                                                                                               |
| Hostname       | `speed.cloudflare.com`                                       | noscan    | Allows files transferred by the Cloudflare speed test.                                                          |
| Request Header | `Accept: text/html`                                          | noisolate | Ensures only browsers will be isolated. Browsers issue an `Accept:` HTTP header that begins with `text/html`.   |
| Application    | Online Certificate Status Protocol                           | bypass    | Enables OCSP stapling.                                                                                          |
