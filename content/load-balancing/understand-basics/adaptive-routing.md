---
pcx_content_type: concept
title: Adaptive routing
weight: 18
---

# Adaptive routing

Adaptive routing controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval between active health monitoring requests. If there is another healthy origin in the same pool, the request is retried once against this origin when receiving HTTP 521, 522, and 523 response codes.

## Failover across pools

When there are no healthy origin servers in the same pool, failover across pools extend the zero-downtime failover of requests to healthy origin servers in alternate pools according to the failover order defined by traffic and origin steering. 

### Enable failover across pools

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Traffic** > **Load Balancing**.
3. Navigate to your Load Balancers and select **Edit**.
4. From **Adaptive Routing**, enable **Failover across pools**.


