---
pcx_content_type: tutorial
title: Import Cloudflare resources
---

# Import Cloudflare resources

An important point to understand about Terraform is that it can only manage configuration it created or was explicitly told about after the fact. The reason for this limitation is that Terraform expects to be authoritative for the resources it manages. It relies on two types of files to understand what resources it controls and what state they are in. Terraform determines when and how to make changes from the following:

- A [configuration file](https://developer.hashicorp.com/terraform/language) (ending in `.tf`) that defines the configuration of resources for Terraform to manage. This is what you worked with in the tutorial steps.
- A local [state file](https://developer.hashicorp.com/terraform/language/state) that maps the resource names defined in your configuration file — for example, `cloudflare_load_balancer.www-lb` — to the resources that exist in Cloudflare.

When Terraform makes calls to Cloudflare's API to create new resources as explained in the [tutorial](/terraform/tutorial/), it persists those IDs to a state file. By default, Terraform uses the `terraform.tfstate` file in your directory, but this can also be a [remote location](https://developer.hashicorp.com/terraform/language/state/remote). These IDs are later looked up and refreshed when you call `terraform plan` and `terraform apply`.

If you configured Cloudflare through other means, for example, by logging in to the Cloudflare dashboard or making `curl` calls to `api.cloudflare.com`, Terraform does not yet have these resource IDs in the state file. To manage this preexisting configuration, you will need to first reproduce the configuration in your config file and then import resources individually by providing their IDs and resource names.

## `cf-terraforming`

[`cf-terraforming`](https://github.com/cloudflare/cf-terraforming) helps existing Cloudflare customers get started with Terraform. Currently, `cf-terraforming` helps to generate the Terraform config state by fetching all the resources of a specified type from the account and/or zone of your choosing.

### Installation

Before you start, you must install `cf-terraforming`.

If you use Homebrew on macOS, open a terminal and run the following commands:

```sh
$ brew tap cloudflare/cloudflare
$ brew install --cask cloudflare/cloudflare/cf-terraforming
```

If you are using a different OS, [download the latest release](https://github.com/cloudflare/cf-terraforming/releases) from the `cf-terraforming` GitHub repository.

To view the help file, run `cf-terraforming` or `cf-terraforming -h`.

### Basic usage

To use `cf-terraforming`, specify the items below:

1. The command to execute (for example, `generate` or `import`).
2. Your Cloudflare user email - `--email` or `-e`.
3. Your Cloudflare API token - `--token` or `-t`.
4. The account and/or zone to pull resources from - `--account`/`--zone` or `-a`/`-z`.
5. The Cloudflare resources to generate config.

The list of supported resources is available in the [Terraform README](https://github.com/cloudflare/cf-terraforming#supported-resources).

## Import existing Cloudflare resources

To start managing existing Cloudflare resources in Terraform, for example, DNS records, you need:

- The Terraform configuration of that resource (defined in a `.tf` file)
- An accompanying Terraform state file of that resources state (defined in a `.tfstate` file)

### Generate Terraform configuration with `cf-terraforming`

If you do not have a Terraform configuration file defined, you need the `provider` block defined as follows:

```hcl
provider 'cloudflare' {
 # Cloudflare email saved in $CLOUDFLARE_EMAIL
 # Cloudflare API token saved in $CLOUDFLARE_API_TOKEN
}
```

Remember to keep your credentials saved in environment variables or terraform autovars that are not checked into your source files.

Start by making a call to `cf-terraforming generate` to generate the Terraform configuration for the DNS records in the zone you want to manage with Terraform.

```sh
$ cf-terraforming generate --email $CLOUDFLARE_EMAIL --token $CLOUDFLARE_API_TOKEN -z 1109d899a5ff5fd74bc01e581693685b --resource-type cloudflare_record > importing-example.tf
```

If you had not redirected the output to the `importing-example.tf` file, the result displayed in the standard output (your terminal window) would look like the following:

```tf
resource "cloudflare_record" "terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31" {
    name    = "@"
    type    = "A"
    ttl     = 1
    proxied = true
    value   = "192.0.2.1"
    zone_id = "1109d899a5ff5fd74bc01e581693685b"
}

resource "cloudflare_record" "terraform_managed_resource_5e10399a590a45279f09aa8fb1163354" {
    name    = "www"
    type    = "CNAME"
    ttl     = 1
    proxied = true
    value   = "mitigateddos.net"
    zone_id = "1109d899a5ff5fd74bc01e581693685b"
}

resource "cloudflare_record" "terraform_managed_resource_de1cb74bae184b569bb7f83fefe72248" {
    name    = "a123"
    type    = "NS"
    ttl     = 300
    proxied = false
    value   = "rafe.ns.cloudflare.com"
    zone_id = "1109d899a5ff5fd74bc01e581693685b"
}

resource "cloudflare_record" "terraform_managed_resource_5799bb01054843eea726758f935d2aa2" {
    name    = "a123"
    type    = "NS"
    ttl     = 300
    proxied = false
    value   = "terin.ns.cloudflare.com"
    zone_id = "1109d899a5ff5fd74bc01e581693685b"
}
```

Calling `terraform plan` at this point will try to create these resources as if they did not exist, since they are not present in the local state file:

```sh
$ terraform plan

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_record.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31 will be created
  + resource "cloudflare_record" "terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31" {
      + id:          <computed>
      + created_on:  <computed>
      + domain:      "mitigateddos.net"
      + hostname:    <computed>
      + metadata.%:  <computed>
      + modified_on: <computed>
      + name:        "mitigateddos.net"
      + proxiable:   <computed>
      + proxied:     true
      + ttl:         1
      + type:        "A"
      + value:       "192.0.2.1"
      + zone_id:     "1109d899a5ff5fd74bc01e581693685b"
    }

  # cloudflare_record.terraform_managed_resource_5e10399a590a45279f09aa8fb1163354 will be created
  + resource "cloudflare_record" "terraform_managed_resource_5e10399a590a45279f09aa8fb1163354" {
      + id:          <computed>
      + created_on:  <computed>
      + domain:      "mitigateddos.net"
      + hostname:    <computed>
      + metadata.%:  <computed>
      + modified_on: <computed>
      + name:        "www.mitigateddos.net"
      + proxiable:   <computed>
      + proxied:     true
      + ttl:         1
      + type:        "CNAME"
      + value:       "mitigateddos.net"
      + zone_id:     "1109d899a5ff5fd74bc01e581693685b"
    }

  # cloudflare_record.terraform_managed_resource_de1cb74bae184b569bb7f83fefe72248 will be created
  + resource "cloudflare_record" "terraform_managed_resource_de1cb74bae184b569bb7f83fefe72248" {
      + id:          <computed>
      + created_on:  <computed>
      + domain:      "mitigateddos.net"
      + hostname:    <computed>
      + metadata.%:  <computed>
      + modified_on: <computed>
      + name:        "a123.mitigateddos.net"
      + proxiable:   <computed>
      + proxied:     false
      + ttl:         300
      + type:        "NS"
      + value:       "rafe.ns.cloudflare.com"
      + zone_id:     "1109d899a5ff5fd74bc01e581693685b"
    }

  # cloudflare_record.terraform_managed_resource_5799bb01054843eea726758f935d2aa2 will be created
  + resource "cloudflare_record" "terraform_managed_resource_5799bb01054843eea726758f935d2aa2" {
      + id:          <computed>
      + created_on:  <computed>
      + domain:      "mitigateddos.net"
      + hostname:    <computed>
      + metadata.%:  <computed>
      + modified_on: <computed>
      + name:        "a123.mitigateddos.net"
      + proxiable:   <computed>
      + proxied:     false
      + ttl:         300
      + type:        "NS"
      + value:       "terin.ns.cloudflare.com"
      + zone_id:     "1109d899a5ff5fd74bc01e581693685b"
    }

Plan: 4 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions if you run "terraform apply" now.
```

To fix this, you must import the real state of those resources from Cloudflare into the Terraform state file (`.tfstate`).

### Import resources into Terraform state

`cf-terraforming` allows you to import local state (`.tfstate` file) for the same resources you imported during configuration.

When you run `cf-terraforming import ...`, you will obtain a list of `terraform import ...` commands that you must run manually afterward to import those resources into Terraform state. This is currently a manual process, but it may be automated in the future.

1. Run the following command:

    ```sh
    $ cf-terraforming import --resource-type "cloudflare_record" --email $CLOUDFLARE_EMAIL --key $CLOUDFLARE_API_KEY --zone $CLOUDFLARE_ZONE_ID
    ```

2. Copy each `terraform import ...` command included in the output and run it. Terraform will import each resource individually into Terraform state.

For example, if the output of the first command (`cf-terraforming import ...`) contained the following `terraform` commands:

```txt
terraform import cloudflare_record.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31 1109d899a5ff5fd74bc01e581693685b/3c0b456bc2aa443089c5f40f45f51b31
terraform import cloudflare_record.terraform_managed_resource_5e10399a590a45279f09aa8fb1163354 1109d899a5ff5fd74bc01e581693685b/d09d916d059aa9fc8cb54bdd49deea5f
terraform import cloudflare_record.terraform_managed_resource_de1cb74bae184b569bb7f83fefe72248 1109d899a5ff5fd74bc01e581693685b/8d6ec0d02c5b22212ff673782c816ef8
terraform import cloudflare_record.terraform_managed_resource_5799bb01054843eea726758f935d2aa2 1109d899a5ff5fd74bc01e581693685b/3766b952a2dda4c47e71952aeef33c77
```

You would run each command individually in the terminal:

```sh
$ terraform import cloudflare_record.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31 1109d899a5ff5fd74bc01e581693685b/3c0b456bc2aa443089c5f40f45f51b31
cloudflare_record.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31: Importing from ID "1109d899a5ff5fd74bc01e581693685b/3c0b456bc2aa443089c5f40f45f51b31"...
cloudflare_record.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31: Import complete!
  Imported cloudflare_record (ID: 3c0b456bc2aa443089c5f40f45f51b31)
cloudflare_record.terraform_managed_resource_3c0b456bc2aa443089c5f40f45f51b31: Refreshing state... (ID: 3c0b456bc2aa443089c5f40f45f51b31)

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.

$ terraform import cloudflare_record.terraform_managed_resource_5e10399a590a45279f09aa8fb1163354 1109d899a5ff5fd74bc01e581693685b/d09d916d059aa9fc8cb54bdd49deea5f
cloudflare_record.terraform_managed_resource_5e10399a590a45279f09aa8fb1163354: Importing from ID "1109d899a5ff5fd74bc01e581693685b/d09d916d059aa9fc8cb54bdd49deea5f"...
cloudflare_record.terraform_managed_resource_5e10399a590a45279f09aa8fb1163354: Import complete!
  Imported cloudflare_record (ID: d09d916d059aa9fc8cb54bdd49deea5f)
cloudflare_record.terraform_managed_resource_5e10399a590a45279f09aa8fb1163354: Refreshing state... (ID: d09d916d059aa9fc8cb54bdd49deea5f)

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.

$ terraform import cloudflare_record.terraform_managed_resource_de1cb74bae184b569bb7f83fefe72248 1109d899a5ff5fd74bc01e581693685b/8d6ec0d02c5b22212ff673782c816ef8
cloudflare_record.terraform_managed_resource_de1cb74bae184b569bb7f83fefe72248: Importing from ID "1109d899a5ff5fd74bc01e581693685b/8d6ec0d02c5b22212ff673782c816ef8"...
cloudflare_record.terraform_managed_resource_de1cb74bae184b569bb7f83fefe72248: Import complete!
  Imported cloudflare_record (ID: 8d6ec0d02c5b22212ff673782c816ef8)
cloudflare_record.terraform_managed_resource_de1cb74bae184b569bb7f83fefe72248: Refreshing state... (ID: 8d6ec0d02c5b22212ff673782c816ef8)

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.

$ terraform import cloudflare_record.terraform_managed_resource_5799bb01054843eea726758f935d2aa2 1109d899a5ff5fd74bc01e581693685b/3766b952a2dda4c47e71952aeef33c77
cloudflare_record.terraform_managed_resource_5799bb01054843eea726758f935d2aa2: Importing from ID "1109d899a5ff5fd74bc01e581693685b/3766b952a2dda4c47e71952aeef33c77"...
cloudflare_record.terraform_managed_resource_5799bb01054843eea726758f935d2aa2: Import complete!
  Imported cloudflare_record (ID: 3766b952a2dda4c47e71952aeef33c77)
cloudflare_record.terraform_managed_resource_5799bb01054843eea726758f935d2aa2: Refreshing state... (ID: 3766b952a2dda4c47e71952aeef33c77)

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.
```

If you now run `terraform plan`, you will notice that Terraform will no longer try to re-create the `cloudflare_record` resources:

```sh
$ terraform plan | grep changes
No changes. Infrastructure is up-to-date.
```
