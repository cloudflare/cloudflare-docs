---
pcx-content-type: navigation
title: Tutorials
weight: 3
layout: single
---

# Tutorials

Before you begin, make sure you [install Terraform](/terraform/installing/). Each tutorial builds on the previous, so you should complete the tutorials in the order shown below.

## [1 – Initialize Terraform](/terraform/tutorial/initialize-terraform/)

* Brief introduction.
* Introduction of `terraform init`, `plan`, `apply`, and `show`.
* Resources covered: [`cloudflare_record`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/record) (DNS record).

## [2 – Track your history](/terraform/tutorial/track-history/)

* Store Cloudflare configuration in source control.

## [3 – Configure HTTPS settings](/terraform/tutorial/configure-https-settings/)

* Modify zone settings.
* Resources covered: [`zone_settings_override`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zone_settings_override).

## [4 – Set up rate limiting](/terraform/tutorial/set-rate-limit/)

* Add rate limiting rules.
* Resource covered: [`rate_limit`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/rate_limit).

## [5 – Improve performance and reliability](/terraform/tutorial/use-load-balancing/)

* Add load balancing rules.
* Resources covered: [`load_balancer`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load_balancer), [`load_balancer_pool`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load_balancer_pool), [`load_balancer_monitor`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load_balancer_monitor).

## [6 – Add exceptions with page rules](/terraform/tutorial/add-page-rules/)

* Add page rule.
* Resources covered: [`page_rule`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/page_rule).
* Increase security level for a specific URL: `/expensive-db-call`.
* Add a redirect (URL forward) with a `301` status code from `/old-location.php` to `/expensive-db-call`.

## [7 – Revert configuration](/terraform/tutorial/revert-configuration/)

* Review change history.
* Roll back changes.
