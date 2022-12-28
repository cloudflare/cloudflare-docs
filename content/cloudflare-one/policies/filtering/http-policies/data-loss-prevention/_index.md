---
pcx_content_type: how-to
title: Data Loss Prevention
weight: 5
layout: single
---

# Data Loss Prevention

{{<Aside type="note">}}
Data Loss Prevention is only available on Enterprise plans.
{{</Aside>}}

With Cloudflare Data Loss Prevention (DLP) and Secure Web Gateway, you can inspect HTTP traffic for the presence of sensitive data such as social security numbers and credit card numbers. DLP scans the entire HTTP body, which may include uploaded or downloaded Microsoft Office documents (Office 2007 and later), PDFs, chat messages, forms, and other web content. Visibility varies depending on the site or application. DLP does not scan non-HTTP traffic such as email, nor does it scan any traffic that bypasses Cloudflare Gateway (for example, traffic that matches a [_Do Not Inspect_](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) rule).

To perform DLP filtering, first configure a DLP Profile with the data patterns you want to detect, and then build a Gateway HTTP policy to allow or block the sensitive data from leaving your organization. Gateway will parse and scan your HTTP traffic for strings matching the keywords or regexes specified in the DLP profile.

## Prerequisites

Enable [Gateway HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/).

## 1. Configure a DLP Profile

Cloudflare DLP provides [predefined profiles](/cloudflare-one/policies/filtering/http-policies/data-loss-prevention/predefined-profiles/) for common detections, or you can define your own regexes in a custom profile.

### Use a predefined profile

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **DLP Profiles**.
2. Choose a predefined profile and select **Configure**.
3. Enable one or more **Detection entries** according to your preferences. The DLP Profile matches using the OR logical operator — if multiple entries are enabled, your data needs to match only one of the entries.
4. Select **Save profile**.

### Build a custom profile

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **DLP Profiles**.
2. Select **Create Profile**.
3. Enter a name and optional description for the profile.
4. Select **Add detection entry** and give it a name.
5. In **Value**, enter a regular expression that defines the text pattern you want to detect. For example, `test\d\d` will detect the word `test` followed by 2 digits.

    - Regexes are written in Rust. We recommend validating your regex with [Rustexp](https://rustexp.lpil.uk/).
    - Detected text patterns are limited to 1024 bytes in length.
    - Regexes with `+` are not supported as they are prone to exceeding the length limit. For example `a+` can detect an infinite number of a's. We recommend using `a{min,max}` instead, such as `a{1,1024}`.
6. Select **Done** to save and enable the detection entry.
7. Select **Save profile**.

{{<Aside type="warning" header="Important">}}
DLP scans will not start until you [create an HTTP policy](#2-create-a-dlp-policy).
{{</Aside>}}

## 2. Create a DLP policy

DLP Profiles may be used alongside other Zero Trust rules in a [Gateway HTTP policy](/cloudflare-one/policies/filtering/http-policies/). To start logging or blocking traffic, create a policy for DLP:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **Policies** > **HTTP**.
2. Select **Create a policy**.
3. [Build an HTTP policy](/cloudflare-one/policies/filtering/http-policies/) using the [DLP Profile](/cloudflare-one/policies/filtering/http-policies/#dlp-profile) selector. For example, the following policy prevents users from uploading sensitive data to any location other than an approved corporate application:

    | Policy name |
    | ---- |
    | Only allow SSN uploads to Workday |

    | Selector | Operator | Value |
    | - | - | - |
    | DLP Profiles | in | `U.S. Social Security Numbers` |
    | Application  | not in | `Workday` |

    |Action|
    |------|
    |Block |

4. Select **Create policy**.

DLP scanning is now enabled.

## 3. Test DLP

You can test your DLP policy on any device connected to your Zero Trust organization. To perform a basic test:

1. Go to [dlptest.com](http://dlptest.com/http-post/).
2. Enter a text message or upload a file containing the sensitive data.
3. Select **Submit** to send the request.

If the data matches your DLP policy, you will see the request in your [DLP logs](#4-view-dlp-logs).

Different sites will send requests in different ways. For example, some sites will split a file upload into multiple requests. Therefore, even if the policy works on `dlptest.com`, it is not guaranteed to work the same way on another site or application. To fine-tune your DLP policy, refer to our [configuration tips](/cloudflare-one/policies/filtering/http-policies/data-loss-prevention/configuration-guides).

## 4. View DLP logs

By default, Gateway logs all HTTP requests in the [Gateway Activity log](/cloudflare-one/analytics/logs/gateway-logs/#http-logs). To view DLP logs:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Settings** > **Network**.
2. Verify that **Activity logging** is turned on, and check that **Gateway HTTP logs** is set to capture traffic.
3. Next, go to **Logs** > **Gateway** > **HTTP**.
4. Select **Filter**.
5. Choose an item under one of the following filters:
    * **DLP Profiles** - shows the requests which matched a specific DLP profile.
    * **Policy** - shows the requests which matched a specific DLP policy.

You can expand an individual row to view details about the request.
