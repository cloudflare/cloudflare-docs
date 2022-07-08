---
pcx-content-type: how-to
title: Data Loss Prevention
weight: 5
---

# DLP Profiles (beta)

With Cloudflare Data Loss Prevention (DLP) and Secure Web Gateway, you can inspect HTTP traffic for the presence of sensitive data such as social security numbers and credit card numbers. DLP scans the entire HTTP body, which may include uploaded or downloaded Microsoft Office documents, chat messages, forms, and other web content. Visibility varies depending on the site or application. DLP does not scan non-HTTP traffic such as email, nor does it scan any traffic that bypasses Cloudflare Gateway (for example, traffic that matches a [_Do Not Inspect_](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) rule).

To perform DLP filtering, first configure a DLP Profile with the data patterns you want to detect, and then build a Gateway HTTP policy to allow or block the sensitive data from leaving your organization. Gateway will parse and scan your HTTP traffic for strings matching the keywords or regexes specified in the DLP profile.

## Prerequisites

* Enrolled in the [DLP Beta program](https://www.cloudflare.com/zero-trust/dlp-waitlist/)
* Enabled [Gateway HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/)

## Configure a DLP Profile

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **DLP Profiles**.
2. Choose a [predefined profile](#predefined-dlp-profiles) and select **Configure**.
3. Enable one or more **Detection entries** according to your preferences. The DLP Profile matches using the OR logical operator — if multiple entries are enabled, your data needs to match only one of the entries. 
{{<Aside type="note">}}
DLP scans will not start until you create an HTTP policy.
{{</Aside>}}
4. Select **Save profile**.
5. To start logging or blocking traffic, go to **Gateway** > **Policies** > **HTTP Policies** and create a policy using the [DLP Profiles](/cloudflare-one/policies/filtering/http-policies/#dlp-profiles) selector.

## Example DLP policy

DLP Profiles may be used alongside other Zero Trust rules in a [Gateway HTTP policy](/cloudflare-one/policies/filtering/http-policies/). For example, the following policy prevents users from uploading sensitive data to any location other than an approved corporate application:

| Name |
| ---- |
| Only allow SSN uploads to Workday |

| Selector | Operator | Value |
| - | - | - | - |
| DLP Profiles | in | `U.S. Social Security Numbers` |
| Application  | not in | `Workday` |

|Action|
|------|
|Block |

{{<Aside type="note" header="Tips">}}
- Adding additional conditions to your policy limits the scope of the DLP scan and can help reduce false positives.
- The **Allow** action functions as an implicit logger, giving you visibility into where your sensitive data is going.

{{</Aside>}}

## Predefined DLP profiles

| DLP Profile | Description |
| ----------- | ----------- |
| Credit Cards | Numbers that begin with a six or eight-digit Issuer Identification Number (IIN) and are followed by up to 23 additional digits |
| U.S. Social Security Numbers |  Numbers that resemble the format `xxx-xx-xxxx`, or text that contains phrases such as `ssn`, `ss#`, or `social security` |