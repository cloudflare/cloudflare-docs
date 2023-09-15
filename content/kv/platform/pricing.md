---
pcx_content_type: concept
title: Pricing
weight: 12
---

# Pricing

|                 | Free plan[^1]         | Paid plan                         |
| --------------- | --------------------- | --------------------------------- |
| Read requests   | 100,000 / day         | 10 million/month, + $0.50/million |
| Write requests  | 1,000 / day           | 1 million/month, + $5.00/million  |
| Delete requests | 1,000 / day           | 1 million/month, + $5.00/million  |
| List requests   | 1,000 / day           | 1 million/month, + $5.00/million  |
| Stored data     | 1 GB                  | 1 GB, + $0.50/ GB-month           |


[^1]: The Workers Free plan includes limited KV usage. All limits reset daily at 00:00 UTC. If you exceed any one of these [limits](/kv/platform/limits/), further operations of that type will fail with an error.