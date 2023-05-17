---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170196-Responding-to-DDoS-attacks
title: Responding to DDoS attacks
---

# Responding to DDoS attacks

## Overview

{{<Aside type="note">}}
Before contacting Cloudflare Support, enable **Under Attack Mode** (Step
1 below) to help distinguish attack traffic characteristics in logs
accessible by Cloudflare Support.
{{</Aside>}}

Cloudflare's network automatically mitigates very large [DDoS attacks](https://www.cloudflare.com/ddos). Caching your content at Cloudflare also protects your website against small DDoS attacks, but uncached assets may require additional manual intervention steps provided in this guide.

The steps below won’t help if an attacker learned your origin IP address and is directly attacking your origin web server (bypassing Cloudflare). For details, refer to [Understanding Cloudflare DDoS protection](https://support.cloudflare.com/hc/articles/200172676).

___

## Step 1: Enable Under Attack Mode

To activate [**Under Attack Mode**](https://support.cloudflare.com/hc/articles/200170076):

1. Log in to your Cloudflare account.

2. Select the domain currently under attack.

3. Toggle **Under Attack Mode** to _On_ within the **Quick Actions** section of the Cloudflare **Overview** app.

{{<Aside type="tip">}}
**Under Attack Mode** is also configurable for specific URLs via the
Cloudflare **Page Rules** app by setting *Security Level* to *I'm Under
Attack*.
{{</Aside>}}

4. (Optional) Adjust [**Challenge Passage**](https://support.cloudflare.com/hc/articles/200170136) within **Security** > **Settings**.

{{<Aside type="warning">}}
Legitimate traffic from mobile apps or from clients that do not support
JavaScript and cookies cannot access your website while **Under Attack
Mode** is enabled. For this reason, **Under Attack Mode** is not
recommended for your API traffic. Instead, configure [Rate
Limiting](https://support.cloudflare.com/hc/articles/235240767) or at
least set the **Security Level** to *High* under **Security** \>
**Settings**.
{{</Aside>}}
___

## Step 2: Enable WAF managed rules

{{<Aside type="note">}}
The WAF is only available for domains on paid plans. View [our paid
plans](https://www.cloudflare.com/plans/).
{{</Aside>}}

Enable [WAF managed rules](https://support.cloudflare.com/hc/en-us/articles/200172016).

If you have access to the new Cloudflare WAF announced in March 2021, [deploy WAF Managed Rulesets](/waf/managed-rules/deploy-zone-dashboard/) instead.

___

## Step 3: Challenge or block traffic via Security

Under **Security**, you can block traffic via the following methods:

-   [**IP Access Rules**](/waf/tools/ip-access-rules/) \- Recommended for blocking multiple IP addresses, /16 or /24 IP ranges, or Autonomous System Numbers (ASNs).
-   [**Firewall rules**](/firewall/cf-dashboard/create-edit-delete-rules/) \- Recommended for blocking a country, any valid IP range, or more complex attack patterns.

{{<Aside type="tip">}}
[**Firewall rules**](/firewall/cf-firewall-rules/) have limits but are more flexible and allow matching upon a wider variety of [fields](/ruleset-engine/rules-language/fields/) and [expressions](/ruleset-engine/rules-language/expressions/) than **IP Access Rules**.
{{</Aside>}}

-   [**Zone Lockdown**](/waf/tools/zone-lockdown/) \- Recommended to allow only trusted IP addresses or ranges to a portion of your site.
-   [**User Agent Blocking**](/waf/tools/user-agent-blocking/) \- Recommended for blocking suspicious [User-Agent headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) for your entire domain.

{{<Aside type="note">}}
Firewall updates take effect within two minutes.
{{</Aside>}}

To decide which country or IPs to block or challenge, check your log files. Contact your hosting provider to help identify:

-   the attack traffic reaching your origin web server,
-   the resources being accessed by the attack, and
-   common characteristics of the attack (IP addresses, User Agents, countries, or ASNs, etc).

{{<Aside type="note">}}
Cloudflare also offers **[Rate
Limiting](https://support.cloudflare.com/hc/articles/235240767)** to
help control the flow of requests to your server. [**Rate Limiting** is
billed based on
usage](https://support.cloudflare.com/hc/en-us/articles/115000272247-Billing-for-Cloudflare-Rate-Limiting)
and is independent of plan type.
{{</Aside>}}

___

## Step 4: Mitigate DDoS Ransom Campaigns

It is common for ransomers to threaten DDoS attacks, even when a customer is using Cloudflare. Here are some troubleshooting tips if you are targeted by ransomers to ensure your origin server is prepared to handle excess requests.

### Mitigating DDoS Ransom Campaigns

It is very common for ransom attempts to instill a sense of urgency. Any delay decreases the chance of success for the attacker as it gives the target time to consider mitigation options. The most important thing to keep in mind is that if you suspect your site is being targeted for a ransom, [contact Cloudflare support](https://support.cloudflare.com/hc/articles/200172476-Contacting-Cloudflare-Support) first. **Do not** pay the ransom.

The following table lists mitigation options for DDoS ransom campaigns:

| Action | Justification |
| --- | --- |
| Don't Pay| It's best not to pay the ransom. If paid, the ransomer knows they have found a valuable target and may periodically return to collect another payment. Ransomers tend to introduce themselves as a security researchers who have found a vulnerability. This will, understandably, increase the response rate of website owners, as it is not immediately clear that they are about to be ransomed. If at all possible, don't respond to the ransom at all, and instead [contact Cloudflare support.](https://support.cloudflare.com/hc/articles/200172476-Contacting-Cloudflare-Support) |
| Disable [Privacy Pass Support](https://support.cloudflare.com/hc/articles/115001992652-Using-Privacy-Pass-with-Cloudflare) | In several reports, attackers claim to exploit Privacy Pass. This is not so much a vulnerability in Privacy Pass, but a side effect of how Privacy Pass interacts with other Cloudflare features. Disable Privacy Pass Support if a flood of requests with Privacy Pass tokens attached is expected. |
| Enable [I'm Under Attack Mode (IUAM)](https://support.cloudflare.com/hc/articles/200170076)! | IUAM is designed to help mitigate attacks and generally increase a zone's security, so it's a good idea during several types of attacks.|
| Enable [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128-Configuring-Cloudflare-Rate-Limiting) | Some DDoS attacks are effective at low rates because the attacker targets an endpoint which they have discovered to be uncachable and computationally expensive for the origin server. If an origin server normally receives a dozen or so logins each second and suddenly receives thousands per second, this can result in degraded performance and will likely result in an increased bill for cloud service. Rate Limiting works well against simple single-origin DoS, small botnets, and it may prevent the attacks from persisting for a long period of time . It can also help drop floods to the origin, but its efficacy may be limited for very weak origin servers.|
| Configure more aggressive caching | [Caching your content at Cloudflare](/cache/about/default-cache-behavior/) also protects your website against small DDoS attacks, but uncached assets may require additional manual intervention steps provided above. |

___

## Step 5: Contact Cloudflare Support

If you are unable to stop an attack from overloading your origin web server when utilizing the steps above, [contact Cloudflare Support](https://support.cloudflare.com/hc/articles/200172476#h_4b8753c8-f422-4c74-9e8e-07026c4da730) for assistance and provide the following details:

-   Timestamp (UTC) – time range of the attack
-   ZoneName/ZoneID - domain/path which is being targeted
-   Attack frequency
-   Steps to reproduce the issue, with actual results vs expected results
-   Any additional info like site URLs, error messages, screenshots, or relevant logs from your origin web server

___

## Related resources

-   [Understanding Cloudflare DDOS protection](https://support.cloudflare.com/hc/articles/200172676)
-   [Best practices: DDoS preventative measures](https://support.cloudflare.com/hc/articles/200170166)
-   [What does “I’m Under Attack Mode” do?](https://support.cloudflare.com/hc/articles/200170076)
-   [Using Cloudflare Logs to investigate DDoS traffic (Enterprise Only)](https://support.cloudflare.com/hc/en-us/articles/360020739772-Using-Cloudflare-Logs-ELS-to-Investigate-DDoS-Traffic-Enterprise-Only-)
-   [How to report a DDoS attack to law enforcement](https://www.icann.org/news/blog/how-to-report-a-ddos-attack)
