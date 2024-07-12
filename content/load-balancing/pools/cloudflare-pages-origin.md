---
pcx_content_type: tutorial
title: Use Pages as an origin for Load Balancing
weight: 3
updated: 2024-07-03
difficulty: Beginner
content_type: 📝 Tutorial
products: [Pages]
---

# Use Cloudflare Pages as origin

{{<tutorial-date-info>}}

This tutorial is intended as an introductory example of how you can leverage Cloudflare's global traffic management.

The following sections will guide you through setting up an [active-passive failover](/load-balancing/load-balancers/common-configurations/#active---passive-failover) load balancer with [Cloudflare Pages](/pages/) as one of the {{<glossary-tooltip term_id="endpoint"  link="/load-balancing/understand-basics/load-balancing-components/#endpoints">}}endpoints{{</glossary-tooltip>}}, while also going into details about the Load Balancing dashboard workflow, and some important field values and troubleshooting.

## Use cases

This setup can be useful if you are migrating your production website or application to Pages or if you just want to have a backup or a personalized web page for when your primary origin goes down.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you:
* Are familiar with the Cloudflare [Load Balancing components](/load-balancing/understand-basics/load-balancing-components/).
* Own a domain and use Cloudflare as a [primary DNS provider](/dns/zone-setups/full-setup/).
* Have [deployed a website or application](/pages/get-started/git-integration/) with Cloudflare Pages.
* Have [enabled Load Balancing](/load-balancing/get-started/enable-load-balancing/) in your account.

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create health monitor">}}

Although you can create all the components in the **Create Load Balancer** workflow, using the **Manage Monitors** and **Manage Pools** sections separately makes it easier to test and troubleshoot the configurations of each of these components before bringing them together in a load balancer.

Monitors define the criteria based on which an endpoint will be considered healthy or not. Start by setting up a monitor as follows.

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

5. Under **Advanced health check settings**, keep the default values and enable the **Follow Redirects** option.

    When you are using a service like Cloudflare Pages, it is possible that requests from the health monitor - as well as the ones from your visitors - are redirected before reaching their destination. Enabling this option prevents the monitor from reporting an unhealthy endpoint when it actually has only been redirected (with a `301` code, for example).

{{<Aside type="note" header="Tip">}}
You can name the monitor after the parameters you have defined. For example: `HTTP - 200 - Follow Redirects`.

This way you can easily remember the criteria a certain monitor is using when you decide to attach it to other endpoints as well.
{{</Aside>}}

6. Select **Save** to confirm.

{{</tutorial-step>}}

{{<tutorial-step title="Create pools">}}

Pools hold information about where the health monitor requests and your visitors requests will be directed to.

To support the [use cases](#use-cases) mentioned above, and assuming you only have one origin server for your production website and one for the Cloudflare Pages instance, create two pools with one endpoint each:

{{<Aside type="warning" header="Important">}}
The endpoint pointing to [Cloudflare Pages](/pages/) must have **host header** filled in with the project domain (`<project>.pages.dev`) for it to resolve correctly. You can find a reference table for correct setup in Step 8 below.

Failing to add the host header will result in [response code mismatch error](/load-balancing/troubleshooting/common-error-codes/#response-code-mismatch-error) for the monitor, and [Error 1000: DNS points to prohibited IP](/support/troubleshooting/cloudflare-errors/troubleshooting-cloudflare-1xxx-errors/#error-1000-dns-points-to-prohibited-ip) for visitors (if the load balancer is enabled despite the unhealthy monitor status).
{{</Aside>}}

1. Go to **Traffic** > **Load Balancing**.

2. Select **Manage Pools** and then **Create**.

3. For the first pool, start by filling out the fields:
  * A name for the pool (must be unique). Suggestion: `primary`
  * A description to provide more details on the name. Suggestion: `production website`

4. Leave the choice for [**Endpoint Steering**](/load-balancing/understand-basics/traffic-steering/origin-level-steering/) as is. Since each pool will only have one endpoint, this steering method will not interfere in this case.

5. Add your origin server as an endpoint with the following information:
  * A name for the endpoint (must be unique). Suggestion: `my-website`.
  * The endpoint IP address or hostname.

    {{<Aside type="warning">}}
As exemplified in Step 8 below, when using Cloudflare as an endpoint, **do not** specify one of Cloudflare's Anycast IP addresses. Because these IPs can change at any time, you should use a hostname instead.
{{</Aside>}}
  * The endpoint [weight](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights), which can be set to `1`. Since each pool will only have one endpoint, the endpoint weight will not make a difference in this case.
  * A [hostname](/load-balancing/additional-options/override-http-host-headers/) by selecting **Add host header**.

    {{<Aside type="warning">}}
If your production website is hosted on a platform like Cloudflare Pages, where you have a default subdomain (`example.pages.dev`) and then configure a [custom domain](/pages/configuration/custom-domains) (`my-app.com`), you will need to add a host header to avoid failing the health monitor request.
{{</Aside>}}
6. Finish configuring the first pool with the following information:
  * Leave the **Health Threshold** set to `1`. Since each pool will only have one endpoint, this is the only possible value for this field.
  * Select the **Monitor** configured in the previous step.
  * Select **Health Check Regions** to choose from which [locations](/load-balancing/monitors/#health-monitor-regions) Cloudflare should send monitor requests to periodically test the endpoint health.

7. Select **Save**

8. Repeat the process for the second pool using the following values:

{{<table-wrap>}}

| Field                       |  Value                                          |
|---------------------------- | ------------------------------------------------|
| Pool name                   | `secondary`                                     |
| Description                 | `Pages version`                                 |
| Endpoint steering           | `<default>`                                     |
| Endpoint name               | `my-pages-website`                              |
| Endpoint address            | `<your custom domain or Pages subdomain>`       |
| Weight                      | `1`       |
| Host (**Add host header**)  | `<your custom domain or Pages subdomain>`       |
| Health threshold            | `1`                                             |
| Monitor                     | `<monitor defined on previous step>`            |
| Health check regions        | `<select region of your choice>`                |

{{</table-wrap>}}

{{</tutorial-step>}}

{{<tutorial-step title="Check the endpoints health status">}}

Before setting up the load balancer:

1. Go to **Traffic** > **Load Balancing** > **Manage Pools**.
2. Find the pools you created in the list and check if their status is `Healthy`. You might have to refresh the page.
3. Expand each pool entry to confirm that the health status for endpoints within them is also `Healthy`.

The basic principle is that, if both your production website and your Cloudflare Pages project are live and directly accessible via browser, the monitors should also be able to get a `200` code as HTTP response.

Revise your pools and monitor configurations to confirm they followed the instructions above. If you still find issues, refer to [Troubleshooting](/load-balancing/troubleshooting/common-error-codes/) or [FAQ](/load-balancing/troubleshooting/load-balancing-faq/#why-is-my-endpoint-or-pool-considered-unhealthy).

{{</tutorial-step>}}

{{<tutorial-step title="Create load balancer">}}

After confirming the endpoints and monitors are set up correctly and return the expected health status, create the load balancer:

1. Go to **Traffic** > **Load Balancing** > **Create Load Balancer**.

2. On the **Hostname** page, configure the following and select **Next**.
    * Enter a **Hostname**, which is the DNS name at which the load balancer is available. Suggestion: for now, you can just add a temporary hostname such as `lb` (so the complete field value would look like `lb.<your_domain>`).
    * Toggle the orange cloud icon to update the [proxy mode](/load-balancing/understand-basics/proxy-modes/), which affects how traffic is routed and which IP addresses are advertised.
    * Select your preferred option for [session affinity](/load-balancing/understand-basics/session-affinity/) and [adaptive routing](/load-balancing/understand-basics/adaptive-routing/).

3. On the **Add a Pool** page, configure the following and select **Next**.
    * Select the first pool you created previously and select **Add Pool**.
    * Do the same for the second pool and reorder them if needed. For the purposes of this tutorial, your production website pool would be the first (`primary`) and the Cloudflare Pages pool would be the second (`secondary`).
    * If needed, update the [**Fallback Pool**](/load-balancing/understand-basics/health-details/#fallback-pools). For the purposes of this tutorial, you can leave this pointing to your secondary pool.

4. On the **Monitors** page, review the monitors attached to your pools and the expected health status, and select **Next**.

5. On the **Traffic Steering** page, make sure **Off** is selected. This means the load balancer will follow the order established on the **Add a Pool** section (Step 3 above), achieving an [Active - Passive Failover](/load-balancing/load-balancers/common-configurations/#active---passive-failover) configuration.

6. For the purposes of this tutorial, leave the [**Custom Rules**](/load-balancing/additional-options/load-balancing-rules/) option empty.

7. On the **Review** page, review your configuration and select **Save as Draft**.

A DNS record of the type `LB` will be created under [**DNS** > **Records**](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) with the hostname you have defined, and a corresponding load balancer will be added to [**Traffic** > **Load Balancing** > **Manage Load Balancers**](https://dash.cloudflare.com/?to=/:account/:zone/traffic/load-balancing)

{{</tutorial-step>}}

{{<tutorial-step title="Deploy on a test hostname" optional="true">}}

If you have used a temporary hostname for your load balancer, follow the steps below to deploy and test it.

1. Go to **Traffic** > **Load Balancing**.
2. In the **Manage Load Balancers** list, locate the load balancer you created under a test hostname (such as `lb`) and enable it.
3. On your browser, request the temporary hostname (`lb.example.com`). You should see the website or application hosted at your primary origin server.
4. Go back to the **Manage Load Balancers** list, select to expand the test load balancer, and disable the primary pool.
5. On a new incognito window of your browser, request the temporary hostname once again. You should see the website or application hosted at your secondary origin server this time.

    If you find issues, revise your pools, monitor, and load balancer configurations to confirm they followed the instructions above. Also refer to [Troubleshooting](/load-balancing/troubleshooting/common-error-codes/) or [FAQ](/load-balancing/troubleshooting/load-balancing-faq/) if needed.

{{<Aside type="warning" header="Important">}}
After you confirm everything is working correctly, make sure you re-enable the pools within the load balancer.
{{</Aside>}}

{{</tutorial-step>}}

{{<tutorial-step title="Route production traffic to load balancer">}}

Now that you have set up your load balancer and verified everything is working correctly, you can put the load balancer on a live domain or subdomain:

1. Confirm that your production hostname has the correct [priority order](/load-balancing/load-balancers/dns-records/#priority-order) of DNS records and is covered by an [SSL/TLS certificate](/load-balancing/load-balancers/dns-records/#ssltls-coverage).

    If you have an Enterprise account, also evaluate your application for any excluded paths. For example, you might not want the load balancer to distribute requests directed at your `/admin` path. For any exceptions, set up an [Origin rule](/rules/origin-rules/features/#dns-record) or [Page rule](/rules/page-rules/how-to/override-url-or-ip-address/).

2. Configure your load balancer to receive production traffic by editing the **Hostname** of your existing load balancer.
{{</tutorial-step>}}

{{</tutorial>}}
