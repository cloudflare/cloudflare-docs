---
pcx_content_type: configuration
title: HTTP policies
layout: single
weight: 4
---

# HTTP policies

{{<Aside>}}

Install the <a href="/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/">Cloudflare Root Certificate</a> before creating HTTP policies.

{{</Aside>}}

HTTP policies allow you to intercept all HTTP and HTTPS requests and either block, allow, or override specific elements such as websites, IP addresses, and file types. HTTP policies operate on Layer 7 for all TCP (and [optionally UDP](/cloudflare-one/policies/filtering/initial-setup/http/#1-connect-to-gateway)) traffic sent over ports 80 and 443.

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

{{<Aside type="warning" header="Warning">}}

When a Do Not Inspect rule is created for a given hostname, application, or app type, no traffic will be inspected.

{{</Aside>}}

Do Not Inspect lets you bypass certain elements from inspection. To bypass a site, your policy must match against the host in order to prevent HTTP inspection from occurring on encrypted traffic.

The L7 firewall will evaluate Do Not Inspect rules before any subsequent Allow or Block rules. For encrypted traffic, Gateway uses the Server Name Indicator (SNI) in the TLS header to determine whether to decrypt the traffic for further HTTP inspection against Allow or Block rules. All Do Not Inspect rules are evaluated first to determine if decryption should occur. This means regardless of precedence in a customer's list of rules, all Do Not Inspect rules will take precedence over Allow or Block rules.

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

### Destination Continent

The continent to which the request is destined. Geolocation is determined from the target IP address. To specify a continent, enter its two-letter code into the **Value** field:

- AF – Africa
- AN – Antarctica
- AS – Asia
- EU – Europe
- NA – North America
- OC – Oceania
- SA – South America
- T1 – Tor network

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Destination Continent IP Geolocation | `http.dst.geo.continent == "EU"` |

### Destination Country

The country that the request is destined for. Geolocation is determined from the target IP address. To specify a country, enter its [ISO 3166-1 Alpha 2 code](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Destination Country IP Geolocation | `http.dst.geo.country == "RU"` |

### Destination IP

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Destination IP | `http.dst.ip == "10.0.0.0/8"` |

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

### DLP Profile

Scans HTTP traffic for the presence of social security numbers and other PII. You must configure the DLP Profile before you can use this selector in your policy. For more information, refer to our [DLP Profile](/cloudflare-one/policies/filtering/http-policies/data-loss-prevention/) documentation.

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

### Source Continent

The continent of the user making the request. Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a continent, enter its two-letter code into the **Value** field:

- AF – Africa
- AN – Antarctica
- AS – Asia
- EU – Europe
- NA – North America
- OC – Oceania
- SA – South America
- T1 – Tor network

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Source Continent IP Geolocation | `http.src.geo.continent == "EU"` |

### Source Country

The country of the user making the request. Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a country, enter its [ISO 3166-1 Alpha 2 code](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Source Country IP Geolocation | `http.src.geo.country == "RU"` |

### Source IP

| UI name   | API example                  |
| --------- | ---------------------------- |
| Source IP | `http.src.ip == "10.0.0.0/8"` |

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
