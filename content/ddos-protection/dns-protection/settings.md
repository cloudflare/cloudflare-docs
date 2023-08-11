---
title: Settings
pcx_content_type: reference
weight: 5
---

# Policy settings

Each Advanced DNS Protection policy has the following settings: mode, rate, burst, and sensitivity level.

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

## Rate and burst

The rate and burst parameters of a token bucket algorithm that the protection system applies to non-legitimate DNS queries. Queries considered non-legitimate cost 1 token, and when the token bucket is empty, non-legitimate queries are dropped until the token bucket refills. This is the same token bucket algorithm used in the [Advanced TCP Protection](/ddos-protection/tcp-protection/).

## Sensitivity level

The sensitivity level of the Advanced DNS Protection system for the DNS queries considered non-legitimate.

* A `low` sensitivity level will only subject packets to the token bucket algorithm that are most probably part of an attack.
* A `medium` sensitivity level will subject packets to the token bucket algorithm for which the system is less confident that they are part of an attack. This means that some legitimate DNS queries may be dropped.

The default sensitivity level is `low`.

The API values are the following: `low`, `medium`, `high`, and `very_high`.
