---
_build:
  publishResources: false
  render: never
  list: never
---


You will need to declare the [providers](https://registry.terraform.io/browse/providers) used to provision the infrastructure.

1. In your configuration directory, create a `.tf` file:

    ```sh
    $ touch providers.tf
    ```

2. Add the following providers to `providers.tf`. The `random` provider is used to generate a tunnel secret.

    ```txt
    ---
    filename: providers.tf
    ---
    terraform {
      required_providers {
        cloudflare = {
          source = "cloudflare/cloudflare"
        }
        google = {
          source = "hashicorp/google"
        }
        random = {
          source = "hashicorp/random"
        }
      }
      required_version = ">= 0.13"
    }

    # Providers
    provider "cloudflare" {
      api_token    = var.cloudflare_token
    }
    provider "google" {
      project    = var.gcp_project_id
    }
    provider "random" {
    }
    ```