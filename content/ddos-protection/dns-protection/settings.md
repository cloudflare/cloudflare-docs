---
title: Settings
pcx_content_type: reference
weight: 5
---

# Policy settings

Each Advanced DNS Protection policy has the following settings: mode and sensitivity level.

You may need to adjust these settings in case of false positives or due to specific DNS traffic patterns.

## Mode

Advanced DNS Protection policies can have one of the following execution modes: _Opted-out_, _Disabled_, _Monitor_, and _Enabled_.

{{<definitions>}}

* **Opted-out**

    * Cloudflare will not collect data about DNS queries. Advanced DNS Protection systems will not protect you against DNS-related DDoS attacks.

* **Disabled**

    * Cloudflare will collect data about DNS queries, but the protection provided by Advanced DNS Protection systems will be disabled.

* **Monitor**

    * Protection systems will not apply any mitigation to DNS attacks identified by the Advanced DNS Protection.

* **Enabled**

    * Advanced DNS Protection systems will protect you against DNS attacks by applying mitigation actions to incoming packets identified as belonging to an attack.

{{</definitions>}}

## Sensitivity level

The sensitivity level of the Advanced DNS Protection system for the current type of DNS queries (profiled or unprofiled).

* A low sensitivity level means that bigger spikes in the DNS packet rate may trigger a mitigation action.
* A high sensitivity level means that smaller spikes in the DNS packet rate may trigger a mitigation action.

The default sensitivity level is _Medium_.
