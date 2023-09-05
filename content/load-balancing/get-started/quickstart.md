---
pcx_content_type: get-started
title: Quickstart
weight: 1
---

# Quickstart

Get up and running quickly with Load Balancing. For more in-depth explanations, refer to the [Learning path](/learning-paths/load-balancing/).

---

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you:

- Have access to multiple servers, either physical or cloud-based.
- Have access to Load Balancing, available as an [add-on](/load-balancing/how-to/enable-load-balancing/) for any type of account.
- Have test and production hostnames that are covered by [SSL/TLS certificates](/load-balancing/reference/dns-records/#ssltls-coverage).

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a monitor">}}

{{<render file="_monitor-definition.md">}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

<strong>Set up the monitor</strong>

{{<render file="_monitor-create.md">}}

<strong>Prepare your servers</strong>

{{<render file="_monitor-prepare-server.md">}}
{{</tab>}}
{{<tab label="api" no-code="true">}}

<strong>Set up the monitor</strong>

{{<render file="_monitor-create-api.md">}}

<strong>Prepare your servers</strong>

{{<render file="_monitor-prepare-server.md">}}

{{</tab>}}
{{</tabs>}}

{{<render file="_monitor-example.md">}}

{{</tutorial-step>}}

{{<tutorial-step title="Create pools">}}

{{<render file="_pool-definition.md">}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_pool-create.md">}}

{{</tab>}}

{{<tab label="api" no-code="true">}}

{{<render file="_pool-create-api.md">}}

{{</tab>}}
{{</tabs>}}

{{</tutorial-step>}}

{{<tutorial-step title="Confirm pool health">}}

{{<render file="_confirm-pool-health.md">}}

### Unexpected health status

{{<render file="_unexpected-health-statuses.md">}}

{{</tutorial-step>}}

{{<tutorial-step title="Create a load balancer on a test subdomain">}}

{{<render file="_test-domain-setup.md">}}

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

{{<render file="_load-balancer-create.md">}}

{{</tab>}}
{{<tab label="api" no-code="true">}}

{{<render file="_load-balancer-create-api.md">}}

{{</tab>}}
{{</tabs>}}

{{</tutorial-step>}}

{{<tutorial-step title="Review load balancing analytics" optional=true >}}

As you send sample requests to your test domain, review the [load balancing analytics](/load-balancing/reference/load-balancing-analytics/) page to make sure your load balancer is distributing requests like you were expecting.

{{</tutorial-step>}}

{{<tutorial-step title="Route production traffic">}}

{{<render file="_route-production-traffic.md">}}

{{</tutorial-step>}}

{{<tutorial-step title="Next steps" optional=true >}}

Your load balancer should be receiving production traffic (and you can confirm this by reviewing the [analytics](/load-balancing/reference/load-balancing-analytics/)).

Though your product is officially set up, you may want to consider the following suggestions.

### Usage-based notifications

{{<render file="_ubb-recommendation.md" productFolder="fundamentals">}}

### Additional configuration options

You may want to further customize how your load balancer routes traffic or integrate your load balancer with other Cloudflare products:

{{<directory-listing folderDirectory="/load-balancing/additional-options/" >}}

{{</tutorial-step>}}

{{</tutorial>}}