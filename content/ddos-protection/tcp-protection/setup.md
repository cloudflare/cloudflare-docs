---
title: Setup
pcx_content_type: how-to
weight: 3
---

# Advanced TCP Protection setup

Follow the steps described in the following sections to get started with Advanced TCP Protection.

## Step 1 – Request initial configuration

When you get access to Advanced TCP Protection, there are no configured thresholds in your account.

Thresholds are based on your company's individual behavior, derived from your traffic profile as monitored by Cloudflare. Defining the thresholds will effectively determine what the _High_, _Medium_, and _Low_ [sensitivities](/ddos-protection/tcp-protection/rule-settings/#burst-sensitivity) will be for your specific case.

Ask your Implementation Manager to configure initial threshold values.

Once thresholds are configured, the Implementation Manager will let you know that Advanced TCP Protection has been initialized and can be configured and enabled.

## Step 2 – Add prefixes

[Add the prefixes](/ddos-protection/tcp-protection/how-to/add-prefix/) you would like to use with Advanced TCP Protection. You will be able to register prefixes that you previously [onboarded to Magic Transit](/magic-transit/how-to/advertise-prefixes/) or a subset of these prefixes.

{{<Aside type="warning" header="Important">}}

* You cannot add unapproved prefixes to Advanced TCP Protection. Contact your account team to get help with prefix approvals.
* Prefixes in the allowlist will be vulnerable to IP spoofing [^1] attacks.

[^1]: IP spoofing is the creation of Internet Protocol (IP) packets which have a modified source address to hide the identity of the sender, impersonate another computer system, or both.

{{</Aside>}}

## Step 3 – (optional) Add prefixes to the allowlist

[Add prefixes to the allowlist](/ddos-protection/tcp-protection/how-to/add-prefix-allowlist/) if their traffic should bypass Advanced TCP Protection rules. You can also use the allowlist to exclude a subset of an onboarded prefix from Advanced TCP Protection rules.

## Step 4 – Create a global configuration

[Create a rule](/ddos-protection/tcp-protection/how-to/create-rule/) for SYN Flood Protection and another rule for Out-of-State TCP Protection, both with global scope and in monitoring mode. These rules will apply to all received packets.

## Step 5 – Enable Advanced TCP Protection

1. Go to **Account Home** > **Firewall Rulesets** > **DDoS** in the dashboard.
2. Under **Advanced TCP Protection** > **General settings**, toggle the feature status to **Enabled**.
