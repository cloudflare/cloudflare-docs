---
title: 1 –  Initialize Terraform
order: 1
pcx-content-type: tutorial
---

# Introduction to Terraform init

This tutorial shows you how to get started with Terraform. The tutorial uses an example scenario where you have a web server for your domain that is accessible on 203.0.113.10 and you just signed up your domain (`example.com`) on Cloudflare to manage everything in Terraform. 

Before you begin, ensure you [installed Terraform](/installing). You will also need to [create an API Token](https://developers.cloudflare.com/api/tokens/create) with permissions to edit resources for this tutorial.

## 1. Define your first Terraform config file

Create an initial Terraform config file. Any files ending in `.tf` will be processed by Terraform. As the configuration becomes more complex, you will want to split the config into separate files and modules. For now, proceed with a single file.

```bash
$ cat > cloudflare.tf <<'EOF'
terraform { 
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }
}

provider "cloudflare" {
  email = "you@example.com"
  api_token = "your-api-token"
}

variable "zone_id" {
  default = "e097e1136dc79bc1149e32a8a6bde5ef"
}

variable "domain" {
  default = "example.com"
}

resource "cloudflare_record" "www" {
  zone_id = var.zone_id
  name    = "www"
  value   = "203.0.113.10"
  type    = "A"
  proxied = true
}
EOF
```

## 2. Initialize Terraform and the Cloudflare provider

After creating your basic configuration in HCL, initialize Terraform and ask it to apply the configuration to Cloudflare.

```sh
$ terraform init

Initializing provider plugins...
- Checking for available provider plugins on https://releases.hashicorp.com...
- Downloading plugin for provider "cloudflare" (1.0.0)...

The following providers do not have any version constraints in configuration,
so the latest version was installed.

To prevent automatic upgrades to new major versions that may contain breaking
changes, it is recommended to add version = "..." constraints to the
corresponding provider blocks in configuration, with the constraint strings
suggested below.

* provider.cloudflare: version = "~> 1.0"

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
```

When you run `terraform init`, any plugins required, such as the Cloudflare Terraform provider, are automatically downloaded and saved locally to a .terraform directory.

```sh
$ find .terraform/
.terraform/
.terraform/plugins
.terraform/plugins/darwin_amd64
.terraform/plugins/darwin_amd64/lock.json
.terraform/plugins/darwin_amd64/terraform-provider-cloudflare_v1.0.0_x4
```

## 3. Review the execution plan
After installing the Cloudflare provider, review the proposed changes to your Cloudflare account so they match the configuration you previously defined.

```sh
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  + cloudflare_record.www
      id:          <computed>
      created_on:  <computed>
      domain:      <computed>
      hostname:    <computed>
      metadata.%:  <computed>
      modified_on: <computed>
      name:        "www"
      proxiable:   <computed>
      proxied:     "true"
      ttl:         <computed>
      type:        "A"
      value:       "203.0.113.10"
      zone_id:     "e097e1136dc79bc1149e32a8a6bde5ef"


Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn’t specify an "-out" parameter to save this plan, so Terraform
can’t guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

In the “execution plan”, Terraform will create a new DNS record as requested. Values that you explicitly specified are displayed, such as the the value of the A record — 203.0.113.10. Values display as `<computed>` when they are derived based on other API calls, for example, looking up the `metadata`, or if the values are returned after the object is created. 

## 4. Apply your changes

The plan command is important because it allows you to preview the changes for accuracy before actually making them. After you review the execution plan, apply your changes.

You can use `--auto-approve` on the command line for a briefer output. Without this flag, Terraform will display the output of the Terraform plan and then ask for confirmation before applying it.

```sh
$ terraform apply --auto-approve
cloudflare_record.www: Creating...
  created_on:  "" => "<computed>"
  domain:      "" => "example.com"
  hostname:    "" => "<computed>"
  metadata.%:  "" => "<computed>"
  modified_on: "" => "<computed>"
  name:        "" => "www"
  proxiable:   "" => "<computed>"
  proxied:     "" => "true"
  ttl:         "" => "<computed>"
  type:        "" => "A"
  value:       "" => "203.0.113.10"
  zone_id:     "" => "<computed>"
cloudflare_record.www: Creation complete after 1s (ID: c38d3103767284e7cd14d5dad3ab8668)

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

## 5. Verify the results

[Log in to the Cloudflare Dashboard](https://dash.cloudflare.com/login) and select the DNS tab. You should see the record created by Terraform.


To see the full results returned from the API call, including the default values that you did not specify but let Terraform compute, you can run `terraform show`.

```sh
$ terraform show
cloudflare_record.www:
  id = c38d3103767284e7cd14d5dad3ab8668
  created_on = 2018-04-08T00:37:33.76321Z
  data.% = 0
  domain = example.com
  hostname = www.example.com
  metadata.% = 2
  metadata.auto_added = false
  metadata.managed_by_apps = false
  modified_on = 2018-04-08T00:37:33.76321Z
  name = www
  priority = 0
  proxiable = true
  proxied = true
  ttl = 1
  type = A
  value = 203.0.113.10
  zone_id = e097e1136dc79bc1149e32a8a6bde5ef
```

```sh
$ curl https://www.example.com
Hello, this is 203.0.113.10!
```
