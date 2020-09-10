---
title: 6 – Making some exceptions
order: 6
---

# Making some exceptions

In [step 3](/tutorial/zone-settings) we configured zone settings that apply to all of example.com. In this step we're going to add an exception to these settings by using [Page Rules](https://www.cloudflare.com/features-page-rules/).

Specifically, we're going to turn increase the security level for a URL we know is expensive to render (and cannot be cached): https://www.example.com/expensive-db-call. Additionally, we're going to add a redirect from the previous URL we used to host this page.

## 1. Create a new branch and append the page rule

As usual we'll create a new branch and append our configuration.

```sh
$ git checkout -b step6-pagerule
Switched to a new branch 'step6-pagerule'

$ cat >> cloudflare.tf <<'EOF'
resource "cloudflare_page_rule" "increase-security-on-expensive-page" {
  zone = "${var.domain}"
  target = "www.${var.domain}/expensive-db-call"
  priority = 10

  actions = {
    security_level = "under_attack",
  }
}

resource "cloudflare_page_rule" "redirect-to-new-db-page" {
  zone = "${var.domain}"
  target = "www.${var.domain}/old-location.php"
  priority = 10

  actions = {
    forwarding_url {
      url = "https://www.${var.domain}/expensive-db-call"
      status_code = 301
    }
  }
}
EOF
```

## 2. Preview and merge the changes

You know the drill: preview the changes Terraform is going to make and then merge them into the master branch.

```sh
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_rate_limit.login-limit: Refreshing state... (ID: 8d518c5d6e63406a9466d83cb8675bb6)
cloudflare_record.www-asia: Refreshing state... (ID: fda39d8c9bf909132e82a36bab992864)
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)
cloudflare_load_balancer_monitor.get-root-https: Refreshing state... (ID: 4238142473fcd48e89ef1964be72e3e0)
cloudflare_load_balancer_pool.www-servers: Refreshing state... (ID: 906d2a7521634783f4a96c062eeecc6d)
cloudflare_load_balancer.www-lb: Refreshing state... (ID: cb94f53f150e5c1a65a07e43c5d4cac4)

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  + cloudflare_page_rule.increase-security-on-expensive-page
      id:                                     <computed>
      actions.#:                              "1"
      actions.0.always_use_https:             "false"
      actions.0.disable_apps:                 "false"
      actions.0.disable_performance:          "false"
      actions.0.disable_security:             "false"
      actions.0.security_level:               "under_attack"
      priority:                               "10"
      status:                                 "active"
      target:                                 "www.example.com/expensive-db-call"
      zone:                                   "example.com"
      zone_id:                                <computed>

  + cloudflare_page_rule.redirect-to-new-db-page
      id:                                     <computed>
      actions.#:                              "1"
      actions.0.always_use_https:             "false"
      actions.0.disable_apps:                 "false"
      actions.0.disable_performance:          "false"
      actions.0.disable_security:             "false"
      actions.0.forwarding_url.#:             "1"
      actions.0.forwarding_url.0.status_code: "301"
      actions.0.forwarding_url.0.url:         "https://www.example.com/expensive-db-call"
      priority:                               "10"
      status:                                 "active"
      target:                                 "www.example.com/old-location.php"
      zone:                                   "example.com"
      zone_id:                                <computed>


Plan: 2 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.


$ git add cloudflare.tf

$ git commit -m "Step 6 - Add two Page Rules."
[step6-pagerule d4fec16] Step 6 - Add two Page Rules.
 1 file changed, 23 insertions(+)

$ git checkout master
Switched to branch 'master'

$ git merge step6-pagerule
Updating 7a2ac34..d4fec16
Fast-forward
 cloudflare.tf | 23 +++++++++++++++++++++++
 1 file changed, 23 insertions(+)
```

## 3. Apply and verify the changes

First we'll test requesting the (now missing) old location of the expensive-to-render page.

```sh
$ curl -vso /dev/null https://www.example.com/old-location.php 2>&1 | grep "< HTTP\|Location"
< HTTP/1.1 404 Not Found
```

As expected, it can't be found. Let's apply the Page Rules, including the redirect that should fix this error.

```sh
$ terraform apply --auto-approve
cloudflare_record.www-asia: Refreshing state... (ID: fda39d8c9bf909132e82a36bab992864)
cloudflare_load_balancer_monitor.get-root-https: Refreshing state... (ID: 4238142473fcd48e89ef1964be72e3e0)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)
cloudflare_rate_limit.login-limit: Refreshing state... (ID: 8d518c5d6e63406a9466d83cb8675bb6)
cloudflare_load_balancer_pool.www-servers: Refreshing state... (ID: 906d2a7521634783f4a96c062eeecc6d)
cloudflare_load_balancer.www-lb: Refreshing state... (ID: cb94f53f150e5c1a65a07e43c5d4cac4)
cloudflare_page_rule.redirect-to-new-db-page: Creating...
  actions.#:                              "0" => "1"
  actions.0.always_use_https:             "" => "false"
  actions.0.disable_apps:                 "" => "false"
  actions.0.disable_performance:          "" => "false"
  actions.0.disable_security:             "" => "false"
  actions.0.forwarding_url.#:             "0" => "1"
  actions.0.forwarding_url.0.status_code: "" => "301"
  actions.0.forwarding_url.0.url:         "" => "https://www.example.com/expensive-db-call"
  priority:                               "" => "10"
  status:                                 "" => "active"
  target:                                 "" => "www.example.com/old-location.php"
  zone:                                   "" => "example.com"
  zone_id:                                "" => "<computed>"
cloudflare_page_rule.increase-security-on-expensive-page: Creating...
  actions.#:                     "0" => "1"
  actions.0.always_use_https:    "" => "false"
  actions.0.disable_apps:        "" => "false"
  actions.0.disable_performance: "" => "false"
  actions.0.disable_security:    "" => "false"
  actions.0.security_level:      "" => "under_attack"
  priority:                      "" => "10"
  status:                        "" => "active"
  target:                        "" => "www.example.com/expensive-db-call"
  zone:                          "" => "example.com"
  zone_id:                       "" => "<computed>"
cloudflare_page_rule.redirect-to-new-db-page: Creation complete after 3s (ID: c5c40ff2dc12416b5fe4d0541980c591)
cloudflare_page_rule.increase-security-on-expensive-page: Creation complete after 6s (ID: 1c13fdb84710c4cc8b11daf7ffcca449)

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

With the Page Rules in place, let's try that call again, along with the I'm Under Attack Mode test:

```sh
$ curl -vso /dev/null https://www.example.com/old-location.php 2>&1 | grep "< HTTP\|Location"
< HTTP/1.1 301 Moved Permanently
< Location: https://www.upinatoms.com/expensive-db-call

$ curl -vso /dev/null https://www.upinatoms.com/expensive-db-call 2>&1 | grep "< HTTP"
< HTTP/1.1 503 Service Temporarily Unavailable
```

Great, they work as expected! In the first case the Cloudflare edge responds with a `301` redirecting the browser to the new location. In the second case it initially responds with a `503` (as is consistent with the "I Am Under Attack" mode).
