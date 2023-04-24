---
pcx_content_type: reference
title: Common policies
weight: 1
---

# Common HTTP policies

The following policies are commonly used to secure HTTP traffic.

## Block sites

Block attempts to reach sites by hostname or URL paths. Different approaches may be required based on how a site is organized.

### Block sites by hostname

Block all subdomains that use a host.

| Selector | Operator      | Value            | Action |
| -------- | ------------- | ---------------- | ------ |
| Host     | matches regex | `.*example\.com` | Block  |

### Block sites by URL

Block a section of a site without blocking the entire site.

| Selector | Operator      | Value       | Action |
| -------- | ------------- | ----------- | ------ |
| URL      | matches regex | `/r/gaming` | Block  |

{{<render file="gateway/_content-categories.md">}}

{{<render file="gateway/_policies-optional.md">}}

## Skip inspection for groups of applications

Certain client applications, such as Zoom or Apple services, rely on certificate pinning. The [TLS inspection](/cloudflare-one/policies/filtering/http-policies/tls-decryption/) performed by Cloudflare Gateway will cause errors when users visit those applications. To avoid this behavior, you must add a Do Not Inspect HTTP policy.

Gateway [evaluates Do Not Inspect policies first](/cloudflare-one/policies/filtering/order-of-enforcement/#http-policies). We recommend moving your Do Not Inspect policies to the top of the list to reduce confusion.

| Selector    | Operator | Value          | Action         |
| ----------- | -------- | -------------- | -------------- |
| Application | in       | Do Not Inspect | Do Not Inspect |

{{<Aside type="note">}}
You can select either individual applications or the entire Do Not Inspect set, which will update as new applications are added.
{{</Aside>}}

## Enforce device posture

Require devices to have certain software installed or other configuration attributes. For instructions on setting up a device posture check, refer to the [device posture section](/cloudflare-one/identity/devices/).

| Selector                     | Operator | Value                | Action |
| ---------------------------- | -------- | -------------------- | ------ |
| Passed Device Posture Checks | in       | `Minimum OS version` | Allow  |

## Enforce session duration

[Require users to re-authenticate](/cloudflare-one/policies/filtering/enforce-sessions/) after a certain amount of time has elapsed.

## Isolate high risk sites in remote browser

If you are using the [Browser Isolation add-on](/cloudflare-one/policies/browser-isolation/), refer to our list of [common Isolate policies](/cloudflare-one/policies/browser-isolation/isolation-policies/#common-policies).

## Bypass inspection for self-signed certificates

When accessing origin servers with certificates not signed by a public certificate authority, you must bypass TLS decryption.

| Selector | Operator | Value               | Action         |
| -------- | -------- | ------------------- | -------------- |
| Domain   | in       | `internal.site.com` | Do Not Inspect |

## Block file types

Block the upload or download of files based on their type.

| Selector           | Operator | Value                                 | Action |
| ------------------ | -------- | ------------------------------------- | ------ |
| Upload File Type   | in       | Microsoft Office Word Document (docx) | Block  |
| Download File Type | in       | PDF (pdf)                             | Block  |

## Block Google Drive downloads

Block file downloads from Google Drive. You can also [Block file uploads to Google Drive](/cloudflare-one/tutorials/block-uploads/).

| Selector         | Operator      | Value                      | Action | Operator |
| ---------------- | ------------- | -------------------------- | ------ | -------- |
| Application      | in            | Google Drive               | Block  | And      |
| URL Path & Query | matches regex | `.*(e=download\|export).*` | Block  |          |

## Block Gmail downloads

Block file downloads from Gmail.

| Selector         | Operator | Value                                   | Action | Operator |
| ---------------- | -------- | --------------------------------------- | ------ | -------- |
| Host             | is       | `mail-attachment.googleusercontent.com` | Block  | And      |
| URL Path & Query | is       | `/attachment/u/0`                       | Block  |          |

Refer to the [HTTP policies page](/cloudflare-one/policies/filtering/http-policies/) for a comprehensive list of other selectors, operators, and actions.
