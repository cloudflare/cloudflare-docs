---
pcx_content_type: reference
title: Common policies
weight: 1
---

# Common HTTP policies

The following policies are commonly used to secure HTTP traffic.

Refer to the [HTTP policies page](/cloudflare-one/policies/gateway/http-policies/) for a comprehensive list of other selectors, operators, and actions.

## Block sites

Block attempts to reach sites by hostname or URL paths. Different approaches may be required based on how a site is organized.

### Block sites by hostname

Block all subdomains that use a host.

| Selector | Operator      | Value            | Action |
| -------- | ------------- | ---------------- | ------ |
| Host     | matches regex | `.*example\.com` | Block  |

### Block sites by URL

Block a section of a site without blocking the entire site. For example, you can block a specific subreddit, such as `reddit.com/r/gaming`, without blocking `reddit.com`.

| Selector | Operator      | Value       | Action |
| -------- | ------------- | ----------- | ------ |
| URL      | matches regex | `/r/gaming` | Block  |

{{<render file="gateway/_content-categories.md">}}

{{<render file="gateway/_block-applications.md">}}

{{<render file="gateway/_policies-optional.md">}}

## Skip inspection for groups of applications

Certain client applications, such as Zoom or Apple services, rely on certificate pinning. The [TLS inspection](/cloudflare-one/policies/gateway/http-policies/tls-decryption/) performed by Cloudflare Gateway will cause errors when users visit those applications. To avoid this behavior, you must add a Do Not Inspect HTTP policy.

Gateway [evaluates Do Not Inspect policies first](/cloudflare-one/policies/gateway/order-of-enforcement/#http-policies). We recommend moving your Do Not Inspect policies to the top of the list to reduce confusion.

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

[Require users to re-authenticate](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-sessions/) after a certain amount of time has elapsed.

## Isolate high risk sites in remote browser

If you are using the [Browser Isolation add-on](/cloudflare-one/policies/browser-isolation/), refer to our list of [common Isolate policies](/cloudflare-one/policies/browser-isolation/isolation-policies/#common-policies).

## Bypass inspection for self-signed certificates

When accessing origin servers with certificates not signed by a public certificate authority, you must bypass TLS decryption.

| Selector | Operator | Value               | Action         |
| -------- | -------- | ------------------- | -------------- |
| Domain   | in       | `internal.site.com` | Do Not Inspect |

{{<render file="gateway/_block-file-types.md">}}

## Block Google services

To enable Gateway inspection for Google Drive traffic, you must [add the Cloudflare certificate to Google Drive](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#google-drive-for-desktop).

### Block Google Drive uploads

Block file uploads to Google Drive.

| Selector         | Operator      | Value        | Logic | Action |
| ---------------- | ------------- | ------------ | ----- | ------ |
| Application      | in            | Google Drive | And   | Block  |
| Upload Mime Type | matches regex | `.*`         |       |        |

### Block Google Drive downloads

Block file downloads from Google Drive.

| Selector         | Operator      | Value                      | Logic | Action |
| ---------------- | ------------- | -------------------------- | ----- | ------ |
| Application      | in            | Google Drive               | And   | Block  |
| URL Path & Query | matches regex | `.*(e=download\|export).*` |       |        |

### Block Gmail downloads

Block file downloads from Gmail.

| Selector         | Operator | Value                                   | Logic | Action |
| ---------------- | -------- | --------------------------------------- | ----- | ------ |
| Host             | is       | `mail-attachment.googleusercontent.com` | And   | Block  |
| URL Path & Query | is       | `/attachment/u/0`                       |       |        |
