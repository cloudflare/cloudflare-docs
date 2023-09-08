---
pcx_content_type: how-to
title: Handle a false negative or an incomplete mitigation
weight: 3
---

# Handle a false negative or an incomplete mitigation

## False negatives

A false negative is a lack of identification. In the case of DDoS protection, there is a false negative when attack traffic is mistakenly classified as legitimate traffic and is not mitigated. This can occur when the attack traffic is not sufficiently high to trigger mitigation actions or if there are no rules matching the attack.

To address a false negative:

- If you are a WAF/CDN customer, follow the steps in the [Respond to DDoS attacks](/ddos-protection/best-practices/respond-to-ddos-attacks/) page, which guides you on enabling the _Under Attack_ mode and creating rate limiting rules and firewall rules as needed.

- If you are a Magic Transit customer, [use Magic Firewall rules](/magic-firewall/how-to/add-rules/) to help mitigate the attack.

## Incomplete mitigations

An incomplete mitigation is a case when the DDoS protection systems have applied mitigation, but not all the attack was mitigated. This can happen when Cloudflare's systems apply a mitigation action that is less strict than what the attack requires.

The system chooses the mitigation action based on the logic and the DDoS protection system's confidence that the traffic is indeed part of an attack:

- For high-confidence rules, the system will apply a strict mitigation action such as the _Block_ action.
- For low-confidence rules, the system will apply a less strict mitigation rule such as _Challenge_ or _Force Connection Close_.

If you are experiencing a DDoS attack detected by Cloudflare and the applied mitigation action is not sufficiently strict, change the rule action to _Block_:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.

2. Go to the analytics dashboard and apply filters to the displayed data.

    <details><summary>For WAF/CDN customers</summary><div>

    1\. Select the zone that is experiencing an incomplete mitigation of a DDoS attack.

    2\. Go to **Security** > **Events**.

    3\. Select **Add filter** and filter by `Service equals HTTP DDoS`.

    </div></details>

    <details><summary>For Magic Transit and Spectrum customers</summary><div>

    1\. Go to Account Home > **Analytics & Logs** > **Network Analytics**.

    2\. Identify the DDoS attack that is having incomplete mitigations. Use the Attack ID number included in the DDoS alert (if you received one), or apply dashboard filters such as destination IP address and port.

    </div></details>

3. Scroll down to **Top events by source** > **HTTP DDoS rules**.

4. Copy the rule name.

5. Go to your zone > **Security** > **DDoS** and select **Deploy a DDoS override**. If you cannot deploy any additional overrides, edit an existing override to adjust rule configuration.

6. Select **Browse rules** and paste the rule name in the search field.

7. Change the rule’s **Action** to _Block_.

8. Select **Next** and then select **Save**.

Once saved, the rule takes effect within one or two minutes. The rule adjustment should provide immediate remedy, which you can view in the [analytics dashboard](/ddos-protection/reference/analytics/).

### Alternate procedure

If you cannot stop an attack from overloading your origin web server using the above steps, [contact Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/) for assistance, providing the following details:

- Time period of the attack (UTC timestamp)
- Domain/path being targeted (zone name/ID)
- Attack frequency
- Steps to reproduce the issue, with actual results versus expected results
- Any relevant additional information such as site URLs, error messages, screenshots, or relevant logs from your origin web server
