---
pcx_content_type: concept
title: System requirements
weight: 6
---

# System requirements

Running `cloudflared` instances on a server and proxying traffic through it requires computing resources such as CPU and memory on the server. The actual amount of resource usage depends on many variables, including the number of requests per second, bandwidth, network path and hardware. Our connector, `cloudflared`, was designed to be lightweight and flexible enough to be effectively deployed on Raspberry Pi, your laptop or a server running your data center. Tunnel does not programmatically enforce any throughput limitations.

If you are hosting a Tunnel in GCP, AWS, or Azure you can view our [deployment guides](/cloudflare-one/connections/connect-networks/deployment-guides/) which are more prescriptive in assigning minimum system requirements. 
