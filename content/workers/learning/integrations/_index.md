---
pcx_content_type: concept
title: Integrations
weight: 6
---


# Integrations

{{<directory-listing>}}

One of the key features of Cloudflare Workers is the ability to easily integrate with other services and products. In this document, we will explain the types of integrations available with Cloudflare Workers and provide step-by-step instructions for using them.

## Types of Integrations
Cloudflare Workers offers several types of integrations, including:

* [Databases](/workers/platform/integrations/databases/): Cloudflare Workers can be easily integrated with a variety of databases, including SQL and NoSQL databases. This allows you to store and retrieve data from your databases directly from your Cloudflare Workers code.
* APIs: Cloudflare Workers can be used to easily integrate with other APIs, allowing you to access and use the data and functionality exposed by those APIs in your own code.
* Third-party services: Cloudflare Workers can be used to integrate with a wide range of third-party services, such as payment gateways, authentication providers, and more. This makes it easy to use these services in your Cloudflare Workers code.


## How to Use Integrations
Using integrations with Cloudflare Workers is easy. Here is a general step-by-step guide for using any of the available integrations:

* Determine which integration you want to use and make sure you have the necessary accounts and credentials for it.
* In your Cloudflare Workers code, import the necessary libraries or modules for the integration.
* Use the provided APIs and functions to connect to the integration and access its data or functionality.
* Store necessary secrets and keys using secrets via [`wrangler secret put <KEY>`](/workers/wrangler/commands/#secret)


## Tips and Best Practices
Here are a few tips and best practices to help you get the most out of your integrations with Cloudflare Workers:

* Be sure to properly secure your integrations and protect sensitive data. Ensure you use secure authentication and authorization where possible, and ensure the validity of libraries you import.
* Use caching to improve performance and reduce the load on an external service.
