---
title: 4 – Set up rate limiting
order: 4
pcx-content-type: tutorial
---

# Set up rate limiting

As your site gains more attention, you could discover attempts to brute force your login page at `https://www.example.com/login` from your serve access logs. In this tutorial, you will learn how to stop those attempts with Cloudflare's [rate limiting product](https://support.cloudflare.com/hc/articles/115001635128).

## 1. Create a new branch and append the rate limiting settings

After creating a new branch, specify the rate limiting rule.

```
$ git checkout -b step4-ratelimit
Switched to a new branch 'step4-ratelimit'

$ cat >> cloudflare.tf <<'EOF'

resource "cloudflare_rate_limit" "login-limit" {
  zone_id = var.zone_id

  threshold = 5
  period    = 60
  match {
    request {
      url_pattern = "${var.domain}/login"
      schemes     = ["HTTP", "HTTPS"]
      methods     = ["POST"]
    }
    response {
      statuses       = [401, 403]
      origin_traffic = true
    }
  }
  action {
    mode    = "simulate"
    timeout = 300
    response {
      content_type = "text/plain"
      body         = "You have failed to login 5 times in a 60 second period and will be blocked from attempting to login again for the next 5 minutes."
    }
  }
  disabled    = false
  description = "Block failed login attempts (5 in 1 min) for 5 minutes."
}
EOF
```

This rule is a bit more complex than the zone settings rule and will be broken down.

```
00: resource "cloudflare_rate_limit" "login-limit" {
01:   zone_id = var.zone_id
02:
03:   threshold = 5
04:   period    = 60
```

The `threshold` is an integer count of how many times an event — defined by the `match` block below — has to be detected in the `period` before the rule takes action. The `period` is measured in seconds, so the above rule says to take action if the match fires five times in 60 seconds.

```
05:   match {
06:     request {
07:       url_pattern = "${var.domain}/login"
08:       schemes     = ["HTTP", "HTTPS"]
09:       methods     = ["POST"]
10:     }
11:     response {
12:       statuses = [401, 403]
13:     }
14:   }
```

The `match` block tells Cloudflare's edge what to watch for, such as HTTP or HTTPS POST requests to `https://www.example.com/login`. Cloudflare further restricts the match to HTTP `401` (Unauthorized) or `403` (Forbidden) response codes returned from the origin.

```
15:   action {
16:     mode    = "simulate"
17:     timeout = 300
18:     response {
19:       content_type = "text/plain"
20:       body         = "You have failed to login 5 times in a 60 second period and will be blocked from attempting to login again for the next 5 minutes."
21:     }
22:   }
23:   disabled    = false
24:   description = "Block failed login attempts (5 in 1 min) for 5 minutes."
25: }
```

After matching traffic, set the action the edge should take. When testing, set the `mode` to `simulate` and review logs before taking enforcement action (see below). The `timeout` field indicates that the action should be enforced for 300 seconds (five minutes) and the `response` block indicates what should be sent back to the caller that tripped the rate limit.

## 2. Preview and merge the changes

Review the proposed plan before applying any changes.

```
$ terraform plan
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

  + cloudflare_rate_limit.login-limit
      id:                                     <computed>
      action.#:                               "1"
      action.0.mode:                          "simulate"
      action.0.response.#:                    "1"
      action.0.response.0.body:               "You have failed to login 5 times in a 60 second period and will be blocked from attempting to login again for the next 5 minutes."
      action.0.response.0.content_type:       "text/plain"
      action.0.timeout:                       "300"
      description:                            "Block failed login attempts (5 in 1 min) for 5 minutes."
      disabled:                               "false"
      match.#:                                "1"
      match.0.request.#:                      "1"
      match.0.request.0.methods.#:            "1"
      match.0.request.0.methods.1012961568:   "POST"
      match.0.request.0.schemes.#:            "2"
      match.0.request.0.schemes.2328579708:   "HTTP"
      match.0.request.0.schemes.2534674783:   "HTTPS"
      match.0.request.0.url_pattern:          "www.example.com/login"
      match.0.response.#:                     "1"
      match.0.response.0.origin_traffic:      "true"
      match.0.response.0.statuses.#:          "2"
      match.0.response.0.statuses.1057413486: "403"
      match.0.response.0.statuses.221297644:  "401"
      period:                                 "60"
      threshold:                              "5"
      zone:                                   "example.com"
      zone_id:                                <computed>


Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

The plan looks good, so you can merge it in and apply it.

```
$ git add cloudflare.tf
$ git commit -m "Step 4 - Add rate limiting rule to protect /login."
[step4-ratelimit 0f7e499] Step 4 - Add rate limiting rule to protect /login.
 1 file changed, 28 insertions(+)

$ git checkout master
Switched to branch 'master'

$ git merge step4-ratelimit
Updating 321c2bd..0f7e499
Fast-forward
 cloudflare.tf | 28 ++++++++++++++++++++++++++++
 1 file changed, 28 insertions(+)

