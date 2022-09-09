---
pcx_content_type: how-to
title: Ansible
weight: 8
hidden: true
---
# Deploy `cloudflared` with Ansible
Ansible is a software tool that enables at scale management of infrastructure. Ansible is agentless, so all it needs to function is the ability to SSH to the target and having Python installed on the target. Configuration through Ansible is done in a yaml file.

Ansible can be integrated with Terraform in order to take advantage of the features in both. Terraform is better than Ansible at deployment and Cloudflare is a Terraform provider, while Ansible is better for configuring the deployment.

This guide will go over how to deploy a tunnel on a GCP instance through Terraform and Ansible.

## Install and Setup
In order to use Ansible to deploy tunnels in GCP you will need to have [Ansible installed](https://docs.ansible.com/ansible/latest/installation_guide/index.html), [Terraform installed](https://learn.hashicorp.com/tutorials/terraform/install-cli), and the [GCP CLI configured](https://cloud.google.com/sdk/docs/install).

### Creating the Ansible Playbook
The configuration files will all need to be stored in one folder in order for Terraform to deploy everything properly.

Ansible playbooks declare the configuration that Ansible will deploy. The playbook is written in a .yml files. [Keywords](https://docs.ansible.com/ansible/latest/reference_appendices/playbooks_keywords.html#play) are used to define how Ansible will deploy. For example, the vars_files keyword specifies where any variables that the .yml file will use are stored. The tasks keyword specifies the actions that Ansible will actually perform. Ansible uses modules to specify what actions to complete. For example the copy module is used to create a copy of a file in the deployment. In this guide the copy module uses the content keyword to declare what will be in the file rather than providing a source file. 
  ```sh
    ---
    - hosts: all
      become: yes
    # In order to run the tunnels certain values will need to be passed in to the VM
    vars_files:
      - ./tf_ansible_vars_file.yml
    # The tasks section specifies the actions that will take place on the VM
    tasks:
      - name: download cloudflared package
        shell: wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
      - name: depackage cloudflared
        shell: sudo dpkg -i cloudflared-linux-amd64.deb
      - name: Create cloudflared service directory 
        shell: mkdir -p /etc/cloudflared/
      - name: Creating the ingress rules and the config file for cloudflared
        copy:
          dest: "/etc/cloudflared/config.yml"
          content: |
            tunnel: "{{ tunnel_id }}"
            credentials-file: /etc/cloudflared/cert.json
            logfile: /var/log/cloudflared.log
            loglevel: info    
            ingress:
              - hostname: "ssh.{{ zone }}"
                service: ssh://localhost:22
              - service: http_status:404
      - name: Creating cred.json file for cloudflared
        copy:
          dest: "/etc/cloudflared/cert.json"
          content: |
            {
              "AccountTag"   : "{{ account | quote }}",
              "TunnelID"     : "{{ tunnel_id | quote }}",
              "TunnelName"   : "{{ tunnel_name | quote }}",
              "TunnelSecret" : "{{ secret | quote }}"
            }
      - name: Installing cloudflared as a service
        shell: cloudflared service install
      - name: Start cloudflared service
        systemd:
          name: cloudflared
          state: started
          enabled: true
          masked: no
  ```

### Terraform Configuration
The tunnel will be created through the Cloudflare Terraform provider. Using Terraform to deploy tunnels will require saving sensitive identification information. This can be stored in a .tfvars file and then passed in as a variable to the .tf file. This file should not be saved by the version control used in order to prevent accidentally exposing this information. If the version control is git, this file should be included in the .gitignore file. Terraform will automatically use these variables if the file is named terraform.tfvars, otherwise the variable file will need to be manually passed in. 

```sh
cloudflare_zone           = <domain that tunnel will route to>

cloudflare_zone_id      = <located on overview page for zone>

cloudflare_account_id = <located in url of dashboard>

cloudflare_email          = <email associated with account>

cloudflare_token          = <created at https://dash.cloudflare.com/profile/api-tokens>

gcp_project_id            = <which project the instance will be located in>

zone                            = <the zone that the instance will be located in>

machine_type             = <the machine type specifies memory and cpu>

name                           = <name of gcp account -- needed for accessing instance>
```

A .tf file is needed to specify all of the providers that Terraform will use to deploy. The cloudflare provider is used to create the tunnel. The google provider is used to create the VM instance. The random provider is needed to generate a secret id for the tunnel. The variables from the terraform.tfvars file need to be retrieved as well so that their content can be accessed.

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

variable "name" {

  description = "GCP account name."

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

Terraform is used to create the tunnel that will be running. It can also create the DNS record that the tunnel will route to.

```sh
# The random_id resource is used to generate a 35 character secret for the tunnel

resource "random_id" "tunnel_secret" {

  byte_length = 35

}

# A Named Tunnel resource called ansible_ssh_http

resource "cloudflare_argo_tunnel" "auto_tunnel" {

  account_id = var.cloudflare_account_id

  name       = "ansible_ssh"

  secret     = random_id.tunnel_secret.b64_std

}

# DNS settings to CNAME to tunnel target for SSH

resource "cloudflare_record" "ssh_app" {

  zone_id = var.cloudflare_zone_id

  name    = "ssh"

  value   = "${cloudflare_argo_tunnel.auto_tunnel.id}.cfargotunnel.com"

  type    = "CNAME"

  proxied = true

}
```

The tunnel id and other requirements for running the tunnel will be exported to tf_ansible_vars_file.yml. Ansible will then use this file to access the ids and secrets needed.

```sh
resource "local_file" "tf_ansible_vars_file" {

  content = <<-DOC

    # Ansible vars_file containing variable values from Terraform.

    # Generated by Terraform mgmt configuration.

    tunnel_id: ${cloudflare_argo_tunnel.auto_tunnel.id}

    account: ${var.cloudflare_account_id}

    tunnel_name: ${cloudflare_argo_tunnel.auto_tunnel.name}

    secret: ${random_id.tunnel_secret.b64_std}

    zone: ${var.cloudflare_zone}

    DOC

  filename = "./tf_ansible_vars_file.yml"

}
```

Terraform can deploy GCP VM instances. Instead of having to use a bash script for any internal configuration of the instance, Ansible is used to complete that. All Terraform needs to accomplish for Ansible to deploy is install Python3 on the instance. 
```sh
# OS the server will use

data "google_compute_image" "image" {

  family  = "ubuntu-minimal-2004-lts"

  project = "ubuntu-os-cloud"

}

resource "google_compute_instance" "origin" {

  name         = "ansible-inst"

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

  scheduling {

    preemptible = true

    automatic_restart = false

  }

#Install Python3

  provisioner "remote-exec" {

    inline = [

      "sudo apt update", "sudo apt install python3 -y",  "echo Done!"

    ]

    connection {

      host = self.network_interface.0.access_config.0.nat_ip

      user = var.name

      type = "ssh"

  #If a SSH key is needed to connect use `private_key = file("<path to private key>)`

    }

  }

  provisioner "local-exec" {

# If a SSH key and user need to be specified add `--private-key <path to private key> -u var.name`

    command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook  -i ${self.network_interface.0.access_config.0.nat_ip}, main.yml"

  }

  metadata = {

      cf-terraform = "demo_tf_kitchensink"

      cf-email     = var.cloudflare_email

      cf-zone      = var.cloudflare_zone

  } 

  depends_on = [

    local_file.tf_ansible_vars_file

  ]

}
```
 

Deployment
Once the configuration files are created, it can be deployed through Terraform. The Ansible deployment happens within the Terraform deployment when the `ansible-playbook` command is run. First, to initialize the working directory run the `terraform init` command. This will set up the directory so that your infrastructure can be deployed.

Before actually deploying your infrastructure, a preview of everything that will be created can be displayed using the `terraform plan` command. Then to deploy the infrastructure use the `terraform apply` command. It may take several minutes for the GCP instance and tunnel to come online. When you check your Cloudflare dashboard the new records, application, policy, and tunnel will be visible.

The `terraform destroy` command can be used to delete everything created through terraform if it needs to be rolled back. The `terraform apply` and `terraform destroy` commands prompt user input. To run without requiring user input add the `-auto-approve` flag to the command.

