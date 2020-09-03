---
title: Tutorial
alwaysopen: true
weight: 15
---

_This tutorial assumes that you have installed Terraform. If you haven’t, please visit the Terraform Downloads page._

Each example builds on the last, so you should start from the top. Here are the topics and resources covered per tutorial step:

### [Step 1 - Hello World](/terraform/tutorial/hello-world/)

* Brief intro
* Introduction of terraform init, plan, apply, and show.
* Resources covered: DNS

### [Step 2 - Tracking your history](/terraform/tutorial/source-control/)

* Storing Cloudflare configuration in source control

### [Step 3 - HTTPS all the things](/terraform/tutorial/zone-settings/)

* Modifying zone settings
* Resources covered: [zone settings override](https://www.terraform.io/docs/providers/cloudflare/r/zone_settings_override.html)

### [Step 4 - Woah, slow down there](/terraform/tutorial/rate-limit/)

* Adding rate limiting rules
* Resource covered: [rate limit](https://www.terraform.io/docs/providers/cloudflare/r/rate_limit.html)

### [Step 5 - Sharing the load](/terraform/tutorial/load-balance/)

* Adding load balancing rules
* Resources covered: [load balancer](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer.html), [load balancer pool](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer_pool.html), [load balancer monitor](https://www.terraform.io/docs/providers/cloudflare/r/load_balancer_monitor.html)

### [Step 6 - Making some exceptions](/terraform/tutorial/page-rules/)
* Add page rule
* Resources covered: [page rules](https://www.terraform.io/docs/providers/cloudflare/r/page_rule.html)

* WAF off for specific path: /abuse-report
* Forwarding URL (301) from blog to example.com/blog

### [Step 7 - On final thought, let's roll some of that back](/terraform/tutorial/roll-back/)

* Reviewing change history
* Rolling back changes
