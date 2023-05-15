---
title: 3 – Configure HTTPS settings
pcx_content_type: tutorial
weight: 4
meta:
  title: Configure HTTPS settings
---

# Configure HTTPS settings

After proxying a basic website through Cloudflare, you can use Terraform to adjust zone settings. In this tutorial, you will configure some optional HTTPS settings and then push the updated configuration to GitHub for posterity.

You will use a new Git branch for the changes and then merge it into the `master` branch before applying. On a team, you might consider using this step as an opportunity for others to review your change before merging and deploying it. You can also integrate Terraform into your CI/CD system to perform tests automatically using another Cloudflare domain.

## 1. Create a new branch and append the new zone settings

In this step, modify the Terraform configuration to enable the following settings:

* [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/)
* [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/)
* [Strict SSL mode](/ssl/origin-configuration/ssl-modes/full-strict/)

Strict mode requires a valid SSL certificate on your origin — use the [Cloudflare Origin CA](/ssl/origin-configuration/origin-ca/) to generate one.

```bash
$ git checkout -b step3-https
Switched to a new branch 'step3-https'

$ cat >> cloudflare.tf <<'EOF'

resource "cloudflare_zone_settings_override" "example-com-settings" {
  zone_id = var.zone_id

  settings {
    tls_1_3                  = "on"
    automatic_https_rewrites = "on"
    ssl                      = "strict"
  }
}
EOF
```

## 2. Preview and merge the changes

Review what Terraform is proposing before applying changes. The example output below is being filtered to ignore computed values — in this case, settings that will keep their default values.

```sh
$ terraform plan | grep -v "<computed>"
Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.

cloudflare_record.www: Refreshing state... [id=c38d3103767284e7cd14d5dad3ab8668]

------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_zone_settings_override.example-com-settings will be created
  + resource "cloudflare_zone_settings_override" "example-com-settings" {
      + zone_id                  = "<ZONE_ID>"

      + settings {
        + automatic_https_rewrites    = "on"
        + ssl                         = "strict"
        + tls_1_3                     = "on"

        # (...)
      }
  }

Plan: 1 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't use the -out option to save this plan, so Terraform can't
guarantee to take exactly these actions if you run "terraform apply" now.
```

The proposed changes look good, so you can merge them into the `master` branch and then apply them with `terraform apply`. When working on a team, you may want to require pull requests and use this opportunity to peer review any proposed configuration changes.

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

Before applying the changes, try to connect with TLS 1.3. Technically, you should not be able to with default settings. To follow along with this test, you will need to [compile `curl` against BoringSSL](https://everything.curl.dev/source/build/tls/boringssl#build-boringssl).

```sh
$ curl -v --tlsv1.3 https://www.example.com 2>&1 | grep "SSL connection\|error"
* error:1000042e:SSL routines:OPENSSL_internal:TLSV1_ALERT_PROTOCOL_VERSION
curl: (35) error:1000042e:SSL routines:OPENSSL_internal:TLSV1_ALERT_PROTOCOL_VERSION
```

As shown above, you should receive an error because TLS 1.3 is not yet enabled on your zone. Enable it by running `terraform apply` and try again.

```sh
$ terraform apply --auto-approve

Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # cloudflare_zone_settings_override.example-com-settings will be created
  + resource "cloudflare_zone_settings_override" "example-com-settings" {
      + id                       = (known after apply)
      + initial_settings         = (known after apply)
      + initial_settings_read_at = (known after apply)
      + readonly_settings        = (known after apply)
      + zone_id                  = "e2e6491340be87a3726f91fc4148b126"
      + zone_status              = (known after apply)
      + zone_type                = (known after apply)

      + settings {
          + always_online               = (known after apply)
          + always_use_https            = (known after apply)
          + automatic_https_rewrites    = "on"
          + binary_ast                  = (known after apply)
          + brotli                      = (known after apply)
          + browser_cache_ttl           = (known after apply)
          + browser_check               = (known after apply)
          + cache_level                 = (known after apply)
          + challenge_ttl               = (known after apply)
          + ciphers                     = (known after apply)
          + cname_flattening            = (known after apply)
          + development_mode            = (known after apply)
          + early_hints                 = (known after apply)
          + email_obfuscation           = (known after apply)
          + filter_logs_to_cloudflare   = (known after apply)
          + h2_prioritization           = (known after apply)
          + hotlink_protection          = (known after apply)
          + http2                       = (known after apply)
          + http3                       = (known after apply)
          + image_resizing              = (known after apply)
          + ip_geolocation              = (known after apply)
          + ipv6                        = (known after apply)
          + log_to_cloudflare           = (known after apply)
          + max_upload                  = (known after apply)
          + min_tls_version             = (known after apply)
          + mirage                      = (known after apply)
          + opportunistic_encryption    = (known after apply)
          + opportunistic_onion         = (known after apply)
          + orange_to_orange            = (known after apply)
          + origin_error_page_pass_thru = (known after apply)
          + origin_max_http_version     = (known after apply)
          + polish                      = (known after apply)
          + prefetch_preload            = (known after apply)
          + privacy_pass                = (known after apply)
          + proxy_read_timeout          = (known after apply)
          + pseudo_ipv4                 = (known after apply)
          + response_buffering          = (known after apply)
          + rocket_loader               = (known after apply)
          + security_level              = (known after apply)
          + server_side_exclude         = (known after apply)
          + sort_query_string_for_cache = (known after apply)
          + ssl                         = "strict"
          + tls_1_2_only                = (known after apply)
          + tls_1_3                     = "on"
          + tls_client_auth             = (known after apply)
          + true_client_ip_header       = (known after apply)
          + universal_ssl               = (known after apply)
          + visitor_ip                  = (known after apply)
          + waf                         = (known after apply)
          + webp                        = (known after apply)
          + websockets                  = (known after apply)
          + zero_rtt                    = (known after apply)

          + minify {
              + css  = (known after apply)
              + html = (known after apply)
              + js   = (known after apply)
            }

          + mobile_redirect {
              + mobile_subdomain = (known after apply)
              + status           = (known after apply)
              + strip_uri        = (known after apply)
            }

          + security_header {
              + enabled            = (known after apply)
              + include_subdomains = (known after apply)
              + max_age            = (known after apply)
              + nosniff            = (known after apply)
              + preload            = (known after apply)
            }
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.
cloudflare_zone_settings_override.example-com-settings: Creating...
cloudflare_zone_settings_override.example-com-settings: Still creating... [10s elapsed]
cloudflare_zone_settings_override.example-com-settings: Creation complete after 14s [id=e2e6491340be87a3726f91fc4148b126]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

Try the same command as before. The command will now succeed.

```sh
$ curl -v --tlsv1.3 https://www.example.com 2>&1 | grep "SSL connection\|error"
* SSL connection using TLSv1.3 / AEAD-AES128-GCM-SHA256
```
