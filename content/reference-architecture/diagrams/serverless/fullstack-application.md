---
title: Fullstack Application
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Fullstack application"
---

# Fullstack web applications

## Introduction

Full-stack web applications leverage a combination of frontend and backend technologies, collectively forming a stack that powers the entire application. This technology stack encompasses various tools, frameworks, and languages, each serving a specific purpose within the development ecosystem.

On the frontend, developers commonly use HTML, CSS, and JavaScript to create the user interface (UI) and define the visual presentation of the application. Additionally, frontend frameworks and libraries such as React, Angular, or Vue.js provide developers with reusable components and efficient ways to manage the application's state, enabling the creation of dynamic and responsive user interfaces.

On the backend, developers employ server-side programming languages and frameworks to handle requests, process data, and manage application logic. Common backend languages include Python, JavaScript, Ruby, and Java, each again with its accompanying frameworks. These frameworks provide developers with tools and utilities for routing, middleware, authentication, and database interaction, simplifying the development of backend services and APIs.

Database management is a critical aspect of full-stack web development, with various database systems utilized to store and retrieve application data. Relational databases like MySQL, PostgreSQL, and SQLite are commonly used for structured data storage, offering features such as ACID compliance, transactions, and relational querying capabilities. Alternatively, NoSQL databases like MongoDB, Cassandra, and Neo4j cater to non-relational data models, providing flexibility and scalability for applications with diverse data requirements.

Often fullstack applications make use of pre-existing components, tools and services instead of building every feature from the ground up. Hence integration of third-party frontend components or interactions with external APIs is common.

By leveraging a comprehensive technology stack encompassing frontend frameworks, backend languages, databases, and supporting tools and services, developers can build robust, scalable, and feature-rich full-stack web applications that meet the needs of modern users and businesses across various domains.

Examples of full-stack web applications include e-commerce platforms, social networking sites, and productivity tools, which leverage frontend technologies for intuitive user interfaces and backend technologies for managing transactions, user data, and business logic.

Cloudflare offers all building blocks to build, deploy and operate modern fullstack applications. All of Cloudflare's services are fully serverless and designed for global distribution. This enables developers to build great end-user experiences without large operational overhead.

## Fullstack application

![Figure 1: Fullstack application](/images/reference-architecture/fullstack-app/fullstack-app-base.svg "Figure 1: Fullstack application")

1. **Client**: Sends requests to server. This could be through a desktop or mobile browser, or native or mobile app.
2. **Security**: Process incoming request to ensure security of application. This includes encryption of traffic using [SSL/TLS](/ssl/), offering [DDOS protection](/ddos-protection/), filtering malicious traffic through a [web application firewall (WAF)](/waf/), and [mitigations against automated bots](/bots/). Depending on configuration, requests can be blocked, logged or allowed based on a diverse set of parameters. Sensible fully managed and default configurations can be used to reduce attack surfaces with little to no overhead.
3. **Performance**: Serve static requests from [global cache (CDN)](/cache/). This reduces latency and lowers resource utilization as the requests are being served from cache instead of requiring a request to storage & media services or compute services.
4. **Static & Media**: Serve static files from [R2](/r2/), optimized images from [Images](/images/) and on-demand videos as well as live streams from [Stream](/stream/).
5. **Compute**: Process dynamic requests using serverless compute with [Workers](/workers/). This could include authentication, routing, middleware, database interactions, and serving APIs. Moreover, use [Pages](/pages/) to serve client side or server side rendering web frameworks such as React, Vue or Angular. Integrate AI services using serverless inference with [Workers AI](/workers-ai/). Both Workers and Pages Functions allow for simple interaction with other resources using [Bindings](/workers/runtime-apis/bindings/).
6. **Data & storage**: Introduce state to applications by persisting and retrieving data. This includes [R2](/r2/) for object storage, [D1](/d1/) for relational data, [KV](/kv/) for data with high read requirements and [Durable Objects](/durable-objects/) for strongly consistent data storage. The [storage options guide](/workers/platform/storage-options/) can help to assess which storage option is the most suitable for a given use case.
7. **Internal observability**: Send logs from all services with [Logpush](/logs/about/), gather insights with [Analytics](/analytics/) from all services, or collect custom metrics from Workers using [Workers Analytics Engine](/analytics/analytics-engine/).
8. **External integrations**: Integrate Cloudflare's observability solutions with your existing third-party solutions. Logpush has support for many [destinations](/logs/get-started/enable-destinations/) to push logs to for storage and further analysis. Also, Cloudflare analytics can be [integrated with analytics solutions](/analytics/analytics-integrations/). The [GraphQL Analytics API](/analytics/graphql-api/) allows for flexible queries and integrations.
9. **Management & provisioning**: Define and manage resources and configuration using third-party tools and frameworks such as [Terraform](/terraform/) and [Pulumi](/pulumi/), Cloudflare's Developer Platform command-line interface (CLI) [wrangler](/workers/wrangler/), or the [Cloudflare API](/api/). All of these tools can be used either for manual provisioning, or automated as part of CI/CD pipelines.
