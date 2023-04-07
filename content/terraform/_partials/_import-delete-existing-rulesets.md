---
_build:
  publishResources: false
  render: never
  list: never
---

Terraform assumes that it has complete control over account and zone rulesets. If you already have rulesets configured in your account or zone, do one of the following:

* [Import existing rulesets to Terraform](/terraform/advanced-topics/import-cloudflare-resources/) using the `cf-terraforming` tool. Recent versions of the tool can generate resource definitions for existing rulesets and import their configuration to Terraform state.
* Start from scratch by [deleting existing rulesets](/ruleset-engine/rulesets-api/delete/#delete-ruleset) (account and zone rulesets with `"kind": "root"` and `"kind": "zone"`, respectively) and then defining your rulesets configuration in Terraform.
