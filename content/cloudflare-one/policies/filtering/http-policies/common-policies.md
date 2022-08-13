---
pcx_content_type: reference
title: Common policies
weight: 1
---

# Common HTTP policies

The following policies are commonly used to secure HTTP traffic.

{{<render file="_policies-optional.md">}}

## Enforce device posture

Require devices to have certain software installed or other configuration attributes. For instructions on setting up a device posture check, refer to the [device posture section](/cloudflare-one/identity/devices/).

| Selector                     | Operator | Value                | Action |
| ---------------------------- | -------- | -------------------- | ------ |
| Passed Device Posture Checks | in       | `Minimum OS version` | Allow  |

## Enforce session duration

[Require users to re-authenticate](/cloudflare-one/policies/filtering/enforce-sessions/) after a certain amount of time has elapsed.

## Isolate high risk sites in remote browser

<details>
<summary>Feature availability</summary>
<div>

Remote Browser Isolation is available as an add-on to Zero Trust Standard and Enterprise plans. See our [payment plans](https://www.cloudflare.com/teams-pricing/) for more information.

</div>
</details>

### Isolate security risks

Isolate high risk content categories such as newly registered domains.

| Selector           | Operator | Value          | Action  |
| ------------------ | -------- | -------------- | ------- |
| Content categories | in       | Security Risks | Isolate |

### Isolate news and media

Isolate News and Media sites, which are targets for Malvertising attacks:

| Selector           | Operator | Value          | Action  |
| ------------------ | -------- | -------------- | ------- |
| Content categories | in       | News and Media | Isolate |

### Isolate uncategorized content

Isolate content that has not been categorized by Cloudflare Radar:

| Selector           | Operator | Value                  | Action  |
| ------------------ | -------- | ---------------------- | ------- |
| Content categories | not in   | All content categories | Isolate |

## Bypass inspection for self-signed certificates

When accessing origin servers with certificates not signed by a public certificate authority, you must bypass TLS decryption.

| Selector | Operator | Value               | Action         |
| -------- | -------- | ------------------- | -------------- |
| Domain   | in       | `internal.site.com` | Do Not Inspect |

Refer to the [HTTP policies page](/cloudflare-one/policies/filtering/http-policies/) for a comprehensive list of other selectors, operators, and actions.
