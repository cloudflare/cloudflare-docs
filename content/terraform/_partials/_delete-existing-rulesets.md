---
_build:
  publishResources: false
  render: never
  list: never
---

Terraform assumes that it has complete control over account and zone rulesets. If you already have rulesets configured in your account or zone and do not wish to [import them to Terraform state](#importing-existing-rulesets-to-terraform), you should delete those existing rulesets before proceeding.

To start from scratch, [delete existing rulesets](/ruleset-engine/rulesets-api/delete/#delete-ruleset) (account and zone rulesets with `"kind": "root"` and `"kind": "zone"`, respectively), and then define your rulesets configuration in Terraform.
