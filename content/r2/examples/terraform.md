---
title: Terraform
pcx_content_type: configuration
---

# Configure R2 with Terraform

{{<render file="_keys.md">}}<br>

With [`terraform`](https://developer.hashicorp.com/terraform/downloads) installed, create `main.tf` and copy the content below replacing with your Account ID and R2 credentials.

```hcl
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.20.1"
    }
  }
}

provider "aws" {
  access_key = <R2 Access Key>
  secret_key = <R2 Secret Key>
  skip_credentials_validation = true
  skip_region_validation = true
  skip_requesting_account_id = true
  endpoints {
    s3 = "https://<account id>.r2.cloudflarestorage.com"
  }
}


resource "aws_s3_bucket" "cloudflare-bucket" {
  bucket = "my-tf-test-bucket"
}
```

You can then use `terraform plan` to view the changes and `terraform apply` to apply changes.