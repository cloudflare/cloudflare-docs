---
pcx_content_type: how-to
title: Scan HTTP traffic
weight: 1
layout: single
---

# Scan HTTP traffic with DLP

You can scan HTTP traffic for sensitive data through Secure Web Gateway policies. To perform DLP filtering, first configure a DLP profile with the data patterns you want to detect, and then build a Gateway HTTP policy to allow or block the sensitive data from leaving your organization. Gateway will parse and scan your HTTP traffic for strings matching the keywords or regular expressions (regexes) specified in the DLP profile.

## Prerequisites

Enable [Gateway HTTP filtering](/cloudflare-one/policies/filtering/initial-setup/http/).

## 1. Configure a DLP profile

Refer to [Configure a DLP profile](/cloudflare-one/policies/data-loss-prevention/dlp-profiles/). We recommend getting started with a predefined profile.

{{<Aside type="warning" header="Important">}}
DLP scans will not start until you [create a DLP policy](#2-create-a-dlp-policy).
{{</Aside>}}

## 2. Create a DLP policy

DLP Profiles may be used alongside other Zero Trust rules in a [Gateway HTTP policy](/cloudflare-one/policies/filtering/http-policies/). To start logging or blocking traffic, create a policy for DLP:

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Gateway** > **Firewall Policies** > **HTTP**.
2. Select **Create a policy**.
3. Build an [HTTP policy](/cloudflare-one/policies/filtering/http-policies/) using the [DLP Profile](/cloudflare-one/policies/filtering/http-policies/#dlp-profile) selector. For example, the following policy prevents users from uploading sensitive data to any location other than an approved corporate application:

   | Policy name                       |
   | --------------------------------- |
   | Only allow SSN uploads to Workday |

   | Selector     | Operator | Value                          |
   | ------------ | -------- | ------------------------------ |
   | DLP Profiles | in       | `U.S. Social Security Numbers` |
   | Application  | not in   | `Workday`                      |

   | Action |
   | ------ |
   | Block  |

4. Select **Create policy**.

DLP scanning is now enabled.

## 3. Test DLP policy

You can test your DLP policy on any device connected to your Zero Trust organization. To perform a basic test:

1. Go to [dlptest.com](http://dlptest.com/http-post/).
2. Enter a text message or upload a file containing the sensitive data.
3. Select **Submit** to send the request.

The request will be allowed or blocked according to your DLP policies. If the data matches a DLP policy, you will see the request in your [DLP logs](#4-view-dlp-logs).

Different sites will send requests in different ways. For example, some sites will split a file upload into multiple requests. Therefore, even if the policy works on `dlptest.com`, it is not guaranteed to work the same way on another site or application.

## 4. View DLP logs

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), go to **Logs** > **Gateway** > **HTTP**.
2. Select **Filter**.
3. Choose an item under one of the following filters:
    * **DLP Profiles** shows the requests which matched a specific DLP profile.
    * **Policy** shows the requests which matched a specific DLP policy.

You can expand an individual row to view details about the request. To see the data that triggered the DLP policy, [configure payload logging](/cloudflare-one/policies/data-loss-prevention/dlp-policies/payload-logging/).

{{<beta heading="h3">}}Report false positives{{</beta>}}

1. Select the log you want to report.
2. Select **Report DLP false positive** under **DLP details**.
3. The information to be sent to Cloudflare will appear. To confirm your report, select **Send report**.

Cloudflare will not respond directly to your report, but reporting false positives helps us improve our products. If you require technical assistance, reach out to [support](https://dash.cloudflare.com/?to=/:account/support).
