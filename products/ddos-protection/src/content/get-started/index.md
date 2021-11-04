---
order: 2
pcx-content-type: interim
---

# Get started

## Free, Pro, and Business plans

The DDoS Attack Protection Managed Rulesets provided by Cloudflare are enabled by default on zones onboarded to Cloudflare, IP applications onboarded to Spectrum, and IP Prefixes onboarded to Magic Transit.

Unlike customers on an Enterprise plan, you cannot customize the action or sensitivity of Managed Ruleset rules in Free, Pro, or Business plans.

To configure additional protection against DDoS attacks, refer to the related Cloudflare products listed in [Network-layer DDoS Attack Protection](/managed-rulesets/network#related-cloudflare-products) and [HTTP DDoS Attack Protection](/managed-rulesets/http#related-cloudflare-products).

## Enterprise plan

Cloudflare’s DDoS protection systems may flag incoming traffic from legacy applications, Internet services, or faulty client applications as malicious and apply mitigation actions. If the traffic is in fact legitimate, the mitigation actions can cause service disruptions and outages in your Internet properties.

To prevent this situation, Cloudflare recommends that you perform these steps to get started:

1. Set the ruleset actions for all the DDoS Attack Protection Managed Rulesets to _Log_.
1. Analyze the flagged traffic.
1. Adjust the sensitivity or action of individual Managed Ruleset rules, if required.
1. Switch ruleset actions from _Log_ back to the default.

### Prerequisites

You must have one of the following:

* [A zone onboarded to Cloudflare](https://support.cloudflare.com/hc/articles/205195708)
* [An IP application onboarded to Spectrum](https://developers.cloudflare.com/spectrum/get-started)
* [An IP Prefix onboarded to Magic Transit](https://developers.cloudflare.com/magic-transit/get-started)

### Step 1 — Configure ruleset actions to Log

<Aside type="note">

The _Log_ action is only available to Enterprise customers.

</Aside>

Configure ruleset actions to _Log_ for each of the [DDoS Attack Protection Managed Rulesets](/managed-rulesets).

Do the following in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and zone.
1. Go to **Firewall** > **DDoS**.
1. Next to the Managed Ruleset you are configuring, click **Configure**.
1. In **Ruleset configuration** > **Ruleset action**, select _Log_.
1. Click **Save**.
1. Repeat the procedure for all DDoS Attack Protection Managed Rulesets.

Alternatively, if you are using the API, define an override at the ruleset level to set the action of all Managed Ruleset rules to `log` by following these instructions:

* [Configure an override for the HTTP DDoS Attack Protection Managed Ruleset](/managed-rulesets/http/configure-api#configure-an-override-for-http-ddos-attack-protection)
* [Configure an override for the Network-layer DDoS Attack Protection Managed Ruleset](/managed-rulesets/network/configure-api#configure-an-override-for-the-network-layer-ddos-attack-protection-managed-ruleset)

<Aside type="warning">

Currently, some DDoS Attack Protection Managed Rulesets can only be configured via API.

</Aside>

### Step 2 — Review flagged traffic

1. Navigate to your [analytics dashboard](/reference/analytics) (depends on our Cloudflare services).
1. Apply one or more filters, if required, and identify any rules that would have blocked legitimate traffic if _Log_ mode were disabled. Take note of the rule IDs.

### Step 3 — Customize Managed Ruleset rules

Customize the Managed Ruleset rules you identified, changing their sensitivity or their action, using the Cloudflare dashboard or using the API.

If you are using the Cloudflare dashboard, refer to the [Configure HTTP DDoS Attack Protection in the dashboard](/managed-rulesets/http/configure-dashboard) page.

If you are using the API, refer to:

* [Configure HTTP DDoS Attack Protection via API](/managed-rulesets/http/configure-api)
* [Configure Network-layer DDoS Attack Protection via API](/managed-rulesets/network/configure-api)

When using the API, ensure that you add any required rule overrides without removing the ruleset override you configured in [Step 1](#step-1--configure-ruleset-actions-to-log).

<Aside type="warning">

Currently, some DDoS Attack Protection Managed Rulesets can only be configured via API.

</Aside>

### Step 4 — Switch ruleset actions back to the default

Revert the change you did in [Step 1](#step-1--configure-ruleset-actions-to-log), changing the action of each Managed Ruleset rule back to its default value.

Do the following in the Cloudflare dashboard:

1. Go to **Firewall** > **DDoS**.
1. Next to the Managed Ruleset you would like to configure, click **Configure**.
1. In **Ruleset configuration** > **Ruleset action**, select _Default_.
1. Click **Save**.

Alternatively, if you are using the API, [remove the override](/managed-rulesets/http/configure-api#configure-an-override-for-http-ddos-attack-protection) you previously configured at the ruleset level. Ensure that you only remove the ruleset override and not any of the rule overrides you may have configured in [Step 3](#step-3--customize-managed-ruleset-rules).

Repeat the procedure (via dashboard or API) for all DDoS Attack Protection Managed Rulesets.
