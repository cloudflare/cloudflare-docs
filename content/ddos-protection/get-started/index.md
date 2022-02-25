---
order: 2
pcx-content-type: get-started
---

# Get started

## Free, Pro, and Business plans

The DDoS Attack Protection Managed Rulesets provided by Cloudflare are enabled by default on zones onboarded to Cloudflare, IP applications onboarded to Spectrum, and IP Prefixes onboarded to Magic Transit.

In some situations, the default protection offered by DDoS rules may need to be fine-tuned to your specific situation. You may also want to configure additional protection using other Cloudflare products.

### Adjust the provided DDoS rules

If one or more DDoS rules provided by Cloudflare affects legitimate traffic, you can adjust them so that they do not perform any mitigation action against this kind of traffic. Follow the steps in [Handle a false positive](/managed-rulesets/adjust-rules/false-positive) to reduce the sensitivity level of one or more DDoS rules and allow incoming legitimate traffic.

### Configure additional protection

To configure additional protection against DDoS attacks, refer to the related Cloudflare products listed in [Network-layer DDoS Attack Protection](/managed-rulesets/network#related-cloudflare-products) and [HTTP DDoS Attack Protection](/managed-rulesets/http#related-cloudflare-products).

## Enterprise plan

Cloudflare’s DDoS protection systems automatically detect and mitigate DDoS attacks. Additionally, the systems may flag suspiciously-looking incoming traffic from legacy applications, Internet services, or faulty client applications as malicious and apply mitigation actions. If the traffic is in fact legitimate, the mitigation actions can cause service disruptions and outages in your Internet properties.

To prevent this situation, Cloudflare recommends that you perform these steps to get started:

1.  Set the ruleset actions for all the DDoS Attack Protection Managed Rulesets to *Log*.
2.  Analyze the flagged traffic.
3.  Adjust the sensitivity or action of individual Managed Ruleset rules, if required.
4.  Switch ruleset actions from *Log* back to the default.

### Prerequisites

You must have one of the following:

*   [A zone onboarded to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup) but without updated DNS records
*   [An IP application onboarded to Spectrum](https://developers.cloudflare.com/spectrum/get-started)
*   [An IP Prefix onboarded to Magic Transit](https://developers.cloudflare.com/magic-transit/get-started)

### 1. Configure ruleset actions to Log

<Aside type="note">

The *Log* action is only available to Enterprise customers.

</Aside>

Configure ruleset actions to *Log* for each of the [DDoS Attack Protection Managed Rulesets](/managed-rulesets).

Do the following in the Cloudflare dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and zone.
2.  Go to **Firewall** > **DDoS**.
3.  Next to the Managed Ruleset you are configuring, click **Configure**.
4.  In **Ruleset configuration** > **Ruleset action**, select *Log*.
5.  Click **Save**.
6.  Repeat the procedure for all DDoS Attack Protection Managed Rulesets.

Alternatively, if you are using the API, define an override at the ruleset level to set the action of all Managed Ruleset rules to `log` by following these instructions:

*   [Configure an override for the HTTP DDoS Attack Protection Managed Ruleset](/managed-rulesets/http/configure-api#configure-an-override-for-http-ddos-attack-protection)
*   [Configure an override for the Network-layer DDoS Attack Protection Managed Ruleset](/managed-rulesets/network/configure-api#configure-an-override-for-the-network-layer-ddos-attack-protection-managed-ruleset)

### 2. Review flagged traffic

1.  Navigate to your [analytics dashboard](/reference/analytics) (the exact dashboard depends on your Cloudflare services).
2.  Apply one or more filters, if required, and identify any rules that would have blocked legitimate traffic if *Log* mode were disabled. Take note of the rule IDs.

### 3. Customize Managed Ruleset rules

Customize the Managed Ruleset rules you identified, changing their sensitivity or their action, using the Cloudflare dashboard or using the API.

If you are using the Cloudflare dashboard, refer to:

*   [Configure HTTP DDoS Attack Protection in the dashboard](/managed-rulesets/http/configure-dashboard)
*   [Configure Network-layer DDoS Attack Protection in the dashboard](/managed-rulesets/network/configure-dashboard)

If you are using the API, refer to:

*   [Configure HTTP DDoS Attack Protection via API](/managed-rulesets/http/configure-api)
*   [Configure Network-layer DDoS Attack Protection via API](/managed-rulesets/network/configure-api)

When using the API, ensure that you add any required rule overrides without removing the ruleset override you configured in [Step 1](#1-configure-ruleset-actions-to-log).

### 4. Switch ruleset actions back to the default

Revert the change you did in [Step 1](#1-configure-ruleset-actions-to-log), changing the action of each Managed Ruleset rule back to its default value.

Do the following in the Cloudflare dashboard:

1.  Go to **Firewall** > **DDoS**.
2.  Next to the Managed Ruleset you would like to configure, click **Configure**.
3.  In **Ruleset configuration** > **Ruleset action**, select *Default*.
4.  Click **Save**.

Alternatively, if you are using the API, [remove the override](/managed-rulesets/http/configure-api#configure-an-override-for-http-ddos-attack-protection) you previously configured at the ruleset level. Ensure that you only remove the ruleset override and not any of the rule overrides you may have configured in [Step 3](#3-customize-managed-ruleset-rules).

Repeat the procedure (via dashboard or API) for all DDoS Attack Protection Managed Rulesets.
