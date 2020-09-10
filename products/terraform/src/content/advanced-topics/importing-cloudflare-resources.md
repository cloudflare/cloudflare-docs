# Importing Cloudflare resources

An important point to understand about Terraform is that it is only able to manage configuration that it created, or was explicitly told about after the fact. The reason for this limitation is that Terraform expects to be authoritative for the resources its manages. It relies on 2 types of files to understand what resources it controls, and what state they are in. This is how it determines when and how to make changes.

1. A [configuration file](https://www.terraform.io/docs/configuration/index.html) (ending in .tf) that defines the configuration of resources for Terraform to manage. This is what you worked with in the tutorial steps.
2. A local [state file](https://www.terraform.io/docs/state/) that maps the resource names defined in your configuration file, e.g., cloudflare_load_balancer.www-lb to the resources that exist in Cloudflare.

When Terraform makes calls to Cloudflare's API to create new resources as illustrated in the [tutorial](/tutorial), it persists those IDs to a state file. By default, the `terraform.tfstate` file in your directory is used, but this can also be a [remote location](https://www.terraform.io/docs/state/remote.html). These IDs are later looked up and refreshed when you call `terraform plan` and `terraform apply`.

If you've configured Cloudflare through other means, e.g., by logging into the Cloudflare Dashboard or making `curl` calls to api.cloudflare.com, Terraform does not (yet) have these resource IDs in the state file. To manage this preexisting configuration you will need to first i) reproduce the configuration in your config file and; ii) import resources one-by-one by providing their IDs and resource names.

## Introducing Cf-Teraforming

To help with this process, we have published a library called [cf-terraforming](https://github.com/cloudflare/cf-terraforming). Our goal with cf-terraforming is to make it easy for existing Cloudflare customers to get going with Terraform. Currently, cf-terraforming helps to generate terraform config state by fetching all the resources of a specified type from the account and/or zone of your choosing. Let's try it out.

First, `go get` cf-terraforming with `go get -u github.com/cloudflare/cf-terraforming/...`

You can use `cf-terraforming` or `cf-terraforming -h` to view the help file, but to use cf-terraforming there are 4 things to specify:

1. Your Cloudflare user email - `--email` or `-e`
2. Your Cloudflare API key - `--key` or `-k`
3. The account and/or zone to pull resources from - `--account`/`--zone` or `-a`/`-z`
  * Specifying an account will generate configuration for all resources from all zones in that account.
4. The Cloudflare resources to generate config

The list of supported resources currently are:

* [access_application](https://www.terraform.io/docs/providers/cloudflare/r/access_application.html)
* [access_policy](https://www.terraform.io/docs/providers/cloudflare/r/access_policy.html)
* [access_rule](https://www.terraform.io/docs/providers/cloudflare/r/access_rule.html)
* [account_member](https://www.terraform.io/docs/providers/cloudflare/r/account_member.html)
* [custom_pages](https://www.terraform.io/docs/providers/cloudflare/r/custom_pages.html)
* [filter](https://www.terraform.io/docs/providers/cloudflare/r/filter.html)
* [firewall_rule](https://www.terraform.io/docs/providers/cloudflare/r/firewall_rule.html)
* [load_balancer](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer.html)
* [load_balancer_monitor](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer_monitor.html)
* [load_balancer_pool](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer_pool.html)
* [page_rule](https://www.terraform.io/docs/providers/cloudflare/r/page_rule.html)
* [rate_limit](https://www.terraform.io/docs/providers/cloudflare/r/rate_limit.html)
* [record](https://www.terraform.io/docs/providers/cloudflare/r/record.html)
* [spectrum_application](https://www.terraform.io/docs/providers/cloudflare/r/spectrum_application.html)
* [waf_rule](https://www.terraform.io/docs/providers/cloudflare/r/waf_rule.html)
* [worker_route](https://www.terraform.io/docs/providers/cloudflare/r/worker_route.html)
* [worker_script](https://www.terraform.io/docs/providers/cloudflare/r/worker_script.html)
* [zone](https://www.terraform.io/docs/providers/cloudflare/r/zone.html)
* [zone_lockdown](https://www.terraform.io/docs/providers/cloudflare/r/zone_lockdown.html)
* [zone_settings_override](https://www.terraform.io/docs/providers/cloudflare/r/zone_settings_override.html)

## Importing existing Cloudflare resources

As mentioned, to start managing existing Cloudflare resources in Terraform, e.g., DNS records, you need two things:

1. The Terraform configuration of that resource (defined in a .tf file)
2. An accompanying Terraform state file of that resources state (defined in a .tfstate file)

### 1. Generate Terraform Configuration with Cf-Terraforming
If you don't have a Terraform configuration file defined, all you need is the provider blocked defined as follows:

```tf
provider 'cloudflare' {
 # Cloudflare email saved in $CLOUDFLARE_EMAIL
 # Cloudflare API key saved in $CLOUDFLARE_TOKEN
}
```

Remember to keep your credentials saved in environment variables or terraform autovars that aren't checked into your source files!

We start by making a call to Cf-Terraforming to enumerate the Terraform configuration for the DNS records for the zone we want to manage with Terraform.

Note: The below command assumes you run the tool from `{GOPATH}/src/github.com/cloudflare/cf-terraforming`. If pulled with `go get` and if `$GOPATH/bin` is in your `$PATH` you should be able to just run the tool with `$ cf-terraforming <parameters>`.
```
$ go run cmd/cf-terraforming/main.go --email $CLOUDFLARE_EMAIL --key $CLOUDFLARE_TOKEN -z 1109d899a5ff5fd74bc01e581693685a record > importing-example.tf
```

If output to standard out, the result would look like the below. In this case we directly imported the configuration into our Terraform configuration file `importing-state.tf`.

```tf
resource "cloudflare_record" "mitigateddos_net_mitigateddos_net" {
    domain = "mitigateddos.net"

    name = "mitigateddos.net"
    type = "A"
    ttl = "1"
    proxied = "true"

    value = "1.2.3.4"
}

resource "cloudflare_record" "mitigateddos_net_www_mitigateddos_net" {
    domain = "mitigateddos.net"

    name = "www.mitigateddos.net"
    type = "CNAME"
    ttl = "1"
    proxied = "true"

    value = "mitigateddos.net"
}

resource "cloudflare_record" "mitigateddos_net_a123_mitigateddos_net" {
    domain = "mitigateddos.net"

    name = "a123.mitigateddos.net"
    type = "NS"
    ttl = "1"
    proxied = "false"

    value = "rafe.ns.cloudflare.com":50
}

resource "cloudflare_record" "mitigateddos_net_a123_mitigateddos_net_2" {
    domain = "mitigateddos.net"

    name = "a123.mitigateddos.net"
    type = "NS"
    ttl = "1"
    proxied = "false"

    value = "terin.ns.cloudflare.com"
}
```

Calling terraform `plan` now will attempt to create these resources as if they didn't exist which isn't exactly what we desire.

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
      ttl:         "1"
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
      ttl:         "1"
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
      value:       "185.59.204.191"
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

In order to fix that we will need to import the real state of those resources from Cloudflare into the Terraform state file (.tfstate) via Terraform import.

### iii. Import resources into Terraform state

Soon cf-terraforming will also allow you to import tfstate for the same resources you imported the configuration. For now, we use the standard Terraform `import` call to get the proper Terraform state imported. Below we import them one-by-one, specifying the name of the resource and the `zoneName/resourceID` returned by api.cloudflare.com.

Hint: If you run cf-terraforming with `-v` to stdout, we will log the resource ids in Cloudflare which can help with running Terraform `import`.

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

Now when we run `terraform plan` it no longer wants to (re-)create the above records.

```sh
$ terraform plan | grep changes
No changes. Infrastructure is up-to-date.
```
