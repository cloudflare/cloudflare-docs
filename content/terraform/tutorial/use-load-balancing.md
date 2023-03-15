---
title: 4 – Improve performance
pcx_content_type: tutorial
weight: 5
meta:
  title: Improve performance and reliability
---

# Improve performance and reliability

In this tutorial, you will add a second origin for some basic round robining, and then use the [Cloudflare Load Balancing](/load-balancing/) product to fail traffic over as needed. You will also enhance your load balancing configuration through the use of "geo steering" to serve results from an origin server that is geographically closest to your end users.

## 1. Add another DNS record for `www`

To get started, add a DNS record for a second web server, located in Asia. The IP address for this server is `198.51.100.15`.

```bash
$ git checkout -b step5-loadbalance
Switched to a new branch 'step5-loadbalance'

$ cat >> cloudflare.tf <<'EOF'
resource "cloudflare_record" "www-asia" {
  zone_id = var.zone_id
  name    = "www"
  value   = "198.51.100.15"
  type    = "A"
  proxied = true
}
EOF
```

Note that while the name of the `resource` is different because Terraform resources of the same type must be uniquely named, the DNS name, or what your customers will type in their browser, is the same: `www`.

## 2. Preview and merge the changes

Check the `terraform plan` and then merge and apply the changes.

```sh
$ terraform plan | grep -v "<computed>"
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  + cloudflare_record.www-asia
      zone_id:     "e097e1136dc79bc1149e32a8a6bde5ef"
      name:        "www"
      proxied:     "true"
      type:        "A"
      value:       "198.51.100.15"


Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.

$ git add cloudflare.tf
$ git commit -m "Step 5 - Add additional 'www' DNS record for Asia data center."
[step5-loadbalance 6761a4f] Step 5 - Add additional 'www' DNS record for Asia data center.
 1 file changed, 7 insertions(+)

$ git checkout master
Switched to branch 'master'

$ git merge step5-loadbalance
Updating e1c38cf..6761a4f
Fast-forward
 cloudflare.tf | 7 +++++++
 1 file changed, 7 insertions(+)
```

## 3. Apply and verify the changes

Add the second DNS record for www.example.com.

```sh
$ terraform apply --auto-approve
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8668)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)
cloudflare_record.www-asia: Creating...
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
  value:       "" => "198.51.100.15"
  zone_id:     "" => "<computed>"
cloudflare_record.www-asia: Creation complete after 1s (ID: fda39d8c9bf909132e82a36bab992864)

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

With the second DNS record in place, make some requests to see where the traffic is served from.

```sh
$ curl https://www.example.com
Hello, this is 203.0.113.10!

$ curl https://www.example.com
Hello, this is 203.0.113.10!

$ curl https://www.example.com
Hello, this is 198.51.100.15!

$ curl https://www.example.com
Hello, this is 203.0.113.10!
```

As noted above, there is no discernible pattern for which origin receives the request. When Cloudflare connects to an origin with multiple DNS records, one of the IP addresses is selected at random. If both IPs are in the same data center and sessions can be shared (that is, it does not matter if the same user hops between origin servers), this may work fine. However, for anything more complicated, such as origins in different geographies or active health checks, you will want to use Cloudflare's Load Balancing product.

## 4. Switch to using Cloudflare's Load Balancing product

{{<Aside type="note">}}
Before proceeding, ensure [Load Balancing is enabled for your account](/load-balancing/how-to/enable-load-balancing/).
{{</Aside>}}

As described in the [Load Balancing tutorial](/learning-paths/load-balancing/), you will need to complete three tasks:

1. Create a monitor to run health checks against your origin servers.
2. Create a pool of one or more origin servers that will receive load balanced traffic.
3. Create a load balancer with an external hostname — for example, `www.example.com` — and one or more pools.

### i. Define and create the health check ("monitor")

To monitor the origins, create a basic health check that makes a `GET` request to each origin on the URL `https://www.example.com`. If the origin returns the `200` status code (`OK`) within five seconds, it is considered healthy. If it fails to do so three times in a row, it is considered unhealthy. This health check will be run once per minute from several regions and send an email notification to `you@example.com` if any failures are detected.

