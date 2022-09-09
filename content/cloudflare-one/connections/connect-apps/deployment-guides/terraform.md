---
pcx_content_type: how-to
title: Terraform
weight: 8
hidden: true
---
# Deploy Tunnels with Terraform
Terraform is an infrastructure as code software tool. It can be used to deploy and integrate multiple different products together by leveraging the different providers that are available. Terraform uses declarative configuration, so in the configuration files the final state is written rather than the steps to get to that state. This enables users to easily modify what infrastructure they want set up through Terraform.

In this guide, we'll walk through how to use Terraform to deploy a GCP VM instance and connect it with Cloudflare Tunnel.

## Install and Setup
In order to administer tunnels with Terraform it must be [installed](https://learn.hashicorp.com/tutorials/terraform/install-cli). The GCP CLI must also be [installed and authenticated](https://cloud.google.com/sdk/docs/install) so that Terraform can interact with your GCP account. 

Terraform functions through a working directory that contains the configuration files and any other resources. A folder can be created from the command line using `mkdir <working directory name>`. Files within the folder can be created through the command line using the touch command (i.e. `touch terraform.tfvars` or touch providers.tf`) so that the correct file extension is assigned.

Using Terraform to deploy tunnels will require saving sensitive identification information. This can be stored in a .tfvars file and then passed in as a variable in the configuration files. This file should not be saved by the version controlled used in order to prevent accidentally exposing this information. If the version control is git, this file should be included in the .gitignore file. Terraform will automatically use these variables if the file is named terraform.tfvars, otherwise the variable file will need to be manually passed in. 

```sh
cloudflare_zone           = <domain that tunnel will route to>
cloudflare_zone_id        = <located on overview page for zone>
cloudflare_account_id     = <located in url of dashboard>
cloudflare_email          = <email associated with account>
cloudflare_token          = <created at https://dash.cloudflare.com/profile/api-tokens>
gcp_project_id            = <which project the instance will be located in>
zone                      = <the zone that the instance will be located in>
machine_type              = <the machine type specifies memory and cpu>
```

Terraform configuration is stored in files with the .tf extension. The working directory can contain multiple .tf files or just one, so choosing to work in multiple .tf files is a style choice.

You will need to declare which providers you are using in a .tf file.

```sh
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
    template = {
      source = "hashicorp/template"
    }
  }
  required_version = ">= 0.13"
}
# Providers
provider "cloudflare" {
  account_id = var.cloudflare_account_id
  api_token    = var.cloudflare_token
}
provider "google" {
  project    = var.gcp_project_id
}
provider "random" {
}
```
This will enable you to use Terraform to interact with GCP and Cloudflare. The "random" provider is used to generate the tunnel secret. 

Next it is important to pull the variables from the .tfvars file to be used.

```sh
# GCP variables
variable "gcp_project_id" {
  description = "Google Cloud Platform (GCP) Project ID."
  type        = string
}
 
variable "zone" {
  description = "GCP zone name."
  type        = string
}
 
variable "machine_type" {
  description = "GCP VM instance machine type."
  type        = string
}
 
# Cloudflare Variables
variable "cloudflare_zone" {
  description = "The Cloudflare Zone to use."
  type        = string
}
 
variable "cloudflare_zone_id" {
  description = "The Cloudflare UUID for the Zone to use."
  type        = string
}
 
variable "cloudflare_account_id" {
  description = "The Cloudflare UUID for the Account the Zone lives in."
  type        = string
  sensitive   = true
}
 
variable "cloudflare_email" {
  description = "The Cloudflare user."
  type        = string
  sensitive   = true
}
 
variable "cloudflare_token" {
  description = "The Cloudflare user's API token."
  type        = string
}
```
To create a tunnel you will need to also generate the tunnel secret. This will be used in the tunnel creation and to create the permission file so that the tunnel can be run. Terraform can then create the CNAME record that points traffic to the tunnel. Terraform can also create an Access Application associated with the subdomain and a policy associated with that application.

```sh
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

The specifications for the GCP instance can be specified. A start up script can be passed in to the instance to complete any internal configuration for the instance. The needed variables for the tunnel will be passed in through Terraform so that the script is able to create the tunnel cert.json file and config file.
```sh
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
  metadata_startup_script = templatefile("./server.tpl",
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
```sh
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
## Deploying
Once the configuration files are created, it can be deployed. First, to initialize the working directory run the `terraform init` command. This will set up the directory so that your infrastructure can be deployed.

Before actually deploying your infrastructure, a preview of everything that will be created can be displayed using the `terraform plan` command. Then to deploy the infrastructure use the `terraform apply` command. It may take several minutes for the GCP instance and tunnel to come online. When you check your Cloudflare dashboard the new records, application, policy, and tunnel will be visible.

The `terraform destroy` command can be used to delete everything created through terraform if it needs to be rolled back. The `terraform apply` and `terraform destroy` commands prompt user input. To run without requiring user input add the `-auto-approve` flag to the command.