---
title: Create a rule via API
pcx_content_type: how-to
weight: 2
meta:
  title: Create a compression rule via API
---

# Create a compression rule via API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to create a compression rule via API.

When creating a compression rule via API, make sure you:

* Set the rule action to `compress_response`.
* Define the parameters in the `action_parameters` field according to the [settings](/rules/compression-rules/settings/#api-configuration-settings) you wish to override for matching requests.
* Deploy the rule to the `http_response_compression` phase at the zone level.

***

Follow this workflow to create a compression rule for a given zone via API:

1. Use the [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets) method to check if there is already a ruleset for the `http_response_compression` phase at the zone level.

2. If the phase ruleset does not exist, create it using the [Create ruleset](/ruleset-engine/rulesets-api/create/) method with the zone-level endpoint. In the new ruleset properties, set the following values:

    * **kind**: `zone`
    * **phase**: `http_response_compression`

3. Use the [Update ruleset](/ruleset-engine/rulesets-api/update/) method to add a compression rule to the list of ruleset rules (check the examples below). Alternatively, include the rule in the [Create ruleset](/ruleset-engine/rulesets-api/create/) request mentioned in the previous step.

## Examples

Refer to the [Examples](/rules/compression-rules/examples/) page for example API requests.
