---
title: WAF Managed Rules
pcx_content_type: how-to
weight: 2
meta:
  title: Configure WAF Managed Rules with Terraform
---

# Configure WAF Managed Rules

This page provides examples of deploying and configuring WAF Managed Rules in your zone or account using Terraform. It covers the following configurations:

* [Deploy managed rulesets](#deploy-managed-rulesets)
* [Configure skip rules](#configure-skip-rules)
* [Configure payload logging](#configure-payload-logging)
* [Configure overrides](#configure-overrides)
* [Configure the OWASP paranoia level, score threshold, and action](#configure-the-owasp-paranoia-level-score-threshold-and-action)

For more information on WAF Managed Rules, refer to [WAF Managed Rules](/waf/managed-rules/) in the Cloudflare WAF documentation. For more information on deploying and configuring rulesets using the Rulesets API, refer to [Work with managed rulesets](/ruleset-engine/managed-rulesets/) in the Ruleset Engine documentation.

## Before you start

### Obtain the necessary account, zone, and managed ruleset IDs

{{<render file="_find-ids-managed-rulesets.md">}}

### Import or delete existing rulesets

{{<render file="_import-delete-existing-rulesets.md">}}

---

## Deploy managed rulesets

The following example deploys two managed rulesets to the zone with ID `<ZONE_ID>` using Terraform, using a `cloudflare_ruleset` resource with two rules that execute the managed rulesets.

```tf
# Configure a ruleset at the zone level for the "http_request_firewall_managed" phase
resource "cloudflare_ruleset" "zone_level_managed_waf" {
  zone_id     = "<ZONE_ID>"
  name        = "Managed WAF entry point ruleset"
  description = "Zone-level WAF Managed Rules config"
  kind        = "zone"
  phase       = "http_request_firewall_managed"

  # Execute Cloudflare Managed Ruleset
  rules {
    action = "execute"
    action_parameters {
      id = "efb7b8c949ac4650a09736fc376e9aee"
      version = "latest"
    }
    expression = "true"
    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"
    enabled = true
  }

  # Execute Cloudflare OWASP Core Ruleset
  rules {
    action = "execute"
    action_parameters {
      id = "4814384a9e5d4991b9815dcfc25d2f1f"
      version = "latest"
    }
    expression = "true"
    description = "Execute Cloudflare OWASP Core Ruleset on my zone-level phase entry point ruleset"
    enabled = true
  }
}
```

<details>
<summary>Account-level example configuration</summary>
<div>

{{<Aside type="note" header="Before you start">}}
* Account-level WAF configuration requires an Enterprise plan with a paid add-on.

* Managed rulesets deployed at the account level will only apply to incoming traffic of zones on an Enterprise plan. The expression of your `execute` rule must end with `and cf.zone.plan eq "ENT"`.
{{</Aside>}}

The following example deploys two managed rulesets to the account with ID `<ACCOUNT_ID>` using Terraform, using a `cloudflare_ruleset` resource with two rules that execute the managed rulesets for two hostnames belonging to Enterprise zones.

```tf
resource "cloudflare_ruleset" "account_level_managed_waf" {
  account_id  = "<ACCOUNT_ID>"
  name        = "Managed WAF entry point ruleset"
  description = "Account-level WAF Managed Rules config"
  kind        = "root"
  phase       = "http_request_firewall_managed"

  # Execute Cloudflare Managed Ruleset
  rules {
    action = "execute"
    action_parameters {
      id = "efb7b8c949ac4650a09736fc376e9aee"
    }
    expression = "http.host in {\"api.example.com\" \"store.example.com\"} and cf.zone.plan eq \"ENT\""
    description = "Execute Cloudflare Managed Ruleset on my account-level phase entry point ruleset"
    enabled = true
  }

  # Execute Cloudflare OWASP Core Ruleset
  rules {
    action = "execute"
    action_parameters {
      id = "4814384a9e5d4991b9815dcfc25d2f1f"
    }
    expression = "http.host in {\"api.example.com\" \"store.example.com\"} and cf.zone.plan eq \"ENT\""
    description = "Execute Cloudflare OWASP Core Ruleset on my account-level phase entry point ruleset"
    enabled = true
  }
}
```

</div>
</details>

## Configure skip rules

The following example adds two [skip rules](/waf/managed-rules/waf-exceptions/) (or WAF exceptions) for the Cloudflare Managed Ruleset:

* The first rule will skip the execution of the entire Cloudflare Managed Ruleset (with ID `efb7b8c949ac4650a09736fc376e9aee`) for specific URLs, according to the rule expression.
* The second rule will skip the execution of two rules belonging to the Cloudflare Managed Ruleset for specific URLs, according to the rule expression.

Add the two skip rules to the `cloudflare_ruleset` resource before the rule that deploys the Cloudflare Managed Ruleset:

```tf
---
highlight: 4-13,15-27
---
resource "cloudflare_ruleset" "account_level_managed_waf" {
  # (...)

  # Skip execution of the entire Cloudflare Managed Ruleset for specific URLs
  rules {
    action = "skip"
    action_parameters {
      rulesets = ["efb7b8c949ac4650a09736fc376e9aee"]
    }
    expression = "(cf.zone.name eq \"example.com\" and http.request.uri.query contains \"skip=rulesets\")"
    description = "Skip Cloudflare Manage ruleset"
    enabled = true
  }

  # Skip execution of two rules in the Cloudflare Managed Ruleset for specific URLs
  rules {
    action = "skip"
    action_parameters {
      rules = {
        # Format: "<RULESET_ID>" = "<RULE_ID_1>,<RULE_ID_2>,..."
        "efb7b8c949ac4650a09736fc376e9aee" = "5de7edfa648c4d6891dc3e7f84534ffa,e3a567afc347477d9702d9047e97d760"
      }
    }
    expression = "(cf.zone.name eq \"example.com\" and http.request.uri.query contains \"skip=rules\")"
    description = "Skip WordPress and SQLi rules"
    enabled = true
  }

  # Execute Cloudflare Managed Ruleset
  rules {
    action = "execute"
    action_parameters {
      id = "efb7b8c949ac4650a09736fc376e9aee"
      version = "latest"
    }
    expression = "true"
    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"
    enabled = true
  }

  # (...)
}
```

{{<Aside type="warning" header="Important">}}
Ensure that you place the skip rules **before** the rule that executes the managed ruleset (or some of its rules) that you wish to skip, as in the previous example.
{{</Aside>}}

## Configure overrides

The following example adds three [overrides](/ruleset-engine/managed-rulesets/override-managed-ruleset/) for the Cloudflare Managed Ruleset:

* A rule override for rule with ID `5de7edfa648c4d6891dc3e7f84534ffa` setting the action to `log`.
* A rule override for rule with ID `75a0060762034a6cb663fd51a02344cb` disabling the rule.
* A tag override for the `wordpress` tag, setting the action of all the rules with this tag to `js_challenge`.

{{<Aside type="warning" header="Important">}}
Ruleset overrides and tag overrides apply to both existing and **future** rules in the managed ruleset. If you wish to override existing rules only, you must use rule overrides.

In the rules-level or category-level override, use the `status` field to indicate whether the override enables or disables the ruleset rules or category.
{{</Aside>}}

The following configuration includes the three overrides in the rule that executes the Cloudflare Managed Ruleset:

```tf
---
highlight: 9-24
---
  # (...)

  # Execute Cloudflare Managed Ruleset
  rules {
    action = "execute"
    action_parameters {
      id = "efb7b8c949ac4650a09736fc376e9aee"
      version = "latest"
      overrides {
        rules {
          id = "5de7edfa648c4d6891dc3e7f84534ffa"
          action = "log"
          status = "enabled"
        }
        rules {
          id = "75a0060762034a6cb663fd51a02344cb"
          status = "disabled"
        }
        categories {
          category = "wordpress"
          action = "js_challenge"
          status = "enabled"
        }
      }
    }
    expression = "true"
    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"
    enabled = true
  }

  # (...)
```

## Configure payload logging

This example enables [payload logging](/waf/managed-rules/payload-logging/) for matched rules of the Cloudflare Managed Ruleset, setting the public key used to encrypt the logged payload.

Building upon the rule that deploys the Cloudflare Managed Ruleset, the following rule configuration adds the `matched_data` object with the public key used to encrypt the payload:

```tf
---
highlight: 9-11
---
  # (...)

  # Execute Cloudflare Managed Ruleset
  rules {
    action = "execute"
    action_parameters {
      id = "efb7b8c949ac4650a09736fc376e9aee"
      version = "latest"
      matched_data {
         public_key = "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="
      }
    }
    expression = "true"
    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"
    enabled = true
  }

  # (...)
```

## Configure the OWASP paranoia level, score threshold, and action

The OWASP Managed Ruleset supports the following configurations:

* Enable all the rules up to a specific paranoia level by creating tag overrides that disable all the rules associated with higher paranoia levels.

* Set the action to perform when the calculated threat score is greater than the score threshold by creating a rule override for the last rule in the Cloudflare OWASP Core Ruleset (rule with ID `6179ae15870a4bb7b2d480d4843b323c`), and including the `action` property.

* Set the score threshold by creating a rule override for the last rule in the Cloudflare OWASP Core Ruleset (rule with ID `6179ae15870a4bb7b2d480d4843b323c`), and including the `score_threshold` property.

For more information on the available configuration values, refer to the [Cloudflare OWASP Core Ruleset](/waf/managed-rules/reference/owasp-core-ruleset/) page in the WAF documentation.

The following example rule of a `cloudflare_ruleset` Terraform resource performs the following configuration:

* Deploys the OWASP Managed Ruleset.
* Sets the OWASP paranoia level to _PL2_.
* Sets the score threshold to `60` (_Low_).
* Sets the ruleset action to `log`.

```tf
---
highlight: 8-25
---
  # (...)

  # Execute Cloudflare OWASP Core Ruleset
  rules {
    action = "execute"
    action_parameters {
      id = "4814384a9e5d4991b9815dcfc25d2f1f"
      overrides {
        # By default, all PL1 to PL4 rules are enabled.
        # Set the paranoia level to PL2 by disabling rules with
        # tags "paranoia-level-3" and "paranoia-level-4".
        categories {
          category = "paranoia-level-3"
          status = "disabled"
        }
        categories {
          category = "paranoia-level-4"
          status = "disabled"
        }
        rules {
          id = "6179ae15870a4bb7b2d480d4843b323c"
          action = "log"
          score_threshold = 60
        }
      }
    }
    expression = "true"
    description = "zone"
    enabled = true
  }

  # (...)
```
