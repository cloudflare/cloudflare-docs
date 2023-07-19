---
title: Phases
pcx_content_type: concept
weight: 2
---

# Phases

A phase defines a stage in the life of a request where you can execute rulesets. Phases are defined by Cloudflare and cannot be modified.

Phases exist at two levels: at the **account** level and at the **zone** level. For the same phase, rules defined at the account level are evaluated **before** the rules defined at the zone level.

{{<Aside type="note">}}

Currently, phases at the account level are only available in Enterprise plans.

{{</Aside>}}

The following diagram outlines the request handling process where requests go through the available phases:

![Diagram showing the request handling process. The user request goes through several request phases until it eventually reaches the origin server (the request can also be blocked). The origin returns a response, which goes through several response phases until it reaches the user.](/images/ruleset-engine/rulesets-phases.png)

Cloudflare products are specific to one or more phases, and they add support for different features. Check the documentation for each Cloudflare product for details on the applicable phases.

Refer to [Phases list](/ruleset-engine/reference/phases-list/) for a list of phases and their corresponding Cloudflare products.

## Phase entry point ruleset

Phases have an **entry point** [ruleset](/ruleset-engine/about/rulesets/) at the account and zone levels. An entry point ruleset contains a list of ordered rules that run in the phase. You can define rules in an entry point ruleset that execute a different ruleset.

{{<Aside type="note" header="Note">}}

The `kind` field of a phase entry point ruleset has one of the following values:

- `root` for a phase entry point ruleset at the account level
- `zone` for a phase entry point ruleset at the zone level

{{</Aside>}}
