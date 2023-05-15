---
pcx_content_type: concept
title: GraphQL malicious query protection
weight: 5
---

# GraphQL malicious query protection

GraphQL is a query language for APIs. In addition to protecting RESTful APIs, Cloudflare can also protect GraphQL APIs. 

GraphQL malicious query protection scans your GraphQL traffic for queries that could overload your origin and result in a denial of service. Customers can build rules that limit the query depth and size of incoming GraphQL queries in order to block suspiciously large or complex queries.

## Availability

GraphQL malicious query protection is available for all API Shield customers. Enterprise customers who have not purchased API Shield can get started by [enabling the API Shield trial](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or contacting your account manager.

## Limitations

Our initial release is limited in the body request size that it can parse. This limit will be lifted in a future release. Additionally, we currently inspect only `POST` requests with `content-types` of `application/json` or `application/graphql` where the queries do not contain fragments or multiple operations. Parsing and rules are limited to paths ending in `/graphql`.