---
pcx_content_type: how-to
title: Terraform
weight: 7
meta:
  description: Learn how to deploy a Cloudflare Tunnel using Terraform and our lightweight server-side daemon, cloudflared.
---

# Deploy Tunnels with Terraform

[Terraform](https://www.terraform.io/) is an infrastructure as code software tool that allows you to deploy services from different providers using a standardized configuration syntax. When creating a Terraform configuration file, you define the final state of the configuration rather than the step-by-step procedure. This allows you to easily deploy, modify, and manage your Tunnels alongside your other infrastructure.

In this guide, you will use Terraform to deploy:

- A Google Cloud Project (GCP) virtual machine that runs a simple HTTP test server
- A Cloudflare Tunnel that makes the server available over the Internet
- A Cloudflare Access policy that defines who can connect to the server

## Prerequisites

To complete the following procedure, you will need:

- [A Google Cloud Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project)
- [A zone on Cloudflare](/fundamentals/get-started/setup/add-site/)

## 1. Install Terraform

Refer to the [Terraform installation guide](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli) for your operating system.

## 2. Install the gcloud CLI

1. [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install) so that Terraform can interact with your GCP account.

2. Authenticate with the CLI by running:

   ```sh
   $ gcloud auth application-default login
   ```

## 3. Create a Cloudflare API token

[Create an API token](/fundamentals/api/get-started/create-token/) so that Terraform can interact with your Cloudflare account. At minimum, your token should include the following permissions:

| Permission type | Permission                | Access level |
| --------------- | ------------------------- | ------------ |
| Account         | Cloudflare Tunnel         | Edit         |
| Account         | Access: Apps and Policies | Edit         |
| Zone            | DNS                       | Edit         |

## 4. Create a configuration directory

Terraform functions through a working directory that contains the configuration files. You can store your configuration in multiple files or just one — Terraform will evaluate all of the configuration files in the directory as if they were in a single document.

1. Create a folder for your Terraform configuration:

   ```sh
   $ mkdir gcp-tunnel
   ```

2. Change into the directory:
   ```sh
   $ cd gcp-tunnel
   ```

## 5. Create Terraform configuration files

### Define input variables

{{<render file="_terraform_input_variables.md">}}

### Assign values to the variables

{{<render file="_terraform_variable_values.md">}}

### Configure Terraform providers

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
          version = ">= 4.9.0"
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

### Configure Cloudflare resources

The following configuration will modify settings in your Cloudflare account.

1. In your configuration directory, create a `.tf` file:

   ```sh
   $ touch Cloudflare-config.tf
   ```

2. Add the following resources to `Cloudflare-config.tf`:

   ```txt
   ---
   filename: Cloudflare-config.tf
   ---
   # Generates a 35-character secret for the tunnel.
   resource "random_id" "tunnel_secret" {
     byte_length = 35
   }

   # Creates a new locally-managed tunnel for the GCP VM.
   resource "cloudflare_tunnel" "auto_tunnel" {
     account_id = var.cloudflare_account_id
     name       = "Terraform GCP tunnel"
     secret     = random_id.tunnel_secret.b64_std
   }

   # Creates the CNAME record that routes http_app.${var.cloudflare_zone} to the tunnel.
   resource "cloudflare_record" "http_app" {
     zone_id = var.cloudflare_zone_id
     name    = "http_app"
     value   = "${cloudflare_tunnel.auto_tunnel.cname}"
     type    = "CNAME"
     proxied = true
   }

   # Creates the configuration for the tunnel.
   resource "cloudflare_tunnel_config" "auto_tunnel" {
     tunnel_id = cloudflare_tunnel.auto_tunnel.id
     account_id = var.cloudflare_account_id
     config {
      ingress_rule {
        hostname = "${cloudflare_record.http_app.hostname}"
        service  = "http://httpbin:8080"
      }
      ingress_rule {
        service  = "http_status:404"
      }
     }
   }

   # Creates an Access application to control who can connect.
   resource "cloudflare_access_application" "http_app" {
     zone_id          = var.cloudflare_zone_id
     name             = "Access application for http_app.${var.cloudflare_zone}"
     domain           = "http_app.${var.cloudflare_zone}"
     session_duration = "1h"
   }

   # Creates an Access policy for the application.
   resource "cloudflare_access_policy" "http_policy" {
     application_id = cloudflare_access_application.http_app.id
     zone_id        = var.cloudflare_zone_id
     name           = "Example policy for http_app.${var.cloudflare_zone}"
     precedence     = "1"
     decision       = "allow"
     include {
       email = [var.cloudflare_email]
     }
   }
   ```

   To learn more about these resources, refer to the [Cloudflare provider documentation](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

### Configure GCP resources

The following configuration defines the specifications for the GCP virtual machine and creates a startup script to run upon boot.

1. In your configuration directory, create a `.tf` file:

   ```sh
   $ touch GCP-config.tf
   ```

2. Add the following content to `GCP-config.tf`:

   ```txt
   ---
   filename: GCP-config.tf
   ---
   # Selects the OS for the GCP VM.
   data "google_compute_image" "image" {
     family  = "ubuntu-minimal-2004-lts"
     project = "ubuntu-os-cloud"
   }

   # Sets up a GCP VM instance.
   resource "google_compute_instance" "origin" {
     name         = "test"
     machine_type = var.machine_type
     zone         = var.zone
     tags         = []
     boot_disk {
       initialize_params {
         image = data.google_compute_image.image.self_link
       }
     }

     network_interface {
       network = "default"
       access_config {
         // Ephemeral IP
       }
     }
     // Optional config to make the instance ephemeral
     scheduling {
       preemptible       = true
       automatic_restart = false
     }
     // Configures the VM to run a startup script that takes in the Terraform variables.
     metadata_startup_script = templatefile("./install-tunnel.tpl",
       {
         tunnel_token = cloudflare_tunnel.auto_tunnel.tunnel_token
       })
   }
   ```

### Create a startup script

The following script will install `cloudflared`, create a permissions and configuration file for the tunnel, and set up the tunnel to run as a service. This example also installs a lightweight HTTP application that you can use to test connectivity.

1. In your configuration directory, create a Terraform template file:

   ```sh
   $ touch install-tunnel.tftpl
   ```

2. Open the file in a text editor and copy and paste the following bash script:

    ```bash
    ---
    filename: install-tunnel.tftpl
    ---
    # Script to install Cloudflare Tunnel and Docker resources

    # Docker configuration
    cd /tmp
    sudo apt-get install software-properties-common
    # Retrieving the docker repository for this OS
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
    # The OS is updated and docker is installed
    sudo apt update -y && sudo apt upgrade -y
    sudo apt install docker docker-compose -y
    # Add the HTTPBin application and run it on localhost:8080.
    cat > /tmp/docker-compose.yml << "EOF"
    version: '3'
    services:
      httpbin:
        image: kennethreitz/httpbin
        restart: always
        container_name: httpbin

      cloudflared:
        image: cloudflare/cloudflared:latest
        restart: always
        container_name: cloudflared
        command: tunnel run --token ${tunnel_token} 
    EOF
    cd /tmp
    sudo docker-compose up -d
    ```

## 6. Deploy Terraform

Once the configuration files are created, they can be deployed.

1. Initialize your configuration directory:

   ```sh
   $ terraform init
   ```

   This will set up the directory so that your infrastructure can be deployed.

2. Before actually deploying your infrastructure, you can preview everything that will be created:

   ```sh
   $ terraform plan
   ```

3. Deploy the configuration:

   ```sh
   $ terraform apply
   ```

It may take several minutes for the GCP instance and tunnel to come online. You can view your new tunnel, Access application, and Access policy in the **Access** section of [Zero Trust](https://one.dash.cloudflare.com). The new DNS records are available in the [Cloudflare dashboard](https://dash.cloudflare.com).

{{<Aside type="note">}}
If you need to roll back the configuration, run `terraform destroy` to delete everything created through Terraform. Both `terraform apply` and `terraform destroy` prompt for user input before applying the changes. To run without requiring user input, you can add the `-auto-approve` flag to the command.
{{</Aside>}}

## 7. Test the connection

1. In **Access** > **Tunnels**, verify that your tunnel is active.
2. In **Access** > **Applications**, verify that your Cloudflare email is allowed by the Access policy.
3. From any device, open a browser and go to `http_app.<cloudflare_zone>` (for example, `http_app.example.com`).

   You will see the Access login page if you have not recently logged in.

4. Log in with your Cloudflare email.

   You should see the [HTTPBin](https://httpbin.org/) homepage.
