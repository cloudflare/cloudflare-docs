---
title: Phish submissions
pcx_content_type: concept
layout: single
weight: 6
---

# Phish submissions

As part of your email configuration, administrators and email recipients can submit missed phish samples to [Area 1 Service Addresses](https://horizon.area1security.com/support/service-addresses/) so Cloudflare can process them and take necessary action.

Sometimes phish is missed as Cloudflare Area 1 uses several techniques to make a detection. These include preemptively crawling the web to identify campaigns, machine learning, custom signatures, among others. In order for Area 1 to identify why phish was missed, we need to run the original samples through our module and identify why some of our modules did not score the sample high enough to elevate it to malicious.

## How to submit phish

There are two different ways to submit a phish sample:

- **User submission**: Submitted directly by the end users, and used with phish submission buttons. <br />
    To learn more about user-submitted phish, refer to the following documentation:
    {{<directory-listing>}}

- **Team submission**: To be used when IT administrators or security teams submit to Area 1. Submit original phish samples as an attachment in EML format to the appropriate [Team Submissions address](https://horizon.area1security.com/support/service-addresses/). For example, if you think an email should be marked as spoof, send it to the `SPOOF` address listed in Team Submissions. <br />
Phish samples submitted to this address will be considered as submissions from the customer's email security team. This increases the chances of similar samples being detected as malicious in the future.

After submitting a phish sample to the team address, you will receive an update from `status@submission.area1reports.com` regarding the investigation and the verdict. The feedback is directly provided to customers by our threat research team, bypassing the support channel, to expedite the process.

## What happens after a phish submission

After you or your users submit a phish sample, Area 1 adds that sample directly into our machine learning (ML) queue for learning. Some samples will be directly converted to `MALICIOUS` upon going through machine learning and the rest will be further processed by our ML module.

### Phish submission feedback

Use the following keywords to search for submitted phish samples on the Area 1 dashboard:

- `phish_submission`
- `user_malicious_submission`
- `team_malicious_submission`

On the **Reasons** column you will see the feedback regarding the messages found. If the ML module learns and detects it as phish, the **Reasons** column shows the details regarding it. If not, the information on this column shows up as `phish submission`.

If there is a phishing email that is repeatedly sent to users despite being submitted to Area 1 for processing, [contact support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) with the details of the problematic phish submission sample (alert ID or message ID of the sample).

### Phish Submission Response (beta)

Phish Submission Response (PSR) is an additional layer of protection. When you enable PSR, Area 1 will automatically retract messages reported by users which are also deemed malicious by Area 1 after analysis. This feature uses machine learning margin scores by adding the user as an additional neuron into Area 1's neural network. 

To enable PSR:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. In **Email Configuration**, go to **Retract Settings** > **Auto-Retract**.
3. Enable **Phish Submission Response (Beta)**.

{{<Aside type="note">}}
PSR works only for the phish samples submitted to [user submission addresses](https://horizon.area1security.com/support/service-addresses/). Refer to [Retract settings](/email-security/email-configuration/retract-settings/) to learn more about manual and automatic retraction.
{{</Aside>}}

## False positives

If you find emails in your Area 1 account that are actually false positives, you can report them from the Area 1 dashboard:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Select the **Search** bar.
3. Search for the message that you want to report as a false positive, and select **Report as false positive**.
4. (Optional) You can also select emails in bulk to report as false positives. Select all emails that apply > **Report as FP**.