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

API Discovery runs this process across all your traffic, generating a simple map of endpoints that might look like:

```
/api/login/{customer_identifier}
/api/auth
/api/account/{customer_identifier}
/api/password_reset
/api/logout
```

{{<render file="_blog-post.md">}}

### Inbox view

API Shield first catalogs your discovered API endpoints in an email inbox-style view. From API Discovery, you can save endpoints to [Endpoint Management](/api-shield/management-and-monitoring/) or ignore endpoints to remove them from view.

You should save all discovered API endpoints to Endpoint Management while ignoring any potential false positives in the API Discovery results by selecting **Save** or **Ignore** on each line. Alternatively, you can bulk-select endpoints to save or ignore.

By adding endpoints to Endpoint Management, you will unlock further [security](/api-shield/security/), [visibility](/api-shield/management-and-monitoring/#endpoint-performance-analysis), and [management](/api-shield/management-and-monitoring/) features of the platform. Endpoint Management monitors the health of your API endpoints by saving, updating, and monitoring performance metrics.

To restore any errantly ignored endpoints, you can filter by **Ignored** and select **Restore**.

Check back regularly for new API Discovery results. A badge with the number of endpoints needing review will show in the API Shield dashboard.

{{<Aside type="note">}}
Cloudflare will use your feedback on the ignored endpoints to better train the API Discovery Machine Learning model in a future release.
{{</Aside>}}

### Machine Learning-based Discovery

Your API endpoints are discovered with both the Session Identifier-based Discovery and the Machine Learning-based Discovery.

To access Machine Learning-based Discovery, log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain. Go to **API Shield** > **Discovery**. You may filter the source results by `Session Identifier` or `Machine Learning` to view results from each Discovery method.

If all of your zone’s API traffic contains the session identifier that you have configured, both sources may deliver the same results due to similarities between their underlying methodology. We expect Machine Learning-based Discovery to excel in discovering API traffic regardless of whether your API uses a session identifier.

If you feel that there is an error, direct the feedback to your account team.

## Availability

API Discovery is only available for Enterprise customers. If you are an Enterprise customer and interested in this product, contact your account team.