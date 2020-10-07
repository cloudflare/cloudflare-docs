---
title: 1 – Hello World
order: 1
---

# Hello World

Let's say you have a web server for your domain that’s accessible on 203.0.113.10. You just signed up your domain, example.com, on Cloudflare and want to manage everything in Terraform.

This tutorial step shows you how to get started. Before you do so, make sure you've completed the [Getting Started](/getting-started/) steps.

## 1. Defining your first Terraform config file

First we'll create a initial Terraform config file. Any files ending in `.tf` will be processed by Terraform. As you configuration gets more complex you'll want to split the config into separate files and modules, but for now we'll proceed with a single file:

```sh
$ cat > cloudflare.tf <<'EOF'
provider "cloudflare" {
  email = "you@example.com"
  api_key = "your-api-key"
}

variable "domain" {
  default = "example.com"
}

resource "cloudflare_record" "www" {
  domain  = var.domain
  name    = "www"
  value   = "203.0.113.10"
  type    = "A"
  proxied = true
}
EOF
```

## 2. Initializing Terraform and the Cloudflare provider

Now that you’ve created your basic configuration in HCL, let’s initialize Terraform and ask it to apply the configuration to Cloudflare.

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

When you run terraform init, any plugins required, such as the Cloudflare Terraform provider, are automatically downloaded and saved locally to a .terraform directory:

```sh
$ find .terraform/
.terraform/
.terraform//plugins
.terraform//plugins/darwin_amd64
.terraform//plugins/darwin_amd64/lock.json
.terraform//plugins/darwin_amd64/terraform-provider-cloudflare_v1.0.0_x4
```

## 3. Reviewing the execution plan
With the Cloudflare provider installed, let’s ask Terraform what changes it’s planning to make to your Cloudflare account so it matches the configuration you previously defined:

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
      domain:      "example.com"
      hostname:    <computed>
      metadata.%:  <computed>
      modified_on: <computed>
      name:        "www"
      proxiable:   <computed>
      proxied:     "true"
      ttl:         <computed>
      type:        "A"
      value:       "203.0.113.10"
      zone_id:     <computed>


Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

As you can see in the above “execution plan”, Terraform is going to create a new DNS record, as requested. Values that you’ve explicitly specified are displayed, e.g., the value of the A record—203.0.113.10—while values that are derived based on other API calls, e.g., looking up the zone_id, or returned after the object is created, are displayed as `<computed>`.

## 4. Applying your changes

The plan command is important, as it allows you to preview the changes for accuracy before actually making them. Once you’re comfortable with the execution plan, it’s time to apply it:

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

Note that I specified --auto-approve on the command line for briefer output; without this flag, Terraform will show you the output of terraform plan and then ask for confirmation before applying it.

## 5. Verifying the results

Logging back into the Cloudflare Dashboard and selecting the DNS tab, I can see the record that was created by Terraform:

![New DNS Record](../static/new-dns-record.png)

If you’d like to see the full results returned from the API call (including the default values that you didn’t specify but let Terraform compute), you can run terraform show:

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
  zone_id = e2e6391340be87a3726f91fc4148b122
```

```sh
$ curl https://www.example.com
Hello, this is 203.0.113.10!
```
