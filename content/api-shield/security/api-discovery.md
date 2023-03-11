---
pcx_content_type: concept
type: overview
title: API Discovery
weight: 1
layout: list
---

# API Discovery

Most development teams struggle to keep track of their APIs. Cloudflare API Discovery helps you map out and understand your attack surface area.

## Process

Cloudflare produces a simple, trustworthy map of API endpoints through a process of path normalization.

For example, you might have thousands of APIs, but a lot of the calls look similar, such as:

- `api.example.com/login/238`
- `api.example.com/login/392`

Both paths serve a similar purpose — allowing users to log in to their accounts — but they are not identical. To simplify your endpoints, these examples might both map to `api.example.com/login/*`.

API Discovery runs this process across all your authenticated endpoints, generating a simple map of endpoints that might look like:

- `login/{customer_identifier}`
- `auth`
- `account/{customer_identifier}`
- `password_reset`
- `logout`

{{<render file="_blog-post.md">}}

### Machine Learning-based Discovery

Your API endpoints are discovered with both the Session Identifier-based Discovery and the Machine Learning-based Discovery.

To access Machine Learning-based Discovery, log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain. Go to **API Shield** > **Discovery**. You may filter the source results by `Session Identifier` or `Machine Learning` to view results from each Discovery method. 

If all of your zone’s API traffic contains the session identifier that you have configured, both sources may deliver the same results due to similarities between their underlying methodology. We expect Machine Learning-based Discovery to excel in discovering API traffic regardless of whether your API uses a session identifier. 

If you feel there is an error, please direct the feedback to your account team.

## API requests

To better understand your API traffic, you can also see [API requests](https://dash.cloudflare.com/?to=/:account/:zone/analytics/traffic/api-requests) in your application dashboard.

This view adds a lightweight filter to application requests so you can better identify API traffic. If you want a more sophisticated understanding of API traffic, check out [Bot Tags](/bots/concepts/cloudflare-bot-tags/).

## Availability

API Discovery is only available for Enterprise customers. If you are an Enterprise customer and interested in this product, contact your account team.