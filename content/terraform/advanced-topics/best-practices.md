---
pcx_content_type: configuration
title: Best practices
---

# Best practices

Though all Terraform deployments are unique, follow these best practices to set yourself up for success.

## Manage Terraform resources in Terraform

Terraform works best when it manages all changes to and the lifecycle of a resource.

After any operation on the configuration, Terraform attempts to reconcile the differences by syncing the remote into the local state. If there are differences in the local and remote - caused by managing resources outside of Terraform - you may need to delete and recreate the resource in the state file (usually via importing) as not all resources support in-place updates.

## Directory structure

Cloudflare recommends using a directory structure that relies on a combination of accounts, zones, and products for isolating changes. This setup lets you have fine-grained owners and scoped Terraform operations to a specific product in a zone. It also more closely aligns owners with Cloudflare's [default roles](/fundamentals/account-and-billing/members/roles/), as well as additional tools like AWS or GCP storage by permissioning separate state files.

For products that encompass many responsibilities such as Rulesets, you can extend this even further by partitioning at the phase level (WAF, redirects, origin rules).

```txt
example-tf/
├── demo_account_a                  # per account segregation of resources
│   ├── users                       # top level directory for account members as they are "zoneless"
│   │   ├── provider.tf             # `provider.tf` is for configuring the providers
│   │   ├── users.tf                # `<subject>.tf` (users.tf) is for managing the individual resources
│   │   └── vars.tf                 # manage all variables for this component
│   ├── zone_a                      # group all zone based features together
│   │   ├── dns                     # individual (or grouped, your choice) of products or features to manage together
│   │   │   ├── dns.tf              # `<subject>.tf` (dns.tf) is for managing the individual resources
│   │   │   ├── provider.tf         # `provider.tf` is for configuring the providers
│   │   │   └── vars.tf             # manage all variables for this component
│   │   └── page_rules              # ... same as above but for page rules
│   │       ├── page_rules.tf
│   │       ├── provider.tf
│   │       └── vars.tf
│   ├── zone_b
│   │   ├── dns
│   │   │   ├── dns.tf
│   │   │   ├── provider.tf
│   │   │   └── vars.tf
│   │   └── page_rules
│   │       ├── page_rules.tf
│   │       ├── provider.tf
│   │       └── vars.tf
│   └── zone_c
│       ├── dns
│       │   ├── dns.tf
│       │   ├── provider.tf
│       │   └── vars.tf
│       └── page_rules
│           ├── page_rules.tf
│           ├── provider.tf
│           └── vars.tf
└── demo_account_b
    ├── users
    │   ├── provider.tf
    │   ├── users.tf
    │   └── vars.tf
    ├── zone_a
    │   ├── dns
    │   │   ├── dns.tf
    │   │   ├── provider.tf
    │   │   └── vars.tf
    │   └── page_rules
    │       ├── page_rules.tf
    │       ├── provider.tf
    │       └── vars.tf
    ├── zone_b
    │   ├── dns
    │   │   ├── dns.tf
    │   │   ├── provider.tf
    │   │   └── vars.tf
    │   └── page_rules
    │       ├── page_rules.tf
    │       ├── provider.tf
    │       └── vars.tf
    └── zone_c
        ├── dns
        │   ├── dns.tf
        │   ├── provider.tf
        │   └── vars.tf
        └── page_rules
            ├── page_rules.tf
            ├── provider.tf
            └── vars.tf
```

## Avoid modules (or use them sparingly)

Terraform modules are ways of encapsulating multiple resources with logic in an abstracted interface. Consider the example where a module sets up up default load balancer with a pool, some DNS entries, and perhaps a page rule. The end user may use it like this:

```hcl
module "example" "an_example_site" {
  domain = "example.com"
  origin_ip = "192.168.0.1"
}
```

In terms of Terraform resources, however, the above example would be translated to:

