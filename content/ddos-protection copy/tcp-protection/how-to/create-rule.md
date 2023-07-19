---
title: Create a rule
pcx_content_type: how-to
weight: 4
---

# Create a rule

To create a [SYN flood rule](/ddos-protection/tcp-protection/#syn-flood-protection) or an [out-of-state TCP](/ddos-protection/tcp-protection/#out-of-state-tcp-protection) rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to Account Home > **L3/4 DDoS** > **Advanced TCP Protection**.
3. Depending on the rule you are creating, do one of the following:

    * Under **SYN Flood Protection**, select **Create SYN flood rule**.
    * Under **Out-of-state TCP Protection**, select **Create out-of-state TCP rule**.

4. In **Mode**, select a [mode](/ddos-protection/tcp-protection/rule-settings/#mode) for the rule.
5. Under **Set scope**, select a [scope](/ddos-protection/tcp-protection/rule-settings/#scope) for the rule. If you choose to apply the rule to a subset of incoming packets, select a region or a data center.
6. Under **Sensitivity**, define the [burst sensitivity](/ddos-protection/tcp-protection/rule-settings/#burst-sensitivity) and [rate sensitivity](/ddos-protection/tcp-protection/rule-settings/#rate-sensitivity) of the rule (by default, _Medium_). The sensitivity levels are based on the initially configured thresholds for your specific case.
7. Select **Deploy**.
