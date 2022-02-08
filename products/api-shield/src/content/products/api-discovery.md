---
order: 0
pcx-content-type: concept
type: overview
---

import Availability from "../_partials/_availability.md"
import BlogBlurb from "../_partials/_blog-post.md"

# API Discovery

<Availability/>

Most development teams struggle to keep track of their APIs. Cloudflare API Discovery helps you map out and understand your attack surface area.

## Process

Cloudflare produces a simple, trustworthy map of API endpoints through a process of path normalization.

For example, you might have thousands of APIs, but a lot of the calls look similar, such as:
- `api.example.com/login/238`
- `api.example.com/login/392`

Both paths serve a similar purpose — allowing users to log into their accounts — but they are not identical. To simplify your endpoints, these examples might both map to `api.example.com/login/*`.

API Discovery runs this process across all your authenticated endpoints, eventually generating a simple map of endpoints that might look like:

- `login/{customer_identifier}`
- `auth`
- `account/{customer_identifier}`
- `password_reset`
- `logout`

This process currently requires a session identifier, like an authorization token available as a request header. Once you have finished API Discovery, your APIs are ready for protection from [volumetric](../volumetric-abuse-detection) and [sequential](../sequential-abuse-detection) attacks.

<BlogBlurb/>

## API requests

To better understand your API traffic, you can also see [API requests](https://dash.cloudflare.com/?to=/:account/:zone/analytics/traffic/api-requests) in your application dashboard.

This view adds a lightweight filter to application requests so you can better identify API traffic. If you want a more sophisticated understanding of API traffic, check out [Bot Tags](https://developers.cloudflare.com/bots/concepts/cloudflare-bot-tags).
