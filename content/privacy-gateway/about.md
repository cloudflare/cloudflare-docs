---
title: About
pcx_content_type: concept
weight: 2
---

# About

There are three main parties involved in Privacy Gateway:

- **Cloudflare**: Operators of the Privacy Gateway relay service.
- **Customers**: Companies and organizations that pay Cloudflare to relay encrypted HTTP messages between clients and their application backends through Privacy Gateway.
- **End users**: Users of customers’ applications.

---

## Cloudflare

### Data access

When a company or organization sets up Privacy Gateway, Cloudflare has access to the following data:

- The IP address associated with client devices connecting to Privacy Gateway.
- The application service to which HTTP messages are relayed, including its DNS name and IP address.
- Metadata associated with the [request](/workers/runtime-apis/request/), including the type of browser, device operating system, hardware configuration, and timestamp of the request.

### Data limitations

Cloudflare cannot access the following data about an end user's request:

- Client application data, including contents of the encrypted application HTTP request.
- Target server application data, including contents of the encrypted application HTTP response.

### Data forwarding

As part of using Cloudflare's Privacy Gateway, Cloudflare will collect and report the following information to the customer:

- Encrypted request content per request.
- Monthly volume of requests, for billing purposes. 
- Monthly aggregate analytics, including the number of requests, bytes served, and aggregate errors observed.

---

## Customers

When traffic goes through Cloudflare's Privacy Gateway, customers can access and collect:

- The application content of requests.
- The IP address and associated metadata of the Cloudflare Privacy Gateway server the request came from.
