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

Cloudflare offers all building blocks to build, deploy and operate modern fullstack applications. All of Cloudflare's services are fully serverless and designed for global distribution. This

## Fullstack application

![Figure 1: Fullstack application](/images/reference-architecture/fullstack-app/fullstack-app-base.svg "Figure 1: Fullstack application")

This architecture shows a fully serverless ETL pipeline with an API endpoint as ingest. Clients send data via HTTP request to be processed. Common examples include click-stream data or analytics.

1. **Client**: Sends requests to web server. This could be through a desktop or mobile browser, or native or mobile app.
2. **Security**: Process incoming request to ensure security of application. This includes encryption of traffic using [SSL/TLS](/ssl/), offering [DDOS protection](/ddos-protection/), filtering malicious traffic through a [web application firewall (WAF)](/waf/), and [mitigations against automated bots](/bots/). Depending on configuration, requests can be blocked, logged or allowed based on a diverse set of parameters. Sensible fully managed and default configurations can be used to reduce attack surfaces with little to no overhead.
3. **Performance**: Serve static requests from [global cache (CDN)](/cache/). This reduces latency and lowers resource utilization as the requests are being served from cache instead of requiring a request to storage & media services or compute services.
4. **Static & Media**: Serve static files from [R2](/r2/), optimized images from [Images](/images/) and on-demand videos as well as live streams from [Stream](/stream/).
5. **Compute**: Process dynamic requests using serverless compute with [Workers](/workers/). This could include authentication, routing, middleware, database interactions, and serving APIs. Moreover, use [Pages](/pages/) to serve client side or server side rendering web frameworks such as React, Vue or Angular. Integrate AI services using serverless inference with [Workers AI](/workers-ai/). Both Workers and Pages Functions allow for simple interaction with other resources using [Bindings](/workers/runtime-apis/bindings/).
6. **Data & storage**: Access processed data from external services for further data usage.
7. **Internal observability**:
8. **External integrations**:
9. **Managememt & provisioning**:

## Related resources

- [Workers: Get started](/workers/get-started/)
- [Queues: Get started](/queues/get-started/)
- [R2: Get started](/r2/get-started/)
