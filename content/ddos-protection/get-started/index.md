---
pcx_content_type: get-started
title: Get started
weight: 3
layout: single
---

# Get started

## Free, Pro, and Business plans

The DDoS Attack Protection managed rulesets provided by Cloudflare are enabled by default on zones onboarded to Cloudflare, IP applications onboarded to Spectrum, and IP Prefixes onboarded to Magic Transit.

In some situations, the default protection offered by DDoS rules may need to be fine-tuned to your specific situation. You may also want to configure additional protection using other Cloudflare products.

### Adjust the provided DDoS rules

If one or more DDoS rules provided by Cloudflare affects legitimate traffic, you can adjust them so that they do not perform any mitigation action against this kind of traffic. Follow the steps in [Handle a false positive](/ddos-protection/managed-rulesets/adjust-rules/false-positive/) to reduce the sensitivity level of one or more DDoS rules and allow incoming legitimate traffic.

### Configure additional protection

To configure additional protection against DDoS attacks, refer to the related Cloudflare products listed in [Network-layer DDoS Attack Protection](/ddos-protection/managed-rulesets/network/#related-cloudflare-products) and [HTTP DDoS Attack Protection](/ddos-protection/managed-rulesets/http/#related-cloudflare-products).

## Enterprise plan

Cloudflare’s DDoS protection systems automatically detect and mitigate DDoS attacks. Additionally, the systems may flag suspiciously-looking incoming traffic from legacy applications, Internet services, or faulty client applications as malicious and apply mitigation actions. If the traffic is in fact legitimate, the mitigation actions can cause service disruptions and outages in your Internet properties.

To prevent this situation, Cloudflare recommends that you perform these steps to get started:

1. Set the ruleset actions for all the DDoS Attack Protection managed rulesets to _Log_.
1. Analyze the flagged traffic.
1. Adjust the sensitivity or action of individual managed ruleset rules, if required.
1. Switch ruleset actions from _Log_ back to the default.

### Prerequisites

You must have one of the following:

- [A zone onboarded to Cloudflare](/dns/zone-setups/full-setup/) but without updated DNS records
- [An IP application onboarded to Spectrum](/spectrum/get-started/)
- [An IP Prefix onboarded to Magic Transit](/magic-transit/get-started/)

### 1. Configure ruleset actions to Log

{{<Aside type="note">}}

The _Log_ action is only available to Enterprise customers.

{{</Aside>}}

Configure ruleset actions to _Log_ for each of the [DDoS Attack Protection managed rulesets](/ddos-protection/managed-rulesets/).

Do the following in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and zone.
2. Go to **Security** > **DDoS**.
3. Next to the managed ruleset you are configuring, select **Configure**.
4. In **Ruleset configuration** > **Ruleset action**, select _Log_.
5. Select **Save**.
6. Repeat the procedure for all DDoS Attack Protection managed rulesets.

Alternatively, if you are using the API, define an override at the ruleset level to set the action of all managed ruleset rules to `log` by following these instructions:

- [Configure an override for the HTTP DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/http/configure-api/#configure-an-override-for-the-http-ddos-attack-protection-managed-ruleset)
- [Configure an override for the Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/configure-api/#configure-an-override-for-the-network-layer-ddos-attack-protection-managed-ruleset)

### 2. Review flagged traffic

1. Go to your [analytics dashboard](/ddos-protection/reference/analytics/) (the exact dashboard depends on your Cloudflare services).
1. Apply one or more filters, if required, and identify any rules that would have blocked legitimate traffic if _Log_ mode were disabled. Take note of the rule IDs.

### 3. Customize managed ruleset rules

Customize the managed ruleset rules you identified, changing their sensitivity or their action, using the Cloudflare dashboard or using the API.

If you are using the Cloudflare dashboard, refer to:

- [Configure HTTP DDoS Attack Protection in the dashboard](/ddos-protection/managed-rulesets/http/configure-dashboard/)
- [Configure Network-layer DDoS Attack Protection in the dashboard](/ddos-protection/managed-rulesets/network/configure-dashboard/)

If you are using the API, refer to:

- [Configure HTTP DDoS Attack Protection via API](/ddos-protection/managed-rulesets/http/configure-api/)
- [Configure Network-layer DDoS Attack Protection via API](/ddos-protection/managed-rulesets/network/configure-api/)

When using the API, ensure that you add any required rule overrides without removing the ruleset override you configured in [Step 1](#1-configure-ruleset-actions-to-log).

### 4. Switch ruleset actions back to the default

Revert the change you did in [Step 1](#1-configure-ruleset-actions-to-log), changing the action of each managed ruleset rule back to its default value.

Do the following in the Cloudflare dashboard:

1. Go to **Security** > **DDoS**.
2. Next to the managed ruleset you would like to configure, select **Configure**.
3. In **Ruleset configuration** > **Ruleset action**, select _Default_.
4. Select **Save**.

Alternatively, if you are using the API, [remove the override](/ddos-protection/managed-rulesets/http/configure-api/#configure-an-override-for-the-http-ddos-attack-protection-managed-ruleset) you previously configured at the ruleset level. Ensure that you only remove the ruleset override and not any of the rule overrides you may have configured in [Step 3](#3-customize-managed-ruleset-rules).

Repeat the procedure (via dashboard or API) for all DDoS Attack Protection managed rulesets.
