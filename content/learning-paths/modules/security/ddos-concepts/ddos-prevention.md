---
title: How to prevent DDoS attacks
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Since DDoS attacks target your web servers, the way to prevent them is to reduce requests reaching those servers.

```mermaid
flowchart TD;
    A[Malicious device]-->|Request to application|CDN;
    CDN -->|Sends remaining requests|Origin;
    subgraph CDN
        WAF
        Cache
    end
    A --Prevent external connections---x Origin
```
<br/>

Requests can come to your origin server in two ways, from your web application and from direct connections to the server itself.

---

## Reduce application requests to the origin

### Caching

A cache stores copies of frequently accessed resources (images, CSS files).

When a resource is cached - either on a user's browser or Content Delivery Network (CDN) server - requests for that resource do not have to go to your origin server. Instead, these resources are served directly by the cache.

```mermaid
flowchart TD;
    User-->|Sends Request|Application;
    Application-->B[Has cached content?];
    B-->|Yes|User;
    B-->|No|Origin
    Origin-->|Requested content|User
```
<br/>

In the context of DDoS attacks, caching reduces the number of requests going to your origin server, which makes it harder for your server to get overwhelmed by traffic.

### Web Application Firewall (WAF)

A Web Application Firewall (WAF) creates a shield between a web app and the Internet. This shield checks incoming web requests and filters undesired traffic to help mitigate many common attacks.

```mermaid
graph TD;
    User-->|Sends Request|WAF;
    WAF-->|Filters Request|Application;
    Application-->|Sends Request|OriginServer;
    OriginServer-->|Serves Content|Application;
    Application-->|Serves Content|User;
```

## Prevent external connections

Generally, your origin server should only accept requests coming from your web application.

This is a general best practice for security, but especially important in the context of DDoS attacks. Any traffic that bypasses your web application will also bypass any WAF or caching and has a stronger chance of overwhelming your origin.

```mermaid
sequenceDiagram
  participant Client
  participant DDoS_Protection_Service
  participant Origin_Server
  
  Client->>+DDoS_Protection_Service: Request
  Note right of DDoS_Protection_Service: Filtered traffic
  DDoS_Protection_Service->>+Origin_Server: Request
  Origin_Server-->>-DDoS_Protection_Service: Response
  DDoS_Protection_Service-->>Client: Response
  
  Client->>+Origin_Server: Direct connection
  Note over Origin_Server: Potential DDoS Attack
  Origin_Server-->>-Client: Error response
```