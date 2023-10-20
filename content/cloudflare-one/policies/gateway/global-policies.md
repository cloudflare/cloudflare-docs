---
pcx_content_type: reference
title: Global policies
layout: single
weight: 6
---

# Global policies

Cloudflare Zero Trust applies a set of global policies to all accounts.

## DNS policies

| Name                              | ID  | Criteria | Value                                                                                                                                                                                             | Action | Description                               |
| --------------------------------- | --- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------- |
| Allow CF Network Error Logging L4 | ``  | Hostname | `*.nel.cloudflare.com`                                                                                                                                                                            | allow  | Allows SNI domains for WARP registration. |
| Allow CF Client                   | ``  | Hostname | `*.cloudflareclient.com`                                                                                                                                                                          | allow  | Allows Zero Trust client.                 |
| Allow Gatewy Proxy Pac            | ``  | Hostname | `*.cloudflare-gateway.com`                                                                                                                                                                        | allow  | Allows Gateway proxy with PAC files.      |
| Allow Zero Trust Services         | ``  | Hostname | `dash.teams.cloudflare.com`, `help.teams.cloudflare.com`, `blocked.teams.cloudflare.com`, `api.cloudflare.com`, `cloudflarestatus.com`, `www.cloudflarestatus.com`, and `one.dash.cloudflare.com` | allow  | Allows Cloudflare Zero Trust services.    |
| Allow Access Apps L4              | ``  | Hostname | `*.cloudflareaccess.com`                                                                                                                                                                          | allow  | Allows Cloudflare Access applications.    |

## Network proxy policies

| Name                      | ID  | Criteria         | Value                       | Action | Description                                                                                                                                    |
| ------------------------- | --- | ---------------- | --------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Allow Access Apps L7      | ``  | Hostname         | `*.cloudflareaccess.com`    | allow  | Allows Cloudflare Access applications.                                                                                                         |
| Allow Gateway Help Page   | ``  | Hostname         | `help.teams.cloudflare.com` | allow  | Used by the WARP client to check if Gateway is on by inspecting the certificate and checking if it is properly installed on the client device. |
| Always Blocked Categories | ``  | Content Category | Child Abuse                 | block  | Blocks child abuse materials.                                                                                                                  |

## HTTP inspection policies

| Name                            | ID  | Criteria    | Value                                                        | Action    | Description                                                                                                     |
| ------------------------------- | --- | ----------- | ------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------- |
| Prevent Account Change Block    | ``  | Hostname    | `*.cloudflareclient.com`                                     | bypass    | Ensures users cannot accidentally block themselves from making account changes.                                 |
| Bypass CF Status                | ``  | Hostname    | `*.cloudflarestatus.com`                                     | bypass    | Bypasses `cloudflarestatus.com` so users can reach the status page in case of a Gateway outage.                 |
| Bypass Gateway DNS              | ``  | Hostname    | `*.cloudflare-gateway.com`                                   | bypass    | Ensures requests to the `cloudflare-gateway.com` DNS endpoint will not be inspected.                            |
| Bypass CF Network Error Logging | ``  | Hostname    | `*.nel.cloudflare.com`                                       | bypass    | Bypasses `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature.                           |
| Bypass CF API                   | ``  | Hostname    | `api.cloudflare.com`                                         | bypass    | Bypasses Cloudflare's API endpoint.                                                                             |
| Prevent ZT Dashboard Lockout    | ``  | Hostname    | `dash.teams.cloudflare.com`                                  | bypass    | Prevents users from being locked out of the Zero Trust dashboard.                                               |
| Bypass CF Dashboard             | ``  | Hostname    | `*.dash.cloudflare.com`                                      | bypass    | Bypasses the Cloudflare dashboard and subdomains.                                                               |
| Prevent Block Page Loop         | ``  | Hostname    | `blocked.teams.cloudflare.com`                               | bypass    | Prevents an infinite loop on the Gateway block page.                                                            |
| Don't Isolate RBI Help Pages    | ``  | Hostname    | `developers.cloudflare.com` and `help.cloudflarebrowser.com` | noisolate | Prevents isolation of Cloudflare developer docs and help pages to help users troubleshoot configuration issues. |
| Bypass RBI Assets               | ``  | Hostname    | `*.assets.browser.run`                                       | bypass    | Required for [Remote Browser Isolation (RBI)](/cloudflare-one/policies/browser-isolation/).                     |
| Inspect RBI Urls                | ``  | Hostname    | `*.edge.browser.run` and `*.cloudflarebrowser.com`           | bypass    | Required for RBI.                                                                                               |
| Don't AV Scan CF Speed          | ``  | Hostname    | `speed.cloudflare.com`                                       | noscan    | Allows files transferred by the Cloudflare speed test.                                                          |
| Bypass OCSP                     | ``  | Application | Online Certificate Status Protocol                           | bypass    | Enables OCSP stapling.                                                                                          |
