## Configuration Management

### Infrastructure as Code (Terraform)

```hcl
# terraform/argo.tf
# Note: Use Cloudflare Terraform provider

resource "cloudflare_argo" "example" {
  zone_id        = var.zone_id
  smart_routing  = "on"
  tiered_caching = "on"
}

variable "zone_id" {
  description = "Cloudflare Zone ID"
  type        = string
}

output "argo_enabled" {
  value       = cloudflare_argo.example.smart_routing
  description = "Argo Smart Routing status"
}
```

### Environment-Based Configuration

```typescript
// config/argo.ts
interface ArgoEnvironmentConfig {
  enabled: boolean;
  tieredCache: boolean;
  monitoring: {
    usageAlerts: boolean;
    threshold: number;
  };
}

const configs: Record<string, ArgoEnvironmentConfig> = {
  production: {
    enabled: true,
    tieredCache: true,
    monitoring: {
      usageAlerts: true,
      threshold: 1000, // GB
    },
  },
  staging: {
    enabled: true,
    tieredCache: false,
    monitoring: {
      usageAlerts: false,
      th