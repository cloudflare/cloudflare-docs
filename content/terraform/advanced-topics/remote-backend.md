---
pcx_content_type: reference
title: Remote R2 backend
---

# Remote R2 backend

[Cloudflare R2](/r2/) and [Terraform remote backends](https://developer.hashicorp.com/terraform/language/settings/backends/remote) can interact with each other to provide a seamless experience for Terraform state management. 

Cloudflare R2 is an object storage service that provides a highly available, scalable, and secure way to store and serve static assets, such as images, videos, and static websites. R2 has [S3 API compatibility](/r2/api/s3/api/) making it easy to integrate with existing cloud infrastructure and applications.

## Prerequisites

### Create R2 bucket

Using [Wrangler](/workers/wrangler/install-and-update/), [API](/api/operations/r2-create-bucket) or [Account View Dashboard](https://dash.cloudflare.com/?to=/:account/r2/new) create an [R2 Bucket](/r2/buckets/create-buckets/).
{{<render file="_create-r2-buckets.md">}}

{{<Aside type="note">}}
Bucket names can only contain lowercase letters (a-z), numbers (0-9), and hyphens (-). 
{{</Aside>}}

### Create scoped bucket API keys

Next you  will need to create a [bucket scoped R2 API token](/r2/api/s3/tokens/) with `Object Read & Write` permissions, to create an API token use the below workflow.

1. In **Account Home**, select **R2**.
2. Under **Account details**, select **Manage R2 API tokens**.
3. Select [**Create API token**](https://dash.cloudflare.com/?to=/:account/r2/api-tokens).
4. Select the **R2 Token** text to edit your API token name.
5. Under **Permissions**, select the **Object Read and Write** permissions, then scope your token to your `your-tfstate-bucket-name` bucket.
6. Select **Create API Token**.

After your token has been successfully created, review your **Secret Access Key** and **Access Key ID** values.

## Defining R2 backend

Update your [cloudflare.tf](/terraform/tutorial/initialize-terraform/), to include a [backend](https://developer.hashicorp.com/terraform/language/settings/backends/configuration) for the `your-tfstate-bucket-name` bucket you created above.


```json
terraform {
  backend "s3" {
    bucket = "<YOUR_BUCKET_NAME>"
    key    = "/some/key/terraform.tfstate"
    region                      = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
    use_path_style              = true
    access_key = "<YOUR_R2_ACCESS_KEY>"
    secret_key = "<YOUR_R2_ACCESS_SECRET>"
    endpoints = { s3 = "https://<YOUR_ACCOUNT_ID>.r2.cloudflarestorage.com" }
  }
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}
provider "cloudflare" {
  # token pulled from $CLOUDFLARE_API_TOKEN
}
variable "account_id" { default = "<YOUR_ACCOUNT_ID>" }
```

## Migrate state file to R2 backend

After updating your `cloudflare.tf` you can issue the `terraform init -reconfigure` command to migrate from a local state to [remote state](https://developer.hashicorp.com/terraform/language/state/remote).