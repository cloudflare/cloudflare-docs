---
pcx_content_type: concept
title: Cloudflare Load Balancing
weight: 0
---

# Cloudflare Load Balancing

You can configure Spectrum with Cloudflare [Load Balancing](/load-balancing/) to provide TCP healthchecks, failover, and traffic steering, bringing resiliency to your Spectrum applications.

For an overview of how Cloudflare Load Balancing works refer to [Load Balancing components](/load-balancing/understand-basics/load-balancing-components/). For setup guidance refer to [Add load balancing to Spectrum applications](/load-balancing/additional-options/spectrum/).

## TCP health checks

You can configure a Cloudflare load balancer to probe any TCP port for an accepted connection, which is in addition to HTTP and HTTPS probing capabilities.

Health checks are optional within a load balancer. However, without a health check, the load balancer will distribute traffic to all origins in the first pool. With the health checks enabled, hosts that have gone into an error state will not receive traffic, maintaining uptime. This allows you to enable intelligent failover within a pool of hosts or amongst multiple pools.

The example below shows a TCP health check configuration for an application running on port 2408 with a refresh rate every 30 seconds. You can configure TCP health checks through the dashboard or through Cloudflare's API.

{{<details header="TCP health check - Dashboard example">}}

| Field            | Value     |
|------------------|-----------|
| Type             | TCP       |
| Port             | 2408      |

Under **Advanced health check settings**:

| Field            | Value     |
|------------------|-----------|
| Interval         | 30        |
| Timeout          | 5 seconds |
| Retries          | 2         |

{{</details>}}

{{<details header="TCP health check - API example">}}

```bash
curl 'https://api.cloudflare.com/client/v4/organizations/{ORG_ID}/load_balancers/monitors'  \
-H 'Content-Type: application/json' \
-H 'X-Auth-Email: user@example.com' \
-H 'X-Auth-Key: 00000000000' \
-X POST --data '{"description":"Spectrum Health Check","type":"tcp","port":2048,"interval":30,"retries":2,"timeout":5,"method":"connection_established"}'
```

```json
{
  "description": "Spectrum Health Check",
  "type": "tcp",
  "port": 2048,
  "interval": 30,
  "retries": 2,
  "timeout": 5,
  "method": "connection_established"
}
```

{{</details>}}

## Traffic steering

All traffic steering policies are available for transport load balancing through Spectrum. Refer to the Load Balancing documentation to learn more about the available [traffic steering](/load-balancing/understand-basics/traffic-steering/steering-policies/) and [origin steering](/load-balancing/understand-basics/traffic-steering/origin-level-steering/) options.

## Weights

[Origin weights](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) allow you to have origins with different capacity or to split traffic amongst hosts for any other reason.

Weight configured within a load balancer pool will be honored with load balancing through Spectrum.

## Requirements and limitations

* This feature requires an Enterprise plan. If you would like to upgrade, contact your account team.
* Currently, [session affinity](/load-balancing/understand-basics/session-affinity/) and [custom rules](/load-balancing/additional-options/load-balancing-rules/) are not supported by Spectrum.
* UDP health checks are only available with public monitoring. TCP can be used with both public and private montoring.