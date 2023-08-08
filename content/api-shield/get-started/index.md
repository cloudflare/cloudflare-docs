---
title: Get started
pcx_content_type: get-started
weight: 2
---

# Get started

This guide will help you set up API Shield to identify and address API security best practices.

## Set up session identifiers

While not strictly required, it is recommended that you configure your session identifiers when getting started with API Shield. When Cloudflare inspects your API traffic for individual sessions, we can offer more tools for visibility, management, and control.

If you are unsure of the session identifiers that your API uses, consult with your development team. A common session identifier for API traffic is the **Authorization** header.

### To set up session identifiers

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Go to **Security** > **API Shield**.
3. Select **Settings**.
4. On **Endpoint settings**, select **Manage identifiers**.
5. Enter the necessary information.
6. Select **Save**. 

After setting up session identifiers and allowing some time for Cloudflare to learn your traffic patterns, you can view your per endpoint and per session rate limiting recommendations, as well as enforce per endpoint and per session rate limits by creating new rules. Session identifiers will allow you to view API Discovery results from session ID-based discovery and session traffic patterns in Sequence Analytics.

## Upload a schema using Schema Validation (optional)

Schema Validation protects your APIs by ensuring only requests matching your API schema are allowed to communicate with your origin.

While not strictly required, uploading a pre-existing schema will offer the chance to automatically add endpoints to Endpoint Management. If you already have a schema, you can upload it to [Schema Validation](/api-shield/reference/classic-schema-validation/). 

{{<Aside type="note">}}
It is recommended to start with Schema Validation rules set to `log` to review logged requests in **Security** > **Events**. When you are confident that only the correct requests are logged, you should switch the rule to `block`. 
{{</Aside>}}

If you do not have a schema to upload, continue reading this guide to learn how to generate a schema with API Shield. 

## Enable the Sensitive Data Detection ruleset and accompanying rules

