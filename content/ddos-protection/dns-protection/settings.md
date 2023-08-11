---
title: Settings
pcx_content_type: reference
weight: 5
---

# Policy settings

Each Advanced DNS Protection policy has the following settings: mode, sensitivity level, rate, and burst.

You may need to adjust these settings in case of false positives or due to specific DNS traffic patterns.

## Mode

Advanced DNS Protection policies can have one of the following execution modes: _Monitoring_, _Enabled_, and _Disabled_.

{{<definitions>}}

* **Monitoring**

    * Protection systems will not apply any mitigation to DNS attacks identified by the Advanced DNS Protection. API value: `monitoring`.

* **Enabled**

    * Advanced DNS Protection systems will protect you against DNS attacks by applying mitigation actions to incoming packets identified as belonging to an attack. API value: `enabled`.

* **Disabled**

    * Cloudflare will collect data about DNS queries, but the protection provided by Advanced DNS Protection systems will be disabled. API value: `disabled`.

{{</definitions>}}

## Sensitivity level

The sensitivity level of the Advanced DNS Protection system for the current type of DNS queries (profiled or unprofiled).

* A lower sensitivity level means that bigger spikes in the DNS packet rate may trigger a mitigation action.
* A higher sensitivity level means that smaller spikes in the DNS packet rate may trigger a mitigation action.

The default sensitivity level is `medium`.

The API values are the following: `low`, `medium`, `high`, and `very_high`.

## Rate

TBD

## Burst

TBD