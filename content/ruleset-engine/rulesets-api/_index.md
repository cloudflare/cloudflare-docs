---
title: Rulesets API
pcx_content_type: navigation
weight: 10
---

# Rulesets API

The Rulesets API provides an interface for managing and configuring the execution of rulesets.

## Get started

To get started, review the Rulesets [JSON object](/ruleset-engine/rulesets-api/json-object/) and the available [Endpoints](/ruleset-engine/rulesets-api/endpoints/).

---

## Limits

You should avoid making concurrent updates to the same ruleset. There are rate limits in place to prevent the same ruleset from being concurrently updated too many times. The exact limits depend on the size of the ruleset and volume of requests, and can be different for each ruleset.

The rate limits are most frequently hit when concurrently modifying several rules in the same ruleset. To avoid this, you should [update the entire ruleset in a single operation](/ruleset-engine/rulesets-api/update/) instead.
