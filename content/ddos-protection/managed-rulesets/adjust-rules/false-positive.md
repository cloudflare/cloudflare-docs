---
pcx-content-type: how-to
order: 1
---

# Handle a false positive

A false positive is an incorrect identification. In the case of DDoS protection, there is a false positive when legitimate traffic is mistakenly classified as attack traffic. This can occur when legacy applications, Internet services, or faulty client applications generate legitimate traffic that appears suspicious, has odd traffic patterns, deviates from best practices, or violates protocols.

In these cases, Cloudflare’s DDoS Protection systems may flag that traffic as malicious and apply mitigation actions. If the traffic is in fact legitimate and not part of an attack, the mitigation actions can cause service disruptions and outages to your Internet properties.

To remedy a false positive:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
1. Navigate to the analytics dashboard and apply filters to the displayed data.

    <details>
    <summary>For WAF/CDN customers</summary>
    <div>

    1\. Select the zone that is experiencing DDoS attack false positives.

    1\. Navigate to **Firewall** > **Overview**.

    2\. Click **Add filter** and filter by `Service equals HTTP DDoS`.

    </div>
    </details>

    <details>
    <summary>For Magic Transit and Spectrum customers</summary>
    <div>

    1\. In the account home page, open **Network Analytics**.

    2\. Identify the legitimate traffic that is causing the false positives. Use the Attack ID number included in the DDoS alert (if you received one), or apply dashboard filters such as destination IP address and port.

    </div>
    </details>

1. Scroll down to the **Activity log**.
1. Click **Edit columns** and enable **Rule ID**\*.
1. Copy the rule ID from one of the DDoS log entries.
1. Navigate to **Firewall** > **DDoS** and click **Configure** next to the Managed Ruleset containing the rule you will adjust.
1. Click **Browse rules** and paste the Rule ID in the search field.
1. Decrease the rule’s **Sensitivity Level** to _Essentially Off_ or change the action of the rule to _Log_.
1. Click **Next** and then **Save**.

_* Not available in Network Analytics dashboard yet._

<Aside type="warning">

The **DDoS** tab under **Firewall** is currently only available to the WAF/CDN customers.

</Aside>

Once saved, the rule takes effect within one or two minutes. The rule adjustment should provide immediate remedy, which you can view in the [analytics dashboard](/reference/analytics).

## Updating the adjusted rules at a later date

Later, you can change the [sensitivity level](/managed-rulesets/network/override-parameters#sensitivity) of the rule causing the false positives to avoid future issues, and change the rule action back to its default value.

<Aside type="note" header="Recommendation: Enable DDoS alerts">

Cloudflare recommends that you enable [DDoS alerts](/reference/alerts) to get real-time notifications on detected and mitigated attacks automatically performed by Cloudflare’s systems. When you receive these notifications, you can review if it is in fact a real DDoS attack, or if it is a false positive, and then take action to remedy it.

</Aside>
