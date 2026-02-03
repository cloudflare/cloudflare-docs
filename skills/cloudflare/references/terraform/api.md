# Terraform Data Sources Reference

Query existing Cloudflare resources to reference in your configurations.

## Zone Data Sources

```hcl
# Get zone by name
data "cloudflare_zone" "example" {
  name = "example.com"
}

# Use in resources
resource "cloudflare_dns_record" "www" {
  zone_id = data.cloudflare_zone.example.id
  name = "www"
  # ...
}
```

## Account Data Sources

```hcl
# List all accounts
data "cloudflare_accounts" "main" {
  name = "My Account"
}

# Use account ID
resource "cloudflare_worker_script" "api" {
  account_id = data.cloudflare_accounts.main.accounts[0].id
  # ...
}
```

## Worker Data Sources

```hcl
# Get existing worker script
data "cloudflare_worker_script" "existing" {
  account_id = var.account_id
  name = "existing-worker"
}

# Reference in service bindings
resource "cloudflare_worker_script" "consumer" {
  service_binding {
    name = "UPSTREAM"
    service = data.cloudflare_worker_script.existing.name
  }
}
```

## KV Data Sources

```hcl
# Get KV namespace
data "cloudflare_workers_kv_namespace" "existing" {
  account_id = var.account_id
  namespace_id = "abc123"
}

# Use in worker binding
resource "cloudflare_worker_script" "api" {
  kv_namespace_binding {
    name = "KV"
    namespace_id = data.cloudflare_workers_kv_namespace.existing.id
  }
}
```

## IP Ranges Data Source

```hcl
# Get Cloudflare IP ranges (for firewall rules)
data "cloudflare_ip_ranges" "cloudflare" {}

output "ipv4_cidrs" {
  value = data.cloudflare_ip_ranges.cloudflare.ipv4_cidr_blocks
}

output "ipv6_cidrs" {
  value = data.cloudflare_ip_ranges.cloudflare.ipv6_cidr_blocks
}

# Use in security group rules (AWS example)
resource "aws_security_group_rule" "allow_cloudflare" {
  type = "ingress"
  from_port = 443
  to_port = 443
  protocol = "tcp"
  cidr_blocks = data.cloudflare_ip_ranges.cloudflare.ipv4_cidr_blocks
  security_group_id = aws_security_group.web.id
}
```

## Common Patterns

### Import Existing Resources

```bash
# Find zone ID in dashboard
terraform import cloudflare_zone.example <zone-id>

# Import DNS record
terraform import cloudflare_dns_record.example <zone-id>/<record-id>

# Import worker script
terraform import cloudflare_worker_script.api <account-id>/<script-name>

# Import KV namespace
terraform import cloudflare_workers_kv_namespace.cache <account-id>/<namespace-id>
```

### Reference Across Modules

```hcl
# modules/worker/main.tf
data "cloudflare_zone" "main" {
  name = var.domain
}

resource "cloudflare_worker_route" "api" {
  zone_id = data.cloudflare_zone.main.id
  pattern = "api.${var.domain}/*"
  script_name = cloudflare_worker_script.api.name
}
```

### Output Important Values

```hcl
output "zone_id" {
  value = cloudflare_zone.main.id
  description = "Zone ID for DNS management"
}

output "worker_url" {
  value = "https://${cloudflare_worker_domain.api.hostname}"
  description = "Worker API endpoint"
}

output "kv_namespace_id" {
  value = cloudflare_workers_kv_namespace.app.id
  sensitive = false
}

output "name_servers" {
  value = cloudflare_zone.main.name_servers
  description = "Name servers for domain registration"
}
```

## See Also

- [README](./README.md) - Provider setup
- [Configuration Reference](./configuration.md) - All resource types
- [Patterns](./patterns.md) - Architecture patterns
- [Troubleshooting](./gotchas.md) - Common issues
