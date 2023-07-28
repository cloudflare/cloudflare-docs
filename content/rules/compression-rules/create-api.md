---
title: Create a rule via API
pcx_content_type: how-to
weight: 2
meta:
  title: Create a compression rule via API
---

# Create a compression rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a compression rule via API.

## Basic rule settings

When creating a compression rule via API, make sure you:

* Set the rule action to `compress_response`.
* Define the parameters in the `action_parameters` field according to the [settings](/rules/compression-rules/settings/#api-configuration-settings) you wish to override for matching requests.
* Deploy the rule to the `http_response_compression` phase at the zone level.

## Procedure

{{<render file="_rules-creation-workflow.md" withParameters="a compression rule;;http_response_compression">}}

## Example requests

Refer to the [Examples](/rules/compression-rules/examples/) page for example API requests.
