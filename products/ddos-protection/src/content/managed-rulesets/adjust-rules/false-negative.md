---
title: Handle a false negative
pcx-content-type: how-to
order: 2
---

# Handle a false negative or an incomplete mitigation

## False negatives

A false negative is a lack of identification. In the case of DDoS protection, there is a false negative when attack traffic is mistakenly classified as legitimate traffic and is not mitigated. This can occur when the attack traffic is not sufficiently high to trigger mitigation actions or if there are no rules matching the attack.

In such cases:

* If you are a WAF/CDN customer, follow the steps in the [Responding to DoS attacks](https://support.cloudflare.com/hc/en-us/articles/200170196-Responding-to-DDoS-attacks) page, which guides you on enabling the _Under Attack_ mode and creating Rate Limiting and Firewall rules as needed.

* If you are a Magic Transit customer, [use Magic Firewall rules](https://developers.cloudflare.com/magic-firewall/how-to/add-rules) to help mitigate the attack.

## Incomplete mitigations

An incomplete mitigation is a case when the DDoS protection systems have applied mitigation, but not all the attack was mitigated. This can happen when Cloudflare's systems apply a mitigation action that is less strict than what the attack requires.

The system chooses the mitigation action based on the logic and the DDoS protection system's confidence that the traffic is indeed part of an attack:

* For high-confidence rules, the system will apply a strict mitigation action such as the _Block_ action.
* For low-confidence rules, the system will apply a less strict mitigation rule such as _Challenge_ or _Force Connection Close_.

If you are experiencing a DDoS attack detected by Cloudflare and the applied mitigation action is not sufficiently strict, change the rule action to _Block_.

1. Log in to the Cloudflare dashboard and select your account.
1. Navigate to the [analytics dashboard](/reference/analytics) and apply filters to the displayed data.

    <details>
    <summary>For WAF/CDN customers</summary>
    <div>

    1\. Select the zone that is experiencing DDoS attack false positives.

    2\. Navigate to **Firewall** > **Overview**.

    3\. Click **Add filter** and filter by `Service equals HTTP DDoS`.

    </div>
    </details>

    <details>
    <summary>For Magic Transit and Spectrum customers</summary>
    <div>

    1\. In the account home page, open **Network Analytics**.

    2\. Identify the DDoS attack that is causing the false negatives. Use the Attack ID number included in the DDoS alert (if you received one), or apply dashboard filters such as destination IP address and port.

    </div>
    </details>

1. Scroll down to the **Activity log**.
1. Click **Edit columns** and enable **Rule ID**\*.
1. Copy the rule ID from one of the DDoS log entries.
1. Navigate to **Firewall** > **DDoS** and click **Configure** next to the Managed Ruleset containing the rule you will adjust.
1. Click **Browse rules** and paste the Rule ID in the search field.
1. Change the rule’s **Action** to _Block_.
1. Click **Next** and then **Save**.

_* Not available in Network Analytics dashboard yet._

<Aside type="warning">

The **DDoS** tab under **Firewall** is currently only available to the WAF/CDN customers.

Magic Transit and Spectrum customers can only adjust the sensitivity level or action of DDoS rules [using the API](/managed-rulesets/network/configure-api).

</Aside>

Once saved, the rule takes effect within 1 or 2 minutes. The rule adjustment should provide immediate remedy, which you can view in the [analytics dashboard](/reference/analytics).
