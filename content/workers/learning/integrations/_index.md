---
pcx_content_type: concept
title: Integrations
weight: 6
---


# Integrations

{{<directory-listing>}}

One of the key features of Cloudflare Workers is the ability to easily integrate with other services and products. In this document, we will explain the types of integrations available with Cloudflare Workers and provide step-by-step instructions for using them.

## Types of integrations

Cloudflare Workers offers several types of integrations, including:

* [Databases](/workers/learning/integrations/databases/): Cloudflare Workers can be integrated with a variety of databases, including SQL and NoSQL databases. This allows you to store and retrieve data from your databases directly from your Cloudflare Workers code.
* [APIs](/workers/learning/integrations/apis/): Cloudflare Workers can be used to integrate with external APIs, allowing you to access and use the data and functionality exposed by those APIs in your own code.
* [Third-party services](/workers/learning/integrations/external-services/): Cloudflare Workers can be used to integrate with a wide range of third-party services, such as payment gateways, authentication providers, and more. This makes it possible to use these services in your Cloudflare Workers code.


## How to use integrations

To use any of the available integrations:

* Determine which integration you want to use and make sure you have the necessary accounts and credentials for it.
* In your Cloudflare Workers code, import the necessary libraries or modules for the integration.
* Use the provided APIs and functions to connect to the integration and access its data or functionality.
* Store necessary secrets and keys using secrets via [`wrangler secret put <KEY>`](/workers/wrangler/commands/#secret).


## Tips and best practices

To help you get the most out of using integrations with Cloudflare Workers:

* Secure your integrations and protect sensitive data. Ensure you use secure authentication and authorization where possible, and ensure the validity of libraries you import.
* Use [caching](/workers/learning/how-the-cache-works) to improve performance and reduce the load on an external service.
* Split your Workers into service-oriented architecture using [Service bindings](/workers/platform/bindings/about-service-bindings/) to make your application more modular, easier to maintain, and more performant.
* Use [Custom Domains](/workers/platform/triggers/custom-domains/) when communicating with external APIs and services, which create a DNS record on your behalf and treat your Worker as an application instead of a proxy.
