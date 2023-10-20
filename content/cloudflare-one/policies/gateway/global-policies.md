---
pcx_content_type: reference
title: Global policies
layout: single
weight: 6
---

# Global policies

Cloudflare Zero Trust applies a set of global policies to all accounts.

## DNS policies

{{<table-wrap>}}

| Name                              | ID                                     | Criteria | Value                                                                                                                                                                                             | Action | Description                               |
| --------------------------------- | -------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------- |
| Allow CF Network Error Logging L4 | `00000001-e4af-4b82-8f8c-c79c1d5d212e` | Hostname | `*.nel.cloudflare.com`                                                                                                                                                                            | allow  | Allows SNI domains for WARP registration. |
| Allow CF Client                   | `00000001-8c3d-4e27-a01b-af8418000077` | Hostname | `*.cloudflareclient.com`                                                                                                                                                                          | allow  | Allows Zero Trust client.                 |
| Allow Gatewy Proxy PAC            | `00000001-776e-438d-9856-987d7053762b` | Hostname | `*.cloudflare-gateway.com`                                                                                                                                                                        | allow  | Allows Gateway proxy with PAC files.      |
| Allow Zero Trust Services         | `00000001-e1e8-421b-a0fe-895397489f28` | Hostname | `dash.teams.cloudflare.com`, `help.teams.cloudflare.com`, `blocked.teams.cloudflare.com`, `api.cloudflare.com`, `cloudflarestatus.com`, `www.cloudflarestatus.com`, and `one.dash.cloudflare.com` | allow  | Allows Cloudflare Zero Trust services.    |
| Allow Access Apps L4              | `00000001-daa2-41e2-8a88-698af4066951` | Hostname | `*.cloudflareaccess.com`                                                                                                                                                                          | allow  | Allows Cloudflare Access applications.    |

{{</table-wrap>}}

## Network proxy policies

{{<table-wrap>}}

| Name                      | ID                                     | Criteria         | Value                       | Action | Description                                                                                                                                    |
| ------------------------- | -------------------------------------- | ---------------- | --------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Allow Access Apps L7      | `00000001-8d6b-4951-8a18-3bbc9010976c` | Hostname         | `*.cloudflareaccess.com`    | allow  | Allows Cloudflare Access applications.                                                                                                         |
| Allow Gateway Help Page   | `00000001-8e9a-4429-b3c2-d267d0ce6114` | Hostname         | `help.teams.cloudflare.com` | allow  | Used by the WARP client to check if Gateway is on by inspecting the certificate and checking if it is properly installed on the client device. |
| Always Blocked Categories | `00000001-bed5-462e-b0f1-2e2c3555e9f7` | Content Category | Child Abuse                 | block  | Blocks child abuse materials.                                                                                                                  |

{{</table-wrap>}}

## HTTP inspection policies

{{<table-wrap>}}

| Name                            | ID                                     | Criteria    | Value                                                        | Action    | Description                                                                                                     |
| ------------------------------- | -------------------------------------- | ----------- | ------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------- |
| Prevent Account Change Block    | `00000001-d1f2-461a-8253-501c8d882a15` | Hostname    | `*.cloudflareclient.com`                                     | bypass    | Ensures users cannot accidentally block themselves from making account changes.                                 |
| Bypass CF Status                | `00000001-5399-4b71-a9fc-d4d90ccf0758` | Hostname    | `*.cloudflarestatus.com`                                     | bypass    | Bypasses `cloudflarestatus.com` so users can reach the status page in case of a Gateway outage.                 |
| Bypass Gateway DNS              | `00000001-d9c0-46b0-8704-2ea5b9d7bdfc` | Hostname    | `*.cloudflare-gateway.com`                                   | bypass    | Ensures requests to the `cloudflare-gateway.com` DNS endpoint will not be inspected.                            |
| Bypass CF Network Error Logging | `00000001-dfe0-4737-8d1e-8191e8f637df` | Hostname    | `*.nel.cloudflare.com`                                       | bypass    | Bypasses `*.nel.cloudflarestatus.com` for Cloudflare's network error logging feature.                           |
| Bypass CF API                   | `00000001-a424-43fb-b1f1-d3eb35ed7ddd` | Hostname    | `api.cloudflare.com`                                         | bypass    | Bypasses Cloudflare's API endpoint.                                                                             |
| Prevent ZT Dashboard Lockout    | `00000001-d38e-42db-96fe-60613b6b308f` | Hostname    | `dash.teams.cloudflare.com`                                  | bypass    | Prevents users from being locked out of the Zero Trust dashboard.                                               |
| Bypass CF Dashboard             | `00000001-d343-4ded-908e-b3fe43c5e61e` | Hostname    | `*.dash.cloudflare.com`                                      | bypass    | Bypasses the Cloudflare dashboard and subdomains.                                                               |
| Prevent Block Page Loop         | `00000001-48b1-4ade-93c1-f0f3759dc19c` | Hostname    | `blocked.teams.cloudflare.com`                               | bypass    | Prevents an infinite loop on the Gateway block page.                                                            |
| Don't Isolate RBI Help Pages    | `00000001-1a18-431f-9c9d-bce431f1002a` | Hostname    | `developers.cloudflare.com` and `help.cloudflarebrowser.com` | noisolate | Prevents isolation of Cloudflare developer docs and help pages to help users troubleshoot configuration issues. |
| Bypass RBI Assets               | `00000001-df61-4068-aa6c-0f684c3cd4e6` | Hostname    | `*.assets.browser.run`                                       | bypass    | Required for [Remote Browser Isolation (RBI)](/cloudflare-one/policies/browser-isolation/).                     |
| Inspect RBI Urls                | `00000001-3faa-4f59-98d4-0f6d6af4b6d0` | Hostname    | `*.edge.browser.run` and `*.cloudflarebrowser.com`           | bypass    | Required for RBI.                                                                                               |
| Don't AV Scan CF Speed          | `00000001-c194-408f-87dd-9a366ce76e12` | Hostname    | `speed.cloudflare.com`                                       | noscan    | Allows files transferred by the Cloudflare speed test.                                                          |
| Bypass OCSP                     | `00000001-34ce-47c7-ad0f-199f46eba194` | Application | Online Certificate Status Protocol                           | bypass    | Enables OCSP stapling.                                                                                          |

{{</table-wrap>}}
