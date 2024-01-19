---
pcx_content_type: reference
title: Common policies
weight: 1
meta:
    title: Common DLP policies
---

# Common DLP policies

The following in-line DLP policies are commonly used to secure data in uploaded and downloaded files.

## Log uploads/downloads

The **Allow** action functions as an implicit logger, providing visibility into where your sensitive data is going without impacting the end user experience. The following example scans for your enabled Financial Information profile entries when users upload or download data to file sharing apps.

| Selector         | Operator | Value                 | Logic | Action |
| ---------------- | -------- | --------------------- | ----- | ------ |
| DLP Profile      | in       | Financial Information | And   | Allow  |
| Content Category | in       | File Sharing          |       |        |

{{<render file="gateway/policies/_block-file-types.md">}}

## Block uploads/downloads for specific users

You can configure access on a per-user or group basis by adding [identity-based conditions](/cloudflare-one/policies/gateway/identity-selectors/) to your policies. The following example blocks only contractors from uploading/downloading Financial Information to file sharing apps.

| Selector         | Operator | Value                 | Logic | Action |
| ---------------- | -------- | --------------------- | ----- | ------ |
| DLP Profile      | in       | Financial Information | And   | Block  |
| Content Category | in       | File Sharing          | And   |        |
| User Group Names | in       | Contractors           |       |        |

## Exclude Android applications

Many Android applications (such as Google Drive) use [certificate pinning](/ssl/reference/certificate-pinning/), which is incompatible with Gateway inspection. If needed, you can create a [Do Not Inspect policy](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) so that the app can continue to function on Android:

1. Set up an [OS version device posture check](/cloudflare-one/identity/devices/warp-client-checks/os-version/) that checks for the Android operating system.

2. Create the following HTTP policy in Gateway:

    | Selector                     | Operator | Value              | Logic | Action         |
    | ---------------------------- | -------- | ------------------ | ----- | -------------- |
    | Passed Device Posture Checks | in       | OS Version Android | And   | Do Not Inspect |
    | Application                  | in       | Google Drive       |       |                |

Android users can now use the app, but the app traffic will bypass DLP scanning.

## Exclude specific sites

In your [DLP logs](/cloudflare-one/policies/data-loss-prevention/dlp-policies/#4-view-dlp-logs), you may find that certain sites are a common source of noise. To exempt these sites from DLP scanning:

1. [Create a list](/cloudflare-one/policies/gateway/lists/) of hostnames or URLs.

2. Exclude the list from your DLP policy as shown in the example below:

    | Selector    | Operator    | Value                 | Logic | Action |
    | ----------- | ----------- | --------------------- | ----- | ------ |
    | DLP Profile | in          | Financial Information | And   | Block  |
    | Application | in          | Google Drive          | And   |        |
    | Domain      | not in list | Do not DLP - SSN      |       |        |
