---
pcx_content_type: concept
title: Page Rules
weight: 0
---

# Page Rules

Page Rules trigger certain actions whenever a request matches one of the URL patterns you define. You can define a page rule to trigger one or more actions whenever a certain URL pattern is matched. Refer to the [Page Rules Support article](https://support.cloudflare.com/hc/en-us/articles/218411427) to learn more about configuring Page Rules.

## Page Rules with Workers

Cloudflare acts as a [reverse proxy](https://www.cloudflare.com/learning/what-is-cloudflare/) to provide services, like Page Rules, to Internet properties. Your application's traffic will pass through a Cloudflare data center that is closest to the visitor. There are hundreds of these around the world, each of which are capable of running services like Workers and Page Rules. If your application is built on Workers and/or Pages, the [Cloudflare global network](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) acts as your origin server and responds to requests directly from the Cloudflare global network.

When using Page Rules with Workers, the following workflow is applied.

1.  Request arrives at Cloudflare data center.
2.  Cloudflare decides if this request is a Worker route.
3.  Because this is a Worker route, Cloudflare disables a number of features, including some that would be set by Page Rules.
4.  Page Rules run as part of normal request processing with some features now disabled.
5.  Worker executes.

If you are experiencing Page Rule errors when running Workers, contact your Cloudflare account team or [Cloudflare Support](https://support.cloudflare.com/hc/en-us/articles/200172476-Contacting-Cloudflare-Support).

## Disabled Page Rules

The following Page Rules may not work as expected when an incoming request is matched to a Worker route:

*   Always Online
*   Always Use HTTPS
*   Auto Minify
*   Automatic HTTPS Rewrites
*   Disable Apps
*   Email Obfuscation
*   Forwarding URL
*   Host Header Override
*   Mirage
*   Rocket Loader

This is because the default setting of these Page Rules will be disabled when Cloudflare recognizes that the request is headed to a Worker.

{{<Aside type="warning" header="Testing">}}

Due to ongoing changes to the Workers runtime, detailed documentation on how these rules will be affected will be published following testing.

{{</Aside>}}

To learn what these Page Rules do, refer to [Understanding and configuring Cloudflare Page Rules](https://support.cloudflare.com/hc/en-us/articles/218411427).

### Email Obfuscation

<details>
<summary>Email Obfuscation</summary>
<div>

When implementing the Email Obfuscation Page Rule be aware that Email Obfuscation will run on subrequests, but not on parent requests. If the subrequest is going to an external site and the subrequest URL does not match the Page Rule URL configured for your site, the Email Obfuscation Page Rule will not execute.

For example, if the subrequest is going to an external object storage bucket with the URL being something like `yoursite.cloudprovider.com`, which does not match the Page Rule configured for your site, the Email Obfuscation Page Rule will be skipped.

</div>
</details>
