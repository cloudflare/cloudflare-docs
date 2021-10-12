---
title: 7 – Revert configuration
order: 7
pcx-content-type: tutorial
---

# Revert configuration

Sometimes, you may have to roll back configuration changes. For example, you might want to run performance tests on a new configuration or maybe you mistyped an IP address and brought your entire site down.

To revert your configuration, check out the desired branch and ask Terraform to move your Cloudflare settings back in time. If you accidentally brought your site down, consider establishing a good strategy for peer reviewing pull requests rather than merging directly to `master` as done in the tutorials for brevity.

## 1. Review your configuration history

Before determining how far back to revert, review the versioned history.

```sh
$ git log
commit d4fec164581bec44684a4d59bb80aec1f1da5a6e
Author: Me
Date:   Wed Apr 18 22:04:52 2018 -0700

    Step 6 - Add two Page Rules.

commit bc9aa9a465a4c8d6deeaa0491814c9f364e9aa8a
Author: Me
Date:   Sun Apr 15 23:58:35 2018 -0700

    Step 5 - Create load balancer (LB) monitor, LB pool, and LB.

commit 6761a4f754e77322629ba4e90a90a3defa1fd4b6
Author: Me
Date:   Wed Apr 11 11:20:25 2018 -0700

    Step 5 - Add additional 'www' DNS record for Asia data center.

commit e1c38cf6f4230a48114ce7b747b77d6435d4646c
Author: Me
Date:   Mon Apr 9 12:34:44 2018 -0700

    Step 4 - Update /login rate limit rule from 'simulate' to 'ban'.

commit 0f7e499c70bf5994b5d89120e0449b8545ffdd24
Author: Me
Date:   Mon Apr 9 12:22:43 2018 -0700

    Step 4 - Add rate limiting rule to protect /login.

commit d540600b942cbd89d03db52211698d331f7bd6d7
Author: Me
Date:   Sun Apr 8 22:21:27 2018 -0700

    Step 3 - Enable TLS 1.3, Always Use HTTPS, and SSL Strict mode.

commit 494c6d61b918fce337ca4c0725c9bbc01e00f0b7
Author: Me
Date:   Sun Apr 8 19:58:56 2018 -0700

    Step 2 - Ignore terraform plugin directory and state file.

commit 5acea176050463418f6ac1029674c152e3056bc6
Author: Me
Date:   Sun Apr 8 19:52:13 2018 -0700

    Step 2 - Initial commit with webserver definition.
```

Another benefit of storing your Cloudflare configuration in Git is that you can see who made the change. You can also see who reviewed and approved the change if you peer review pull requests).

## 2. Examining specific historical changes

Check when last change was made.

```sh
$ git show
commit d4fec164581bec44684a4d59bb80aec1f1da5a6e
Author: Me
Date:   Wed Apr 18 22:04:52 2018 -0700

    Step 6 - Add two Page Rules.

diff --git a/cloudflare.tf b/cloudflare.tf
index 0b39450..ef11d8a 100644
--- a/cloudflare.tf
+++ b/cloudflare.tf
@@ -94,3 +94,26 @@ resource "cloudflare_load_balancer" "www-lb" {
   description = "example load balancer"
   proxied = true
 }
+
+resource "cloudflare_page_rule" "increase-security-on-expensive-page" {
+  zone_id = var.zone_id
+  target = "www.${var.domain}/expensive-db-call"
+  priority = 1
+
+  actions = {
+    security_level = "under_attack",
+  }
+}
+
+resource "cloudflare_page_rule" "redirect-to-new-db-page" {
+  zone_id = var.zone_id
+  target = "www.${var.domain}/old-location.php"
+  priority = 2
+
+  actions = {
+    forwarding_url {
+      url = "https://${var.domain}/expensive-db-call"
+      status_code = 301
+    }
+  }
+}
```

Review the past few changes.

```sh
$ git log -p -3

...
// page rule config from above
...

commit bc9aa9a465a4c8d6deeaa0491814c9f364e9aa8a
Author: Me
Date:   Sun Apr 15 23:58:35 2018 -0700

    Step 5 - Create load balancer (LB) monitor, LB pool, and LB.

diff --git a/cloudflare.tf b/cloudflare.tf
index b92cb6f..195b646 100644
--- a/cloudflare.tf
+++ b/cloudflare.tf
@@ -59,3 +59,38 @@ resource "cloudflare_record" "www-asia" {
   type    = "A"
   proxied = true
 }
+resource "cloudflare_load_balancer_monitor" "get-root-https" {
+  expected_body = "alive"
+  expected_codes = "200"
+  method = "GET"
+  timeout = 5
+  path = "/"
+  interval = 60
+  retries = 2
+  description = "GET / over HTTPS - expect 200"
+}
+resource "cloudflare_load_balancer_pool" "www-servers" {
+  name = "www-servers"
+  monitor = cloudflare_load_balancer_monitor.get-root-https.id
+  check_regions = ["WNAM", "ENAM", "WEU", "EEU", "SEAS", "NEAS"]
+  origins {
+    name = "www-us"
+    address = "203.0.113.10"
+  }
+  origins {
+    name = "www-asia"
+    address = "198.51.100.15"
+  }
+  description = "www origins"
+  enabled = true
+  minimum_origins = 1
+  notification_email = "you@example.com"
+}
+resource "cloudflare_load_balancer" "www-lb" {
+  zone_id = var.zone_id
+  name = "www-lb"
+  default_pool_ids = [cloudflare_load_balancer_pool.www-servers.id]
+  fallback_pool_id = cloudflare_load_balancer_pool.www-servers.id
+  description = "example load balancer"
+  proxied = true
+}

commit 6761a4f754e77322629ba4e90a90a3defa1fd4b6
Author: Me
Date:   Wed Apr 11 11:20:25 2018 -0700

    Step 5 - Add additional 'www' DNS record for Asia data center.

diff --git a/cloudflare.tf b/cloudflare.tf
index 9f25a0c..b92cb6f 100644
--- a/cloudflare.tf
+++ b/cloudflare.tf
@@ -52,3 +52,10 @@ resource "cloudflare_rate_limit" "login-limit" {
   disabled = false
   description = "Block failed login attempts (5 in 1 min) for 5 minutes."
 }
+resource "cloudflare_record" "www-asia" {
+  zone_id = var.zone_id
+  name    = "www"
+  value   = "198.51.100.15"
+  type    = "A"
+  proxied = true
+}
```

