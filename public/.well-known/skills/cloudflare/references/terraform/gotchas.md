# Terraform Troubleshooting & Best Practices

Common issues, security considerations, and best practices.

## Common Errors

### "Error: couldn't find resource"

**Cause**: Resource deleted outside Terraform  
**Solution**:
```bash
terraform import cloudflare_zone.example <zone-id>
# Or remove from state:
terraform state rm cloudflare_zone.example
```

### "409 Conflict" on worker deployment

**Cause**: Worker deployed by both Terraform and wrangler  
**Solution**: Choose one deployment method. If using Terraform, remove wrangler deployments.

### DNS record already exists

**Cause**: Existing record not imported into Terraform  
**Solution**:
```bash
# Find record ID in Cloudflare dashboard
terraform import cloudflare_dns_record.example <zone-id>/<record-id>
```

### "Invalid provider configuration"

**Cause**: API token missing or invalid  
**Solution**:
```bash
export CLOUDFLARE_API_TOKEN="your-token"
# Or check token permissions in dashboard
```

### State locking errors

**Cause**: Multiple Terraform runs or stale lock  
**Solution**:
```bash
# Remove stale lock (with caution!)
terraform force-unlock <lock-id>
```

## Best Practices

### 1. Resource Naming

```hcl
# Good: Consistent naming with environment
locals { env_prefix = "${var.environment}-${var.project_name}" }

resource "cloudflare_worker_script" "api" { name = "${local.env_prefix}-api" }
resource "cloudflare_workers_kv_namespace" "cache" { title = "${local.env_prefix}-cache" }
```

### 2. Output Important Values

```hcl
output "zone_id" { value = cloudflare_zone.main.id; description = "Zone ID for DNS management" }
output "worker_url" { value = "https://${cloudflare_worker_domain.api.hostname}"; description = "Worker API endpoint" }
output "kv_namespace_id" { value = cloudflare_workers_kv_namespace.app.id; sensitive = false }
```

### 3. Use Data Sources for Existing Resources

```hcl
# Reference existing zone
data "cloudflare_zone" "main" { name = var.domain }

# Reference existing account
data "cloudflare_accounts" "main" { name = var.account_name }

# Use in resources
resource "cloudflare_worker_route" "api" {
  zone_id = data.cloudflare_zone.main.id
  # ...
}
```

### 4. Separate Secrets from Code

```hcl
# variables.tf
variable "cloudflare_api_token" {
  type = string; sensitive = true; description = "Cloudflare API token"
}

# terraform.tfvars (gitignored)
cloudflare_api_token = "actual-token-here"

# Or use environment variables
# export TF_VAR_cloudflare_api_token="actual-token-here"
```

### 5. Use Separate Directories per Environment (RECOMMENDED)

```
environments/
  production/    # Separate state, separate vars
  staging/
  development/
```

Better than workspaces for isolation and clarity.

### 6. Version Control State Locking

```hcl
# S3 backend with DynamoDB locking
terraform {
  backend "s3" {
    bucket = "terraform-state"; key = "cloudflare/terraform.tfstate"; region = "us-east-1"
    dynamodb_table = "terraform-locks"; encrypt = true
  }
}
```

## Security Considerations

1. **Never commit secrets**: Use variables + environment vars or secret management tools
2. **Scope API tokens**: Create tokens with minimal required permissions
3. **Enable state encryption**: Use encrypted S3 backend or Terraform Cloud
4. **Use separate tokens per environment**: Different tokens for prod/staging
5. **Rotate tokens regularly**: Update tokens in CI/CD systems
6. **Review terraform plans**: Always review before applying
7. **Use Access for sensitive applications**: Don't expose admin panels publicly

## Common Commands Reference

```bash
terraform init                    # Initialize provider
terraform plan                    # Plan changes
terraform apply                   # Apply changes
terraform apply -auto-approve     # Apply without confirmation
terraform destroy                 # Destroy resources
terraform import cloudflare_zone.example <zone-id>  # Import existing
terraform show                    # Show current state
terraform state list              # List resources in state
terraform state rm cloudflare_zone.example  # Remove from state (no destroy)
terraform refresh                 # Refresh state from infrastructure
terraform fmt -recursive          # Format code
terraform validate                # Validate configuration
terraform output                  # Show outputs
terraform output zone_id          # Show specific output
```

## Workspace Management

```bash
# Create workspace
terraform workspace new production

# List workspaces
terraform workspace list

# Switch workspace
terraform workspace select staging

# Note: Separate directories recommended over workspaces for production
```

## State Management

```bash
# List state resources
terraform state list

# Show resource details
terraform state show cloudflare_zone.example

# Move resource in state
terraform state mv cloudflare_zone.old cloudflare_zone.new

# Remove from state (no destroy)
terraform state rm cloudflare_zone.example

# Pull state to local file
terraform state pull > terraform.tfstate.backup

# Push state from local file
terraform state push terraform.tfstate
```

## Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| API token rate limit | Varies by plan | Use `api_client_logging = true` to debug
| Worker script size | 10 MB | Includes all dependencies
| KV keys per namespace | Unlimited | Pay per operation
| R2 storage | Unlimited | Pay per GB
| D1 databases | 50,000 per account | Free tier: 10
| Pages projects | 500 per account | 100 for free accounts
| DNS records | 3,500 per zone | Free plan

## See Also

- [README](./README.md) - Provider setup
- [Configuration](./configuration.md) - Resources
- [API](./api.md) - Data sources
- [Patterns](./patterns.md) - Use cases
- Provider docs: https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs
