---
pcx_content_type: how-to
title: Terraform
weight: 10
---

# Manage Turnstile with Terraform

| Requirements                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Terraform](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli) installed on your machine |
| The [Cloudflare provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) properly configured                 |

[Terraform](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli) is a tool for building, changing, and versioning infrastructure, and provides components and documentation for building [Cloudflare resources](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs). Listed below are examples to help you get started with Turnstile using Terraform. For a more generalized guide on configuring Cloudflare and Terraform, visit our [Getting Started with Terraform and Cloudflare](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/) blog post.

## Create a Turnstile widget with Terraform

1.  Create an [API Token](/fundamentals/api/get-started/create-token/), with the **Account > Turnstile > Edit** permission. Next, we need to export this secret in our environment variables:

    ```sh
    $ export CLOUDFLARE_API_TOKEN=<YOUR_API_TOKEN>
    ```

2.  Create a Turnstile widget.

    Here is an example configuration:

    ```tf
    ---
    header: cloudflare.tf
    highlight: [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
    ---
    terraform {
        required_providers {
            cloudflare = {
                source = "cloudflare/cloudflare"
                version = "~> 4"
            }
        }
    }

    provider "cloudflare" {}

    variable "account_id" {
        default = <YOUR_CLOUDFLARE_ACCOUNT_ID> # eg: "6be2041a37d48aaaa9c686434f1709f0"
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
    }

    output "turnstile_example_secretkey" {
        description = "Secret key"
        value       = cloudflare_turnstile_widget.example.secret
        sensitive   = true
    }
    ```

3.  Now we can run a `terraform plan` which will output any proposed changes. Make sure to review the plan carefully:

    ```sh
    $ terraform plan

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

4.  Apply these changes using the `apply` command, once they look accurate and you're comfortable moving forward:

    ```sh
    $ terraform apply --auto-approve

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

5.  Use `terraform output` to get the secret key:

    ```sh
    $ terraform output turnstile_example_secretkey
    "0x4AAAAAAAEe4xWueFq9yX8ypjlimbk1Db4"
    ```


These are the basics to get up and running with Turnstile and Terraform. Refer to our [Terraform resource documentation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/turnstile_widget) for advanced usage.
