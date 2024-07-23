---
pcx_content_type: how-to
title: Override HTTP Host headers
weight: 16
---

# Override HTTP Host headers

When your application needs specialized routing (`CNAME` setup or custom hosts like Heroku), you can customize the `Host` header used in health monitors on a per-endpoint or per-monitor level.

{{<Aside type="warning" header="Important">}}

If you set a header override on an individual endpoint, it will take precedence over a header override set on a monitor.

Also, if you configure an [Origin Rule](/rules/origin-rules/) that overrides the hostname and set up a header override in your Load Balancer configuration, the Load Balancer configuration will take precedence over the Origin Rule hostname override.

{{</Aside>}}

## Per endpoint Host header override

To balance traffic across multiple hosts, add `Host` headers to individual endpoints within the same pool.

For example, you might have a pool with endpoints hosted in multiple AppEngine projects or Amazon S3 buckets. You also might want to set up specific failover endpoints within a pool.

Since these examples require specific hostnames per endpoint, your load balancer will not properly route traffic _without_ a `Host` header override.

If you need an endpoint `Host` header override, add it when [creating](/load-balancing/pools/create-pool/) or editing a pool. For security reasons, this header must meet one of the following criteria:

- Is a subdomain of a zone associated with this account
- Matches the endpoint address
- Publicly resolves to the endpoint address

## Host header prioritization

If you set a header override on an individual endpoint, it will take precedence over a header override set on a monitor during health monitor requests.

For example, you might have a load balancer for `www.example.com` with the following setup:

- Pools:

  - Pool 1:

    - Endpoint 1 (`Host` header set to `lb-app-a.example.com`)
    - Endpoint 2

  - Pool 2:

    - Endpoint 3
    - Endpoint 4 (`Host` header set to `lb-app-b.example.com`)

- Monitor (`Host` header set to `www.example.com`)

In this scenario, health monitor requests for **Endpoint 1** would use `lb-app-a.example.com`, health monitor requests for **Endpoint 4** would use `lb-app-b.example.com`, and all other health monitor requests would default to `www.example.com`. For more information on updating your custom host configuration to be compatible with Cloudflare, see [Configure Cloudflare and Heroku over HTTPS](/support/third-party-software/others/configure-cloudflare-and-heroku-over-https/).

For a list of endpoints that override a monitor's `Host` header:

1.  On a monitor, select **Edit**.
2.  Select **Advanced health monitor settings**.
3.  If you have endpoint overrides, you will see **Endpoint host header overrides**.

![Example configuration of endpoint host header overrides](/images/load-balancing/origin-host-header-override.png)
