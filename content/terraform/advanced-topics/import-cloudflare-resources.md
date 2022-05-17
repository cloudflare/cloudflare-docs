---
pcx-content-type: tutorial
title: Import Cloudflare resources
---

# Import Cloudflare resources

An important point to understand about Terraform is that it can only manage configuration it created or was explicitly told about after the fact. The reason for this limitation is that Terraform expects to be authoritative for the resources it manages. It relies on two types of files to understand what resources it controls and what state they are in. Terraform determines when and how to make changes from the following:

- A [configuration file](https://www.terraform.io/language) (ending in `.tf`) that defines the configuration of resources for Terraform to manage. This is what you worked with in the tutorial steps.
- A local [state file](https://www.terraform.io/language/state) that maps the resource names defined in your configuration file — for example, `cloudflare_load_balancer.www-lb` — to the resources that exist in Cloudflare.

When Terraform makes calls to Cloudflare's API to create new resources as explained in the [tutorial](/terraform/tutorial/), it persists those IDs to a state file. By default, Terraform uses the `terraform.tfstate` file in your directory, but this can also be a [remote location](https://www.terraform.io/language/state/remote). These IDs are later looked up and refreshed when you call `terraform plan` and `terraform apply`.

If you configured Cloudflare through other means, for example, by logging in to the Cloudflare dashboard or making `curl` calls to `api.cloudflare.com`, Terraform does not yet have these resource IDs in the state file. To manage this preexisting configuration, you will need to first reproduce the configuration in your config file and then import resources individually by providing their IDs and resource names.

## `cf-terraforming`

[`cf-terraforming`](https://github.com/cloudflare/cf-terraforming) helps existing Cloudflare customers get started with Terraform. Currently, `cf-terraforming` helps to generate the Terraform config state by fetching all the resources of a specified type from the account and/or zone of your choosing.

### Installation

Before you start, you must install `cf-terraforming`.

If you use Homebrew on MacOS, open a terminal and run the following commands:

```sh
$ brew tap cloudflare/cloudflare
$ brew install --cask cloudflare/cloudflare/cf-terraforming
```

If you are using a different OS, [download the latest release](https://github.com/cloudflare/cf-terraforming/releases) from the `cf-terraforming` GitHub repository.

To view the help file, run `cf-terraforming` or `cf-terraforming -h`.

### Basic usage

To use `cf-terraforming`, specify the four items below:

1. Your Cloudflare user email - `--email` or `-e`.
2. Your Cloudflare API token - `--token` or `-t`.
3. The account and/or zone to pull resources from - `--account`/`--zone` or `-a`/`-z`.
4. The Cloudflare resources to generate config.

The list of supported resources is available in the [Terraform README](https://github.com/cloudflare/cf-terraforming#supported-resources).

## Import existing Cloudflare resources

To start managing existing Cloudflare resources in Terraform, for example, DNS records, you need:

- The Terraform configuration of that resource (defined in a `.tf` file)
- An accompanying Terraform state file of that resources state (defined in a `.tfstate` file)

### Generate Terraform configuration with `cf-terraforming`

If you do not have a Terraform configuration file defined, you need the provider blocked defined as follows:

```hcl
provider 'cloudflare' {
 # Cloudflare email saved in $CLOUDFLARE_EMAIL
 # Cloudflare API token saved in $CLOUDFLARE_API_TOKEN
}
```

Remember to keep your credentials saved in environment variables or terraform autovars that are not checked into your source files.

Start by making a call to `cf-terraforming` to enumerate the Terraform configuration for the DNS records for the zone you want to manage with Terraform.

```sh
$ cf-terraforming --email $CLOUDFLARE_EMAIL --token $CLOUDFLARE_API_TOKEN -z 1109d899a5ff5fd74bc01e581693685a --resource-type cloudflare_record > importing-example.tf
```

{{<Aside type="note" header="Note">}}
The previous command assumes that your current folder when running the command is `{GOPATH}/src/github.com/cloudflare/cf-terraforming`.

If you used `go get` to install `cf-terraforming` and if `$GOPATH/bin` is in your `PATH`, you can use a simplified command — instead of running `go run cmd/cf-terraforming/main.go <parameters>` you can run `cf-terraforming <parameters>`.
{{</Aside>}}

If you had not redirected the output to the `importing-example.tf` file, the result displayed in the standard output (your terminal window) would look like the following:

```tf
resource "cloudflare_record" "mitigateddos_net_mitigateddos_net" {
    zone_id = var.zone_id
    name    = "@"
    type    = "A"
    ttl     = "1"
    proxied = "true"
    value   = "192.0.2.1"
}

resource "cloudflare_record" "mitigateddos_net_www_mitigateddos_net" {
    zone_id = var.zone_id
    name    = "www"
    type    = "CNAME"
    ttl     = "1"
    proxied = "true"
    value   = "mitigateddos.net"
}

resource "cloudflare_record" "mitigateddos_net_a123_mitigateddos_net" {
    zone_id = var.zone_id
    name    = "a123"
    type    = "NS"
    ttl     = "300"
    proxied = "false"
    value   = "rafe.ns.cloudflare.com"
}

resource "cloudflare_record" "mitigateddos_net_a123_mitigateddos_net_2" {
    zone_id = var.zone_id
    name    = "a123"
    type    = "NS"
    ttl     = "300"
    proxied = "false"
    value   = "terin.ns.cloudflare.com"
}
```

Calling `terraform plan` at this point will try to create these resources as if they did not exist, since they are not present in the local state file:

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

  + cloudflare_record.mitigateddos_net_a123_mitigateddos_net
      id:          <computed>
      created_on:  <computed>
      domain:      "mitigateddos.net"
      hostname:    <computed>
      metadata.%:  <computed>
      modified_on: <computed>
      name:        "a123.mitigateddos.net"
      proxiable:   <computed>
      proxied:     "false"
      ttl:         "300"
      type:        "NS"
      value:       "rafe.ns.cloudflare.com"
      zone_id:     <computed>

  + cloudflare_record.mitigateddos_net_a123_mitigateddos_net_2
      id:          <computed>
      created_on:  <computed>
      domain:      "mitigateddos.net"
      hostname:    <computed>
      metadata.%:  <computed>
      modified_on: <computed>
      name:        "a123.mitigateddos.net"
      proxiable:   <computed>
      proxied:     "false"
      ttl:         "300"
      type:        "NS"
      value:       "terin.ns.cloudflare.com"
      zone_id:     <computed>

  + cloudflare_record.mitigateddos_net_mitigateddos_net
      id:          <computed>
      created_on:  <computed>
      domain:      "mitigateddos.net"
      hostname:    <computed>
      metadata.%:  <computed>
      modified_on: <computed>
      name:        "mitigateddos.net"
      proxiable:   <computed>
      proxied:     "true"
      ttl:         "1"
      type:        "A"
      value:       "192.0.2.1"
      zone_id:     <computed>

  + cloudflare_record.mitigateddos_net_www_mitigateddos_net
      id:          <computed>
      created_on:  <computed>
      domain:      "mitigateddos.net"
      hostname:    <computed>
      metadata.%:  <computed>
      modified_on: <computed>
      name:        "www.mitigateddos.net"
      proxiable:   <computed>
      proxied:     "true"
      ttl:         "1"
      type:        "CNAME"
      value:       "mitigateddos.net"
      zone_id:     <computed>


Plan: 4 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------
```

To fix this, import the real state of those resources from Cloudflare into the Terraform state file (`.tfstate`) via Terraform import.

### Import resources into Terraform state

Soon, `cf-terraforming` will also allow you to import local state (`.tfstate` file) for the same resources you imported during configuration. For now, use the standard Terraform `import` call to get the proper Terraform state imported. Below, each resource is imported individually, specifying the name of the resource and the `<zone_name>/<resource_id>` returned by `api.cloudflare.com`.

{{<Aside type="note" header="Tip">}}
Running `cf-terraforming -v` will log Cloudflare resource IDs to standard output, which can help with running Terraform `import`.
{{</Aside>}}

```sh
$ terraform import cloudflare_record.mitigateddos_net_mitigateddos_net mitigateddos.net/6702ceac85496311b1fa86a4ecc2fd47
cloudflare_record.mitigateddos_net_mitigateddos_net: Importing from ID "mitigateddos.net/6702ceac85496311b1fa86a4ecc2fd47"...
cloudflare_record.mitigateddos_net_mitigateddos_net: Import complete!
  Imported cloudflare_record (ID: 6702ceac85496311b1fa86a4ecc2fd47)
cloudflare_record.mitigateddos_net_mitigateddos_net: Refreshing state... (ID: 6702ceac85496311b1fa86a4ecc2fd47)

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.

$ terraform import cloudflare_record.mitigateddos_net_www_mitigateddos_net mitigateddos.net/d09d916d059aa9fc8cb54bdd49deea5f
cloudflare_record.mitigateddos_net_www_mitigateddos_net: Importing from ID "mitigateddos.net/d09d916d059aa9fc8cb54bdd49deea5f"...
cloudflare_record.mitigateddos_net_www_mitigateddos_net: Import complete!
  Imported cloudflare_record (ID: d09d916d059aa9fc8cb54bdd49deea5f)
cloudflare_record.mitigateddos_net_www_mitigateddos_net: Refreshing state... (ID: d09d916d059aa9fc8cb54bdd49deea5f)

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.

$ terraform import cloudflare_record.mitigateddos_net_a123_mitigateddos_net mitigateddos.net/8d6ec0d02c5b22212ff673782c816ef8
cloudflare_record.mitigateddos_net_a123_mitigateddos_net: Importing from ID "mitigateddos.net/8d6ec0d02c5b22212ff673782c816ef8"...
cloudflare_record.mitigateddos_net_a123_mitigateddos_net: Import complete!
  Imported cloudflare_record (ID: 8d6ec0d02c5b22212ff673782c816ef8)
cloudflare_record.mitigateddos_net_a123_mitigateddos_net: Refreshing state... (ID: 8d6ec0d02c5b22212ff673782c816ef8)

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.

$ terraform import cloudflare_record.mitigateddos_net_a123_mitigateddos_net_2 mitigateddos.net/3766b952a2dda4c47e71952aeef33c77
cloudflare_record.mitigateddos_net_a123_mitigateddos_net_2: Importing from ID "mitigateddos.net/3766b952a2dda4c47e71952aeef33c77"...
cloudflare_record.mitigateddos_net_a123_mitigateddos_net_2: Import complete!
  Imported cloudflare_record (ID: 3766b952a2dda4c47e71952aeef33c77)
cloudflare_record.mitigateddos_net_a123_mitigateddos_net_2: Refreshing state... (ID: 3766b952a2dda4c47e71952aeef33c77)

Import successful!

The resources that were imported are shown above. These resources are now in
your Terraform state and will henceforth be managed by Terraform.
```

Now when you run `terraform plan`, it no longer attempts to re-create the records above.

```sh
$ terraform plan | grep changes
No changes. Infrastructure is up-to-date.
```
