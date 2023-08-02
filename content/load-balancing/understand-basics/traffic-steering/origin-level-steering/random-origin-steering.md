---
pcx_content_type: concept
title: Random
weight: 2
meta:
  title: Random steering
---

# Random steering

**Random steering** sends requests to origins purely based on [origin weights](/load-balancing/understand-basics/traffic-steering/origin-level-steering/#weights). Distributes traffic more accurately, but may cause requests from the same IP to hit different origins.
