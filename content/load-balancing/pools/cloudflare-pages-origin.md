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

Although you can create all the components in the **Create Load Balancer** workflow, using the **Manage Monitors** and **Manage Pools** sections separately makes it easier to test and troubleshoot the configurations of each of these components before bringing them together in a load balancer.

Monitors define the criteria based on which an origin will be considered healthy or not. Start by setting up a monitor as follows.

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

{{<tutorial-step title="Create origin pools">}}

Origin pools hold information about where the health monitor requests and your visitors requests will be directed to.

To support the [use cases](#use-cases) mentioned before, and assuming only one origin server for your production website and one for the Cloudflare Pages instance, create two pools with one origin server each:

1. Go to **Traffic** > **Load Balancing**.

2. Select **Manage Pools** and then **Create**.

3. For the first pool, start by filling out the fields:
    * A name for the pool (must be unique). Suggestion: `primary`
    * A description to provide more detail on the name. Suggestion: `production website`

4. Leave the choice for [**Origin Steering**](/load-balancing/understand-basics/traffic-steering/origin-level-steering/) as is. Since each pool will only have one origin, this steering method will not interfere in this case.

5. Add your origin server with the following information:
    * A name for the origin (must be unique). Suggestion: `my-website`.
    * The origin server IP address. If you do not know it, you can run a dig command against your domain with an [online DNS lookup tool](https://digwebinterface.com) to find out.
    * The origin [weight](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights), which can be set to `1`. Since each pool will only have one origin, the origin weight will not make a difference in this case.
    * (Optional) A [hostname](/load-balancing/additional-options/override-http-host-headers/) by selecting **Add host header**.

        If your production website is hosted on a platform like Pages, where you have a default subdomain (`example.pages.dev`) and then configures a custom domain (`my-app.com`), you will probably need to add a host header to avoid failing the health monitor request.

6. Finish configuring the first pool with the following information:
    * Leave the **Health Threshold** set to `1`. Since each pool will only have one origin, this is the only possible value for this field.
    * Select the **Monitor** configured in the previous step.
    * Select **Health Monitor Regions** to choose from which [locations](/load-balancing/monitors/#health-monitor-regions) Cloudflare should send monitor requests to periodically test the origin health.
    * Set up **Pool Notifications** and **Health Notifications** as you prefer.

7. Select **Save**

8. Repeat the process for the second pool using the following values:

{{<table-wrap>}}

| Field                   |  Value                                        |
|------------------------ | ----------------------------------------------|
| Pool name               | `secondary`                                   |
| Description             | `Pages version`                               |
| Origin steering         | `<default>`                                   |
| Origin name             | `my-pages-website`                            |
| Origin address          | `<IP address>`                                |
| Host                    | `<your custom domain or Pages subdomain>`     |
| Health threshold        | `1`                                           |
| Monitor                 | `<monitor defined on previous step>`          |
| Health check regions    | `<select region of your choice>`              |

{{</table-wrap>}}

{{<Aside type="warning" header="Remember">}}
The origin pointing to [Cloudflare Pages](/pages/) must have **host header** filled in with the project domain for it to resolve correctly.

Failing to do so may result in [response code mismatch error](/load-balancing/troubleshooting/common-error-codes/#response-code-mismatch-error) for the monitor, and [Error 1000: DNS points to prohibited IP](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/#error-1000-dns-points-to-prohibited-ip) for visitors (if the load balancer is enabled despite the unhealthy monitor status).
{{</Aside>}}

{{<tutorial-step title="Check the origins health status">}}

Before setting up the load balancer:

1. Go to **Traffic** > **Load Balancing** > **Manage Pools**.
2. Find the origin pools you created in the list and check if their status is `healthy`.
3. Expand each pool entry to see that the health status for origins within them is also `healthy`.

The basic principle is that, if both your production website and your Pages project are live and directly accessible via browser, the monitors should also be able get a `200` code as HTTP response.

Revise your pools and monitor configuration to confirm they followed the instructions above. If you still find issues, refer to [Troubleshooting](/load-balancing/troubleshooting/common-error-codes/) or [FAQ](/load-balancing/troubleshooting/load-balancing-faq/#why-is-my-origin-or-pool-considered-unhealthy).

{{</tutorial-step>}}

{{<tutorial-step title="Create load balancer">}}

Step content

{{</tutorial-step>}}

{{<tutorial-step title="Deploy on a test hostname" optional="true">}}

Step content

{{</tutorial-step>}}

{{<tutorial-step title="Route production traffic to load balancer">}}

Step content

{{</tutorial-step>}}

{{</tutorial>}}