$ terraform apply --auto-approve
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8668)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b125)
cloudflare_rate_limit.login-limit: Creating...
  action.#:                               "" => "1"
  action.0.mode:                          "" => "simulate"
  action.0.response.#:                    "" => "1"
  action.0.response.0.body:               "" => "You have failed to login 5 times in a 60 second period and will be blocked from attempting to login again for the next 5 minutes."
  action.0.response.0.content_type:       "" => "text/plain"
  action.0.timeout:                       "" => "300"
  description:                            "" => "Block failed login attempts (5 in 1 min) for 5 minutes."
  disabled:                               "" => "false"
  match.#:                                "" => "1"
  match.0.request.#:                      "" => "1"
  match.0.request.0.methods.#:            "" => "1"
  match.0.request.0.methods.1012961568:   "" => "POST"
  match.0.request.0.schemes.#:            "" => "2"
  match.0.request.0.schemes.2328579708:   "" => "HTTP"
  match.0.request.0.schemes.2534674783:   "" => "HTTPS"
  match.0.request.0.url_pattern:          "" => "www.example.com/login"
  match.0.response.#:                     "" => "1"
  match.0.response.0.origin_traffic:      "" => "true"
  match.0.response.0.statuses.#:          "" => "2"
  match.0.response.0.statuses.1057413486: "" => "403"
  match.0.response.0.statuses.221297644:  "" => "401"
  period:                                 "" => "60"
  threshold:                              "" => "5"
  zone:                                   "" => "example.com"
  zone_id:                                "" => "<computed>"
cloudflare_rate_limit.login-limit: Creation complete after 1s (ID: 8d518c5d6e63406a9466d83cb8675bb6)

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

If you have not purchased rate limiting, you will see the following error when attempting to apply the new rule.
```
Error: Error applying plan:

1 error(s) occurred:

* cloudflare_rate_limit.login-limit: 1 error(s) occurred:

* cloudflare_rate_limit.login-limit: error creating rate limit for zone: error from makeRequest: HTTP status 400: content "{\n  \"result\": null,\n  \"success\": false,\n  \"errors\": [\n    {\n      \"code\": 10021,\n      \"message\": \"ratelimit.api.not_entitled.account\"\n    }\n  ],\n  \"messages\": []\n}\n"
```

## 3. Update the rule to ban (not just simulate)

After confirming that the rule is triggering but not yet enforcing in logs, switch from `simulate` to `ban`.

```
$ git checkout step4-ratelimit
$ sed -i.bak -e 's/simulate/ban/' cloudflare.tf

$ git diff
diff --git a/cloudflare.tf b/cloudflare.tf
index ed5157c..9f25a0c 100644
--- a/cloudflare.tf
+++ b/cloudflare.tf
@@ -42,7 +42,7 @@ resource "cloudflare_rate_limit" "login-limit" {
     }
   }
   action {
-    mode = "simulate"
+    mode = "ban"
     timeout = 300
     response {
       content_type = "text/plain"

$ terraform plan
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)
cloudflare_rate_limit.login-limit: Refreshing state... (ID: 8d518c5d6e63406a9466d83cb8675bb6)
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  ~ update in-place

Terraform will perform the following actions:

  ~ cloudflare_rate_limit.login-limit
      action.0.mode: "simulate" => "ban"


Plan: 0 to add, 1 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

## 4. Merge and deploy the updated rule, then push the config to GitHub

```
$ git add cloudflare.tf

$ git commit -m "Step 4 - Update /login rate limit rule from 'simulate' to 'ban'."
[step4-ratelimit e1c38cf] Step 4 - Update /login rate limit rule from 'simulate' to 'ban'.
 1 file changed, 1 insertion(+), 1 deletion(-)

$ git checkout master && git merge step4-ratelimit && git push
Switched to branch 'master'
Updating 0f7e499..e1c38cf
Fast-forward
 cloudflare.tf | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 361 bytes | 0 bytes/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To git@github.com:$GITHUB_USER/cf-config.git
   0f7e499..e1c38cf  master -> master


$ terraform apply --auto-approve
cloudflare_rate_limit.login-limit: Refreshing state... (ID: 8d518c5d6e63406a9466d83cb8675bb6)
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8669)
cloudflare_zone_settings_override.example-com-settings: Refreshing state... (ID: e2e6491340be87a3726f91fc4148b126)
cloudflare_rate_limit.login-limit: Modifying... (ID: 8d518c5d6e63406a9466d83cb8675bb6)
  action.0.mode: "simulate" => "ban"
cloudflare_rate_limit.login-limit: Modifications complete after 0s (ID: 8d518c5d6e63406a9466d83cb8675bb6)

Apply complete! Resources: 0 added, 1 changed, 0 destroyed.

$ git push
...
```

## 5. Confirm the rule works as expected

(Optional) This step is a good way to demonstrate that the rule works as expected. Note the final `429` response.

```
$ for i in {1..6}; do curl -XPOST -d '{"username": "foo", "password": "bar"}' -vso /dev/null https://www.example.com/login 2>&1 | grep "< HTTP"; sleep 1; done
< HTTP/1.1 401 OK
< HTTP/1.1 401 OK
< HTTP/1.1 401 OK
< HTTP/1.1 401 OK
< HTTP/1.1 401 OK
< HTTP/1.1 429 OK
```
