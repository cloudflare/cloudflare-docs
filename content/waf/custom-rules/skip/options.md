---
title: Skip options
pcx_content_type: reference
weight: 4
meta:
  title: Available skip options
---

# Available skip options

The available skip options in custom rules are the following:

{{<definitions>}}

- **Skip the remaining custom rules (current ruleset)**

  - Dashboard option: **All remaining custom rules**.
  - API action parameter: `ruleset`.
  - Skips the remaining rules in the current ruleset.

- **Skip phases**

  - Dashboard options: **All rate limiting rules**, **All Super Bot Fight Mode rules**, and **All managed rules**.

  - API action parameter: `phases`.

  - Skips the execution of one or more phases. Based on the phases you can skip, this option effectively allows you to skip [rate limiting rules](/waf/rate-limiting-rules/), [Super Bot Fight Mode rules](/bots/get-started/pro/), and/or [WAF Managed Rules](/waf/managed-rules/). When skipping a phase, both the account and zone-level entry point rulesets of the phase will be skipped.

  - The phases you can skip are the following:

    - `http_ratelimit`
    - `http_request_sbfm`
    - `http_request_firewall_managed`

  - Refer to [Phases](/ruleset-engine/about/phases/) for more information.

- **Skip products**

  - API action parameter: `products`.

  - Skips specific security products that are not based on the Ruleset Engine. The products you can skip are the following:

  - | Product name in the dashboard                                                        | API value       |
    | ------------------------------------------------------------------------------------ | --------------- |
    | [Zone Lockdown](/waf/tools/zone-lockdown/)                                           | `zoneLockdown`  |
    | [User Agent Blocking](/waf/tools/user-agent-blocking/)                               | `uaBlock`       |
    | [Browser Integrity Check](https://support.cloudflare.com/hc/articles/200170086)      | `bic`           |
    | [Hotlink Protection](https://support.cloudflare.com/hc/articles/200170026)           | `hot`           |
    | [Security Level](https://support.cloudflare.com/hc/articles/200170056)               | `securityLevel` |
    | [Rate Limiting (previous version)](/waf/reference/legacy/old-rate-limiting/)         | `rateLimit`     |
    | [WAF managed rules (previous version)](/waf/reference/legacy/old-waf-managed-rules/) | `waf`           |

  - The API values are case sensitive.

{{<Aside type="warning">}}
Currently, you cannot skip [Bot Fight Mode](/bots/get-started/free/), only Super Bot Fight Mode (refer to Skip phases above).
{{</Aside>}}

{{</definitions>}}

## Logging

{{<definitions>}}

- **Log requests matching the skip rule**

  - Dashboard option: **Log matching requests**.
  - API action parameter: `logging` > `enabled` (boolean, optional).
  - When disabled, Cloudflare will not log any requests matching the current skip rule, and these requests will not appear in [Security Events](/waf/security-events/).
  - If you do not specify this option in the API, the default value is `true` for custom rules with the skip action (logs requests matching the skip rule).

{{</definitions>}}
