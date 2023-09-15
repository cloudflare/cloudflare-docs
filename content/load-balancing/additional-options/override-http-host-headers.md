---
pcx_content_type: how-to
title: Override HTTP Host headers
weight: 16
---

# Override HTTP Host headers

When your application needs specialized routing (`CNAME` setup or custom hosts like Heroku), you can customize the `Host` header used in health monitors on a per-origin or per-monitor level.

{{<Aside type="warning" header="Important">}}

If you set a header override on an individual origin, it will take precedence over a header override set on a monitor.

Also, if you configure an [Origin Rule](/rules/origin-rules/) that overrides the hostname and set up a header override in your Load Balancer configuration, the Load Balancer configuration will take precedence over the Origin Rule hostname override.

{{</Aside>}}

## Per origin Host header override

To balance traffic across multiple hosts, add `Host` headers to individual origins within the same pool.

For example, you might have a pool with origins hosted in multiple AppEngine projects or Amazon S3 buckets. You also might want to set up specific failover origins within a pool.

Since these examples require specific hostnames per origin, your load balancer will not properly route traffic _without_ a `Host` header override.

If you need an origin `Host` header override, add it when [creating](/load-balancing/how-to/create-pool/) or editing a pool. For security reasons, this header must meet one of the following criteria:

- Is a subdomain of a zone associated with this account
- Matches the origin address
- Publicly resolves to the origin address

## Host header prioritization

If you set a header override on an individual origin, it will take precedence over a header override set on a monitor during health monitor requests.

For example, you might have a load balancer for `www.example.com` with the following setup:

- Origin Pools:

  - Pool 1:

    - Origin 1 (`Host` header set to `lb-app-a.example.com`)
    - Origin 2

  - Pool 2:

    - Origin 3
    - Origin 4 (`Host` header set to `lb-app-b.example.com`)

- Monitor (`Host` header set to `www.example.com`)

In this scenario, health monitor requests for **Origin 1** would use `lb-app-a.example.com`, health monitor requests for **Origin 4** would use `lb-app-b.example.com`, and all other health monitor requests would default to `www.example.com`. For more information on updating your custom host configuration to be compatible with Cloudflare, see [Configure Cloudflare and Heroku over HTTPS](https://support.cloudflare.com/hc/articles/205893698).

For a list of origins that override a monitor's `Host` header:

1.  On a monitor, select **Edit**.
2.  Select **Advanced health monitor settings**.
3.  If you have origin overrides, you will see **Origin host header overrides**.

![Example configuration of origin host header overrides](/images/load-balancing/origin-host-header-override.png)
