---
title: WAF custom rules configuration using Terraform
pcx_content_type: how-to
sidebar:
  order: 5
  label: WAF custom rules
head:
  - tag: title
    content: WAF custom rules configuration using Terraform
---

import { Render, GlossaryTooltip } from "~/components";

This page provides examples of creating [WAF custom rules](/waf/custom-rules/) in a zone or account using Terraform. The examples cover the following scenarios:

- [Add a custom rule to a zone](#add-a-custom-rule-to-a-zone)
- [Create and deploy a custom ruleset](#create-and-deploy-a-custom-ruleset)

The WAF documentation includes additional Terraform examples — refer to [More resources](#more-resources).

If you are using the Cloudflare API, refer to the following resources in the WAF documentation:

- [Create a custom rule via API](/waf/custom-rules/create-api/)
- [Create a custom ruleset using the API](/waf/account/custom-rulesets/create-api/)

For more information on deploying and configuring custom rulesets using the Rulesets API, refer to [Work with custom rulesets](/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

## Before you start

### Obtain the necessary account or zone IDs

<Render file="find-ids" product="terraform" />

### Import or delete existing rulesets

<Render file="import-delete-existing-rulesets" product="terraform" />

---

## Add a custom rule to a zone

The following example configures a custom rule in the zone entry point ruleset for the `http_request_firewall_custom` phase for zone with ID `<ZONE_ID>`. The rule will block all traffic on non-standard HTTP(S) ports:

<Render file="v4-code-snippets" product="terraform" />

```tf
resource "cloudflare_ruleset" "zone_custom_firewall" {
  zone_id     = "<ZONE_ID>"
  name        = "Phase entry point ruleset for custom rules in my zone"
  description = ""
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules {
    ref         = "block_non_default_ports"
    description = "Block ports other than 80 and 443"
    expression  = "(not cf.edge.server_port in {80 443})"
    action      = "block"
  }
}
```

<Render
	file="add-new-rule"
	product="terraform"
	params={{ ruleType: "custom rule" }}
/>
<br />

## Create and deploy a custom ruleset

:::note
All customers can create custom rulesets at the [zone level](/waf/custom-rules/custom-rulesets/).<br/>
Custom rulesets at the [account level](/waf/account/custom-rulesets/) require an Enterprise plan with a paid add-on.
:::

The following example creates a [custom ruleset](/ruleset-engine/custom-rulesets/) in the account with ID `<ACCOUNT_ID>` containing a single custom rule. This custom ruleset is then deployed using a separate `cloudflare_ruleset` Terraform resource. If you do not deploy a custom ruleset, it will not execute.

The following configuration creates a custom ruleset with a single rule:

<Render file="v4-code-snippets" product="terraform" />

```tf
resource "cloudflare_ruleset" "account_firewall_custom_ruleset" {
  account_id  = "<ACCOUNT_ID>"
  name        = "Custom ruleset blocking traffic in non-standard HTTP(S) ports"
  description = ""
  kind        = "custom"
  phase       = "http_request_firewall_custom"

  rules {
    ref         = "block_non_default_ports"
    description = "Block ports other than 80 and 443"
    expression  = "(not cf.edge.server_port in {80 443})"
    action      = "block"
  }
}
```

<Render
	file="add-new-rule"
	product="terraform"
	params={{ ruleType: "custom rule in the custom ruleset" }}
/>
<br />

The following configuration deploys the custom ruleset at the account level. It defines a dependency on the `account_firewall_custom_ruleset` resource and uses the ID of the created custom ruleset in `action_parameters`:

<Render file="v4-code-snippets" product="terraform" />

```tf
resource "cloudflare_ruleset" "account_firewall_custom_entrypoint" {
  account_id  = "<ACCOUNT_ID>"
  name        = "Account-level entry point ruleset for the http_request_firewall_custom phase deploying a custom ruleset"
  description = ""
  kind        = "root"
  phase       = "http_request_firewall_custom"

  depends_on = [cloudflare_ruleset.account_firewall_custom_ruleset]

  rules {
    ref         = "deploy_custom_ruleset_example_com"
    description = "Deploy custom ruleset for example.com"
    expression  = "(cf.zone.name eq \"example.com\") and (cf.zone.plan eq \"ENT\")"
    action      = "execute"
    action_parameters {
      id = cloudflare_ruleset.account_firewall_custom_ruleset.id
    }
  }
}
```

For more information on configuring and deploying custom rulesets, refer to [Work with custom rulesets](/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

## More resources

- [Malicious uploads detection: Add a custom rule to block malicious uploads](/waf/detections/malicious-uploads/terraform-examples/#add-a-custom-rule-to-block-malicious-uploads)
- [Leaked credentials detection: Add a custom rule to challenge requests with leaked credentials](/waf/detections/leaked-credentials/terraform-examples/#add-a-custom-rule-to-challenge-requests-with-leaked-credentials)
