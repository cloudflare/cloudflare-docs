---
pcx_content_type: get-started
title: Get started
weight: 2
updated: 2024-06-19
---

# Get started

{{<tutorial-date-info>}}

In this guide, you will learn how to create your first AI Gateway. You can create multiple gateways to control different applications.

## Prerequisites

Before you get started, you need a Cloudflare account.

{{<button type="primary" href="https://dash.cloudflare.com/sign-up" target="_blank">}}Sign up{{</button>}}

## Create gateway

Then, create a new AI Gateway.

{{<render file="_create-gateway.md">}}

## Connect application

Next, connect your AI provider to your gateway.

AI Gateway offers multiple endpoints for each Gateway you create - one endpoint per provider, and one Universal Endpoint.

{{<details header="Supported providers">}}

{{<directory-listing folderDirectory="/ai-gateway/providers/">}}

{{</details>}}

If you do not have a provider preference, start with one of our dedicated tutorials.

{{<details header="Onboarding tutorials">}}

- [OpenAI](/ai-gateway/tutorials/deploy-aig-worker/)

{{</details>}}

## View analytics

Now that your provider is connected to the AI Gateway, you can view analytics for requests going through your gateway.

{{<render file="_analytics-overview.md">}}
<br/>

{{<render file="_analytics-dashboard.md">}}

{{<render file="_analytics-warning.md">}}


## Next steps

- Learn more about [caching](/ai-gateway/configuration/caching/) for faster requests and cost savings and [rate limiting](/ai-gateway/configuration/rate-limiting/) to control how your application scales.
- Explore how to specify model or provider [fallbacks](/ai-gateway/configuration/fallbacks/) for resiliency.
- Learn how to use low-cost, open source models on [Workers AI](/ai-gateway/providers/workersai/) - our AI inference service.
