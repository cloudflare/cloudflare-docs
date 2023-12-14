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

Although you can create all the components in the load balancer workflow, using the **Manage Monitors** and **Manage Pools** sections separatly make it easier to test and troubleshoot the configurations of each of these components before bringing them together in a load balancer.

Health monitors define the criteria based on which an origin will be considered healthy or not. Start by setting up a monitor as follows.

1. Log in to your Cloudflare account and select your domain.
2. Go to **Traffic** > **Load Balancing**.
3. Select **Manage Monitors** and then **Create**.
4. Give the monitor a descriptive name and confirm the other fields are filled in as the following:

{{<table-wrap>}}

| Field            | Value     |
|------------------|-----------|
| Type             | HTTP      |
| Path             | /         |
| Port             | 80        |

{{</table-wrap>}}

5. Under **Advanced health check settings**, keep the default values and enable the **Follow redirects** option.

    When you are using a service like Cloudflare Pages, it is possible that requests from the health monitor - as well as the ones from your visitors - are redirected before reaching their destination. Enabling this option prevents the monitor from reporting an unhealthy origin when it actually has only been redirected (with a `301` code, for example).

{{<Aside type="note" header="Tip">}}
You can name the monitor after the parameters you have defined. For example: `HTTP - 200 - Follow Redirects`.

This way you can easily remember the criteria a certain monitor is using when you decide to attach it to other origins as well.
{{</Aside>}}

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