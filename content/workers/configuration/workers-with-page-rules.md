---
pcx_content_type: concept
title: Page Rules
meta:
  title: Page Rules with Workers
  description: Review the interaction between various Page Rules and Workers.
---

{{<heading-pill style="legacy">}}Page Rules{{</heading-pill>}}

Page Rules (legacy) trigger certain actions whenever a request matches one of the URL patterns you define. You can define a page rule to trigger one or more actions whenever a certain URL pattern is matched. Refer to [Page Rules](/rules/page-rules/) to learn more about configuring Page Rules.

## Page Rules with Workers

Cloudflare acts as a [reverse proxy](https://www.cloudflare.com/learning/what-is-cloudflare/) to provide services, like Page Rules (legacy), to Internet properties. Your application's traffic will pass through a Cloudflare data center that is closest to the visitor. There are hundreds of these around the world, each of which are capable of running services like Workers and Page Rules. If your application is built on Workers and/or Pages, the [Cloudflare global network](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) acts as your origin server and responds to requests directly from the Cloudflare global network.

When using Page Rules with Workers, the following workflow is applied.

1. Request arrives at Cloudflare data center.
2. Cloudflare decides if this request is a Worker route. Because this is a Worker route, Cloudflare evaluates and disabled a number of features, including some that would be set by Page Rules.
3. Page Rules run as part of normal request processing with some features now disabled.
4. Worker executes.
5. Worker makes a same-zone or other-zone subrequest. Because this is a Worker route, Cloudflare disables a number of features, including some that would be set by Page Rules.

Page Rules are evaluated both at the client-to-Worker request stage (step 2) and the Worker subrequest stage (step 5).

If you are experiencing Page Rule errors when running Workers, contact your Cloudflare account team or [Cloudflare Support](/support/contacting-cloudflare-support/).

## Affected Page Rules

The following Page Rules may not work as expected when an incoming request is matched to a Worker route:

*   Always Online
*   [Always Use HTTPS](/workers/configuration/workers-with-page-rules/#always-use-https)
*   [Auto Minify](/workers/configuration/workers-with-page-rules/#auto-minify-deprecated) (deprecated)
*   [Automatic HTTPS Rewrites](/workers/configuration/workers-with-page-rules/#automatic-https-rewrites)
*   [Browser Cache TTL](/workers/configuration/workers-with-page-rules/#browser-cache-ttl)
*   [Browser Integrity Check](/workers/configuration/workers-with-page-rules/#browser-integrity-check)
*   [Cache Deception Armor](/workers/configuration/workers-with-page-rules/#cache-deception-armor)
*   [Cache Level](/workers/configuration/workers-with-page-rules/#cache-level)
*   Disable Apps
*   [Disable Zaraz](/workers/configuration/workers-with-page-rules/#disable-zaraz)
*   [Edge Cache TTL](/workers/configuration/workers-with-page-rules/#edge-cache-ttl)
*   [Email Obfuscation](/workers/configuration/workers-with-page-rules/#email-obfuscation)
*   [Forwarding URL](/workers/configuration/workers-with-page-rules/#forwarding-url)
*   Host Header Override
*   [IP Geolocation Header](/workers/configuration/workers-with-page-rules/#ip-geolocation-header)
*   Mirage
*   [Origin Cache Control](/workers/configuration/workers-with-page-rules/#origin-cache-control)
*   [Rocket Loader](/workers/configuration/workers-with-page-rules/#rocket-loader)
*   [Security Level](/workers/configuration/workers-with-page-rules/#security-level)
*   [Server Side Excludes](/workers/configuration/workers-with-page-rules/#server-side-excludes-deprecated) (deprecated)
*   [SSL](/workers/configuration/workers-with-page-rules/#ssl)

This is because the default setting of these Page Rules will be disabled when Cloudflare recognizes that the request is headed to a Worker.

{{<Aside type="warning" header="Testing">}}

Due to ongoing changes to the Workers runtime, detailed documentation on how these rules will be affected are updated following testing.

{{</Aside>}}

To learn what these Page Rules do, refer to [Page Rules](/rules/page-rules/).

{{<Aside type="note" header="Same zone versus other zone">}}

A same zone subrequest is a request the Worker makes to an orange-clouded hostname in the same zone the Worker runs on. Depending on your DNS configuration, any request that falls outside that definition may be considered an other zone request by the Cloudflare network.

{{</Aside>}}

### Always Use HTTPS

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Ignored   |
| Worker     | Other Zone | Rule Ignored   |

### Auto Minify (deprecated)

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Ignored   |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Automatic HTTPS Rewrites

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Ignored   |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |


### Browser Cache TTL

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Ignored   |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Browser Integrity Check

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Ignored   |
| Worker     | Other Zone | Rule Ignored   |

### Cache Deception Armor

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Cache Level

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Disable Zaraz

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Edge Cache TTL

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Email Obfuscation

| Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Client     | Worker     | Rule Ignored   |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Forwarding URL

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Ignored   |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### IP Geolocation Header

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Origin Cache Control

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |

### Rocket Loader

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Ignored   |
| Worker     | Same Zone  | Rule Ignored   |
| Worker     | Other Zone | Rule Ignored   |

### Security Level

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Ignored   |
| Worker     | Other Zone | Rule Ignored   |

### Server Side Excludes (deprecated)

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Ignored   |
| Worker     | Same Zone  | Rule Ignored   |
| Worker     | Other Zone | Rule Ignored   |

### SSL

| Source     | Target     | Behavior       |
|------------|------------|----------------|
| Client     | Worker     | Rule Respected |
| Worker     | Same Zone  | Rule Respected |
| Worker     | Other Zone | Rule Ignored   |
