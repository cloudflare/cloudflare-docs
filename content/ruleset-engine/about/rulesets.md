---
title: Rulesets
pcx_content_type: concept
weight: 3
---

# Rulesets

A ruleset is an ordered set of [rules](/ruleset-engine/about/rules/) that you can apply to traffic on the Cloudflare global network. Rulesets belong to a phase and can only execute in the same phase. To deploy a ruleset to a phase, add a rule that executes the ruleset to the [phase entry point ruleset](/ruleset-engine/about/phases/#phase-entry-point-ruleset).

Rulesets are versioned. Each ruleset modification creates a new version of the ruleset. You can have several versions of a ruleset in use at the same time. When you deploy a ruleset — that is, when you create a rule that executes the ruleset — the most recent version of the ruleset is selected by default.

There are several types of rulesets. Cloudflare provides **managed rulesets** that you can deploy. Additionally, you can create and manage your own **custom rulesets**. Specific Cloudflare products may provide other types of rulesets.

## Managed rulesets

Managed rulesets are preconfigured rulesets provided by Cloudflare that you can deploy to a phase. Only Cloudflare can modify these rulesets.

The rules in a managed ruleset have a default action and status. However, you can define **overrides** that change these defaults.

There are several Cloudflare products that provide you with managed rulesets. Check each product’s documentation for details on the available managed rulesets.

For more information on deploying managed rulesets and defining overrides, check [Work with managed rulesets](/ruleset-engine/managed-rulesets/).

## Custom rulesets

{{<Aside type="warning" header="Important">}}

Currently, custom rulesets are only supported by the Cloudflare WAF.

{{</Aside>}}

Use custom rulesets to define your own sets of rules. After creating a custom ruleset, deploy it to a phase by creating a rule that executes the ruleset.

For more information on creating and deploying custom rulesets, check [Work with custom rulesets](/ruleset-engine/custom-rulesets/).