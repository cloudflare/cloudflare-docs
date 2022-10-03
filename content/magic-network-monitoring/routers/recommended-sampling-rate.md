---
title: Recommended sampling rate
pcx_content_type: overview
weight: 2
---

# Recommended sampling rate

NetFlow or sFlow data is created by sampling the traffic that passes through your router. Lower sampling rates increase network flow data accuracy but require more router memory and CPU when the data is generated. Additionally, network flow data accuracy is maintained if customer select a higher sampling rate but also receive a larger amount of traffic.

The table below gives general recommendations for sampling rates depending on your traffic volume. Customers are encouraged to test different sampling rates to find the best option.

| Traffic Volume | Recommendation |
|----------------|----------------|
| Low            | 1 in 500 packets<br> 1 in 100 - 1000 pages is an appropriate range|
| Medium         | 1 in 1000 - 2000 packets |
| High           | 1 in 2000 - 4000 packets |

As a general rule, customers may begin to notice a loss in data accuracy (depending on their network volume) as their network flow sampling rate climbs above 1 in 5000 packets.
