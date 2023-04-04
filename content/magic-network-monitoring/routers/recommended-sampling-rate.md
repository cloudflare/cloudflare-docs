---
title: Recommended sampling rate
pcx_content_type: reference
weight: 2
meta:
    description: The best sampling rate recommendations for your network’s traffic volume.
---

# Recommended sampling rate

NetFlow or sFlow data is created by sampling the traffic that passes through your router. Lower sampling rates increase network flow data accuracy but require more router memory and CPU when the data is generated. Additionally, network flow data accuracy is maintained if customer select a higher sampling rate but also receive a larger amount of traffic.

The table below gives general recommendations for sampling rates depending on your traffic volume. Customers are encouraged to test different sampling rates to find the best option.

| Traffic Volume | Recommendation |
|----------------|----------------|
| Low            | Between 1 in 100 packets - 1 in 500 packets |
| Medium         | Between 1 in 1,000 - 1 in 2,000 packets |
| High           | Between 1 in 2,000 - 1 in 4,000 packets |

As a general rule, customers may begin to notice a loss in data accuracy (depending on their network volume) as their network flow sampling rate climbs above 1 in 5,000 packets.
