---
title: Terraform
pcx_content_type: configuration
---

# Configure R2 with Terraform

This example shows how to configure R2 with Terraform using the [Cloudflare provider](https://github.com/cloudflare/terraform-provider-cloudflare). For more advanced use cases, see [Terraform (Advanced)](./terraform-advanced.md).

With [`terraform`](https://developer.hashicorp.com/terraform/downloads) installed, create `main.tf` and copy the content below replacing with your API Token.

```hcl
terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}

provider "cloudflare" {
  api_token = "<YOUR_API_TOKEN>"
}

resource "aws_s3_bucket" "cloudflare-bucket" {
  bucket = "my-tf-test-bucket"
}
```

You can then use `terraform plan` to view the changes and `terraform apply` to apply changes.
