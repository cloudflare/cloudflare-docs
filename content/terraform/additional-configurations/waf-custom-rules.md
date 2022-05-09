---
title: Configure custom rules
pcx-content-type: how-to
weight: 5
meta:
  title: Configure custom rules with Terraform
layout: list
---

# Configure custom rules

This page provides examples of creating custom rules in a zone or account using Terraform. The examples cover the following scenarios:

* [Create a custom rule in a zone](#create-custom-rule)
* [Create and deploy a custom ruleset](#create-and-deploy-a-custom-ruleset)
* [Create a custom rule checking for exposed credentials](#create-a-custom-rule-checking-for-exposed-credentials)

For more information on custom rules, refer to [Custom rules](/waf/custom-rules/) in the Cloudflare WAF documentation.

## Create custom rule

The following example creates a custom rule at the zone level for zone with ID `<ZONE_ID>` that blocks all traffic on non-standard HTTP(S) ports:

```tf
resource "cloudflare_ruleset" "zone_custom_firewall" {
  zone_id     = "<ZONE_ID>"
  name        = "Phase entry point ruleset for custom rules in my zone"
  description = ""
  kind        = "zone"
  phase       = "http_request_firewall_custom"

  rules {
    action = "block"
    expression = "(not cf.edge.server_port in {80 443})"
    description = "Block ports other than 80 and 443"
    enabled = true
  }
}
```

## Create and deploy a custom ruleset

The following example creates a custom ruleset in the account with ID `<ACCOUNT_ID>` containing a single custom rule. This custom ruleset is then deployed in a separate `cloudflare_ruleset` resource. If you do not deploy a custom ruleset, it will not execute.

{{<Aside type="warning">}}
You must always create custom rulesets at the account level. Zone-level custom rulesets are not currently supported.
{{</Aside>}}

The following configuration creates the custom ruleset:

```tf
resource "cloudflare_ruleset" "account_firewall_custom_ruleset" {
  account_id  = "<ACCOUNT_ID>"
  name        = "Custom ruleset blocking traffic in non-standard HTTP(S) ports"
  description = ""
  kind        = "custom"
  phase       = "http_request_firewall_custom"

  rules {
    action = "block"
    expression = "(not cf.edge.server_port in {80 443})"
    description = "Block ports other than 80 and 443"
    enabled = true
  }
}
```

The following configuration deploys the custom ruleset at the account level. It defines a dependency on the `account_firewall_custom_ruleset` resource and obtains the ID of the created custom ruleset:

```tf
resource "cloudflare_ruleset" "account_firewall_custom_entrypoint" {
  account_id  = "<ACCOUNT_ID>"
  name        = "Account-level entry point ruleset for the http_request_firewall_custom phase deploying a custom ruleset"
  description = ""
  kind        = "root"
  phase       = "http_request_firewall_custom"

  depends_on = [cloudflare_ruleset.account_firewall_custom_ruleset]

  rules {
    action = "execute"
    action_parameters {
      id = cloudflare_ruleset.account_firewall_custom_ruleset.id
    }
    expression = "(cf.zone.name eq \"example.com\")"
    description = "Deploy custom ruleset for example.com"
    enabled = true
  }
}
```

For more information on configuring and deploying custom rulesets, refer to [Work with custom rulesets](/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

## Create a custom rule checking for exposed credentials

The following configuration creates a custom ruleset with a rule that [checks for exposed credentials](/waf/exposed-credentials-check/configure-api/#create-a-custom-rule-checking-for-exposed-credentials):

```tf
resource "cloudflare_ruleset" "account_firewall_custom_ruleset_exposed_creds" {
  account_id  = "<ACCOUNT_ID>"
  name        = "Custom ruleset checking for exposed credentials"
  description = ""
  kind        = "custom"
  phase       = "http_request_firewall_custom"

  rules {
    action = "rewrite"
    action_parameters {
      headers {
        name = "Exposed-Credential-Check"
        operation = "set"
        value = "1"
      }
    }
    exposed_credential_check {
      username_expression = "url_decode(http.request.body.form[\"username\"][0])"
      password_expression = "url_decode(http.request.body.form[\"password\"][0])"
    }
    expression = "http.request.method == \"POST\" && http.request.uri == \"/login.php\""
    description = "Add header when there is a rule match and exposed credentials are detected"
    enabled = true
  }
}
```

The following configuration deploys the custom ruleset at the account level. It defines a dependency on the `account_firewall_custom_ruleset_exposed_creds` resource and obtains the ID of the created custom ruleset:

```tf
resource "cloudflare_ruleset" "account_firewall_custom_entrypoint" {
  account_id  = "<ACCOUNT_ID>"
  name        = "Account-level entry point ruleset for the http_request_firewall_custom phase deploying a custom ruleset checking for exposed credentials"
  description = ""
  kind        = "root"
  phase       = "http_request_firewall_custom"

  depends_on = [cloudflare_ruleset.account_firewall_custom_ruleset_exposed_creds]

  rules {
    action = "execute"
    action_parameters {
      id = cloudflare_ruleset.account_firewall_custom_ruleset_exposed_creds.id
    }
    expression = "(cf.zone.name eq \"example.com\")"
    description = "Deploy custom ruleset for example.com"
    enabled = true
  }
}
```
