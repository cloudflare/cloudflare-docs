---
title: Rule settings
pcx_content_type: reference
weight: 9
---

# Rule settings

Each rule type has the following settings: mode, scope, burst sensitivity, and rate sensitivity.

You may need to adjust the burst or rate sensitivity of a rule in case of false positives or due to specific traffic patterns.

## Mode

Advanced TCP Protection rules have three execution modes: monitoring mode, mitigation mode, or disabled.

{{<definitions>}}

* **Monitoring mode**

    * In this mode, Advanced TCP Protection will not impact any packets. Instead, the protection system will learn about existing TCP connections and will maintain their states. Check Network Analytics to visualize what actions Advanced TCP Protection would have taken on incoming packets, according to the current configuration.

    * Use monitoring mode when onboarding new prefixes to Magic Transit or when performing changes to Advanced TCP Protection.

    * When first setting up or when making changes, the Advanced TCP Protection system will need to re-learn your legitimate TCP connections. Therefore, it is recommended that you use monitoring mode before mitigation mode to avoid impact to your legitimate traffic.

* **​​Mitigation mode**

    * In this mode, Advanced TCP Protection will perform mitigation actions on incoming packets if they exceed the thresholds.

    * If you are using mitigation mode, you should disable Advanced TCP Protection before making changes to Advanced TCP Protection or before advertising prefixes. When you enable rules in mitigation mode without first using monitoring mode, the protection system will have a learning period of 10 minutes to learn the existing flows. After this period, the mitigation mode will start and the protection system will apply any required mitigation actions to incoming packets, according to the current configuration.

* **Disabled**

    * In this mode, a rule will not evaluate any incoming packets.

{{</definitions>}}

## Scope

Advanced TCP Protection rules can have one of the following scopes:

* **Global**: The rule will apply to all incoming packets.
* **Region**: The rule will apply to incoming packets in a selected region.
* **Data center**: The rule will apply to incoming packets in the selected Cloudflare data center.

The rule scope allows you to adjust the system's tolerance for out-of-state packets in locations where you may have more or less traffic than usual, or due to any other networking reasons.

Besides defining rules with one of the above scopes, you must also select the [prefixes](/ddos-protection/tcp-protection/concepts/#prefixes) that you wish to protect with Advanced TCP Protection.

## Burst sensitivity

The burst sensitivity is the rule's sensitivity to short-term bursts in the packet rate:

* A low sensitivity means that bigger spikes in the packet rate may trigger a mitigation action.
* A high sensitivity means that smaller spikes in the packet rate may trigger a mitigation action.

The default burst sensitivity is _Medium_.

## Rate sensitivity

The rate sensitivity is the rule's sensitivity to the sustained packet rate:

* A low sensitivity means that higher sustained packet rates can trigger a mitigation action.
* A high sensitivity means that lower sustained packet rates may trigger a mitigation action. A high sensitivity offers increased protection, but you may get more false positives (that is, mitigated packets that belong to legitimate traffic).

The default rate sensitivity is _Medium_.