API Shield works with Cloudflare WAF’s [Sensitive Data Detection](/api-shield/management-and-monitoring/#sensitive-data-detection) ruleset to identify API endpoints that return sensitive data such as social security or credit card numbers in their HTTP responses. Monitoring these endpoints can be critical to ensuring sensitive data is returned only when expected. 

{{<Aside type="note">}}
A subscription is required for Sensitive Data Detection. Contact your account team if you are not entitled for Sensitive Data Detection.
{{</Aside>}}

You can identify endpoints returning sensitive data by selecting the icon next to the path in a row. Expand the endpoint to see details on which rules were triggered and view more information by exploring events in **Firewall Events**.

## Add your discovered endpoints to Endpoint Management

Cloudflare’s machine learning models have already inspected your existing traffic for the presence of API endpoints. By adding endpoints from API Discovery to Endpoint Management, you can unlock further security, visibility, and management features of the platform. Endpoint Management monitors the health of your API endpoints by saving, updating, and monitoring performance metrics. 

{{<Aside type="note">}}
Schema Validation, Schema Learning, JWT Validation, Sequence Analytics, and rate limit recommendations only run on endpoints saved to Endpoint Management.
{{</Aside>}}

You can save your endpoints directly from [API Discovery](/api-shield/management-and-monitoring/#add-endpoints-from-api-discovery), [Schema Validation](/api-shield/management-and-monitoring/#add-endpoints-from-schema-validation), or [manually](/api-shield/management-and-monitoring/#add-endpoints-manually) by method, path, and host.

This will add the specified endpoints to your list of managed endpoints. You can view your list of saved endpoints in the **Endpoint Management** page.

Cloudflare will aggregate [performance data](/api-shield/management-and-monitoring/#endpoint-performance-analysis) and security data on your endpoint once it is saved.

### Allow the system to learn your traffic patterns

Cloudflare will inspect your API traffic and begin to learn its schema over the next 24 hours after adding an endpoint. Depending on how much traffic an individual endpoint sees, our confidence in the resulting schema may differ. 

Cloudflare will also use the configured session identifiers to suggest rate limits per endpoint. 

For best results, allow at least 24 hours after adding endpoints before proceeding to the following steps. 

We recommend proceeding with [additional configurations](/api-shield/get-started/#additional-configuration) if this is your first time setting up API Shield and have added your first API endpoints to Endpoint Management.

## Add rate limits to your most sensitive endpoints

[Rate limiting rules](/waf/rate-limiting-rules/) allow you to define rate limits for requests matching an expression, and choose the action to perform when those rate limits are reached.

You can observe Cloudflare suggested rate limits in Endpoint Management for endpoints using session identifiers. Unlike many security tools, these recommended rate limits are per-endpoint and per-session, not site-wide and not based on IP address. When creating a rule, it will be based on only traffic to that specific endpoint from unique visitors during their session. This feature allows you to be very specific and targeted with your rate limit enforcement, both lowering abusive traffic and false positives due to broadly scoped rules. 

## Export learned schema from Endpoint Management

Cloudflare learns schema parameters via traffic inspection for all endpoints stored in Endpoint Management. You can export OpenAPI schemas in OpenAPI v3.0.0 format by hostname. 

Learned schemas will always include the listed hostname in the servers section, all endpoints by host, method, and path, and detected path variables. They can also potentially include detected query parameters and their format. You can optionally include API Shield’s rate limit threshold recommendations.

### Import learned schema to Schema Validation

By importing the learned schema, you can protect API endpoints found via API Discovery. You can protect API endpoints that were never previously possible to protect due to not knowing about their presence or schema.

You can import your learned schemas to Schema Validation 2 using the [API](/api-shield/security/schema-validation/) or the classic version of Schema Validation using the [Cloudflare dashboard](/api-shield/reference/classic-schema-validation/). Schema Validation 2 focuses on giving you granular control and lets you set mitigation actions for each endpoint individually. 

## View and configure Sequence Analytics

[Sequence Analytics](/api-shield/security/sequence-analytics/) surfaces a subset of important API request sequences found in your API traffic over time.

You can observe the top sequences in your API traffic that contain endpoints stored in Endpoint Management. We rank sequences by Correlation Score. High-scoring sequences contain API requests which are likely to occur together in order.

[Sequence Mitigation](/api-shield/security/sequence-mitigation/) allows you to enforce request patterns for authenticated clients communicating with your API. Use Sequence Analytics to better understand the request sequences used by your API clients.

You should apply all possible API Shield protections (rate limiting suggestions, Schema Validation, JWT Validation, and mTLS) to API endpoints found in high correlation score sequences that make up the critical request flows in your application. You should also check their specific endpoint order with your development team.

For more information, refer to [Detecting API abuse automatically using sequence analysis](https://blog.cloudflare.com/api-sequence-analytics) blog post.

## Additional configuration

### Set up JSON Web Tokens (JWT) Validation

Use the Cloudflare API to configure [JSON Web Tokens Validation](/api-shield/security/jwt-validation/), which validates the integrity and validity of JWTs sent by clients to your API or web application. 

### Set up GraphQL Malicious Query Protection

If your origin uses GraphQL, you may consider setting limits on GraphQL query size and depth. 

[GraphQL malicious query protection](/api-shield/security/graphql-protection/configure/) scans your GraphQL traffic for queries that could overload your origin and result in a denial of service. Customers can build rules that limit the query depth and size of incoming GraphQL queries in order to block suspiciously large or complex queries.

### Mutual TLS (mTLS) authentication

If you operate an API that requires or would benefit from an extra layer of protection, you may consider using Mutual TLS.

[Mutual TLS (mTLS) authentication](/api-shield/security/mtls/) uses client certificates to ensure traffic between client and server is bidirectionally secure and trusted. mTLS also allows requests that do not authenticate via an identity provider, such as Internet-of-things (IoT) devices, to demonstrate they can reach a given resource.