---
title: Multi-cloud setup
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Reference Architecture Diagram: R2 multi-cloud setup"
---

# Multi-cloud setup

## Introduction

Object storage is a modern data storage approach that stores data as objects rather than in a hierarchical structure like traditional file systems, making it highly scalable and flexible for managing vast amounts of data across diverse applications and environments.

Oftentimes organizations leverage multiple cloud providers to distribute their workloads across different platforms, mitigating risks associated with vendor lock-in, enhancing resilience, and optimizing performance and cost. However, managing data across multiple clouds introduces challenges related to data mobility and interoperability, particularly when it comes to transferring data between cloud providers or on-premises environments.

Egress fees are charges incurred when data is transferred out of a cloud provider's network, either to another cloud provider, on-premises infrastructure, or external services. These fees can vary depending on factors such as the volume of data transferred, the destination of the data, and the network bandwidth utilized.

[R2](/r2/) offers an enticing value proposition by not charging the costly egress bandwidth fees associated with typical cloud storage services. This can be very advantageous in the context of multi-cloud environments

## R2 multi-cloud setup

![Figure 1: R2 multi-cloud setup](/images/reference-architecture/r2-multi-cloud/r2-multi-cloud.svg "Figure 1: R2-multi-cloud setup")

1. **Worker <> R2 interaction**: Use R2's [Workers API](/r2/api/workers/workers-api-reference/) to interact with R2 from a Worker. Alternatively for improved portability use R2's [S3 API](/r2/api/s3/) from a Worker. No R2 egress fees apply.
2. **External service <> R2 interaction**: Use R2's [S3 API](/r2/api/s3/) to interact with R2 from external services. No R2 egress fees apply.

## Related resources

- [R2: Get started](/r2/get-started)
- [R2: S3 API](/r2/api/s3/)
- [R2: Workers API](/r2/api/workers/)
- [R2: Configure aws4fetch for R2](/r2/examples/aws/aws4fetch/)
