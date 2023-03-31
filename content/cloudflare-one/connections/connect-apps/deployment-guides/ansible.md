---
pcx_content_type: how-to
title: Ansible
weight: 1
---

# Deploy Tunnels with Ansible and Terraform

Ansible is a software tool that enables at scale management of infrastructure. Ansible is agentless — all it needs to function is the ability to SSH to the target and Python installed on the target.

Ansible works alongside Terraform to streamline the Cloudflare Tunnel setup process. In this guide, you will use Terraform to deploy an SSH server on Google Cloud and create a Cloudflare Tunnel that makes the server available over the Internet. Terraform will automatically run an Ansible playbook that installs and configures `cloudflared` on the server.

## Prerequisites

To complete the steps in this guide, you will need:

- [A Google Cloud Project](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project) and [GCP CLI installed and authenticated](https://cloud.google.com/sdk/docs/install).
- [Basic knowledge of Terraform](/cloudflare-one/connections/connect-apps/deployment-guides/terraform/) and[Terraform installed](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli).
- [A zone on Cloudflare](/fundamentals/get-started/setup/add-site/).
- [A Cloudflare API token](/fundamentals/api/get-started/create-token/) with `Cloudflare Tunnel` and `DNS` permissions.

## 1. Install Ansible

Refer to the [Ansible installation instructions](https://docs.ansible.com/ansible/latest/installation_guide/index.html).

## 2. (Optional) Create an SSH key pair

Terraform and Ansible require an unencrypted SSH key to connect to the GCP server. If you do not already have a key, you can generate one as follows:

1. Open a terminal and type the following command:

   ```sh
   $ ssh-keygen -t rsa -f ~/.ssh/gcp_ssh -C <username in GCP>
   ```

2. When prompted for a passphrase, press <kbd>Enter</kbd> twice to leave it blank. Terraform cannot decode encrypted private keys.

Two files will be generated: `gcp_ssh` which contains the private key, and `gcp_ssh.pub` which contains the public key.

## 3. Create a configuration directory

1. Create a folder for your Terraform and Ansible configuration files:

   ```sh
   $ mkdir ansible-tunnel
   ```

2. Change to the new directory:

   ```sh
   $ cd ansible-tunnel
   ```

## 4. Create Terraform configuration files

### Define input variables

{{<render file="_terraform_input_variables.md">}}

### Assign values to the variables

{{<render file="_terraform_variable_values.md">}}

### Configure Terraform providers

{{<render file="_terraform_providers.md">}}

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
   resource "cloudflare_argo_tunnel" "auto_tunnel" {
     account_id = var.cloudflare_account_id
     name       = "Ansible GCP tunnel"
     secret     = random_id.tunnel_secret.b64_std
   }

   # Creates the CNAME record that routes ssh_app.${var.cloudflare_zone} to the tunnel.
   resource "cloudflare_record" "ssh_app" {
     zone_id = var.cloudflare_zone_id
     name    = "ssh_app"
     value   = "${cloudflare_argo_tunnel.auto_tunnel.id}.cfargotunnel.com"
     type    = "CNAME"
     proxied = true
   }
   ```

### Configure GCP resources

The following configuration defines the specifications for the GCP virtual machine and installs Python3 on the machine. Python3 allows Ansible to configure the GCP instance instead of having to run a [startup script](/cloudflare-one/connections/connect-apps/deployment-guides/terraform/#create-a-startup-script) on boot.

1. In your configuration directory, create a `.tf` file:

   ```sh
   $ touch GCP-config.tf
   ```

2. Open the file in a text editor and copy and paste the following example. Be sure to insert your own GCP username and SSH key pair.

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

   // Installs Python3 on the VM.
   provisioner "remote-exec" {
       inline = [
       "sudo apt update", "sudo apt install python3 -y",  "echo Done!"
       ]
       connection {
       host = self.network_interface.0.access_config.0.nat_ip
       user = "<username in GCP>"
       type = "ssh"
       private_key= file("<path to private key>")
       }
   }
   provisioner "local-exec" {
       // If specifying an SSH key and user, add `--private-key <path to private key> -u var.name`
       command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u <username in GCP> --private-key <path to private key> -i ${self.network_interface.0.access_config.0.nat_ip}, playbook.yml"
   }

   metadata = {
       cf-email     = var.cloudflare_email
       cf-zone      = var.cloudflare_zone
       ssh-keys     = "<username in GCP>:${file("<path to public key>")}"
   }
   depends_on = [
       local_file.tf_ansible_vars_file
   ]
   }
   ```

### Export variables to Ansible

The following Terraform resource exports the tunnel ID and other variables to `tf_ansible_vars_file.yml`. Ansible will use this data to configure and run `cloudlared` on the server.

1. In your configuration directory, create a new `tf` file:

   ```sh
   $ touch export.tf
   ```

2. Copy and paste the following content into `export.tf`:

   ```txt
   ---
   filename: export.tf
   ---
   resource "local_file" "tf_ansible_vars_file" {
     content = <<-DOC
       # Ansible vars_file containing variable values from Terraform.
       tunnel_id: ${cloudflare_argo_tunnel.auto_tunnel.id}
       account: ${var.cloudflare_account_id}
       tunnel_name: ${cloudflare_argo_tunnel.auto_tunnel.name}
       secret: ${random_id.tunnel_secret.b64_std}
       zone: ${var.cloudflare_zone}
       DOC

     filename = "./tf_ansible_vars_file.yml"
   }
   ```

## 5. Create the Ansible playbook

Ansible playbooks are YAML files that declare the configuration Ansible will deploy.

1. Create a new `.yml` file:

   ```sh
   $ touch playbook.yml
   ```

2. Open the file in a text editor and copy and paste the following content:

```yml
---
- hosts: all
  become: yes
  # Import tunnel variables into the VM.
  vars_files:
    - ./tf_ansible_vars_file.yml
  # Execute the following commands on the VM.
  tasks:
    - name: Download the cloudflared Linux package.
      shell: wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
    - name: Depackage cloudflared.
      shell: sudo dpkg -i cloudflared-linux-amd64.deb
    - name: Create a cloudflared service directory.
      shell: mkdir -p /etc/cloudflared/
    - name: Create the config file for cloudflared and define the ingress rules for the tunnel.
      copy:
        dest: "/etc/cloudflared/config.yml"
        content: |
          tunnel: "{{ tunnel_id }}"
          credentials-file: /etc/cloudflared/cert.json
          logfile: /var/log/cloudflared.log
          loglevel: info
          ingress:
            - hostname: "ssh_app.{{ zone }}"
              service: ssh://localhost:22
            - service: http_status:404
    - name: Create the tunnel credentials file for cloudflared.
      copy:
        dest: "/etc/cloudflared/cert.json"
        content: |
          {
            "AccountTag"   : "{{ account | quote }}",
            "TunnelID"     : "{{ tunnel_id | quote }}",
            "TunnelName"   : "{{ tunnel_name | quote }}",
            "TunnelSecret" : "{{ secret | quote }}"
          }
    - name: Install the tunnel as a systemd service.
      shell: cloudflared service install
    - name: Start the tunnel.
      systemd:
        name: cloudflared
        state: started
        enabled: true
        masked: no
```

[Keywords](https://docs.ansible.com/ansible/latest/reference_appendices/playbooks_keywords.html#play) define how Ansible will execute the configuration. In the example above, the `vars_files` keyword specifies where variable definitions are stored, and the `tasks` keyword specifies the actions Ansible will perform.

[Modules](https://docs.ansible.com/ansible/2.9/user_guide/modules.html) specify what tasks to complete. In this example, the `copy` module creates a file and populates it with content.

## 6. Deploy the configuration

Once you have created the configuration files, you can deploy them through Terraform. The Ansible deployment happens within the Terraform deployment when the `ansible-playbook` command is run.

1. Initialize your configuration directory:

   ```sh
   $ terraform init
   ```

2. (Optional) Preview everything that will be created:

   ```sh
   $ terraform plan
   ```

3. Deploy the configuration:

   ```sh
   $ terraform apply
   ```

It may take several minutes for the GCP instance and tunnel to come online. You can view your new tunnel in [Zero Trust](https://one.dash.cloudflare.com) under **Access** > **Tunnels**.

## 7. Test the connection

You can now SSH to the GCP server through the new `ssh_app.<zone>` hostname. For instructions on how to connect, refer to our [SSH guide](/cloudflare-one/connections/connect-apps/use_cases/ssh/#2-connect-as-a-user).
