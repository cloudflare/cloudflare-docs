---
_build:
  publishResources: false
  render: never
  list: never
---

You will need to declare the [providers](https://registry.terraform.io/browse/providers) used to provision the infrastructure.

1. In your `gcp_tunnel` directory, create a `.tf` file:

    ```sh
    $ touch providers.tf
    ```

2. Open the file in a text editor and copy and paste the following providers. The `random` provider is used to generate a tunnel secret.

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

3. Save the file.