---
pcx_content_type: reference
title: Gateway activity logs
weight: 3
---

# Gateway activity logs

{{<Aside type="note">}}

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

#### Basic information

{{<table-wrap>}}

| Field                 | Description                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **DNS**               | Name of the domain that was queried.                                                                                                                                                                                                                                                                                                                                                                   |
| **Email**             | Email address of the user who registered the WARP client where traffic originated from. If a non-identity on-ramp (such as a [proxy endpoint](/cloudflare-one/connections/connect-devices/agentless/pac-files/)) or machine-level authentication (such as a [service token](/cloudflare-one/identity/service-tokens/)) was used, this value will be `non_identity@<team-domain>.cloudflareaccess.com`. |
| **Action**            | The [Action](/cloudflare-one/policies/gateway/dns-policies/#actions) Gateway applied to the query (such as Allow or Block).                                                                                                                                                                                                                                                                            |
| **Time**              | Date and time of the DNS query.                                                                                                                                                                                                                                                                                                                                                                        |
| **Resolver Decision** | The reason why Gateway applied a particular **Action** to the request. Refer to the [list of resolver decisions](#resolver-decisions).                                                                                                                                                                                                                                                                 |

{{</table-wrap>}}

#### Matched policies

{{<table-wrap>}}

| Field                  | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| **Policy Name**        | Name of the matched policy (if there is one).        |
| **Policy ID**          | ID of the matched policy (if there is one).          |
| **Policy Description** | Description of the matched policy (if there is one). |

{{</table-wrap>}}

#### Custom resolver

{{<table-wrap>}}

| Field                      | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| **Address**                | Address of your custom resolver.                            |
| **Policy**                 | Name of the matched resolver policy.                        |
| **Response**               | Status of the custom resolver response.                     |
| **Time (in milliseconds)** | Duration of time it took for the custom resolver to respond |

{{</table-wrap>}}

#### Identities

{{<table-wrap>}}

| Field                  | Description                                                                                                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Email**              | Email address of the user who registered the WARP client where traffic originated from.                                                                                                                                                                        |
| **User ID**            | UUID of the user. Each unique email address in your organization will have a UUID associated with it.                                                                                                                                                          |
| **Device Name**        | Display name of the device returned by the operating system to the WARP client. Typically this is the hostname of a device. Not all devices will have a device name. Device names are not guaranteed to be unique.                                             |
| **Device ID**          | UUID of the device connected with the WARP client. Each unique device in your organization will have a UUID associated with it each time the device is registered for a particular email. The same physical device may have multiple UUIDs associated with it. |
| **Last authenticated** | Date and time the user last authenticated their Zero Trust session.                                                                                                                                                                                            |

{{</table-wrap>}}

#### DNS query details

{{<table-wrap>}}

| Field                           | Description                                                                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Query Type**                  | Type of [DNS query](https://en.wikipedia.org/wiki/List_of_DNS_record_types).                                                        |
| **Query Category**              | [Content categories](/cloudflare-one/policies/gateway/domain-categories/) that the domain belongs to.                               |
| **Matched Categories**          | Name of the Gateway policy category that match the domain.                                                                          |
| **Matched Indicator Feed Name** | Name of the indicator feeds that matched a Gateway policy (if any).                                                                 |
| **Query Indicator Feed Name**   | Name of the indicator feeds that a matched domain or IP belongs to (if any).                                                        |
| **Source IP**                   | Public source IP address of the DNS query.                                                                                          |
| **Source IP Country**           | Country code of the DNS query.                                                                                                      |
| **Source Internal IP**          | Private IP address assigned by the user's local network (if any).                                                                   |
| **Resolver IP**                 | Public IP address of the DNS resolver.                                                                                              |
| **Resolved IPs**                | Resolved IP addresses in the response (if any).                                                                                     |
| **Port**                        | Port that was used to make the DNS query.                                                                                           |
| **Protocol**                    | Protocol that was used to make the DNS query (such as `https`).                                                                     |
| **DNS Location**                | [User-configured location](/cloudflare-one/connections/connect-devices/agentless/dns/locations/) from where the DNS query was made. |
| **Location ID**                 | ID of the DNS location where the query originated.                                                                                  |

{{</table-wrap>}}

### Resolver decisions

{{<table-wrap>}}

| Name                     | Value | Description                                                 |
|--------------------------|-------|-------------------------------------------------------------|
| `blockedByCategory`      | `3`   | Domain or hostname matched a category in a Block policy.    |
| `allowedOnNoLocation`    | `4`   | Allowed because query did not match a Gateway DNS location. |
| `allowedOnNoPolicyMatch` | `5`   | Allowed because query did not match a policy.               |
| `blockedAlwaysCategory`  | `6`   | Domain or hostname is always blocked by Cloudflare.         |
| `overrideForSafeSearch`  | `7`   | Response was overridden by a Safe Search policy.            |
| `overrideApplied`        | `8`   | Response was overridden by an Override policy.              |
| `blockedRule`            | `9`   | IP address in the response matched a Block policy.          |
| `allowedRule`            | `10`  | IP address in the response matched an Allow policy.         |

{{</table-wrap>}}

## Network logs

{{<Aside type="warning" header="Failed connection logs">}}

Gateway will only log failed connections in [network session logs](/logs/reference/log-fields/account/zero_trust_network_sessions/). These logs are available for Enterprise users via [Logpush](/cloudflare-one/insights/logs/logpush/) or [GraphQL](/cloudflare-one/insights/analytics/gateway/#graphql-queries).

{{</Aside>}}

### Explanation of the fields

#### Basic information

{{<table-wrap>}}

| Field                  | Description                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Source IP**          | IP address of the user sending the packet.                                                                                                        |
| **Source Internal IP** | Private IP address assigned by the user's local network.                                                                                          |
| **Destination IP**     | IP address of the packet’s target.                                                                                                                |
| **Action**             | The Gateway [Action](/cloudflare-one/policies/gateway/dns-policies/#actions) taken based on the first rule that matched (such as Allow or Block). |
| **Session ID**         | ID of the unique session.                                                                                                                         |
| **Time**               | Date and time of the session.                                                                                                                     |

{{</table-wrap>}}

#### Matched policies

{{<table-wrap>}}

| Field                  | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| **Policy Name**        | Name of the matched policy (if there is one).         |
| **Policy ID**          | ID of the policy enforcing the decision Gateway made. |
| **Policy Description** | Description of the matched policy (if there is one).  |

{{</table-wrap>}}

#### Identities

{{<table-wrap>}}

| Field                  | Description                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Email**              | Email address of the user sending the packet. This is generated by the WARP client. |
| **User ID**            | ID of the user sending the packet. This is generated by the WARP client.            |
| **Device Name**        | Name of the device that sent the packet.                                            |
| **Device ID**          | ID of the device that sent the packet. This is generated by the WARP client.        |
| **Last Authenticated** | Date and time the user last authenticated with Zero Trust.                          |

{{</table-wrap>}}

#### Network query details

{{<table-wrap>}}

| Field                   | Description                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Source IP**           | IP address of the user sending the packet.                                                                                                        |
| **Source Port**         | Source port number for the packet.                                                                                                                |
| **Source Country**      | Country code for the packet source.                                                                                                               |
| **Destination IP**      | IP address of the packet’s target.                                                                                                                |
| **Destination Port**    | Destination port number for the packet.                                                                                                           |
| **Destination Country** | Destination port number for the packet.                                                                                                           |
| **Protocol**            | Protocol over which the packet was sent.                                                                                                          |
| **Detected Protocol**   | The detected [network protocol](/cloudflare-one/policies/gateway/network-policies/protocol-detection/).                                           |
| **SNI**                 | Host whose Server Name Indication (SNI) header Gateway will filter traffic against.                                                               |
| **Virtual Network**     | [Virtual network](/cloudflare-one/connections/connect-networks/private-net/cloudflared/tunnel-virtual-networks/) that the client is connected to. |
| **Category details**    | Category or categories associated with the packet.                                                                                                |
| **Proxy PAC Endpoint**  | [PAC file proxy endpoint](/cloudflare-one/connections/connect-devices/agentless/pac-files/) Gateway forwarded traffic to, if applicable.          |

{{</table-wrap>}}

## HTTP logs

{{<Aside type="note">}}

When an HTTP request results in an error, Gateway logs the first 512 bytes of the request for 30 days for internal troubleshooting. Otherwise, Gateway does not log HTTP bodies.

{{</Aside>}}

### Explanation of the fields

#### Basic information

{{<table-wrap>}}

| Field                        | Description                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Host**                     | Hostname in the HTTP header for the HTTP request.                                                                                                 |
| **Email**                    | Email address of the user who made the HTTP request. This is generated by the WARP client.                                                        |
| **Action**                   | The Gateway [Action](/cloudflare-one/policies/gateway/dns-policies/#actions) taken based on the first rule that matched (such as Allow or Block). |
| **Request ID**               | Unique ID of the request.                                                                                                                         |
| **Time**                     | Date and time of the HTTP request.                                                                                                                |
| **Source Internal IP**       | Private IP address assigned by the user's local network.                                                                                          |
| **User Agent**               | User agent header sent in the request by the originating device.                                                                                  |
| **Policy details**           | Policy corresponding to the decision Gateway made based on the traffic criteria of the request.                                                   |
| **DLP profiles**             | Name of the matched [DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/) (if there is one).                                 |
| **DLP profile entries**      | Name of the matched entry within the DLP profile (if there is one).                                                                               |
| **Uploaded/downloaded file** | {{<render file="gateway/_uploaded-downloaded-file.md">}}                                                                                          |

{{</table-wrap>}}

#### Matched policies

{{<table-wrap>}}

| Field                  | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| **Policy Name**        | Name of the matched policy (if there is one).        |
| **Policy ID**          | ID of the matched policy (if there is one).          |
| **Policy Description** | Description of the matched policy (if there is one). |

{{</table-wrap>}}

#### Identities

{{<table-wrap>}}

| Field                  | Description                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Email**              | Email address of the user who made the HTTP request. This is generated by the WARP client.                           |
| **User ID**            | ID of the user who made the request. This is generated by the WARP client.                                           |
| **Device Name**        | Name of the device that made the request.                                                                            |
| **Device ID**          | ID of the device that made the request. This is generated by the WARP client on the device that created the request. |
| **Last Authenticated** | Date and time the user last authenticated with Zero Trust.                                                           |

{{</table-wrap>}}

#### HTTP query details

{{<table-wrap>}}

| Field                      | Description                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **HTTP Version**           | HTTP version of the origin that Gateway connected to on behalf of the user.                                 |
| **HTTP Method**            | HTTP method used for the request (such as `GET` or `POST`).                                                 |
| **HTTP Status Code**       | [HTTP status code](/support/troubleshooting/http-status-codes/http-status-codes/) returned in the response. |
| **URL**                    | Full URL of the HTTP request.                                                                               |
| **Referer**                | Referer request header containing the address of the page making the request.                               |
| **Source IP**              | Public source IP address of the HTTP request.                                                               |
| **Source Port**            | Port that was used to make the HTTP request.                                                                |
| **Source IP Country**      | Country code of the HTTP request.                                                                           |
| **Destination IP**         | Public IP address of the destination requested.                                                             |
| **Destination Port**       | Port of the destination requested.                                                                          |
| **Destination IP Country** | Country code of the destination requested.                                                                  |
| **Blocked file reason**    | Reason why the file was blocked if a file transfer occurred or was attempted.                               |
| **Category details**       | Category the blocked file belongs to.                                                                       |

{{</table-wrap>}}

#### File detection details

{{<table-wrap>}}

| Field            | Description                                        |
| ---------------- | -------------------------------------------------- |
| **Name**         | Name of the detected file.                         |
| **Type**         | File type of the detected file.                    |
| **Size**         | Size of the detected file.                         |
| **Hash**         | Hash of the detected file, generated by DLP.       |
| **Content type** | MIME type of the detected file.                    |
| **Direction**    | Upload or download direction of the detected file. |
| **Action**       | The Action Gateway applied to the request.         |

{{</table-wrap>}}

### Enhanced file detection

Enhanced file detection is an optional feature to extract more file information from HTTP traffic. When turned on, Gateway will read file information from the HTTP body rather than the HTTP headers to provide greater accuracy and reliability. This feature may have a minor impact on performance for file-heavy organizations.

To turn on enhanced file detection:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **Network**.
2. In **Firewall**, turn on **TLS decryption**.
3. In **Gateway Logging**, turn on **Enable enhanced file detection**.

### Isolate requests

When a user creates an [isolation policy](/cloudflare-one/policies/browser-isolation/isolation-policies/), Gateway logs the initial request that triggers isolation as an Isolate action. Because this request is not isolated yet, the `is_isolated` field will return `false`. Zero Trust then securely returns the result to the user in an isolated browser. Gateway will log all subsequent requests in the isolated browser with the action (such as Allow or Block), and the `is_isolated` field will return `true`.
