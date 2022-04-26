---
pcx-content-type: configuration
title: HTTP policies
layout: single
weight: 4
---

# HTTP policies

{{<Aside>}}

Install the <a href="/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/">Cloudflare Root Certificate</a> before creating HTTP policies.

{{</Aside>}}

HTTP policies allow you to filter HTTP traffic on the L7 firewall. Gateway will intercept all HTTP and HTTPS traffic and apply the rules you have configured in your policy to either block, allow, or override specific elements such as websites, IP addresses, and file types.

An HTTP policy consists of an **Action** as well as a logical expression that determines the scope of the policy. To build an expression, you need to choose a **Selector** and an **Operator**, and enter a value or range of values in the **Value** field.

- [Actions](#actions)
- [Selectors](#selectors)
- [Operators](#operators)
- [Value](#value)

## Actions

Actions in HTTP policies allow you to choose what to do with a given set of elements (domains, IP addresses, file types, and so on). You can assign one action per policy.

### Allow

The Allow action allows outbound traffic to reach destinations you specify within the [Selectors](#selectors) and [Value](#value) fields. For example, the following configuration allows traffic to reach all websites we categorize as belonging to the Education content category:

| Selector | Operator | Value | Action |
| - | - | - | - |
| Content Categories | in | `Education` | Allow |

### Block

The Block action blocks outbound traffic from reaching destinations you specify within the [Selectors](#selectors) and [Value](#value) fields. For example, the following configuration blocks users from being able to upload any file type to Google Drive:

| Selector | Operator | Value | Action |
| - | - | - | - |
| Application | in | `Google Drive` | Block |
| Upload Mime Type | matches regex | `.*` |  |

### Isolate

For more information on this action, refer to the documentation on [Browser Isolation policies](/cloudflare-one/policies/browser-isolation/).

### Do Not Isolate

For more information on this action, refer to the documentation on [Browser Isolation policies](/cloudflare-one/policies/browser-isolation/).

### Do Not Inspect

{{<Aside type="Warning" header="Warning">}}

When a *Do Not Inspect* rule is created for a given hostname, application, or app type, no traffic will be inspected.

{{</Aside>}}

*Do Not Inspect* lets you bypass certain elements from inspection. To bypass a site, your policy must match against the host in order to prevent HTTP inspection from occurring on both encrypted and plaintext traffic.

The L7 firewall will evaluate *Do Not Inspect* rules before any subsequent Allow or Block rules. For encrypted traffic, Gateway uses the Server Name Indicator (SNI) in the TLS header to determine whether to decrypt the traffic for further HTTP inspection against Allow or Block rules. All *Do Not Inspect* rules are evaluated first to determine if decryption should occur. This means regardless of precedence in a customer's list of rules, all *Do Not Inspect* rules will take precedence over Allow or Block rules.

### Do Not Scan

When an admin enables AV scanning for uploads and/or downloads, Gateway will scan every supported file. Admins can selectively choose to disable scanning by leveraging the HTTP rules. For example, to prevent AV scanning of files uploaded to or downloaded from `example.com`, an admin would configure the following rule:

| Selector | Operator | Value | Action |
| - | - | - | - | - |
| Hostname | Matches Regex | `.*example.com` | Do Not Scan |

When a Do Not Scan rule matches, nothing is scanned, regardless of file size or whether the file type is supported or not.

## Selectors

{{<Aside type="note">}}

Policies created using the URL selector are case-sensitive.

{{</Aside>}}

Gateway matches HTTP traffic against the following selectors, or criteria:

### Application

You can apply HTTP policies to a growing list of popular web applications. Refer to the [Application and app types](/cloudflare-one/policies/filtering/application-app-types) page for more information.

| UI name | API example |
| -- | -- |
| Application | `any(app.ids[*] in {505}` |

A list of supported applications and their ID numbers is available through the [Gateway API endpoint](https://api.cloudflare.com/#zero-trust-gateway-application-and-application-type-mappings-properties).

### Content Categories

| UI name | API example |
| -- | -- |
| Content Categories | `not(any(http.request.uri.content_category[*] in {1}))` |

### Destination IP

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Destination IP | `net.dst.ip == "10.0.0.0/8"` |

### Domain

| UI name | API example |
| -- | -- |
| Domain | `http.request.domains == "a.example.com"` |

### Download and Upload Mime Type

These selectors depend on the `Content-Type` header being present in the request (for uploads) or response (for downloads).

| UI name | API example |
| -- | -- |
| Download Mime Type | `http.download.mime == "image/png\"` |

| UI name | API example |
| -- | -- |
| Upload Mime Type | `http.upload.mime == "image/png\"` |

### Host

| UI name | API example |
| -- | -- |
| Host | `http.request.host == ".*example\.com"` |

{{<Aside type="note" header="Host or Domain?">}}

The `Host` selector matches the exact entry input by a customer in the value field or list. The `Domain` selector matches the exact entry and all subdomains in the value field or list.

{{</Aside>}}

### HTTP Method

| UI name | API example |
| -- | -- |
| HTTP Method | `http.request.method == "GET"` |

### HTTP Response

| UI name | API example |
| -- | -- |
| URL | `http.response.status_code == "200"` |

### Device Posture

With the Device Posture selector, admins can use signals from end-user devices to secure access to their internal and external resources. For example, a security admin can choose to limit all access to internal applications based on whether specific software is installed on a device and/or if the device or software are configured in a particular way.

| UI name | API example |
| --- | --- |
| Passed Device Posture Checks | `any(device_posture.checks.passed[*] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})` |

### Security Categories

| UI name | API example |
| -- | -- |
| Security Categories | `any(http.request.uri.category[*] in {1})` |

### Source IP

| UI name   | API example                  |
| --------- | ---------------------------- |
| Source IP | `net.src.ip == "10.0.0.0/8"` |

### URL

| UI name | API example |
| -- | -- |
| URL | `not(any(http.request.uri.content_category[*] in {1}))` |

### URL Path

| UI name | API example |
| -- | -- |
| URL Path | `http.request.uri.path == \"/foo/bar\"` |

### URL Path and Query

| UI name | API example |
| -- | -- |
| URL Path and Query | `http.request.uri.path_and_query == \"/foo/bar?ab%242=%2A342\"` |

### URL Query

| UI name | API example |
| -- | -- |
| URL Query | `not(http.request.uri in $%s)` |

### Users

The **User**, **User Group**, and **SAML Attributes** selectors require Gateway with WARP mode to be enabled in the Zero Trust WARP client, and the user to be enrolled in the organization via the WARP client. For more information on identity-based selectors, refer to the [Identity-based policies](/cloudflare-one/policies/filtering/identity-selectors/) page.

## Operators

{{<render file="_policies-operators.md">}}

## Value

{{<render file="_policies-value.md">}}
