---
title: 5 – Add exceptions with Page Rules
pcx_content_type: tutorial
weight: 6
meta:
  title: Add exceptions with Page Rules (legacy)
---

# Add exceptions with Page Rules

In the [Configure HTTPS settings](/terraform/tutorial/configure-https-settings/) tutorial, you configured zone settings that apply to all incoming requests for `example.com`. In this tutorial, you will add an exception to these settings using [Page Rules](/rules/page-rules/) (deprecated).

Specifically, you will increase the security level for a URL known to be expensive to render and cannot be cached: `https://www.example.com/expensive-db-call`. Additionally, you will add a redirect from the previous URL used to host this page.

## 1. Create a new branch and append the page rule

Create a new branch and append the configuration.

```bash
$ git checkout -b step5-pagerule
Switched to a new branch 'step5-pagerule'

$ cat >> cloudflare.tf <<'EOF'
resource "cloudflare_page_rule" "increase-security-on-expensive-page" {
  zone_id  = var.zone_id
  target   = "www.${var.domain}/expensive-db-call"
  priority = 1

  actions {
    security_level = "under_attack"
  }
}

resource "cloudflare_page_rule" "redirect-to-new-db-page" {
  zone_id  = var.zone_id
  target   = "www.${var.domain}/old-location.php"
  priority = 2

  actions {
    forwarding_url {
      url = "https://www.${var.domain}/expensive-db-call"
      status_code = 301
    }
  }
}
EOF
```

## 2. Preview and merge the changes

Preview the changes Terraform will make and then merge them into the `master` branch.

```sh
$ terraform plan
cloudflare_record.www-asia: Refreshing state... [id=fda39d8c9bf909132e82a36bab992864]
cloudflare_record.www: Refreshing state... [id=c38d3103767284e7cd14d5dad3ab8669]
cloudflare_zone_settings_override.example-com-settings: Refreshing state... [id=e2e6491340be87a3726f91fc4148b126]
cloudflare_load_balancer_monitor.get-root-https: Refreshing state... [id=4238142473fcd48e89ef1964be72e3e0]
cloudflare_load_balancer_pool.www-servers: Refreshing state... [id=906d2a7521634783f4a96c062eeecc6d]
cloudflare_load_balancer.www-lb: Refreshing state... [id=cb94f53f150e5c1a65a07e43c5d4cac4]

Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_page_rule.increase-security-on-expensive-page will be created
  + resource "cloudflare_page_rule" "increase-security-on-expensive-page" {
      + id       = (known after apply)
      + priority = 1
      + status   = "active"
      + target   = "www.example.com/expensive-db-call"
      + zone_id  = "e2e6491340be87a3726f91fc4148b126"

      + actions {
          + always_use_https    = false
          + disable_apps        = false
          + disable_performance = false
          + disable_security    = false
          + disable_zaraz       = false
          + security_level      = "under_attack"
        }
    }

  # cloudflare_page_rule.redirect-to-new-db-page will be created
  + resource "cloudflare_page_rule" "redirect-to-new-db-page" {
      + id       = (known after apply)
      + priority = 2
      + status   = "active"
      + target   = "www.example.com/old-location.php"
      + zone_id  = "e2e6491340be87a3726f91fc4148b126"

      + actions {
          + always_use_https    = false
          + disable_apps        = false
          + disable_performance = false
          + disable_security    = false
          + disable_zaraz       = false

          + forwarding_url {
              + status_code = 301
              + url         = "https://www.example.com/expensive-db-call"
            }
        }
    }

Plan: 2 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't use the -out option to save this plan, so Terraform can't
guarantee to take exactly these actions if you run "terraform apply" now.

$ git add cloudflare.tf

$ git commit -m "Step 5 - Add two Page Rules."
[step5-pagerule d4fec16] Step 5 - Add two Page Rules.
 1 file changed, 23 insertions(+)

$ git checkout master
Switched to branch 'master'

$ git merge step5-pagerule
Updating 7a2ac34..d4fec16
Fast-forward
 cloudflare.tf | 23 +++++++++++++++++++++++
 1 file changed, 23 insertions(+)
```

## 3. Apply and verify the changes

First, test request the (now missing) old location of the expensive-to-render page.

```sh
$ curl -vso /dev/null https://www.example.com/old-location.php 2>&1 | grep "< HTTP\|Location"
< HTTP/1.1 404 Not Found
```

As expected, the location cannot be found. Apply the Page Rules, including the redirect that should fix this error.

```sh
$ terraform apply --auto-approve
cloudflare_record.www-asia: Refreshing state... [id=fda39d8c9bf909132e82a36bab992864]
cloudflare_load_balancer_monitor.get-root-https: Refreshing state... [id=4238142473fcd48e89ef1964be72e3e0]
cloudflare_zone_settings_override.example-com-settings: Refreshing state... [id=e2e6491340be87a3726f91fc4148b126]
cloudflare_record.www: Refreshing state... [id=c38d3103767284e7cd14d5dad3ab8669]
cloudflare_load_balancer_pool.www-servers: Refreshing state... [id=906d2a7521634783f4a96c062eeecc6d]
cloudflare_load_balancer.www-lb: Refreshing state... [id=cb94f53f150e5c1a65a07e43c5d4cac4]

Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_page_rule.increase-security-on-expensive-page will be created
  + resource "cloudflare_page_rule" "increase-security-on-expensive-page" {
      + id       = (known after apply)
      + priority = 1
      + status   = "active"
      + target   = "www.example.com/expensive-db-call"
      + zone_id  = "e2e6491340be87a3726f91fc4148b126"

      + actions {
          + always_use_https    = false
          + disable_apps        = false
          + disable_performance = false
          + disable_security    = false
          + disable_zaraz       = false
          + security_level      = "under_attack"
        }
    }

  # cloudflare_page_rule.redirect-to-new-db-page will be created
  + resource "cloudflare_page_rule" "redirect-to-new-db-page" {
      + id       = (known after apply)
      + priority = 2
      + status   = "active"
      + target   = "www.example.com/old-location.php"
      + zone_id  = "e2e6491340be87a3726f91fc4148b126"

      + actions {
          + always_use_https    = false
          + disable_apps        = false
          + disable_performance = false
          + disable_security    = false
          + disable_zaraz       = false

          + forwarding_url {
              + status_code = 301
              + url         = "https://www.example.com/expensive-db-call"
            }
        }
    }

cloudflare_page_rule.redirect-to-new-db-page: Creating...
cloudflare_page_rule.increase-security-on-expensive-page: Creating...
cloudflare_page_rule.redirect-to-new-db-page: Creation complete after 3s [id=c5c40ff2dc12416b5fe4d0541980c591]
cloudflare_page_rule.increase-security-on-expensive-page: Creation complete after 6s [id=1c13fdb84710c4cc8b11daf7ffcca449]

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.
```

With the Page Rules in place, try that call again, along with a test for the I'm Under Attack mode:

```sh
$ curl -vso /dev/null https://www.example.com/old-location.php 2>&1 | grep "< HTTP\|Location"
< HTTP/1.1 301 Moved Permanently
< Location: https://www.example.com/expensive-db-call

$ curl -vso /dev/null https://www.example.com/expensive-db-call 2>&1 | grep "< HTTP"
< HTTP/1.1 503 Service Temporarily Unavailable
```

The call works as expected. In the first case, the Cloudflare global network responds with a `301` redirecting the browser to the new location. In the second case, the Cloudflare global network initially responds with a `503`, which is consistent with the I'm Under Attack mode.
