---
title: WAF custom rules
pcx_content_type: how-to
weight: 5
meta:
  title: Configure WAF custom rules with Terraform
---

# Configure WAF custom rules

This page provides examples of creating WAF custom rules in a zone or account using Terraform. The examples cover the following scenarios:

* Zone-level configurations:

    * [Add a custom rule to a zone](#add-a-custom-rule-to-a-zone)

* Account-level configurations:

    * [Create and deploy a custom ruleset](#create-and-deploy-a-custom-ruleset)
    * [Add a custom rule checking for exposed credentials](#add-a-custom-rule-checking-for-exposed-credentials)

For more information on custom rules, refer to [Custom rules](/waf/custom-rules/) in the Cloudflare WAF documentation.

## Before you start

### Obtain the necessary account or zone IDs

{{<render file="_find-ids.md">}}

### Import or delete existing rulesets

{{<render file="_import-delete-existing-rulesets.md">}}

---

## Zone-level configurations

### Add a custom rule to a zone

The following example configures a custom rule in the zone entry point ruleset for the `http_request_firewall_custom` phase for zone with ID `<ZONE_ID>`. The rule will block all traffic on non-standard HTTP(S) ports:

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

{{<render file="_add-new-rule.md" withParameters="custom rule">}}
<br/>

## Account-level configurations

### Create and deploy a custom ruleset

The following example creates a [custom ruleset](/ruleset-engine/custom-rulesets/) in the account with ID `<ACCOUNT_ID>` containing a single custom rule. This custom ruleset is then deployed using a separate `cloudflare_ruleset` Terraform resource. If you do not deploy a custom ruleset, it will not execute.

{{<Aside type="warning">}}
You can only create and deploy custom rulesets at the account level.
{{</Aside>}}

The following configuration creates the custom ruleset with a single rule:

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

{{<render file="_add-new-rule.md" withParameters="custom rule in the custom ruleset">}}
<br/>

The following configuration deploys the custom ruleset at the account level. It defines a dependency on the `account_firewall_custom_ruleset` resource and uses the ID of the created custom ruleset in `action_parameters`:

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

### Add a custom rule checking for exposed credentials

The following configuration creates a custom ruleset with a single rule that [checks for exposed credentials](/waf/exposed-credentials-check/configure-api/#create-a-custom-rule-checking-for-exposed-credentials).

{{<Aside type="warning">}}
You can only add exposed credential checks to rules in a custom ruleset (that is, a ruleset with `kind = "custom"`).
{{</Aside>}}

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

{{<render file="_add-new-rule.md" withParameters="rule">}}
<br/>

The following configuration deploys the custom ruleset. It defines a dependency on the `account_firewall_custom_ruleset_exposed_creds` resource and obtains the ID of the created custom ruleset:

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
