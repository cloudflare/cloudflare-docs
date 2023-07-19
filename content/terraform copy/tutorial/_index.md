---
pcx_content_type: navigation
title: Tutorials
weight: 3
layout: single
---

# Tutorials

Before you begin, make sure you [install Terraform](/terraform/installing/). Each tutorial builds on the previous, so you should complete the tutorials in the order shown below.

## [1 – Initialize Terraform](/terraform/tutorial/initialize-terraform/)

* Brief introduction.
* Introduction of `terraform init`, `plan`, `apply`, and `show`.
* Resource covered: [`cloudflare_record`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/record) (DNS record).

## [2 – Track your history](/terraform/tutorial/track-history/)

* Store Cloudflare configuration in source control.

## [3 – Configure HTTPS settings](/terraform/tutorial/configure-https-settings/)

* Modify zone settings.
* Resource covered: [`cloudflare_zone_settings_override`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zone_settings_override).

## [4 – Improve performance and reliability](/terraform/tutorial/use-load-balancing/)

* Add load balancing rules.
* Resources covered:
    * [`cloudflare_load_balancer`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load_balancer)
    * [`cloudflare_load_balancer_pool`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load_balancer_pool)
    * [`cloudflare_load_balancer_monitor`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/load_balancer_monitor)

## [5 – Add exceptions with page rules](/terraform/tutorial/add-page-rules/)

* Add page rule.
* Resource covered: [`cloudflare_page_rule`](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/page_rule).
* Increase security level for a specific URL: `/expensive-db-call`.
* Add a redirect (URL forward) with a `301` status code from `/old-location.php` to `/expensive-db-call`.

## [6 – Revert configuration](/terraform/tutorial/revert-configuration/)

* Review change history.
* Roll back changes.
