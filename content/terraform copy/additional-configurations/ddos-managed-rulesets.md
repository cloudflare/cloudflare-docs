---
title: DDoS managed rulesets
pcx_content_type: how-to
weight: 3
meta:
  title: Configure DDoS managed rulesets with Terraform
---

# Configure DDoS managed rulesets

This page provides examples of configuring DDoS managed rulesets in your zone or account using Terraform. It covers the following configurations:

* [Configure HTTP DDoS Attack Protection](#configure-http-ddos-attack-protection)
* [Configure Network-layer DDoS Attack Protection](#configure-network-layer-ddos-attack-protection)

DDoS managed rulesets are always enabled. Depending on your Cloudflare services, you may be able to adjust their behavior.

For more information on DDoS managed rulesets, refer to [Managed rulesets](/ddos-protection/managed-rulesets/) in the Cloudflare DDoS Protection documentation. For more information on deploying and configuring rulesets using the Rulesets API, refer to [Work with managed rulesets](/ruleset-engine/managed-rulesets/) in the Ruleset Engine documentation.

## Before you start

### Obtain the necessary account, zone, and managed ruleset IDs

{{<render file="_find-ids-managed-rulesets.md">}}

### (Optional) Delete existing rulesets to start from scratch

{{<render file="_import-delete-existing-rulesets.md">}}

---

## Configure HTTP DDoS Attack Protection

This example configures HTTP DDoS Attack Protection for a zone using Terraform, changing the sensitivity level of rule with ID `fdfdac75430c4c47a959592f0aa5e68a` to `low`.

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

## Configure Network-layer DDoS Attack Protection

This example configures Network-layer DDoS Attack Protection for an account using Terraform, changing the sensitivity level of rule with ID `599dab0942ff4898ac1b7797e954e98b` to `low` using an override.

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
