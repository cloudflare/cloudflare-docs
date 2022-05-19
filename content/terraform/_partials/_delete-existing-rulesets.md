---
_build:
  publishResources: false
  render: never
  list: never
---

Terraform assumes that it has complete control over account and zone rulesets. Before you can start configuring your account and zone using Terraform, you must delete existing rulesets (any ruleset with `kind: root` or `kind: zone` at the account and zone level, respectively), and then recreate them using Terraform.

Cloudflare recommends that you delete rulesets in both scopes (account and zone) so that you can manage them all using Terraform. However, you can also manage rulesets for only one of the scopes: account or zone. In this case, delete the rulesets in the desired scope before you start managing rulesets using Terraform.

To find existing entry point rulesets, use the API operations described in [List existing rulesets](/ruleset-engine/rulesets-api/view/#list-existing-rulesets), for the account and zone levels. To delete existing rulesets, use the API operations described in [Delete ruleset](/ruleset-engine/rulesets-api/delete/#delete-ruleset), for the account and zone levels.
