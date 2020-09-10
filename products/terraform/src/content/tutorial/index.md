---
order: 2
---

# Tutorial

<Aside>

This tutorial assumes that you have [installed Terraform](/installing).

</Aside>

Each example builds on the last, so you should start from the top. Here are the topics and resources covered per tutorial step:

## [1 – Hello World](/tutorial/hello-world/)

- Brief intro
- Introduction of terraform init, plan, apply, and show.
- Resources covered: DNS

## [2 – Tracking your history](/tutorial/source-control/)

- Storing Cloudflare configuration in source control

## [3 – HTTPS all the things](/tutorial/zone-settings/)

- Modifying zone settings
- Resources covered: [zone settings override](https://www.terraform.io/docs/providers/cloudflare/r/zone_settings_override.html)

## [4 – Woah, slow down there](/tutorial/rate-limit/)

- Adding rate limiting rules
- Resource covered: [rate limit](https://www.terraform.io/docs/providers/cloudflare/r/rate_limit.html)

## [5 – Sharing the load](/tutorial/load-balance/)

- Adding load balancing rules
- Resources covered: [load balancer](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer.html), [load balancer pool](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer_pool.html), [load balancer monitor](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer_monitor.html)

## [6 – Making some exceptions](/tutorial/page-rules/)

- Add page rule
- Resources covered: [page rules](https://www.terraform.io/docs/providers/cloudflare/r/page_rule.html)
- WAF off for specific path: /abuse-report
- Forwarding URL (301) from blog to example.com/blog

## [7 – On final thought, let’s roll some of that back](/tutorial/roll-back/)

- Reviewing change history
- Rolling back changes
