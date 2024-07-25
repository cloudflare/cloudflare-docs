---
title: DDoS managed rulesets
pcx_content_type: how-to
weight: 3
meta:
  title: Configure DDoS managed rulesets with Terraform
---

# Configure DDoS managed rulesets

This page provides examples of configuring DDoS managed rulesets in your zone or account using Terraform. It covers the following configurations:

* [Example: Configure HTTP DDoS Attack Protection](#example-http)
* [Example: Configure Network-layer DDoS Attack Protection](#example-network)
* [Use case: Mitigate large HTTP DDoS attacks and monitor flagged traffic](#use-case-http)

DDoS managed rulesets are always enabled. Depending on your Cloudflare services, you may be able to adjust their behavior.

For more information on DDoS managed rulesets, refer to [Managed rulesets](/ddos-protection/managed-rulesets/) in the Cloudflare DDoS Protection documentation. For more information on deploying and configuring rulesets using the Rulesets API, refer to [Work with managed rulesets](/ruleset-engine/managed-rulesets/) in the Ruleset Engine documentation.

## Before you start

### Obtain the necessary account, zone, and managed ruleset IDs

{{<render file="_find-ids-managed-rulesets.md">}}

### (Optional) Delete existing rulesets to start from scratch

{{<render file="_import-delete-existing-rulesets.md">}}

---

## Example: Configure HTTP DDoS Attack Protection { #example-http }

This example configures the [HTTP DDoS Attack Protection](/ddos-protection/managed-rulesets/http/) managed ruleset for a zone using Terraform, changing the sensitivity level of rule with ID {{<rule-id>}}fdfdac75430c4c47a959592f0aa5e68a{{</rule-id>}} to `low`.

```tf
resource "cloudflare_ruleset" "zone_level_http_ddos_config" {
  zone_id     = "<ZONE_ID>"
  name        = "HTTP DDoS Attack Protection entry point ruleset"
  description = ""
  kind        = "zone"
  phase       = "ddos_l7"

  rules {
    action = "execute"
    action_parameters {
      # Cloudflare L7 DDoS Attack Protection Ruleset
      id = "4d21379b4f9f4bb088e0729962c8b3cf"
      overrides {
        rules {
          # Rule: HTTP requests with unusual HTTP headers or URI path (signature #11).
          id = "fdfdac75430c4c47a959592f0aa5e68a"
          sensitivity_level = "low"
        }
      }
    }
    expression = "true"
    description = "Override the HTTP DDoS Attack Protection managed ruleset"
    enabled = true
  }
}
```

For more information about HTTP DDoS Attack Protection, refer to [HTTP DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/http/).

## Example: Configure Network-layer DDoS Attack Protection { #example-network }

This example configures the [Network-layer DDoS Attack Protection](/ddos-protection/managed-rulesets/network/) managed ruleset for an account using Terraform, changing the sensitivity level of rule with ID {{<rule-id>}}599dab0942ff4898ac1b7797e954e98b{{</rule-id>}} to `low` using an override.

{{<Aside type="warning" header="Important">}}
* Only Magic Transit and Spectrum customers on an Enterprise plan can configure this managed ruleset using overrides.
* This managed ruleset only supports overrides at the account level.
{{</Aside>}}

```tf
resource "cloudflare_ruleset" "account_level_network_ddos_config" {
  account_id  = "<ACCOUNT_ID>"
  name        = "Network-layer DDoS Attack Protection entry point ruleset"
  description = ""
  kind        = "root"
  phase       = "ddos_l4"

  rules {
    action = "execute"
    action_parameters {
      # Cloudflare L3/4 DDoS Attack Protection Ruleset
      id = "3b64149bfa6e4220bbbc2bd6db589552"
      overrides {
        rules {
          # Rule: Generic high-volume UDP traffic flows.
          id = "599dab0942ff4898ac1b7797e954e98b"
          sensitivity_level = "low"
        }
      }
    }
    expression = "ip.dst in { 192.0.2.0/24 }"
    description = "Override the HTTP DDoS Attack Protection managed ruleset"
    enabled = true
  }
}
```

For more information about Network-layer DDoS Attack Protection, refer to [Network-layer DDoS Attack Protection managed ruleset](/ddos-protection/managed-rulesets/network/).

---

## Use case: Mitigate large HTTP DDoS attacks and monitor flagged traffic { #use-case-http }

In the following example, a customer is concerned about false positives, but wants to get protection against large HTTP DDoS attacks. The two rules, containing two overrides each, in their [HTTP DDoS protection](/ddos-protection/managed-rulesets/http/) configuration will have the following behavior:

1. Mitigate any large HTTP DDoS attacks by configuring a rule with a _Low_ [sensitivity level](/ddos-protection/managed-rulesets/http/override-parameters/#sensitivity-level) and a _Block_ action.
2. Monitor traffic being flagged by the DDoS protection system by configuring a rule with the default sensitivity level (_High_) and a _Log_ action.

The order of the rules is important: the rule with the highest sensitivity level must come after the rule with the lowest sensitivity level, otherwise it will never be evaluated.

{{<Aside type="warning" header="Important considerations">}}
* When a DDoS attack mitigation is ongoing, Cloudflare will check the rules order and apply the first one that matches both the expression and the sensitivity level. 
* Since rules are evaluated in order and the first one to match the conditions of both the expression and the sensitivity level will get applied, take care when editing and reordering existing rules. Changing a rule from Block to Log may allow attack traffic to reach your web property.
* Overrides will not affect read-only rules in the managed ruleset.
{{</Aside>}}

```tf
variable "zone_id" {
  default = "<ZONE_ID>"
}

resource "cloudflare_ruleset" "zone_level_http_ddos_config" {
  zone_id     = var.zone_id
  name        = "HTTP DDoS - Terraform managed"
  description = ""
  kind        = "zone"
  phase       = "ddos_l7"

  # The resource configuration contains two rules:
  #  1. The first rule has the lowest sensitivity level (highest threshold)
  #     and it will block attacks.
  #  2. The second rule has a higher sensitivity level (lower threshold) and
  #     will only apply a Log action.
  #
  # In practice, evaluation stops whenever a rule matches both the expression
  # and the threshold, so the rule order is important:
  #   - When the traffic rate is below the (low) threshold of the default
  #     sensitivity level ('High'), no rules match (no action is applied).
  #   - When the traffic rate is between the thresholds of the 'Low' and
  #     default ('High') sensitivity levels, the first rule does not match,
  #     but the second rule does (traffic gets logged).
  #   - When the traffic rate goes above the (high) threshold of the 'Low'
  #     sensitivity level, the first rule matches (traffic gets blocked).
  #
  # The DDoS protection systems will still apply mitigation actions to incoming
  # traffic when rates exceed the threshold of the _Essentially Off_ sensitivity
  # level.

  rules {
    description = "At the low sensitivity threshold, block the traffic"
    action = "execute"
    action_parameters {
      # Cloudflare L7 DDoS Attack Protection Ruleset
      id = "4d21379b4f9f4bb088e0729962c8b3cf"
      overrides {
        rules {
          # Rule: HTTP requests from known botnet (signature #4).
          id = "29d170ba2f004cc787b1ac272c9e04e7"
          sensitivity_level = "low"
          action = "block"
        }
        rules {
          # Rule: HTTP requests with unusual HTTP headers or URI path (signature #16).
          id = "60a48054bbcf4014ac63c44f1712a123"
          sensitivity_level = "low"
          action = "block"
        }
      }
    }
    expression = "true"
    enabled = true
  }

  rules {
    description = "At the default sensitivity threshold, log to see if any legitimate traffic gets caught"
    action = "execute"
    action_parameters {
      # Cloudflare L7 DDoS Attack Protection Ruleset
      id = "4d21379b4f9f4bb088e0729962c8b3cf"
      overrides {
        rules {
          # Rule: HTTP requests from known botnet (signature #4).
          id = "29d170ba2f004cc787b1ac272c9e04e7"
          sensitivity_level = "default"
          action = "log"
        }
        rules {
          # Rule: HTTP requests with unusual HTTP headers or URI path (signature #16).
          id = "60a48054bbcf4014ac63c44f1712a123"
          sensitivity_level = "default"
          action = "log"
        }
      }
    }
    expression = "true"
    enabled = true
  }
}
```
