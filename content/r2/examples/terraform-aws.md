---
title: Terraform (AWS)
pcx_content_type: configuration
---

# Configure R2 with Terraform 

{{<render file="_keys.md">}}<br>

This example shows how to configure R2 with Terraform using the [AWS provider](https://github.com/hashicorp/terraform-provider-aws).

{{<Aside type="note" header="Note for using AWS provider">}}

For using only the Cloudflare provider, see [Terraform](/r2/examples/terraform/).

{{</Aside>}}

With [`terraform`](https://developer.hashicorp.com/terraform/downloads) installed, create `main.tf` and copy the content below replacing with your Account ID and R2 credentials.

```hcl
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5"
    }
  }
}

provider "aws" {
  region = "us-east-1"

  access_key = <R2 Access Key>
  secret_key = <R2 Secret Key>

  skip_credentials_validation = true
  skip_region_validation      = true
  skip_requesting_account_id  = true

  endpoints {
    s3 = "https://<account id>.r2.cloudflarestorage.com"
  }
}

resource "aws_s3_bucket" "default" {
  bucket = "<org>-test"
}

resource "aws_s3_bucket_cors_configuration" "default" {
  bucket   = aws_s3_bucket.default.id

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "default" {
  bucket = aws_s3_bucket.default.id

  rule {
    id     = "expire-bucket"
    status = "Enabled"
    expiration {
      days = 1
    }
  }

  rule {
    id     = "abort-multipart-upload"
    status = "Enabled"
    abort_incomplete_multipart_upload {
      days_after_initiation = 1
    }
  }
}
```

You can then use `terraform plan` to view the changes and `terraform apply` to apply changes.
