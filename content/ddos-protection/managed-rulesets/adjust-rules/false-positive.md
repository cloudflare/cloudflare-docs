---
pcx_content_type: how-to
title: Handle a false positive
weight: 2
---

# Handle a false positive

A false positive is an incorrect identification. In the case of DDoS protection, there is a false positive when legitimate traffic is mistakenly classified as attack traffic. This can occur when legacy applications, Internet services, or faulty client applications generate legitimate traffic that appears suspicious, has odd traffic patterns, deviates from best practices, or violates protocols.

In these cases, Cloudflare’s DDoS Protection systems may flag that traffic as malicious and apply mitigation actions. If the traffic is in fact legitimate and not part of an attack, the mitigation actions can cause service disruptions and outages to your Internet properties.

To remedy a false positive:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.

2. Go to the analytics dashboard and apply filters to the displayed data.

    {{<details header="For WAF/CDN customers">}}

1. Select the zone that is experiencing DDoS attack false positives.
2. Go to **Security** > **Events**.
3. Select **Add filter** and filter by `Service equals HTTP DDoS`.

    {{</details>}}

    {{<details header="For Magic Transit and Spectrum customers">}}

1. Go to Account Home > **Analytics & Logs** > **Network Analytics**.
2. Identify the legitimate traffic that is causing the false positives. Use the Attack ID number included in the DDoS alert (if you received one), or apply dashboard filters such as destination IP address and port.

    {{</details>}}

3. Scroll down to **Top events by source** > **HTTP DDoS rules**.

4. Copy the rule name.

5. Go to your zone > **Security** > **DDoS** and select **Deploy a DDoS override**. If you cannot deploy any additional overrides, edit an existing override to adjust rule configuration.

6. Select **Browse rules** and paste the rule name in the search field.

7. Decrease the rule’s **Sensitivity Level** to _Essentially Off_ or change the rule action to _Log_ (if supported by your current plan and subscriptions).

8. Select **Next** and then select **Save**.

Once saved, the rule takes effect within one or two minutes. The rule adjustment should provide immediate remedy, which you can view in the [analytics dashboard](/ddos-protection/reference/analytics/).

## Updating the adjusted rules later

Later, you can change the [sensitivity level](/ddos-protection/managed-rulesets/network/override-parameters/#sensitivity-level) of the rule causing the false positives to avoid future issues, and change the rule action back to its default value.

{{<Aside type="note" header="Recommendation: Enable DDoS alerts">}}

Cloudflare recommends that you create notifications for [DDoS alerts](/ddos-protection/reference/alerts/) to get real-time notifications on detected and mitigated attacks automatically performed by Cloudflare’s systems. When you receive these notifications, you can review if it is in fact a real DDoS attack, or if it is a false positive, and then take action to remedy it.

{{</Aside>}}
