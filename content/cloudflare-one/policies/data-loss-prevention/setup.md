---
pcx_content_type: how-to
title: Get started
weight: 1
layout: single
---

# Get started with DLP

Data Loss Prevention is enabled through Secure Web Gateway HTTP policies. To perform DLP filtering, first configure a DLP Profile with the data patterns you want to detect, and then build a Gateway HTTP policy to allow or block the sensitive data from leaving your organization. Gateway will parse and scan your HTTP traffic for strings matching the keywords or regexes specified in the DLP profile.

## Prerequisites

Enable [Gateway HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/).

## 1. Configure a DLP Profile

Cloudflare DLP provides predefined profiles for common detections, or you can define your own regexes in a [custom profile](/cloudflare-one/policies/data-loss-prevention/custom-profile/).

To get started with a predefined profile:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Gateway** > **DLP Profiles**.
2. Choose a [predefined profile](/cloudflare-one/policies/data-loss-prevention/predefined-profiles/) and select **Configure**.
3. Enable one or more **Detection entries** according to your preferences. The DLP Profile matches using the OR logical operator — if multiple entries are enabled, your data needs to match only one of the entries.
4. Select **Save profile**.

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

If the data matches your DLP policy, you will see the request in your [DLP logs](/cloudflare-one/policies/data-loss-prevention/dlp-logs/).

Different sites will send requests in different ways. For example, some sites will split a file upload into multiple requests. Therefore, even if the policy works on `dlptest.com`, it is not guaranteed to work the same way on another site or application. To fine-tune your DLP policy, refer to our [configuration tips](/cloudflare-one/policies/data-loss-prevention/configuration-guides/).
