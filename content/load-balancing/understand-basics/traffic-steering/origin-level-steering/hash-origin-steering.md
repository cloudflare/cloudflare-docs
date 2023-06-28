---
pcx_content_type: concept
title: Hash
weight: 3
meta:
  title: Hash steering
---

# Hash steering

**Hash steering** guides Cloudflare to send requests to origins based on a combination of [origin weights](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights) and previous requests from that IP address. Ensures requests from the same IP address will hit the same origin, but actual traffic distribution may differ from origin weights.