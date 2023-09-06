---
pcx_content_type: concept
title: Page Rules
---

# Page Rules

Page Rules trigger certain actions whenever a request matches one of the URL patterns you define. You can define a page rule to trigger one or more actions whenever a certain URL pattern is matched. Refer to the [Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) to learn more about configuring Page Rules.

## Page Rules with Workers

Cloudflare acts as a [reverse proxy](https://www.cloudflare.com/learning/what-is-cloudflare/) to provide services, like Page Rules, to Internet properties. Your application's traffic will pass through a Cloudflare data center that is closest to the visitor. There are hundreds of these around the world, each of which are capable of running services like Workers and Page Rules. If your application is built on Workers and/or Pages, the [Cloudflare global network](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) acts as your origin server and responds to requests directly from the Cloudflare global network.

When using Page Rules with Workers, the following workflow is applied.

1. Request arrives at Cloudflare data center.
2. Cloudflare decides if this request is a Worker route. Because this is a Worker route, Cloudflare evaluates and disabled a number of features, including some that would be set by Page Rules.
3. Page Rules run as part of normal request processing with some features now disabled.
4. Worker executes.
5. Worker makes a same-zone or other-zone subrequest. Because this is a Worker route, Cloudflare disables a number of features, including some that would be set by Page Rules.

Page Rules are evaluated both at the client-to-Worker request stage (step 2) and the Worker subrequest stage (step 5).

If you are experiencing Page Rule errors when running Workers, contact your Cloudflare account team or [Cloudflare Support](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/).

## Affected Page Rules

The following Page Rules may not work as expected when an incoming request is matched to a Worker route:

*   Always Online
*   [Always Use HTTPS](/workers/configuration/workers-with-page-rules/#always-use-https)
*   [Auto Minify](/workers/configuration/workers-with-page-rules/#auto-minify)
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
*   [Server Side Excludes](/workers/configuration/workers-with-page-rules/#server-side-excludes)
*   [SSL](/workers/configuration/workers-with-page-rules/#ssl)

This is because the default setting of these Page Rules will be disabled when Cloudflare recognizes that the request is headed to a Worker.

{{<Aside type="warning" header="Testing">}}

Due to ongoing changes to the Workers runtime, detailed documentation on how these rules will be affected are updated following testing.

{{</Aside>}}

To learn what these Page Rules do, refer to [Understanding and configuring Cloudflare Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/).

{{<Aside type="note" header="Same zone versus other zone">}}

A same zone subrequest is a request the Worker makes to an orange-clouded hostname in the same zone the Worker runs on. Depending on your DNS configuration, any request that falls outside that definition may be considered an other zone request by the Cloudflare network.

{{</Aside>}}

### Always Use HTTPS

{{<table-wrap>}}

|     Page Rule    | Source     | Target     | Behavior       |
| -----------------|------------|------------|----------------|
| Always Use HTTPS | Client     | Worker     | Rule Respected |
| Always Use HTTPS | Worker     | Same Zone  | Rule Ignored   |
| Always Use HTTPS | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Auto Minify

{{<table-wrap>}}

|     Page Rule    | Source     | Target     | Behavior       |
| -----------------|------------|------------|----------------|
| Auto Minify | Client     | Worker     | Rule Ignored   |
| Auto Minify | Worker     | Same Zone  | Rule Respected |
| Auto Minify | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Automatic HTTPS Rewrites

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Automatic HTTPS Rewrites | Client     | Worker     | Rule Ignored   |
| Automatic HTTPS Rewrites | Worker     | Same Zone  | Rule Respected |
| Automatic HTTPS Rewrites | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Browser Cache TTL

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Browser Cache TTL        | Client     | Worker     | Rule Ignored   |
| Browser Cache TTL        | Worker     | Same Zone  | Rule Respected |
| Browser Cache TTL        | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Browser Integrity Check

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Browser Integrity Check  | Client     | Worker     | Rule Respected |
| Browser Integrity Check  | Worker     | Same Zone  | Rule Ignored   |
| Browser Integrity Check  | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Cache Deception Armor

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Cache Deception Armor    | Client     | Worker     | Rule Respected |
| Cache Deception Armor    | Worker     | Same Zone  | Rule Respected |
| Cache Deception Armor    | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Cache Level

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Cache Level              | Client     | Worker     | Rule Respected |
| Cache Level              | Worker     | Same Zone  | Rule Respected |
| Cache Level              | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Disable Zaraz

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Disable Zaraz            | Client     | Worker     | Rule Respected |
| Disable Zaraz            | Worker     | Same Zone  | Rule Respected |
| Disable Zaraz            | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Edge Cache TTL

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Edge Cache TTL           | Client     | Worker     | Rule Respected |
| Edge Cache TTL           | Worker     | Same Zone  | Rule Respected |
| Edge Cache TTL           | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Email Obfuscation

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Email Obfuscation        | Client     | Worker     | Rule Ignored   |
| Email Obfuscation        | Worker     | Same Zone  | Rule Respected |
| Email Obfuscation        | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Forwarding URL

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Forwarding URL           | Client     | Worker     | Rule Ignored   |
| Forwarding URL           | Worker     | Same Zone  | Rule Respected |
| Forwarding URL           | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### IP Geolocation Header

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| IP Geolocation Header    | Client     | Worker     | Rule Respected |
| IP Geolocation Header    | Worker     | Same Zone  | Rule Respected |
| IP Geolocation Header    | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Origin Cache Control

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Origin Cache Control     | Client     | Worker     | Rule Respected |
| Origin Cache Control     | Worker     | Same Zone  | Rule Respected |
| Origin Cache Control     | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Rocket Loader

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Rocket Loader            | Client     | Worker     | Rule Ignored   |
| Rocket Loader            | Worker     | Same Zone  | Rule Ignored   |
| Rocket Loader            | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Security Level

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Security Level           | Client     | Worker     | Rule Respected |
| Security Level           | Worker     | Same Zone  | Rule Ignored   |
| Security Level           | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### Server Side Excludes

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| Server Side Excludes     | Client     | Worker     | Rule Ignored   |
| Server Side Excludes     | Worker     | Same Zone  | Rule Ignored   |
| Server Side Excludes     | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}

### SSL

{{<table-wrap>}}

|     Page Rule            | Source     | Target     | Behavior       |
| -------------------------|------------|------------|----------------|
| SSL                      | Client     | Worker     | Rule Respected |
| SSL                      | Worker     | Same Zone  | Rule Respected |
| SSL                      | Worker     | Other Zone | Rule Ignored   |

{{</table-wrap>}}