## 3. Redeploy the previous configuration

Assume that shortly after you deployed the Page Rules from [step 6](/tutorial/add-page-rules), you are told the URL is no longer needed, and the security setting and redirect should be dropped.

While you can always edit the config file directly and delete those entries, you can use `git` to do that for you. First, tell git to revert the last commit without rewriting history.

### i. Revert the branch to the previous commit

```sh
$ git revert HEAD~1..HEAD
[master f9a6f7d] Revert "Step 6 - Bug fix."
 1 file changed, 1 insertion(+), 1 deletion(-)

$ git log -2
commit f9a6f7db72ea1437e146050a5e7556052ecc9a1a
Author: Me
Date:   Wed Apr 18 23:28:09 2018 -0700

    Revert "Step 6 - Add two Page Rules."

    This reverts commit d4fec164581bec44684a4d59bb80aec1f1da5a6e.

commit d4fec164581bec44684a4d59bb80aec1f1da5a6e
Author: Me
Date:   Wed Apr 18 22:04:52 2018 -0700

    Step 6 - Add two Page Rules.
```

### ii. Preview the changes

As expected, Terraform is indicating it will remove the two Page Rules created in the previous step.

```sh
$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_page_rule.increase-security-on-expensive-page: Refreshing state... (ID: 1c13fdb84710c4cc8b11daf7ffcca449)
cloudflare_page_rule.redirect-to-new-db-page: Refreshing state... (ID: c5c40ff2dc12416b5fe4d0541980c591)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)
cloudflare_rate_limit.login-limit: Refreshing state... (ID: 8d518c5d6e63406a9466d83cb8675bb6)
cloudflare_load_balancer_monitor.get-root-https: Refreshing state... (ID: 4238142473fcd48e89ef1964be72e3e0)
cloudflare_record.www-asia: Refreshing state... (ID: fda39d8c9bf909132e82a36bab992864)
cloudflare_load_balancer_pool.www-servers: Refreshing state... (ID: 906d2a7521634783f4a96c062eeecc6d)
cloudflare_load_balancer.www-lb: Refreshing state... (ID: cb94f53f150e5c1a65a07e43c5d4cac4)

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  - destroy

Terraform will perform the following actions:

  - cloudflare_page_rule.increase-security-on-expensive-page

  - cloudflare_page_rule.redirect-to-new-db-page


Plan: 0 to add, 0 to change, 2 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

### iii. Apply the changes

The changes look good, and Terraform can revert the Cloudflare configuration.

```sh
$ terraform apply --auto-approve
cloudflare_page_rule.redirect-to-new-db-page: Refreshing state... (ID: c5c40ff2dc12416b5fe4d0541980c591)
cloudflare_page_rule.increase-security-on-expensive-page: Refreshing state... (ID: 1c13fdb84710c4cc8b11daf7ffcca449)
cloudflare_rate_limit.login-limit: Refreshing state... (ID: 8d518c5d6e63406a9466d83cb8675bb6)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)
cloudflare_load_balancer_monitor.get-root-https: Refreshing state... (ID: 4238142473fcd48e89ef1964be72e3e0)
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)
cloudflare_record.www-asia: Refreshing state... (ID: fda39d8c9bf909132e82a36bab992864)
cloudflare_load_balancer_pool.www-servers: Refreshing state... (ID: 906d2a7521634783f4a96c062eeecc6d)
cloudflare_load_balancer.www-lb: Refreshing state... (ID: cb94f53f150e5c1a65a07e43c5d4cac4)
cloudflare_page_rule.redirect-to-new-db-page: Destroying... (ID: c5c40ff2dc12416b5fe4d0541980c591)
cloudflare_page_rule.increase-security-on-expensive-page: Destroying... (ID: 1c13fdb84710c4cc8b11daf7ffcca449)
cloudflare_page_rule.increase-security-on-expensive-page: Destruction complete after 0s
cloudflare_page_rule.redirect-to-new-db-page: Destruction complete after 1s

Apply complete! Resources: 0 added, 0 changed, 2 destroyed.
```

Two resources destroyed were (as expected) and you have rolled back to the previous version.