```bash
$ git checkout step5-loadbalance
Switched to branch 'step5-loadbalance'

$ cat >> cloudflare.tf <<'EOF'

resource "cloudflare_load_balancer_monitor" "get-root-https" {
  expected_body  = "alive"
  expected_codes = "200"
  method         = "GET"
  timeout        = 5
  path           = "/"
  interval       = 60
  retries        = 2
  description    = "GET / over HTTPS - expect 200"
}
EOF
```

### ii. Define and create the pool of origins

In this example, the pool will be called `www-servers` with two origins added to it:

* `www-us` (`203.0.113.10`) 
* `www-asia` (`198.51.100.15`)

For now, skip any sort of [geo routing](/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/).

Note the reference to the monitor that you added in the last step. When applying this configuration, Terraform will determine that it first needs to create the monitor before looking up the ID and providing it to the pool you wish to create.

```bash
$ cat >> cloudflare.tf <<'EOF'

resource "cloudflare_load_balancer_pool" "www-servers" {
  name    = "www-servers"
  monitor = cloudflare_load_balancer_monitor.get-root-https.id
  origins {
    name    = "www-us"
    address = "203.0.113.10"
  }
  origins {
    address = "198.51.100.15"
    name    = "www-asia"
  }
  description        = "www origins"
  enabled            = true
  minimum_origins    = 1
  check_regions  = ["WNAM", "ENAM", "WEU", "EEU", "SEAS", "NEAS"]
}
EOF
```

### iii. Define and create the load balancer

When you create a load balancer (LB), it will [replace any existing DNS records with the same name](/load-balancing/reference/dns-records/). For example, if you create the `www.example.com` load balancer below, it will supersede the two `www` DNS records that you previously defined. One benefit of leaving the DNS records in place is that if you temporarily disable load balancing, connections to this hostname are still possible as shown in [step 2](#2-preview-and-merge-the-changes) above.

```bash
$ cat >> cloudflare.tf <<'EOF'

resource "cloudflare_load_balancer" "www-lb" {
  zone_id          = var.zone_id
  name             = "www-lb"
  default_pool_ids = [cloudflare_load_balancer_pool.www-servers.id]
  fallback_pool_id = cloudflare_load_balancer_pool.www-servers.id
  description      = "example load balancer"
  proxied          = true
}
EOF
```

### iv. Preview and merge the changes

As usual, review the proposed plan before applying any changes.

```sh
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)
cloudflare_record.www-asia: Refreshing state... (ID: fda39d8c9bf909132e82a36bab992864)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  + cloudflare_load_balancer.www-lb
      id:                         <computed>
      created_on:                 <computed>
      default_pool_ids.#:         <computed>
      description:                "example load balancer"
      fallback_pool_id:           <computed>
      modified_on:                <computed>
      name:                       "www-lb"
      pop_pools.#:                <computed>
      proxied:                    "true"
      region_pools.#:             <computed>
      ttl:                        <computed>
      zone:                       "example.com"
      zone_id:                    <computed>

  + cloudflare_load_balancer_monitor.get-root-https
      id:                         <computed>
      created_on:                 <computed>
      description:                "GET / over HTTPS - expect 200"
      expected_body:              "alive"
      expected_codes:             "200"
      interval:                   "60"
      method:                     "GET"
      modified_on:                <computed>
      path:                       "/"
      retries:                    "2"
      timeout:                    "5"
      type:                       "http"

  + cloudflare_load_balancer_pool.www-servers
      id:                         <computed>
      check_regions.#:            "6"
      check_regions.1151265357:   "SEAS"
      check_regions.1997072153:   "WEU"
      check_regions.2367191053:   "EEU"
      check_regions.2826842289:   "ENAM"
      check_regions.2992567379:   "WNAM"
      check_regions.3706632574:   "NEAS"
      created_on:                 <computed>
      description:                "www origins"
      enabled:                    "true"
      minimum_origins:            "1"
      modified_on:                <computed>
      monitor:                    <computed>
      name:                       "www-servers"
      notification_email:         "you@example.com"
      origins.#:                  "2"
      origins.3039426352.address: "198.51.100.15"
      origins.3039426352.enabled: "true"
      origins.3039426352.name:    "www-asia"
      origins.4241861547.address: "203.0.113.10"
      origins.4241861547.enabled: "true"
      origins.4241861547.name:    "www-us"


Plan: 3 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

The plan looks good. Merge the plan and apply it.

```sh
$ git add cloudflare.tf
$ git commit -m "Step 5 - Create load balancer (LB) monitor, LB pool, and LB."
[step5-loadbalance bc9aa9a] Step 5 - Create load balancer (LB) monitor, LB pool, and LB.
 1 file changed, 35 insertions(+)

e$ terraform apply --auto-approve
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)
cloudflare_record.www-asia: Refreshing state... (ID: fda39d8c9bf909132e82a36bab992864)
cloudflare_load_balancer_monitor.get-root-https: Creating...
  created_on:     "" => "<computed>"
  description:    "" => "GET / over HTTPS - expect 200"
  expected_body:  "" => "alive"
  expected_codes: "" => "200"
  interval:       "" => "60"
  method:         "" => "GET"
  modified_on:    "" => "<computed>"
  path:           "" => "/"
  retries:        "" => "2"
  timeout:        "" => "5"
  type:           "" => "http"
