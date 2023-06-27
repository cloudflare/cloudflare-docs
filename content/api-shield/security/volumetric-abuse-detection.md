---
pcx_content_type: concept
type: overview
title: Volumetric Abuse Detection
weight: 3
layout: list
---

# Volumetric Abuse Detection

Cloudflare Volumetric Abuse Detection helps you set up a system of adaptive rate limiting.

## About

After [API Discovery](/api-shield/security/api-discovery/), Cloudflare looks for endpoint abuse based on common user traffic.

For example, your API might see different levels of traffic to a `/reset-password` endpoint than a `/login` endpoint. Additionally, your `/login` endpoint might see higher than average traffic after a successful marketing campaign.

These two scenarios speak to the limitations of traditional rate limiting. Not only does traffic vary between endpoints, but it also can vary over time for the same endpoint. Volumetric Abuse Detection solves these problems with unsupervised learning to develop separate baselines for each API and better adjust to changes in user behavior.

Volumetric Abuse Detection rate limits are generated on a per-session basis. Unlike traditional rate limits, which are based on IP addresses, Volumetric Abuse Detection rate limits are not as susceptible to false positives when traffic to your API increases.

Volumetric Abuse Detection rate limits are a way to prevent blatant volumetric abuse while minimizing false positives. If you are trying to prevent abusive bot traffic altogether, refer to Cloudflare’s [Bot solutions](/bots/).

## Process

Volumetric Abuse Detection analyzes your API’s individual session traffic statistics to recommend per-endpoint, per-session rate limits.

This feature currently requires a [session identifier](/api-shield/get-started/#set-up-session-identifiers), like an authorization token available as a request header or cookie.

After adding a session identifier, allow 24 hours for rate limit recommendations to appear on endpoints in **Endpoint Management** in the Cloudflare dashboard. Recommendations will continue to update if your traffic pattern changes

### Observe rate limits

Once rate limit recommendations appear in **Endpoint Management**, select the endpoint row to view more detail about the recommendation. You will see the overall recommended rate limit value, as well as p99, p90, and p50 rate limit values.

Cloudflare recommends choosing the overall rate limit recommendation, as our analysis includes the variance of the request rate distribution across your API sessions. Choosing a single p-value may cause false positives due to a high number of outliers.

{{<Aside type="note" header="p-values">}}
p-values describe what percentile of your traffic fits below the value. For example, if your p90 value is `83`, then 90% of your sessions had maximum request rates less than 83 requests per 10 minutes.
{{</Aside>}}

In **Endpoint Management**, you can review our confidence in the recommendation and how many unique sessions we have seen over the last seven (7) days. In general, endpoints with fewer unique sessions and high variability of user behavior will have lower confidence scores.

{{<Aside type="Note">}}
Implementing low confidence rate limits can still be helpful to prevent API abuse. If you are hesitant due to the recommendation’s confidence, we suggest starting your rate limit rule in `log` mode and observing violations of the rule for false positives.
{{</Aside>}}

### Create rate limits

1. Log in to the Cloudflare dashboard, and select your account and domain.
2. Go to **Security** > **API Shield**.
3. In **Endpoint Management**, select an endpoint.
4. Select **Create rule** to be automatically redirected to the [Advanced Rate Limiting](/waf/rate-limiting-rules/create-zone-dashboard/) rules dashboard.
{{<Aside type="Note">}}
Your endpoint information, session identifier, and recommended rate limit will be pre-filled into the rule.
{{</Aside>}}
5. Give your rule a name, action, and duration. 
6. Select **Deploy** to activate your rule.

## API

[Rate limit recommendations are available via the API](/api/operations/api-shield-endpoint-management-retrieve-information-about-an-operation) if you would like to dynamically update rate limits over time.

## Limits

API Shield will always calculate recommendations when session identifiers are configured. To enable session-based rate limits, [subscribe to Advanced Rate Limiting](/waf/rate-limiting-rules/#availability).

## Availability

Volumetric Abuse Detection is only available for Enterprise customers. If you are an Enterprise customer and interested in this product, contact your account team.