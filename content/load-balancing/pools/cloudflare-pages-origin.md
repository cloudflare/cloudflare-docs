---
pcx_content_type: tutorial
title: Use Pages as origin
weight: 3
---

# Use Cloudflare Pages as origin

This tutorial is intended as an introductory example of how you can leverage Cloudflare's global traffic management capabilities.

The following sections will guide you through setting up an [active-passive failover](/load-balancing/load-balancers/common-configurations/) load balancer with [Cloudflare Pages](/pages/) as one of the origins, while also going into details about the Load Balancing dashboard workflow, and some important field values and troubleshooting.

## Use cases

This setup can be useful if you are migrating your production website or application to Pages or if you just want to have a backup or a personalized web page for when your primary origin goes down.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you:
* Are familiar with the Cloudflare [Load Balancing components](/load-balancing/understand-basics/load-balancing-components/).
* Own a domain and use Cloudflare as a [primary DNS provider](/dns/zone-setups/full-setup/).
* Have [deployed a website or application](/pages/get-started/guide/) with Cloudflare Pages.
* Have [enabled Load Balancing](/load-balancing/get-started/enable-load-balancing/) in your account.

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create health monitor">}}

Step 1 content

{{</tutorial-step>}}

{{<tutorial-step title="Create origin pool(s)">}}

Step 2 content

{{</tutorial-step>}}

{{<tutorial-step title="Crete load balancer">}}

Step 3 content

{{</tutorial-step>}}

{{<tutorial-step title="Deploy on a test hostname" optional="true">}}

Step 4 content

{{</tutorial-step>}}

{{<tutorial-step title="Route production traffic to load balancer">}}

Step 5 content

{{</tutorial-step>}}

{{</tutorial>}}