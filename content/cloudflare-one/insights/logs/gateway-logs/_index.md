---
pcx_content_type: reference
title: Gateway activity logs
layout: single
weight: 3
---

# Gateway activity logs

{{<Aside>}}

Gateway logs will only show the public Source IP address. Private IP addresses are NAT-ed behind a public IP address.

{{</Aside>}}

Gateway activity logs show the individual DNS queries, Network packets, and HTTP requests inspected by Gateway. You can also download encrypted [SSH command logs](/cloudflare-one/policies/gateway/network-policies/ssh-logging/) for sessions proxied by Gateway.

To view Gateway activity logs, log in to [Zero Trust](https://one.dash.cloudflare.com/) and go to **Logs** > **Gateway**. Select an individual row to investigate the event in more detail.

Enterprise users can generate more detailed logs with [Logpush](/cloudflare-one/insights/logs/logpush/).

## Selective logging

By default, Gateway logs all events, including DNS queries and HTTP requests that are allowed and not a risk. You can choose to disable logs or only log blocked requests. To customize what type of events are recorded, log in to [Zero Trust](https://one.dash.cloudflare.com/) and go to **Settings** > **Network**. Under **Activity Logging**, indicate your DNS, Network, and HTTP log preferences.

These settings will only apply to logs displayed in Zero Trust. Logpush data is unaffected.

## DNS logs

### Explanation of the fields

{{<table-wrap>}}

| **Field**                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **DNS**                         | Name of the domain that was queried.                                                                                                                                                                                                                                                                                                                                                                   |
| **Email**                       | Email address of the user who registered the WARP client where traffic originated from. If a non-identity on-ramp (such as a [proxy endpoint](/cloudflare-one/connections/connect-devices/agentless/pac-files/)) or machine-level authentication (such as a [service token](/cloudflare-one/identity/service-tokens/)) was used, this value will be `non_identity@<team-domain>.cloudflareaccess.com`. |
| **Event**                       | The [Action](/cloudflare-one/policies/gateway/dns-policies/#actions) Gateway applied to the query (for example, `Allow` or `Block`).                                                                                                                                                                                                                                                                   |
| **Date**                        | Date and time of the DNS query.                                                                                                                                                                                                                                                                                                                                                                        |
| **Source IP**                   | Public source IP address of the DNS query.                                                                                                                                                                                                                                                                                                                                                             |
| **Port**                        | Port that was used to make the DNS query.                                                                                                                                                                                                                                                                                                                                                              |
| **Source IP Country**           | Country code of the DNS query.                                                                                                                                                                                                                                                                                                                                                                         |
| **Resolver IP**                 | Public IP address of the DNS resolver.                                                                                                                                                                                                                                                                                                                                                                 |
| **Source Internal IP**          | Private IP address assigned by the user's local network.                                                                                                                                                                                                                                                                                                                                               |
| **Protocol**                    | Protocol that was used to make the DNS query (for example, `https`).                                                                                                                                                                                                                                                                                                                                   |
| **Query Type**                  | Type of DNS query. [This page](https://en.wikipedia.org/wiki/List_of_DNS_record_types) contains a list of all the DNS query types.                                                                                                                                                                                                                                                                     |
| **Resolver Decision**           | The reason why Gateway applied a particular **Action** to the request. Refer to the [list of resolver decisions](#resolver-decisions).                                                                                                                                                                                                                                                                 |
| **DNS Location**                | User-configured location from where the DNS query was made.                                                                                                                                                                                                                                                                                                                                            |
| **Policy Name**                 | Name of the matched policy (if there is one).                                                                                                                                                                                                                                                                                                                                                          |
| **Policy ID**                   | ID of the matched policy (if there is one).                                                                                                                                                                                                                                                                                                                                                            |
| **Categories**                  | Content categories that the domain belongs to.                                                                                                                                                                                                                                                                                                                                                         |
| **User ID**                     | UUID of the user. Each unique email address in your organization will have a UUID associated with it.                                                                                                                                                                                                                                                                                                  |
| **Device ID**                   | UUID of the device connected with the WARP client. Each unique device in your organization will have a UUID associated with it each time the device is registered for a particular email. The same physical device may have multiple UUIDs associated with it.                                                                                                                                         |
| **Location ID**                 | ID of the [DNS location](/cloudflare-one/connections/connect-devices/agentless/dns/locations/) where the query originated.                                                                                                                                                                                                                                                                             |
| **Device Name**                 | Display name of the device returned by the operating system to the WARP client. Typically this is the hostname of a device. Not all devices will have a device name. Device names are not guaranteed to be unique.                                                                                                                                                                                     |
| **Resolved IPs**                | Resolved IP addresses in the response (if any).                                                                                                                                                                                                                                                                                                                                                        |
| **Matched Indicator Feed Name** | Name of the indicator feeds that matched a Gateway policy (if any).                                                                                                                                                                                                                                                                                                                                    |
| **Query Indicator Feed Name**   | Name of the indicator feeds that a matched domain or IP belongs to (if any).                                                                                                                                                                                                                                                                                                                           |

{{</table-wrap>}}

### Resolver decisions

{{<table-wrap>}}

| **Value**              | **Description**                                             |
| ---------------------- | ----------------------------------------------------------- |
| allowedByQueryName     | Domain or hostname in the query matched an Allow policy.    |
| blockedByQueryName     | Domain or hostname in the query matched a Block policy.     |
| allowedRule            | IP address in the response matched an Allow policy.         |
| blockedRule            | IP address in the response matched a Block policy.          |
| blockedByCategory      | Domain or hostname matched a category in a Block policy.    |
| blockedAlwaysCategory  | Domain or hostname is always blocked by Cloudflare.         |
| allowedOnNoLocation    | Allowed because query did not match a Gateway DNS location. |
| allowedOnNoPolicyMatch | Allowed because query did not match a policy.               |
| overrideForSafeSearch  | Response was overridden by a Safe Search policy.            |
| overrideApplied        | Response was overridden by an Override policy.              |

{{</table-wrap>}}

## Network logs

### Explanation of the fields

{{<table-wrap>}}

| Field                      | Description                                                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Source IP**              | IP address of the user sending the packet.                                                                                                                 |
| **Destination IP**         | IP address of the packet’s target.                                                                                                                         |
| **Action**                 | The Gateway [Action](/cloudflare-one/policies/gateway/dns-policies/#actions) taken based on the first rule that matched (for example, `Allow` or `Block`). |
| **Session ID**             | ID of the unique session.                                                                                                                                  |
| **Time**                   | Date and time of the session.                                                                                                                              |
| **Source Port**            | Source port number for the packet.                                                                                                                         |
| **Source IP Country**      | Country code for the packet source.                                                                                                                        |
| **Source Internal IP**     | Private IP address assigned by the user's local network.                                                                                                   |
| **Destination Port**       | Destination port number for the packet.                                                                                                                    |
| **Destination IP Country** | Country code for the packet destination.                                                                                                                   |
| **Protocol**               | Protocol over which the packet was sent.                                                                                                                   |
| **Detected Protocol**      | The detected [network protocol](/cloudflare-one/policies/gateway/network-policies/protocol-detection/).                                        |
| **SNI**                    | Host whose Server Name Indication (SNI) header Gateway will filter traffic against.                                                                        |
| **Virtual Network**        | [Virtual network](/cloudflare-one/connections/connect-networks/private-net/tunnel-virtual-networks/) that the client is connected to.                      |
| **Categories**             | Category or categories associated with the packet.                                                                                                         |
| **Policy Name**            | Name of the matched policy (if there is one).                                                                                                              |
| **Policy ID**              | ID of the policy enforcing the decision Gateway made.                                                                                                      |
| **Email**                  | Email address of the user sending the packet. This is generated by the WARP client.                                                                        |
| **User ID**                | ID of the user sending the packet. This is generated by the WARP client.                                                                                   |
| **Device ID**              | ID of the device that sent the packet. This is generated by the WARP client.                                                                               |
| **Device Name**            | Name of the device that sent the packet.                                                                                                                   |

{{</table-wrap>}}

## HTTP logs

{{<Aside type="note">}}

When an HTTP request results in an error, the first 512 bytes of the request are logged for 30 days for internal troubleshooting. Otherwise, HTTP bodies are not logged.

{{</Aside>}}

### Explanation of the fields

{{<table-wrap>}}

| Field                        | Description                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Host**                     | Hostname in the HTTP header for the HTTP request.                                                                                                          |
| **Email**                    | Email address of the user who made the HTTP request. This is generated by the WARP client.                                                                 |
| **Action**                   | The Gateway [Action](/cloudflare-one/policies/gateway/dns-policies/#actions) taken based on the first rule that matched (for example, `Allow` or `Block`). |
| **Request ID**               | Unique ID of the request.                                                                                                                                  |
| **Time**                     | Date and time of the HTTP request.                                                                                                                         |
| **URL**                      | Full URL of the HTTP request.                                                                                                                              |
| **Referer**                  | Referer request header containing the address of the page making the request.                                                                              |
| **HTTP Version**             | HTTP version of the origin that Gateway connected to on behalf of the user.                                                                                |
| **HTTP Method**              | HTTP method used for the request (for example, `GET` or `POST`).                                                                                           |
| **HTTP Status Code**         | [HTTP status code](/support/troubleshooting/http-status-codes/http-status-codes/) returned in the response.                                                |
| **Source IP**                | Public source IP address of the HTTP request.                                                                                                              |
| **Source Port**              | Port that was used to make the HTTP request.                                                                                                               |
| **Source IP Country**        | Country code of the HTTP request.                                                                                                                          |
| **Source Internal IP**       | Private IP address assigned by the user's local network.                                                                                                   |
| **Destination IP**           | Public IP address of the destination requested.                                                                                                            |
| **Destination Port**         | Port of the destination requested.                                                                                                                         |
| **Destination IP Country**   | Country code of the destination requested.                                                                                                                 |
| **Blocked file reason**      | Reason why the file was blocked if a file transfer occurred or was attempted.                                                                              |
| **Policy Name**              | Name of the matched policy (if there is one).                                                                                                              |
| **Policy ID**                | ID of the matched policy (if there is one).                                                                                                                |
| **Policy Description**       | Description of the matched policy (if there is one).                                                                                                       |
| **User ID**                  | ID of the user who made the request. This is generated by the WARP client.                                                                                 |
| **Device Name**              | Name of the device that made the request.                                                                                                                  |
| **Device ID**                | ID of the device that made the request. This is generated by the WARP client on the device that created the request.                                       |
| **User Agent**               | User agent header sent in the request by the originating device.                                                                                           |
| **Policy details**           | Policy corresponding to the decision Gateway made based on the traffic criteria of the request.                                                            |
| **DLP profiles**             | Name of the matched DLP profile (if there is one).                                                                                                         |
| **DLP profile entries**      | Name of the matched entry within the DLP profile (if there is one).                                                                                        |
| **Uploaded/downloaded file** | {{<render file="gateway/_uploaded-downloaded-file.md">}}                                                                                                   |

{{</table-wrap>}}

### Enhanced file detection

Enhanced file detection is an optional feature to extract more file information from HTTP traffic. When enabled, Gateway will read file information from the HTTP body rather than the HTTP headers, offering greater accuracy and reliability. This feature may have a minor impact on performance for file-heavy organizations.

To enable:

1. Go to **Settings** > **Network**.
2. Enable **TLS decryption**.
3. Turn on **Enable enhanced file detection**.

### Isolate requests

When a user creates a policy to isolate traffic, the initial request that triggers isolation will be logged as an `Isolate` decision and the `is_isolated` field will return `false`. This is because that initial request is not isolated yet — but it initiates an isolated session.

Since the request is generated in an isolated browser, the result is rendered in the isolated browser and rendered back to the user securely. This request and all subsequent requests in the isolated browser are logged to include the terminal Gateway action that gets applied (e.g. Allow / Block) and the `is_isolated` field as `true`.