```hcl
resource "cloudflare_record" "example_1" {
  zone_id = var.cloudflare_zone_id
  name    = "terraform"
  value   = "198.51.100.11"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "example_2" {
  zone_id = var.cloudflare_zone_id
  name    = "terraform"
  value   = "198.51.100.12"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_record" "example_3" {
  zone_id = var.cloudflare_zone_id
  name    = "terraform"
  value   = "198.51.100.13"
  type    = "A"
  ttl     = 3600
}

resource "cloudflare_load_balancer" "bar" {
  zone_id          = var.cloudflare_zone_id
  name             = "example-load-balancer.example.com"
  fallback_pool_id = cloudflare_load_balancer_pool.foo.id
  default_pool_ids = [cloudflare_load_balancer_pool.foo.id]
  description      = "example load balancer using geo-balancing"
  proxied          = true
  steering_policy  = "geo"

  pop_pools {
    pop      = "LAX"
    pool_ids = [cloudflare_load_balancer_pool.foo.id]
  }

  country_pools {
    country  = "US"
    pool_ids = [cloudflare_load_balancer_pool.foo.id]
  }

  region_pools {
    region   = "WNAM"
    pool_ids = [cloudflare_load_balancer_pool.foo.id]
  }

  rules {
    name      = "example rule"
    condition = "http.request.uri.path contains \"testing\""
    fixed_response {
      message_body = "hello"
      status_code  = 200
      content_type = "html"
      location     = "www.example.com"
    }
  }
}

resource "cloudflare_load_balancer_pool" "example_lb_pool" {
  name = "example-lb-pool"
  origins {
    name    = "example-1"
    address = "198.51.100.1"
    enabled = true
  }
}

resource "cloudflare_page_rule" "example_page_rule" {
  zone_id = var.cloudflare_zone_id
  target = "sub.${var.cloudflare_zone}/page"
  priority = 1

  actions {
    ssl = "flexible"
    email_obfuscation = "on"
    minify {
      html = "off"
      css  = "on"
      js   = "on"
    }
  }
}
```

While convenient, this setup can cause unanticipated issues. If this module is shared and then changes internally, the module may have resources out of sync or recreated. 

Using modules also increases the difficulty of debugging or reproducing issues as you must then factor in potential logic bugs outside of Terraform core and the Cloudflare provider.

{{<Aside type="warning">}}

This advice also applies to [Terraform dynamic blocks](https://www.terraform.io/language/expressions/dynamic-blocks) that allow you to do logic in your HCL. Since these dynamic blocks are always evaluated, you can get yourself into situations where you have logic bugs in your configuration (and making the end result unreproducible).

{{</Aside>}}

## Migrate resources into Terraform

Cloudflare recommends using [`cf-terraforming`](/terraform/advanced-topics/import-cloudflare-resources/) to migrate existing resources into Cloudflare.

## Manage some resources outside of Terraform

It is perfectly fine to manage some resources inside Terraform and others using a different tool, but make sure you are not [doing both for the same resource](#manage-terraform-resources-in-terraform).

## Use separate environments

To safely manage separate environments (staging, QA, UAT, production), use separate Cloudflare accounts with separate domains (such as `example.com` and `example-staging.com`).

This is because some products defined at the account level are shared (such as Load Balancer monitors and pools) and you cannot make an isolated change to them if they are in the same account. Using separate accounts is also beneficial if you intend to test things like DNSSEC, which may affect your entire domain if configured incorrectly.

To minimize drift, use Terraform and a CI/CD pipeline that runs across both domains to keep them in sync as needed.

## Store credentials safely

We do not recommend storing Cloudflare credentials as plaintext.

Locally, you can use a third-party tool like [cf-vault](https://github.com/jacobbednarz/cf-vault/) to store your Cloudflare credentials.

For CI pipelines, use an internal or secret storage tool (such as [Vault](https://www.hashicorp.com/products/vault/secrets-management)).
