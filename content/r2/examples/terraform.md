---
title: Terraform
pcx_content_type: configuration
---

# Configure R2 with Terraform

{{<render file="_keys.md">}}<br>

This example shows how to configure R2 with Terraform using the [Cloudflare provider](https://github.com/cloudflare/terraform-provider-cloudflare).The For more advanced use cases, see.

{{<Aside type="note" header="Note for using AWS provider">}}

When using the Cloudflare Terraform provider, you are only able to manage buckets. For configuring items such as CORS and lifecycle, you will need to use the [AWS Provider](/r2/examples/terraform-aws/).

{{</Aside>}}

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
