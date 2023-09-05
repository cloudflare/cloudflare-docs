---
pcx_content_type: configuration
title: HTTP policies
layout: single
weight: 4
---

# HTTP policies

{{<Aside>}}

Install the <a href="/cloudflare-one/connections/connect-devices/warp/user-side-certificates/">Cloudflare Root Certificate</a> before creating HTTP policies.

{{</Aside>}}

HTTP policies allow you to intercept all HTTP and HTTPS requests and either block, allow, or override specific elements such as websites, IP addresses, and file types. HTTP policies operate on Layer 7 for all TCP (and [optionally UDP](/cloudflare-one/policies/gateway/initial-setup/http/#1-connect-to-gateway)) traffic sent over ports 80 and 443.

An HTTP policy consists of an **Action** as well as a logical expression that determines the scope of the policy. To build an expression, you need to choose a **Selector** and an **Operator**, and enter a value or range of values in the **Value** field. You can use **And** and **Or** logical operators to evaluate multiple conditions.

- [Actions](#actions)
- [Selectors](#selectors)
- [Comparison operators](#comparison-operators)
- [Value](#value)
- [Logical operators](#logical-operators)

{{<render file="gateway/_response.md" withParameters="query;;_Source IP_;;_Resolved IP_">}}

## Actions

Actions in HTTP policies allow you to choose what to do with a given set of elements (domains, IP addresses, file types, and so on). You can assign one action per policy.

### Allow

API value: `allow`

The Allow action allows outbound traffic to reach destinations you specify within the [Selectors](#selectors) and [Value](#value) fields. For example, the following configuration allows traffic to reach all websites we categorize as belonging to the Education content category:

| Selector           | Operator | Value       | Action |
| ------------------ | -------- | ----------- | ------ |
| Content Categories | in       | `Education` | Allow  |

#### Untrusted certificates

{{<Aside type="note">}}

To use this feature, deploy a [custom root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/).

{{</Aside>}}

The **Untrusted certificate action** determines how to handle insecure requests.

| Option       | Action                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error        | Display Gateway error page. Matches the default behavior when no action is configured.                                                                                                                                                                                                                                                                                                                           |
| Block        | Display [block page](/cloudflare-one/policies/gateway/configuring-block-page/) as set in Zero Trust.                                                                                                                                                                                                                                                                                                             |
| Pass through | Bypass insecure connection warnings and seamlessly connect to the upstream. To use this feature, deploy a [custom root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/). For more information on what statuses are bypassed, refer to the [troubleshooting FAQ](/cloudflare-one/faq/teams-troubleshooting/#i-see-error-526-when-browsing-to-a-website). |

### Block

API value: `block`

The Block action blocks outbound traffic from reaching destinations you specify within the [Selectors](#selectors) and [Value](#value) fields. For example, the following configuration blocks users from being able to upload any file type to Google Drive:

| Selector         | Operator      | Value          | Logic | Action |
| ---------------- | ------------- | -------------- | ----- | ------ |
| Application      | in            | `Google Drive` | And   | Block  |
| Upload Mime Type | matches regex | `.*`           |       |        |

### Isolate

API value: `isolate`

For more information on this action, refer to the documentation on [Browser Isolation policies](/cloudflare-one/policies/browser-isolation/).

### Do Not Isolate

API value: `noisolate`

For more information on this action, refer to the documentation on [Browser Isolation policies](/cloudflare-one/policies/browser-isolation/).

### Do Not Inspect

API value: `off`

{{<Aside type="warning" header="Warning">}}

When a Do Not Inspect policy is created for a given hostname, application, or app type, you will lose the ability to log or block HTTP requests, apply DLP policies, and perform AV scanning.

{{</Aside>}}

Do Not Inspect lets you bypass certain elements from inspection. To prevent Gateway from decrypting and inspecting HTTPS traffic, your policy must match against the Server Name Indicator (SNI) in the TLS header. [Learn more](/cloudflare-one/policies/gateway/http-policies/tls-decryption/) about applications which may require a Do Not Inspect policy.

All Do Not Inspect rules are evaluated first, before any Allow or Block rules, to determine if decryption should occur. [Learn more](/cloudflare-one/policies/gateway/order-of-enforcement/#http-policies) about the order of enforcement for HTTP policies.

### Do Not Scan

API value: `noscan`

When an admin enables AV scanning for uploads and/or downloads, Gateway will scan every supported file. Admins can selectively choose to disable scanning by leveraging the HTTP rules. For example, to prevent AV scanning of files uploaded to or downloaded from `example.com`, an admin would configure the following rule:

| Selector | Operator      | Value           | Action      |
| -------- | ------------- | --------------- | ----------- |
| Hostname | Matches Regex | `.*example.com` | Do Not Scan |

When a Do Not Scan rule matches, nothing is scanned, regardless of file size or whether the file type is supported or not.

## Selectors

{{<Aside type="note">}}

Policies created using the URL selector are case-sensitive.

{{</Aside>}}

Gateway matches HTTP traffic against the following selectors, or criteria:

### Application

{{<render file="gateway/_application.md" withParameters="HTTP">}}

{{<Aside type="warning" header="Multiple API selectors required for Terraform">}}

When using Terraform to create a policy with the [Do Not Inspect](#do-not-inspect) action, you must use the `app.hosts_ids` and `app.support_ids` selectors. For example, to create a Do Not Inspect policy for Google Cloud Platform traffic, create a policy with both `any(app.hosts_ids[*] in {1245})` and `any(app.support_ids[*] in {1245})`.

{{</Aside>}}

### Content Categories

| UI name            | API example                                             |
| ------------------ | ------------------------------------------------------- |
| Content Categories | `not(any(http.request.uri.content_category[*] in {1}))` |

For more information, refer to our list of [content categories](/cloudflare-one/policies/gateway/domain-categories/#content-categories).

### Destination Continent

{{<Aside type="note">}}
Only applies to traffic sent through the [WARP client](/cloudflare-one/connections/connect-devices/warp/set-up-warp/#gateway-with-warp-default).
{{</Aside>}}

{{<render file="gateway/_destination-continent.md" withParameters="http.dst_ip">}}

### Destination Country

{{<Aside type="note">}}
Only applies to traffic sent through the [WARP client](/cloudflare-one/connections/connect-devices/warp/set-up-warp/#gateway-with-warp-default).
{{</Aside>}}

{{<render file="gateway/_destination-country.md" withParameters="http.dst_ip">}}

### Destination IP

{{<Aside type="note">}}
Only applies to traffic sent through the [WARP client](/cloudflare-one/connections/connect-devices/warp/set-up-warp/#gateway-with-warp-default).
{{</Aside>}}

| UI name        | API example                   |
| -------------- | ----------------------------- |
| Destination IP | `http.dst.ip == "10.0.0.0/8"` |

### Domain

Use this selector to match against a domain and all subdomains — for example, if you want to block `example.com` and subdomains such as `www.example.com`.

| UI name | API example                                     |
| ------- | ----------------------------------------------- |
| Domain  | `any(http.request.domains[*] == "example.com")` |

### Download and Upload File Type

These selectors will scan file signatures in the HTTP body. Supported file types include Microsoft Office documents, PDF files, and ZIP files.

| UI name            | API example                                             |
| ------------------ | ------------------------------------------------------- |
| Download File Type | `http.download.file.type in {\"PDF\" \"ZIP\" \"XLXS\"}` |

| UI name          | API example                                           |
| ---------------- | ----------------------------------------------------- |
| Upload File Type | `http.upload.file.type in {\"PDF\" \"ZIP\" \"XLXS\"}` |

### Download and Upload Mime Type

These selectors depend on the `Content-Type` header being present in the request (for uploads) or response (for downloads).

| UI name            | API example                          |
| ------------------ | ------------------------------------ |
| Download Mime Type | `http.download.mime == "image/png\"` |

| UI name          | API example                        |
| ---------------- | ---------------------------------- |
| Upload Mime Type | `http.upload.mime == "image/png\"` |

### DLP Profile

Scans HTTP traffic for the presence of social security numbers and other PII. You must configure the DLP Profile before you can use this selector in your policy. For more information, refer to our [DLP Profile](/cloudflare-one/policies/data-loss-prevention/) documentation.

### Host

Use this selector to match only the hostname specified — for example, if you want to block `test.example.com` but not `example.com` or `www.test.example.com`.

| UI name | API example                               |
| ------- | ----------------------------------------- |
| Host    | `http.request.host == "test.example.com"` |

{{<Aside type="note">}}

Some hostnames (`example.com`) will invisibly redirect to the www subdomain (`www.example.com`). To match this type of website, use the [Domain](#domain) selector instead of the Host selector.

{{</Aside>}}

### HTTP Method

| UI name     | API example                    |
| ----------- | ------------------------------ |
| HTTP Method | `http.request.method == "GET"` |

### HTTP Response

| UI name | API example                          |
| ------- | ------------------------------------ |
| URL     | `http.response.status_code == "200"` |

### Device Posture

{{<render file="gateway/_device-posture.md">}}

### Security Risks

| UI name        | API example                                |
| -------------- | ------------------------------------------ |
| Security Risks | `any(http.request.uri.category[*] in {1})` |

For more information, refer to our list of [security categories](/cloudflare-one/policies/gateway/domain-categories/#security-categories).

### Source Continent

The continent of the user making the request.
{{<render file="gateway/_source-continent.md" withParameters="http.src_ip">}}

### Source Country

The country of the user making the request.
{{<render file="gateway/_source-country.md" withParameters="http.src_ip">}}

### Source Internal IP

{{<render file="gateway/_source-internal-ip.md" withParameters="HTTP;;http">}}

### Source IP

| UI name   | API example                   |
| --------- | ----------------------------- |
| Source IP | `http.src.ip == "10.0.0.0/8"` |

### URL

| UI name | API example                                             |
| ------- | ------------------------------------------------------- |
| URL     | `not(any(http.request.uri.content_category[*] in {1}))` |

### URL Path

| UI name  | API example                             |
| -------- | --------------------------------------- |
| URL Path | `http.request.uri.path == \"/foo/bar\"` |

### URL Path and Query

| UI name            | API example                                                     |
| ------------------ | --------------------------------------------------------------- |
| URL Path and Query | `http.request.uri.path_and_query == \"/foo/bar?ab%242=%2A342\"` |

### URL Query

| UI name   | API example                    |
| --------- | ------------------------------ |
| URL Query | `not(http.request.uri in $%s)` |

### Users

{{<render file="gateway/_users.md">}}

## Comparison operators

{{<render file="gateway/_comparison-operators.md">}}

## Value

{{<render file="gateway/_value.md">}}

## Logical operators

{{<render file="gateway/_logical-operators.md" withParameters="**Identity** or **Device Posture**">}}

{{<render file="gateway/_response.md" withParameters="request;;_Source IP_;;a _DLP Profile_">}}
