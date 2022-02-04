---
order: 2
pcx-content-type: navigation
---

# Tutorials

Before you begin, make sure Terraform is installed. Each tutorial builds on the previous, so we recommend completing the tutorials in the order shown below.

## [1 – Initialize Terraform](/tutorial/initialize-terraform)

- Brief intro
- Introduction of terraform init, plan, apply, and show.
- Resources covered: DNS

## [2 – Track your history](/tutorial/track-history/)

- Store Cloudflare configuration in source control

## [3 – Configure HTTPS settings](/tutorial/configure-https-settings/)

- Modify zone settings
- Resources covered: [zone settings override](https://www.terraform.io/docs/providers/cloudflare/r/zone_settings_override.html)

## [4 – Set up rate limiting](/tutorial/set-rate-limit/)

- Add rate limiting rules
- Resource covered: [rate limit](https://www.terraform.io/docs/providers/cloudflare/r/rate_limit.html)

## [5 – Improve performance and reliability](/tutorial/use-load-balancing/)

- Add load balancing rules
- Resources covered: [load balancer](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer.html), [load balancer pool](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer_pool.html), [load balancer monitor](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer_monitor.html)

## [6 – Add exceptions with page rules](/tutorial/add-page-rules/)

- Add page rule
- Resources covered: [page rules](https://www.terraform.io/docs/providers/cloudflare/r/page_rule.html)
- WAF off for specific path: /abuse-report
- Forwarding URL (301) from blog to example.com/blog

## [7 – Revert configuration](/tutorial/revert-configuration/)

- Review change history
- Rolling back changes