cloudflare_load_balancer_monitor.get-root-https: Creation complete after 1s (ID: 4238142473fcd48e89ef1964be72e3e0)
cloudflare_load_balancer_pool.www-servers: Creating...
  check_regions.#:            "" => "6"
  check_regions.1151265357:   "" => "SEAS"
  check_regions.1997072153:   "" => "WEU"
  check_regions.2367191053:   "" => "EEU"
  check_regions.2826842289:   "" => "ENAM"
  check_regions.2992567379:   "" => "WNAM"
  check_regions.3706632574:   "" => "NEAS"
  created_on:                 "" => "<computed>"
  description:                "" => "www origins"
  enabled:                    "" => "true"
  minimum_origins:            "" => "1"
  modified_on:                "" => "<computed>"
  monitor:                    "" => "4238142473fcd48e89ef1964be72e3e0"
  name:                       "" => "www-servers"
  notification_email:         "" => "you@example.com"
  origins.#:                  "" => "2"
  origins.3039426352.address: "" => "198.51.100.15"
  origins.3039426352.enabled: "" => "true"
  origins.3039426352.name:    "" => "www-asia"
  origins.4241861547.address: "" => "203.0.113.10"
  origins.4241861547.enabled: "" => "true"
  origins.4241861547.name:    "" => "www-us"
cloudflare_load_balancer_pool.www-servers: Creation complete after 0s (ID: 906d2a7521634783f4a96c062eeecc6d)
cloudflare_load_balancer.www-lb: Creating...
  created_on:         "" => "<computed>"
  default_pool_ids.#: "" => "1"
  default_pool_ids.0: "" => "906d2a7521634783f4a96c062eeecc6d"
  description:        "" => "example load balancer"
  fallback_pool_id:   "" => "906d2a7521634783f4a96c062eeecc6d"
  modified_on:        "" => "<computed>"
  name:               "" => "www-lb"
  pop_pools.#:        "" => "<computed>"
  proxied:            "" => "true"
  region_pools.#:     "" => "<computed>"
  ttl:                "" => "<computed>"
  zone:               "" => "example.com"
  zone_id:            "" => "<computed>"
cloudflare_load_balancer.www-lb: Creation complete after 1s (ID: cb94f53f150e5c1a65a07e43c5d4cac4)

Apply complete! Resources: 3 added, 0 changed, 0 destroyed.
```

### v. Test the changes

With load balancing in place, run four `curl` requests again to see where the traffic is served from.

```sh
$ for i in {1..4}; do curl https://www.example.com && sleep 5; done
Hello, this is 198.51.100.15!

Hello, this is 203.0.113.10!

Hello, this is 198.51.100.15!

Hello, this is 203.0.113.10!
```

You should now see each request load balanced evenly across the two origins you defined.
