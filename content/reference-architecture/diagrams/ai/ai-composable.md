---
title: Composable AI architecture
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Reference Architecture Diagram: Composable AI architecture"
  description: The architecture diagram illustrates how AI applications can be built end-to-end on Cloudflare, or single services can be integrated with external infrastructure and services.
products: [Workers AI, Workers, Vectorize, D1, R2]
tags:
  - AI
---

# Composable AI architecture

## Introduction

The AI market is witnessing a rapid evolution, propelled by the swift pace of technological advancement. With breakthroughs occurring frequently, staying up-to-date with the latest innovations is imperative for organizations aiming to remain competitive. Short iteration cycles and agility have become indispensable in this landscape, allowing businesses to swiftly adopt and leverage the newest advancements in AI technology.

In this dynamic environment, the concept of composability, data portability, and standard APIs emerges as crucial factors in navigating the complexities of the AI ecosystem:

- Composability refers to the ability to assemble various AI components into tailored solutions, enabling organizations to mix and match different technologies to suit their specific needs.
- Data portability plays a pivotal role in facilitating seamless data exchange between different AI systems and platforms, ensuring interoperability and preventing data silos.
- Standard APIs for interoperability serve as the linchpin for integrating diverse AI components, enabling seamless communication and collaboration between disparate systems.

The significance of composability, data portability, and standard APIs becomes particularly pronounced in mitigating vendor lock-in and fostering flexibility. By embracing these principles, organizations can sidestep dependency on single vendors and instead opt for a best-in-class approach, selecting the most suitable solutions for their unique requirements. Overall, these principles pave the way for a more agile, adaptable, and future-proof AI ecosystem.

Cloudflare's AI platform has been designed with these principles in mind. The architecture diagram illustrates how AI applications can be built end-to-end on Cloudflare, or single services can be integrated with external infrastructure and services.

## Composable AI infrastructure

![Figure 1: Composable AI architecture](/images/reference-architecture/ai-composable/ai-composable.svg "Figure 1: Composable AI architecture")

1. **Compute**: The compute layer is the core of the application. All business logic, as well as use of other components, is defined here. The compute layer interacts with other services such as inference services, vector search, databases and data storage. Serverless solutions such as [Cloudflare Workers](/workers/) offer fast iteration and automatic scaling, which allows developers to focus on the use case instead of infrastructure management. Importantly for composability is the support of standard interfaces such as HTTP or TCP, which the Workers' runtime both supports via the [`fetch()` API](/workers/runtime-apis/fetch/) and [`connect()` API](/workers/runtime-apis/tcp-sockets/) respectively.
2. **Inference**: AI inference is responsible for the AI-capabilities of the application. Operational models vary between self-hosting models or consuming Inference-as-a-service providers such as [Workers AI](/workers-ai/). In the latter case, [REST APIs](/api/operations/workers-ai-post-run-model) make interacting with inference services from any service/client easy to implement. Using platform-specific integrations such as [Bindings](/workers-ai/configuration/bindings/) for interaction between Workers and other services enable simplified development as complexity such as authentication is abstracted away.
3. **Vector Search**: Certain use cases such as [RAG](/reference-architecture/diagrams/ai/ai-rag/) leverage vector search for similarity matching. Operational models vary between self-hosting databases or consuming vector-specific database-as-a-service (DBaaS) providers such as [Vectorize](/vectorize/). In the latter case, [REST APIs](/api/operations/vectorize-list-vectorize-indexes) make interacting with it from any service/client easy to implement. Using platform-specific integrations such as [Bindings](/vectorize/get-started/embeddings/#3-bind-your-worker-to-your-index) for interaction between Workers and other services enable simplified development as complexity such as authentication is abstracted away.
4. **Data & Storage**: Databases and data storage add state to AI applications. User management, session storage and persisting data are common requirements for AI applications. Depending on the use case, different solutions are required such as relationship databases or object storage. A variety of solutions for self-hosted or managed services exist. On Cloudflare, this could be for instance [D1](/d1/) and [R2](/r2/). REST APIs make interacting with inference services from any service/client easy to implement. Using platform-specific integrations such as Bindings for interaction between Workers and data and database services enable simplified development as complexity such as authentication is abstracted away.

## Related resources

- [Workers: Serverless compute](/workers/)
- [Workers AI: Serverless AI inference](/workers-ai/)
- [Vectorize: Serverless Vector database](/vectorize/)
- [D1: Serverless SQLite database](/d1/)
- [R2: Object storage](/r2/)
