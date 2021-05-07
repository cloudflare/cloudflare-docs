---
title: 3 – HTTPS all the things
order: 3
---

# HTTPS all the things

Now that you've got a basic website proxied through Cloudflare, it's time to use Terraform to adjust some of the settings on your zone. In this tutorial step we'll configure some optional HTTPS settings, and then push the updated configuration to GitHub for posterity.

We'll use a new git branch for the changes, and then merge it into master before applying. On a team, you might consider using this step as an opportunity for others to review your change before merging and deploying it. Or you may integrate Terraform into your CI/CD system to perform tests automatically using another Cloudflare domain.

## 1. Create a new branch and append the new zone settings

Here we modify the Terraform configuration to enable the following settings: [TLS 1.3](https://www.cloudflare.com/learning-resources/tls-1-3/), [Always Use HTTPS](https://blog.cloudflare.com/how-to-make-your-site-https-only/), [Strict SSL mode](https://blog.cloudflare.com/introducing-strict-ssl-protecting-against-a-man-in-the-middle-attack-on-origin-traffic/), and the [Cloudflare WAF](https://www.cloudflare.com/waf/). Strict mode requires a valid SSL certificate on your origin, so be sure to use the [Cloudflare Origin CA](https://blog.cloudflare.com/cloudflare-ca-encryption-origin/) to generate one.

```sh
$ git checkout -b step3-https
Switched to a new branch 'step3-https'

$ cat >> cloudflare.tf <<'EOF'

resource "cloudflare_zone_settings_override" "example-com-settings" {
  name = var.domain

  settings {
    tls_1_3                  = "on"
    automatic_https_rewrites = "on"
    ssl                      = "strict"
    waf                      = "on"
  }
}
EOF
```

## 2. Preview and merge the changes

Let's take a look at what Terraform is proposing before we apply it. We filter the `terraform plan` output to ignore those values that will be "computed"—in this case, settings that will be left at their default values.

```sh
$ terraform plan | grep -v "<computed>"
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8668)

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  + cloudflare_zone_settings_override.example-com-settings
      name:                                   "example.com"
      settings.#:                             "1"
      settings.0.automatic_https_rewrites:    "on"
      settings.0.ssl:                         "strict"
      settings.0.tls_1_3:                     "on"
      settings.0.waf:                         "on"


Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.
```

The proposed changes look good, so we'll merge them into master and then apply them with `terraform apply`. When working on a team, you may want to require pull requests and use this opportunity to peer review any proposed configuration changes.

```sh
$ git add cloudflare.tf
$ git commit -m "Step 3 - Enable TLS 1.3, Always Use HTTPS, and SSL Strict mode."
[step3-https d540600] Step 3 - Enable TLS 1.3, Always Use HTTPS, and SSL Strict mode.
 1 file changed, 11 insertions(+)

$ git checkout master
Switched to branch 'master'

$ git merge step3-https
Updating d26f40b..d540600
Fast-forward
 cloudflare.tf | 11 +++++++++++
 1 file changed, 11 insertions(+)

$ git push
Counting objects: 3, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 501 bytes | 0 bytes/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To git@github.com:$GITHUB_USER/cf-config.git
   d26f40b..d540600  master -> master
```

## 3. Apply and verify the changes

Before applying the changes, let's see if we can connect with TLS 1.3. Hint: we shouldn't be able to with default settings. If you want to follow along with this test, you'll need to [compile curl against BoringSSL](https://ec.haxx.se/building-boringssl.html).

```sh
$ curl -v --tlsv1.3 https://www.upinatoms.com 2>&1 | grep "SSL connection\|error"
* error:1000042e:SSL routines:OPENSSL_internal:TLSV1_ALERT_PROTOCOL_VERSION
curl: (35) error:1000042e:SSL routines:OPENSSL_internal:TLSV1_ALERT_PROTOCOL_VERSION
```

As shown above, we receive an error as TLS 1.3 is not yet enabled on your zone. Let's enable it by running `terraform apply` and try again:

```sh
$ terraform apply --auto-approve
cloudflare_record.www: Refreshing state... (ID: c38d3103767284e7cd14d5dad3ab8668)
cloudflare_zone_settings_override.example-com-settings: Creating...
  initial_settings.#:                     "" => "<computed>"
  initial_settings_read_at:               "" => "<computed>"
  name:                                   "" => "example.com"
  readonly_settings.#:                    "" => "<computed>"
  settings.#:                             "" => "1"
  settings.0.advanced_ddos:               "" => "<computed>"
  settings.0.always_online:               "" => "<computed>"
  settings.0.always_use_https:            "" => "<computed>"
  settings.0.automatic_https_rewrites:    "" => "on"
  settings.0.brotli:                      "" => "<computed>"
  settings.0.browser_cache_ttl:           "" => "<computed>"
  settings.0.browser_check:               "" => "<computed>"
  settings.0.cache_level:                 "" => "<computed>"
  settings.0.challenge_ttl:               "" => "<computed>"
  settings.0.cname_flattening:            "" => "<computed>"
  settings.0.development_mode:            "" => "<computed>"
  settings.0.edge_cache_ttl:              "" => "<computed>"
  settings.0.email_obfuscation:           "" => "<computed>"
  settings.0.hotlink_protection:          "" => "<computed>"
  settings.0.http2:                       "" => "<computed>"
  settings.0.ip_geolocation:              "" => "<computed>"
  settings.0.ipv6:                        "" => "<computed>"
  settings.0.max_upload:                  "" => "<computed>"
  settings.0.minify.#:                    "" => "<computed>"
  settings.0.mirage:                      "" => "<computed>"
  settings.0.mobile_redirect.#:           "" => "<computed>"
  settings.0.opportunistic_encryption:    "" => "<computed>"
  settings.0.origin_error_page_pass_thru: "" => "<computed>"
  settings.0.polish:                      "" => "<computed>"
  settings.0.prefetch_preload:            "" => "<computed>"
  settings.0.privacy_pass:                "" => "<computed>"
  settings.0.pseudo_ipv4:                 "" => "<computed>"
  settings.0.response_buffering:          "" => "<computed>"
  settings.0.rocket_loader:               "" => "<computed>"
  settings.0.security_header.#:           "" => "<computed>"
  settings.0.security_level:              "" => "<computed>"
  settings.0.server_side_exclude:         "" => "<computed>"
  settings.0.sha1_support:                "" => "<computed>"
  settings.0.sort_query_string_for_cache: "" => "<computed>"
  settings.0.ssl:                         "" => "strict"
  settings.0.tls_1_2_only:                "" => "<computed>"
  settings.0.tls_1_3:                     "" => "on"
  settings.0.tls_client_auth:             "" => "<computed>"
  settings.0.true_client_ip_header:       "" => "<computed>"
  settings.0.waf:                         "" => "on"
  settings.0.webp:                        "" => "<computed>"
  settings.0.websockets:                  "" => "<computed>"
  zone_status:                            "" => "<computed>"
  zone_type:                              "" => "<computed>"
cloudflare_zone_settings_override.example-com-settings: Creation complete after 2s (ID: e2e6491340be87a3726f91fc4148b125)

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Now we can try the same command as above, and see that it succeeds. Nice, TLS 1.3!

```sh
$ curl -v --tlsv1.3 https://www.example.com 2>&1 | grep "SSL connection\|error"
* SSL connection using TLSv1.3 / AEAD-AES128-GCM-SHA256
```
