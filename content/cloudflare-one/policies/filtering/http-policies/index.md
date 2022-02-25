---
pcx-content-type: concept
title: HTTP policies
weight: 4
---

# HTTP policies

<Aside>

Install the <a href="/connections/connect-devices/warp/install-cloudflare-cert">Cloudflare Root Certificate</a> before creating HTTP policies.

</Aside>

HTTP policies allow you to filter HTTP traffic on the L7 firewall. Gateway will intercept all HTTP and HTTPS traffic and apply the rules you have configured in your policy to either block, allow, or override specific elements such as websites, IP addresses, and file types.

![Gateway flow HTTP](/cloudflare-one/static/documentation/policies/gateway-identity-diagram.jpg)

Build an HTTP policy by configuring the following elements:

*   **Expressions**
    *   **Selectors**
    *   **Operators**
*   **Actions**

## Expressions

Expressions are sets of conditions with which you can combine [selectors](#selectors) and [operators](#operators). By configuring one or more expressions, you can define the scope of your HTTP policy.

### Selectors

<Aside type="note">

Policies created using the URL selector are case-sensitive.

</Aside>

Gateway matches HTTP traffic against the following selectors, or criteria:

#### Identity-based selectors

You can build HTTP policies using **identity-based selectors**. These selectors require Gateway with WARP mode to be enabled in the Zero Trust WARP client and the user to be enrolled in the organization via the WARP client. For a list of identity-based selectors and API examples, please refer to the [dedicated section](/cloudflare-one/policies/filtering/identity-selectors/).

#### Host

| UI name | API example |
| -- | -- |
| Host | `http.request.host == ".*example\.com"` |

#### Domain

| UI name | API example |
| -- | -- |
| Domain | `http.request.domains == "a.example.com"` |

#### URL

| UI name | API example |
| -- | -- |
| URL | `not(any(http.request.uri.content_category[*] in {1}))` |

#### URL Query

| UI name | API example |
| -- | -- |
| URL Query | `not(http.request.uri in $%s)` |

#### URL Path

| UI name | API example |
| -- | -- |
| URL Path | `http.request.uri.path == \"/foo/bar\"` |

#### URL Path and Query

| UI name | API example |
| -- | -- |
| URL Path and Query | `http.request.uri.path_and_query == \"/foo/bar?ab%242=%2A342\"` |

#### HTTP Method

| UI name | API example |
| -- | -- |
| HTTP Method | `http.request.method == "GET"` |

#### HTTP Response

| UI name | API example |
| -- | -- |
| URL | `http.response.status_code == "200"` |

#### Upload and Download Mime Type

These selectors depend on the `Content-Type` header being present in the request (for uploads) or response (for downloads).

| UI name | API example |
| -- | -- |
| Upload Mime Type | `http.upload.mime == "image/png\"` |

| UI name | API example |
| -- | -- |
| Download Mime Type | `http.download.mime == "image/png\"` |

#### Content Categories

| UI name | API example |
| -- | -- |
| Content Categories | `not(any(http.request.uri.content_category[*] in {1}))` |

#### Security Categories

| UI name | API example |
| -- | -- |
| Security Categories | `any(http.request.uri.category[*] in {1})` |

<Aside type="note" header="Host or Domain?">

The `Host` selector matches the exact entry input by a customer in the value field or list. The `Domain` selector matches the exact entry and all subdomains in the value field or list.

</Aside>

#### Device Posture

With the Device Posture selector, admins can use signals from end-user devices to secure access to their internal and external resources. For example, a security admin can choose to limit all access to internal applications based on whether specific software is installed on a device and/or if the device or software are configured in a particular way.

| UI name | API example |
| --- | --- |
| Passed Device Posture Checks | `any(device_posture.checks.passed[*] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})` |

### Operators

Operators are the way Gateway matches traffic to a selector. Matching happens as follows:

| Operator              |          Meaning
|:---------------------:|:---------------------------:|
|  is                   |  exact match, equals        |
|  is not               |  all except exact match     |
|  in                   |  in any of defined entries  |
|  not in               |  not in defined entries     |
|  matches regex        | regex evaluates to true         |
|  does not match regex |  all except when regex evals to true   |

## Actions

Just like actions on destinations in DNS policies, actions in HTTP policies allow you to choose what to do with a given set of elements (domains, IP addresses, file types, and so on). You can assign one action per policy.

These are the action types you can choose from:

*   **[Allow](#allow)**
*   **[Block](#block)**
*   **[Isolate](#isolate)**
*   **[Do Not Isolate](#do-not-isolate)**
*   **[Do Not Inspect](#do-not-inspect)**
*   **[Do Not Scan](#do-not-scan)**

### Allow

Rules with Allow actions allow outbound traffic to reach destinations you specify within the [Selectors](#selectors) and Value fields. For example, the following configuration allows traffic to reach all websites we categorize as belonging to the Education content category:

| Selector | Operator | Value | Action |
| - | - | - | - |
| Content Categories | in | `Education` | Allow |

### Block

Rules with Block actions block outbound traffic from reaching destinations you specify within the [Selectors](#selectors) and Value fields. For example, the following configuration blocks users from being able to upload any file type to Google Drive:

| Selector | Operator | Value | Action |
| - | - | - | - |
| Application | in | `Google Drive` | Block |
| Upload Mime Type | matches regex | `.*` |  |

### Isolate

For more information on this action, refer to the documentation on [Browser Isolation policies](/cloudflare-one/policies/browser-isolation/).

### Do Not Isolate

For more information on this action, refer to the documentation on [Browser Isolation policies](/cloudflare-one/policies/browser-isolation/).

### Do Not Inspect

<Aside type='Warning' header='Warning'>

When a *Do Not Inspect* rule is created for a given hostname, application, or app type, no traffic will be inspected.

</Aside>

*Do Not Inspect* lets administrators bypass certain elements from inspection. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occurring on both encrypted and plaintext traffic.

The *Do Not Inspect* action is only available when matching against the host criteria.

The L7 firewall will evaluate *Do Not Inspect* rules before any subsequent Allow or Block rules. For encrypted traffic, Gateway uses the Server Name Indicator (SNI) in the TLS header to determine whether to decrypt the traffic for further HTTP inspection against Allow or Block rules. All *Do Not Inspect* rules are evaluated first to determine if decryption should occur. This means regardless of precedence in a customer's list of rules, all *Do Not Inspect* rules will take precedence over Allow or Block rules.

### Do Not Scan

When an admin enables AV scanning for uploads and/or downloads, Gateway will scan every supported file. Admins can selectively choose to disable scanning by leveraging the HTTP rules. For example, to prevent AV scanning of files uploaded to or downloaded from `example.com`, an admin would configure the following rule:

| Selector | Operator | Value | Acton |
| - | - | - | - | - |
| Hostname | Matches Regex | `.*example.com` | Do Not Scan |

## Disabling QUIC in Google Chrome

For more information on disabling QUIC on a managed device, see [these instructions](https://support.google.com/chrome/a/answer/7649838?hl=en). You can manually disable QUIC in Google Chrome using the Experimental QUIC protocol (`#enable-quic`) flag:

1.  In the address bar, type:  `chrome://flags#enable-quic`.
2.  Set the **Experimental QUIC protocol** flag to `Disabled`.
3.  Relaunch Chrome for the setting to take effect.

The following Windows registry key (or Mac/Linux preference) can be used to disable QUIC in Chrome, and can be enforced via GPO or equivalent:

*   **Data type:** `Boolean [Windows:REG_DWORD]`
*   **Windows registry location for Windows clients:** `Software\Policies\Google\Chrome\QuicAllowed`
*   **Windows registry location for Google Chrome OS clients:** `Software\Policies\Google\ChromeOS\QuicAllowed`
*   **Mac/Linux preference name:** `QuicAllowed`
*   **Description:** If this policy is set to true (or not set), usage of QUIC is allowed. If the policy is set to false, usage of QUIC is not allowed.
*   **Recommended value:** `Windows: 0x00000000`, `Linux: false`, `Mac: <false />`

## FAQ

### **How can I bypass the L7 firewall for a website?**

Cloudflare Gateway uses the hostname in the HTTP CONNECT header to identify the destination of the request. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occurring on both encrypted and plaintext traffic. The **bypass** action is only available when matching against the **host** criteria.
Bypassing the L7 firewall results in no HTTP traffic inspection and logging is disabled for that HTTP session.

### **In what order are rules evaluated?**

The L7 firewall evaluates rules starting with the rule containing the lowest precedence (e.g., rule number one). Rules with a higher value precedence are evaluated after those with a lower value.

### **I see an error when browsing Google-related pages. What's the problem?**

If you are using the Gateway proxy, you need to disable the QUIC protocol within the Google Chrome settings. This will prevent you from encountering issues such as users who are able to connect to Google-related sites and services (like YouTube) that are explicitly blocked by a Gateway policy.

Google Chrome uses QUIC to connect to all google services by default. This means all requests to google services via the Google Chrome browser use UDP instead of TCP. **At this time, Gateway does not support inspection of QUIC traffic and requests using QUIC will bypass Gateway HTTP policies**. Gateway does prevent standard HTTP requests from negotiating to using QUIC with the `Alt-Svc` header by removing this header from HTTP requests.

Gateway will support inspection of QUIC traffic in the future.
