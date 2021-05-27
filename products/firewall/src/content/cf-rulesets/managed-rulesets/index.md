---
title: Work with Managed Rulesets
pcx-content-type: navigation
type: overview
alwaysopen: true
order: 750
---

# Work with Managed Rulesets

<Aside type='warning' header='Important'>

This feature is part of an early access experience for selected customers.

</Aside>

Managed Rulesets are preconfigured rulesets provided by Cloudflare that you can execute in a phase. Only Cloudflare can modify these rulesets.

The rules in a Managed Ruleset have a default action and status. However, you can define **overrides** that change these defaults.

<Aside type='note' header='Note'>

On the Cloudflare dashboard you define overrides through **configurations**.

</Aside>

There are several Cloudflare products that provide you with Managed Rulesets. Check each product’s documentation for details on the available Managed Rulesets.

## Get started

To view available Managed Rulesets, see [View rulesets](/cf-rulesets/view-rulesets/).

To execute a Managed Ruleset in a phase, see [Execute a Managed Ruleset](/cf-rulesets/managed-rulesets/execute-managed-ruleset/).

You cannot edit a Managed Ruleset, but you can customize Managed Ruleset behavior by using overrides when executing it in a phase. See [Override a Managed Ruleset](/cf-rulesets/managed-rulesets/override-managed-ruleset).