---
title: Skip options
pcx-content-type: reference
weight: 4
meta:
  title: Available skip options
---

# Available skip options

The available skip options in Custom Firewall rules are the following:

{{<definitions>}}

*   **Skip the remaining Custom Rules (current ruleset)**
    *   Dashboard option: **All remaining Custom Rules**.
    *   API action parameter: `ruleset`.
    *   Skips the remaining rules in the current ruleset.

*   **Skip phases**
    *   Dashboard options: **All Rate Limiting Rules** and **All Managed Rules**.

    *   API action parameter: `phases`.

    *   Skips the execution of one or more phases. Based on the phases you can skip, this option effectively allows you to skip [Rate Limiting rules](/waf/custom-rules/rate-limiting/) and/or [WAF Managed Rulesets](/waf/managed-rulesets/). When skipping a phase, both the account and zone-level entry point rulesets of the phase will be skipped.

    *   The phases you can skip are the following:
        *   `http_request_firewall_managed`
        *   `http_ratelimit`

    *   Refer to [Phases](/ruleset-engine/about#phases) for more information.

*   **Skip products**
    *   API action parameter: `products`.

    *   Skips specific security products that are not based on the Ruleset Engine. The products you can skip are the following:

    *   Product name in the dashboard | API value
        \---|---
        [Zone Lockdown](https://support.cloudflare.com/hc/articles/115001595131) | `zoneLockdown`
        [User Agent Blocking](https://support.cloudflare.com/hc/articles/115001856951) | `uaBlock`
        [Browser Integrity Check](https://support.cloudflare.com/hc/articles/200170086) | `bic`
        [Hotlink Protection](https://support.cloudflare.com/hc/articles/200170026) | `hot`
        [Security Level](https://support.cloudflare.com/hc/articles/200170056) | `securityLevel`
        [Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128) (previous version) | `rateLimit`
        [WAF Managed Rules](https://support.cloudflare.com/hc/articles/200172016) (previous version) | `waf`

    *   The API values are case sensitive.

{{</definitions>}}
