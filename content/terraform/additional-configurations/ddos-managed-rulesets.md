---
title: Configure DDoS Managed Rulesets
pcx_content_type: how-to
weight: 3
meta:
  title: Configure DDoS Managed Rulesets with Terraform
layout: list
---

# Configure DDoS Managed Rulesets

This page provides examples of configuring DDoS Managed Rulesets in your zone or account using Terraform. It covers the following configurations:

* [Configure HTTP DDoS Attack Protection](#configure-http-ddos-attack-protection)
* [Configure Network-layer DDoS Attack Protection](#configure-network-layer-ddos-attack-protection)

DDoS Managed Rulesets are always enabled. Depending on your Cloudflare services, you may be able to adjust their behavior.

For more information on DDoS Managed Rulesets, refer to [Managed Rulesets](/ddos-protection/managed-rulesets/) in the Cloudflare DDoS Protection documentation. For more information on deploying and configuring rulesets using the Rulesets API, refer to [Work with Managed Rulesets](/ruleset-engine/managed-rulesets/) in the Ruleset Engine documentation.

## Before you start

### Delete any existing rulesets before using Terraform

{{<render file="_delete-existing-rulesets.md">}}

### Obtain the necessary account, zone, and Managed Ruleset IDs

The Terraform configurations provided in this page need the zone ID (or account ID) of the zone/account where you will deploy DDoS Managed Rulesets.

* To retrieve the list of accounts you have access to, including their IDs, use the [List accounts](https://api.cloudflare.com/#accounts-list-accounts) API operation.
* To retrieve the list of zones you have access to, including their IDs, use the [List zones](https://api.cloudflare.com/#zone-list-zones) API operation.

The deployment of DDoS Managed Rulesets via Terraform requires that you use the ruleset IDs. To find the IDs of DDoS Managed Rulesets, use the [List account rulesets](https://api.cloudflare.com/#account-rulesets-list-account-rulesets) API operation. The response will include the description and IDs of the existing DDoS Managed Rulesets.

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
    description = "Override the HTTP DDoS Attack Protection Managed Ruleset"
    enabled = true
  }
}
```

For more information about HTTP DDoS Attack Protection, refer to [HTTP DDoS Attack Protection Managed Ruleset](/ddos-protection/managed-rulesets/http/).

## Configure Network-layer DDoS Attack Protection

This example configures Network-layer DDoS Attack Protection for an account using Terraform, changing the sensitivity level of rule with ID `599dab0942ff4898ac1b7797e954e98b` to `low` using an override.

{{<Aside type="warning" header="Important">}}
* Only Magic Transit and Spectrum customers on an Enterprise plan can configure this Managed Ruleset using overrides.
* This Managed Ruleset only supports overrides at the account level.
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
    description = "Override the HTTP DDoS Attack Protection Managed Ruleset"
    enabled = true
  }
}
```

For more information about Network-layer DDoS Attack Protection, refer to [Network-layer DDoS Attack Protection Managed Ruleset](/ddos-protection/managed-rulesets/network/).
