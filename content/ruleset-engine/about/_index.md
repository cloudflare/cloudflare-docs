---
title: About
pcx_content_type: concept
weight: 3
meta:
  title: About Ruleset Engine
---

# About Ruleset Engine

{{<content-column>}}

The Cloudflare Ruleset Engine allows you to create and deploy rules and rulesets. The engine syntax, inspired by the Wireshark Display Filter language, is defined by the [Rules language](/ruleset-engine/rules-language/). Cloudflare uses the Ruleset Engine in different products, allowing you to configure several products using the same basic syntax.

There are several elements involved in the configuration and use of the Ruleset Engine. These elements are:

- [**Phase**](/ruleset-engine/about/phases/): Defines a stage in the life of a request where you can execute rulesets.
- [**Ruleset**](/ruleset-engine/about/rulesets/): Defines a versioned set of rules. You deploy rulesets to a phase, where they execute.
- [**Rule**](/ruleset-engine/about/rules/): Defines a filter and an action to perform on incoming requests that match the filter expression. A rule with an `execute` action executes a ruleset.

---

## Get started

To view existing rulesets and their properties, refer to [View rulesets](/ruleset-engine/basic-operations/view-rulesets/).

For more information on deploying managed rulesets and defining overrides, refer to [Work with managed rulesets](/ruleset-engine/managed-rulesets/).

For more information on creating and deploying custom rulesets, refer to [Work with custom rulesets](/ruleset-engine/custom-rulesets/).

{{</content-column>}}