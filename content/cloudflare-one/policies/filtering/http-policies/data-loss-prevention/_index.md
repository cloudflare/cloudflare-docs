---
pcx-content-type: how-to
title: Data Loss Prevention
weight: 5
layout: single
---

# Data Loss Prevention (beta)

With Cloudflare Data Loss Prevention (DLP) and Secure Web Gateway, you can inspect HTTP traffic for the presence of sensitive data such as social security numbers and credit card numbers. DLP scans the entire HTTP body, which may include uploaded or downloaded Microsoft Office documents (Office 2007 and later), chat messages, forms, and other web content. Visibility varies depending on the site or application. DLP does not scan non-HTTP traffic such as email, nor does it scan any traffic that bypasses Cloudflare Gateway (for example, traffic that matches a [_Do Not Inspect_](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) rule).

To perform DLP filtering, first configure a DLP Profile with the data patterns you want to detect, and then build a Gateway HTTP policy to allow or block the sensitive data from leaving your organization. Gateway will parse and scan your HTTP traffic for strings matching the keywords or regexes specified in the DLP profile.

## Prerequisites

* Enrolled in the [DLP Beta program](https://www.cloudflare.com/zero-trust/dlp-waitlist/)
* Enabled [Gateway HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/)

## 1. Configure a DLP Profile

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **DLP Profiles**.
2. Choose a [predefined DLP Profile](/cloudflare-one/policies/filtering/http-policies/data-loss-prevention/predefined-profiles/) and select **Configure**.
3. Enable one or more **Detection entries** according to your preferences. The DLP Profile matches using the OR logical operator — if multiple entries are enabled, your data needs to match only one of the entries.
{{<Aside type="note">}}
DLP scans will not start until you create an HTTP policy.
{{</Aside>}}
4. Select **Save profile**.

## 2. Create a DLP policy

DLP Profiles may be used alongside other Zero Trust rules in a [Gateway HTTP policy](/cloudflare-one/policies/filtering/http-policies/). To start logging or blocking traffic, create a policy for DLP:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **Policies** > **HTTP**.
2. Select **Create a policy**.
3. [Build an HTTP policy](/cloudflare-one/policies/filtering/http-policies/) using the [DLP Profile](/cloudflare-one/policies/filtering/http-policies/#dlp-profile) selector. For example, the following policy prevents users from uploading sensitive data to any location other than an approved corporate application:

    | Policy name |
    | ---- |
    | Only allow SSN uploads to Workday |

    | Selector | Operator | Value |
    | - | - | - | - |
    | DLP Profiles | in | `U.S. Social Security Numbers` |
    | Application  | not in | `Workday` |

    |Action|
    |------|
    |Block |

4. Select **Create policy**.

DLP scanning is now enabled.

## 3. View DLP logs

By default, Gateway logs all HTTP requests in the [Gateway Activity log](/cloudflare-one/analytics/logs/gateway-logs/#http-logs). To view DLP logs:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **Network**.
2. Verify that **Activity logging** is turned on, and check that **Gateway HTTP logs** is set to capture traffic.
3. Next, go to **Logs** > **Gateway** > **HTTP**.
4. Select **Filter**.
5. Choose an item under one of the following filters:
    * **DLP Profiles** - shows the requests which matched a specific DLP profile.
    * **Policy** - shows the requests which matched a specific DLP policy.

You can expand an individual row to view details about the request.

## Policy configuration tips

If you configured a DLP policy with a **Block** action, false positives may cause some pages to not load properly. Adding additional conditions to your policy will limit the scope of the DLP scan and can help reduce false positives.

For example, `play.google.com` is a common source of noise in the DLP logs. These detections clutter your logs with junk data and could cause issues for the end user if they are blocked. To exempt these sites from DLP scanning, you can manually create a [list](/cloudflare-one/policies/filtering/lists/) of hostnames or URLs. Then, exclude the list from your DLP policy as shown in the example below:

| Policy name |
| ---- |
| Block SSN uploads to file sharing apps |

| Selector | Operator | Value |
| - | - | - | - |
| DLP Profiles | in | `U.S. Social Security Numbers` |
| Application  | in | `File Sharing` |
| Domain | not in list | `Do not DLP - SSN` |

|Action|
|------|
|Block |

{{<Aside type="note">}}
The **Allow** action functions as an implicit logger, giving you visibility into where your sensitive data is going without impacting the end user experience.
{{</Aside>}}
