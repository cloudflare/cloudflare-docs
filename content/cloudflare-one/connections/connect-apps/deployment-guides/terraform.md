---
pcx_content_type: how-to
title: Terraform
weight: 8
---

# Deploy Tunnels with Terraform

[Terraform](https://www.terraform.io/) is an infrastructure as code software tool that allows you to deploy services from different providers using a standardized configuration syntax.  When creating a Terraform configuration file, you define the final state of the configuration rather than the step-by-step procedure. This allows you to easily deploy, modify, and manage your Tunnels alongside your other infrastructure.

In this guide, you will learn how to use Terraform to deploy a Google Cloud Project (GCP) virtual machine and connect it with a Cloudflare Tunnel.

## Prerequisites

To follow this guide, you will need:
- [A Google Cloud Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project)
- [A zone on Cloudflare](/fundamentals/get-started/setup/add-site/)

## 1. Install Terraform

To get started with Terraform, refer to the [installation instructions](https://learn.hashicorp.com/tutorials/terraform/install-cli) for your operating system.

## 2. Install the GCP CLI

[Install and authenticate the GCP CLI](https://cloud.google.com/sdk/docs/install) so that Terraform can interact with your GCP account.

## 3. Create a Cloudflare API token

[Create an API token](/api/get-started/create-token/) so that Terraform can interact with your Cloudflare account. Your token should include the following permissions:

| Permission type | Permission | Access level |
| ----------------|-------| ----------- |
| Account | Cloudflare Tunnel | Edit |
| Account | Access: Apps and Policies | Edit |
| Zone   | DNS | Edit |

## 4. Configure Terraform

Terraform functions through a working directory that contains the configuration files. You can store your configuration in multiple files or just one — Terraform will evaluate all of the configuration files in the directory as if they were in a single document.

### Create a Terraform directory

1. Create a folder for your configuration:
    ```sh
    $ mkdir gcp-tunnel
    ```

2. Change into the directory:
    ```sh
    $ cd gcp-tunnel
    ```

### Define input variables

1. In your `gcp-tunnel` directory, create a `.tf` file to store variable definitions:

    ```sh
    $ touch variables.tf
    ```

2. Open the file in a text editor and copy and paste the following:

    ```txt
    ---
    filename: variables.tf
    ---
    # GCP variables
    variable "gcp_project_id" {
      description = "Google Cloud Platform (GCP) project ID"
      type        = string
    }
    
    variable "zone" {
      description = "Geographical zone for the GCP VM instance"
      type        = string
    }
    
    variable "machine_type" {
      description = "Machine type for the GCP VM instance"
      type        = string
    }

    variable "cloudflare_zone" {
      description = "Domain used to expose the GCP VM instance to the Internet"
      type        = string
    }
    
    variable "cloudflare_zone_id" {
      description = "Zone ID for your domain"
      type        = string
    }
    
    variable "cloudflare_account_id" {
      description = "Account ID for your Cloudflare account"
      type        = string
      sensitive   = true
    }
    
    variable "cloudflare_email" {
      description = "Email address for your Cloudflare account"
      type        = string
      sensitive   = true
    }
    
    variable "cloudflare_token" {
      description = "Cloudflare API token created at https://dash.cloudflare.com/profile/api-tokens"
      type        = string
    }
    ```

3. Save the file.

### Assign values to the variables

1. In your `gcp-tunnel` directory, create a `.tfvars` file to store variable values:

    ```sh
    $ touch terraform.tfvars
    ```

  Terraform will automatically use these variables if the file is named `terraform.tfvars`, otherwise the variable file will need to be manually passed in.

2. Open the file in a text editor and assign variable values as shown in the following example. Be sure to modify the example with your own values.

--------replace with example values---------
  ```txt
  ---
  filename: terraform.tfvars
  ---
  cloudflare_zone           = <domain that tunnel will route to>
  cloudflare_zone_id        = <located on overview page for zone>
  cloudflare_account_id     = <located in url of dashboard>
  cloudflare_email          = <email associated with account>
  cloudflare_token          = <created at https://dash.cloudflare.com/profile/api-tokens>
  gcp_project_id            = <which project the instance will be located in>
  zone                      = <the zone that the instance will be located in>
  machine_type              = <the machine type specifies memory and cpu>
  ```

3. Save the file.

{{<Aside type="warning">}}
 To prevent accidentally exposing sensitive credentials, do not save `terraform.tfvars` in your version control system. For example, if your version control is git, add `terraform.tfvars` to your `.gitignore` file.
{{</Aside>}}

### Configure Terraform providers

You will need to declare which providers you are using in a .tf file. This will enable you to use Terraform to interact with GCP and Cloudflare. The "random" provider is used to generate the tunnel secret.

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

### Configure Cloudflare resources
To create a tunnel you will need to also generate the tunnel secret. This will be used in the tunnel creation and to create the permission file so that the tunnel can be run. Terraform can then create the CNAME record that points traffic to the tunnel. Terraform can also create an Access Application associated with the subdomain and a policy associated with that application.

```txt
---
filename: Cloudflare-config.tf
---
# The random_id resource is used to generate a 35 character secret for the tunnel
resource "random_id" "tunnel_secret" {
  byte_length = 35
}
 
# A Named Tunnel resource called zero_trust_ssh_http
resource "cloudflare_argo_tunnel" "auto_tunnel" {
  account_id = var.cloudflare_account_id
  name       = "zero_trust_ssh_http"
  secret     = random_id.tunnel_secret.b64_std
}
 
# DNS settings to CNAME to tunnel target for HTTP application
resource "cloudflare_record" "http_app" {
  zone_id = var.cloudflare_zone_id
  name    = var.cloudflare_zone
  value   = "${cloudflare_argo_tunnel.auto_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}
# DNS settings to CNAME to tunnel target for SSH
resource "cloudflare_record" "ssh_app" {
  zone_id = var.cloudflare_zone_id
  name    = "ssh"
  value   = "${cloudflare_argo_tunnel.auto_tunnel.id}.cfargotunnel.com"
  type    = "CNAME"
  proxied = true
}
 
# Access application to apply zero trust policy over SSH endpoint
resource "cloudflare_access_application" "ssh_app" {
  zone_id          = var.cloudflare_zone_id
  name             = "Access protection for ssh.${var.cloudflare_zone}"
  domain           = "ssh.${var.cloudflare_zone}"
  session_duration = "1h"
}
 
# Access policy that the above appplication uses. (i.e. who is allowed in)
resource "cloudflare_access_policy" "ssh_policy" {
  application_id = cloudflare_access_application.ssh_app.id
  zone_id        = var.cloudflare_zone_id
  name           = "Example Policy for ssh.${var.cloudflare_zone}"
  precedence     = "1"
  decision       = "allow"
  include {
    email = [var.cloudflare_email]
  }
}
```

### Configure GCP resources

The specifications for the GCP instance can be specified. A start up script can be passed in to the instance to complete any internal configuration for the instance. The needed variables for the tunnel will be passed in through Terraform so that the script is able to create the tunnel cert.json file and config file.
```txt
---
filename: GCP-config.tf
---
# OS the server will use
data "google_compute_image" "image" {
  family  = "ubuntu-minimal-2004-lts"
  project = "ubuntu-os-cloud"
}
 
# GCP Instance resource
resource "google_compute_instance" "origin" {
  name         = "test"
  machine_type = var.machine_type
  zone         = var.zone
  // Your tags may differ. This one instructs the networking to not allow access to port 22
  tags         = ["no-ssh"]
 
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
  // Optional config to make instance ephemeral
  scheduling {
    preemptible       = true
    automatic_restart = false
  }
  // This is where we configure the server (aka instance). Variables like web_zone take a terraform variable and provide it to the server so that it can use them as a local variable
  metadata_startup_script = templatefile("./install-tunnel.tpl",
    {
      web_zone    = var.cloudflare_zone,
      account     = var.cloudflare_account_id,
      tunnel_id   = cloudflare_argo_tunnel.auto_tunnel.id,
      tunnel_name = cloudflare_argo_tunnel.auto_tunnel.name,
      secret      = random_id.tunnel_secret.b64_std
    })
}
```

The script will install cloudflared, create the cert.json file so that the tunnel can be run, create the config file that routes the services to the tunnel, and set up the tunnel to run as a service.

/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/

Can we be more specific about the service that this script sets up?

```bash
---
filename: install-tunnel.tpl
---
# Script to install Cloudflare Tunnel and Docker resources
# Docker configuration
cd /tmp
sudo apt-get install software-properties-common
# Retrieveing the docker repository for this OS
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
# The OS is updated and docker is installed
sudo apt update -y && sudo apt upgrade -y
sudo apt install docker docker-compose -y
# This is a herefile that is used to populate the /tmp/docker-compose.yml file. This logic is used elsewhere in this script
cat > /tmp/docker-compose.yml << "EOF"
version: '3'
services:
  httpbin:
    image: kennethreitz/httpbin
    restart: always
    container_name: httpbin
    ports:
      - 8080:80
EOF
 
# cloudflared configuration
cd ~
# The package for this OS is retrieved
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
# A local user directory is first created before we can install the tunnel as a system service
mkdir ~/.cloudflared
touch ~/.cloudflared/cert.json
touch ~/.cloudflared/config.yml
# Another herefile is used to dynamically populate the JSON credentials file
cat > ~/.cloudflared/cert.json << "EOF"
{
    "AccountTag"   : "${account}",
    "TunnelID"     : "${tunnel_id}",
    "TunnelName"   : "${tunnel_name}",
    "TunnelSecret" : "${secret}"
}
EOF
# Same concept with the Ingress Rules the tunnel will use

cat > ~/.cloudflared/config.yml << "EOF"
tunnel: ${tunnel_id}
credentials-file: /etc/cloudflared/cert.json
logfile: /var/log/cloudflared.log
loglevel: info
 
ingress:
  - hostname: ${web_zone}
    service: http://localhost:8080
  - hostname: ssh.${web_zone}
    service: ssh://localhost:22
  - hostname: "*"
    path: "^/_healthcheck$"
    service: http_status:200
  - hostname: "*"
    service: hello-world
EOF
# Now we install the tunnel as a systemd service
sudo cloudflared service install
# The credentials file does not get copied over so we'll do that manually
sudo cp -via ~/.cloudflared/cert.json /etc/cloudflared/
# Now we can bring up our container(s) with docker-compose and then start the tunnel
cd /tmp
sudo docker-compose up -d && sudo systemctl start cloudflared
```

## 5. Deploy Terraform

Once the configuration files are created, it can be deployed. 
1. Run `gcloud auth application-default login` to authenticate with the gcloud CLI.

2. Initialize the working directory run the `terraform init` command. This will set up the directory so that your infrastructure can be deployed.

3. Before actually deploying your infrastructure, a preview of everything that will be created can be displayed using the `terraform plan` command. 

6. Then to deploy the infrastructure use the `terraform apply` command.  

To run without requiring user input add the `-auto-approve` flag to the command.

7. It may take several minutes for the GCP instance and tunnel to come online. When you check your Cloudflare dashboard the new records, application, policy, and tunnel will be visible.

The `terraform destroy` command can be used to delete everything created through terraform if it needs to be rolled back.

## 6. Test the connection

How to actually connect to the service?
