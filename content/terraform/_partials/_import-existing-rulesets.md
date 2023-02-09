---
_build:
  publishResources: false
  render: never
  list: never
---

If you already have rulesets configured in your account or zone, you can import their configuration to Terraform state using the `terraform import` command. This command will only import resources to the local [state file](https://developer.hashicorp.com/terraform/language/state) — it will not generate `.tf` configuration files.

For example, the following command will import the configuration of the account-level ruleset with ID `<RULESET_ID>`  to the `cloudflare_ruleset` Terraform resource named `example`:

```sh
$ terraform import cloudflare_ruleset.example account/<ACCOUNT_ID>/<RULESET_ID>
```

For details on importing existing resources to Terraform, refer to [Import Cloudflare resources](/terraform/advanced-topics/import-cloudflare-resources/) and to the [`terraform import`](https://developer.hashicorp.com/terraform/cli/import) reference documentation.
