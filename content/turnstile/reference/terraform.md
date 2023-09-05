---
pcx_content_type: how-to
title: Terraform
weight: 10
---

# Manage Turnstile with Terraform

{{<Aside type="note"header="Requirements">}}
This guide assumes that you have the [Terraform](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli) command installed on your machine.
{{</Aside>}}

[Terraform](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli) is a tool for building, changing, and versioning infrastructure, and provides components and documentation for building [Cloudflare resources](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs). Listed below are examples to help you get started with Turnstile using Terraform. For a more generalized guide on configuring Cloudflare and Terraform, visit our [Getting Started with Terraform and Cloudflare](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/) blog post.

## Create a Turnstile widget with Terraform

### Create an API token

Create an [API Token](/fundamentals/api/get-started/create-token/) with the **Account > Turnstile > Edit** permission. Next, you need to export this secret in our environment variables:

```sh
$ export CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN>
```

### Create a Turnstile widget

Example configuration:

```tf
---
header: cloudflare.tf
highlight: 15-32
---
terraform {
    required_providers {
        cloudflare = {
            source = "cloudflare/cloudflare"
            version = "~> 4"
        }
    }
}

variable "account_id" {
    description = "Your Cloudflare Account ID."
    # eg: 6be2041a37d48aaaa9c686434f1709f0
}

resource "cloudflare_turnstile_widget" "example" {
    account_id   = var.account_id
    name         = "My Terraform-managed widget"
    domains      = ["example.com"]
    mode         = "managed"
}

output "turnstile_example_sitekey" {
    description = "Sitekey"
    value       = cloudflare_turnstile_widget.example.id
    # Note: the `id` is your sitekey.
}

output "turnstile_example_secretkey" {
    description = "Secret key"
    value       = cloudflare_turnstile_widget.example.secret
    sensitive   = true
}

```

{{<Aside type="note">}}
The `id` field in the `cloudflare_turnstile_widget.example` resource is your Turnstile widget's sitekey.
{{</Aside>}}

### Initialize Terraform and the Cloudflare provider

Run the command `terraform init` to set up your Terraform working directory, enabling it to interact with Cloudflare services. This process involves downloading the required provider plugins, establishing backend storage for your state files, and creating a local `.terraform` directory to store configuration data.

```sh
$ terraform init

Initializing the backend...

Initializing provider plugins...
- Reusing previous version of cloudflare/cloudflare from the dependency lock file
- Installing cloudflare/cloudflare v4.5.0...
- Installed cloudflare/cloudflare v4.5.0 (self-signed, key ID C76001609EE3B136)

Partner and community providers are signed by their developers.
If you'd like to know more about provider signing, you can read about it here:
https://www.terraform.io/docs/cli/plugins/signing.html

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

### Review the Terraform plan

You can run `terraform plan`, which will output any proposed changes. This will prompt you for your Cloudflare Account ID. Make sure to review the plan carefully:

```sh
$ terraform plan

var.account_id
    Your Cloudflare Account ID.

    Enter a value: 6be2041a37d48aaaa9c686434f1709f0

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
    + create

Terraform will perform the following actions:

    # cloudflare_turnstile_widget.example will be created
    + resource "cloudflare_turnstile_widget" "example" {
        + account_id = "6be2041a37d48aaaa9c686434f1709f0"
        + domains    = [
            + "example.com",
        ]
        + id         = (known after apply)
        + mode       = "managed"
        + name       = "My Terraform-managed widget"
        + secret     = (sensitive value)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Changes to Outputs:
    + turnstile_example_secretkey = (sensitive value)
    + turnstile_example_sitekey   = (known after apply)

───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
```

### Apply the Terraform changes

Once the changes look accurate and you are comfortable moving forward, apply them using the `terraform apply` command:

```sh
$ terraform apply --auto-approve

var.account_id
    Your Cloudflare Account ID.

    Enter a value: 6be2041a37d48aaaa9c686434f1709f0

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
    + create

Terraform will perform the following actions:

    # cloudflare_turnstile_widget.example will be created
    + resource "cloudflare_turnstile_widget" "example" {
        + account_id     = "6be2041a37d48aaaa9c686434f1709f0"
        + domains        = [
            + "example.com",
        ]
        + id             = (known after apply)
        + mode           = "managed"
        + name           = "My Terraform-managed widget"
        + secret         = (sensitive value)
    }

Plan: 1 to add, 0 to change, 0 to destroy.

Changes to Outputs:
    + turnstile_example_secretkey = (sensitive value)
    + turnstile_example_sitekey   = (known after apply)
cloudflare_turnstile_widget.example: Creating...
cloudflare_turnstile_widget.example: Creation complete after 1s [id=0x4AAAAAAAEe4wQdBshJxBeK]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

turnstile_example_secretkey = <sensitive>
turnstile_example_sitekey = "0x4AAAAAAAEe4wQdBshJxBeK"
```

You have successfuly created a Turnstile widget. Go to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/turnstile) to view its configuration and analytics in a user-friendly interface.

### Retrieve the secret key
Use `terraform output` to get your secret key:

```sh
$ terraform output turnstile_example_secretkey
"0x4AAAAAAAEe4xWueFq9yX8ypjlimbk1Db4"
```

{{<Aside type="note">}}
For advanced usage, refer to our [Terraform resource documentation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/turnstile_widget).
{{</Aside>}}
